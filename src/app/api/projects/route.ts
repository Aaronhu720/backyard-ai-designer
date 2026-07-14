import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { calculateEstimate } from "@/lib/budget-engine";
import { buildDesignPrompt } from "@/lib/prompt-builder";
import { generateMockDesigns } from "@/lib/mock-generate";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        customerName: true,
        email: true,
        phone: true,
        city: true,
        state: true,
        status: true,
        budgetRange: true,
        createdAt: true,
      },
    });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const selectedStyles = Array.isArray(body.selectedStyles)
      ? body.selectedStyles
      : JSON.parse(body.selectedStyles || "[]");
    const selectedFeatures = Array.isArray(body.selectedFeatures)
      ? body.selectedFeatures
      : JSON.parse(body.selectedFeatures || "[]");

    const project = await prisma.project.create({
      data: {
        customerName: body.customerName || "",
        email: body.email || "",
        phone: body.phone || "",
        address: body.address || "",
        city: body.city || "",
        state: body.state || "",
        zipCode: body.zipCode || "",
        backyardSize: body.backyardSize || "medium",
        currentCondition: body.currentCondition || "",
        selectedStyles: JSON.stringify(selectedStyles),
        selectedFeatures: JSON.stringify(selectedFeatures),
        budgetRange: body.budgetRange || "not_sure",
        status: "new_lead",
      },
    });

    const estimate = calculateEstimate(selectedFeatures, body.backyardSize || "medium");

    await prisma.estimate.create({
      data: {
        projectId: project.id,
        lowEstimate: estimate.totalLow,
        highEstimate: estimate.totalHigh,
        estimateDetailsJson: JSON.stringify(estimate),
      },
    });

    // Save uploaded photos
    const uploadedPhotos = body.uploadedPhotos || [];
    for (const photo of uploadedPhotos) {
      await prisma.projectImage.create({
        data: {
          projectId: project.id,
          imageUrl: photo.url,
          imageType: "uploaded",
          label: photo.label || "Photo",
        },
      });
    }

    const prompt = buildDesignPrompt(selectedStyles, selectedFeatures, body.budgetRange || "not_sure");
    const mockResults = generateMockDesigns(prompt, selectedFeatures, 3);

    for (const concept of mockResults.concepts) {
      await prisma.projectImage.create({
        data: {
          projectId: project.id,
          imageUrl: concept.imageUrl,
          imageType: "generated",
          label: concept.name,
        },
      });
    }

    return NextResponse.json({
      ...project,
      selectedStyles,
      selectedFeatures,
      concepts: mockResults.concepts,
      estimate,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
