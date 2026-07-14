import { NextRequest, NextResponse } from "next/server";
import { buildDesignPrompt } from "@/lib/prompt-builder";
import { generateMockDesigns } from "@/lib/mock-generate";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    selectedStyles = [],
    selectedFeatures = [],
    budgetRange = "not_sure",
  } = body;

  const prompt = buildDesignPrompt(selectedStyles, selectedFeatures, budgetRange);
  const results = generateMockDesigns(prompt, selectedFeatures, body.count || 3);

  // TODO: Replace with real AI image generation API call
  // Example integration points:
  // - OpenAI DALL-E 3: POST https://api.openai.com/v1/images/generations
  // - Replicate SDXL: POST https://api.replicate.com/v1/predictions
  // - Flux Pro: POST https://api.bfl.ml/v1/flux-pro

  return NextResponse.json({
    concepts: results.concepts,
    promptUsed: prompt,
    status: "mock",
  });
}
