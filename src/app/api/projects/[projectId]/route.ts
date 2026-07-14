import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateMockDesigns } from "@/lib/mock-generate";
import { buildDesignPrompt } from "@/lib/prompt-builder";
import { calculateEstimate } from "@/lib/budget-engine";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        images: true,
        estimates: true,
        notes: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const selectedStyles = JSON.parse(project.selectedStyles);
    const selectedFeatures = JSON.parse(project.selectedFeatures);

    const prompt = buildDesignPrompt(selectedStyles, selectedFeatures, project.budgetRange);
    const mockResults = generateMockDesigns(prompt, selectedFeatures, 3);
    const estimate = calculateEstimate(selectedFeatures, project.backyardSize);

    return NextResponse.json({
      ...project,
      selectedStyles,
      selectedFeatures,
      concepts: mockResults.concepts,
      estimate,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await params;

  try {
    const body = await req.json();

    if (body.status) {
      await prisma.project.update({
        where: { id: projectId },
        data: { status: body.status },
      });
    }

    if (body.addNote) {
      await prisma.leadNote.create({
        data: {
          projectId,
          note: body.addNote,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
