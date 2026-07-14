import { NextRequest, NextResponse } from "next/server";
import { calculateEstimate } from "@/lib/budget-engine";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { selectedFeatures = [], backyardSize = "medium" } = body;

  const estimate = calculateEstimate(selectedFeatures, backyardSize);

  return NextResponse.json(estimate);
}
