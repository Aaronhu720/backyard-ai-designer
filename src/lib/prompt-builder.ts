import { STYLES, FEATURES } from "./constants";

export function buildDesignPrompt(
  selectedStyles: string[],
  selectedFeatures: string[],
  budgetRange: string
): string {
  const styleLabels = selectedStyles
    .map((id) => STYLES.find((s) => s.id === id)?.label)
    .filter(Boolean)
    .join(", ");

  const featureLabels = selectedFeatures
    .map((id) => FEATURES.find((f) => f.id === id)?.label)
    .filter(Boolean)
    .join(", ");

  let budgetTone = "";
  if (budgetRange === "5k_10k" || budgetRange === "low_budget") {
    budgetTone =
      "Use affordable and simple upgrades, such as artificial turf, basic patio furniture, portable patio heater, string lights, small planters, and simple paver area. Keep it budget-friendly and practical.";
  } else if (budgetRange === "50k_plus") {
    budgetTone =
      "Use premium materials, luxury outdoor furniture, built-in fire pit, high-end pergola, landscape lighting, outdoor kitchen, and elegant modern landscaping. Make it look high-end and aspirational.";
  } else {
    budgetTone =
      "Use a balanced mix of quality materials and practical design. Include good-quality outdoor furniture, proper hardscaping, and attractive landscaping.";
  }

  return `Create a realistic backyard makeover design based on the uploaded backyard photo. Keep the original house, fence, walls, doors, windows, and yard layout unchanged. Redesign the backyard in a ${styleLabels || "modern"} style. Add ${featureLabels || "patio, turf, and outdoor furniture"}. ${budgetTone} Make it look realistic, buildable, clean, and suitable for a residential backyard in the United States. Do not change the building structure. Do not add unrealistic pools or large buildings. High-quality architectural visualization style, golden hour lighting, photorealistic rendering.`;
}

export function buildConceptName(
  styles: string[],
  index: number
): string {
  const names = [
    "Modern Patio Lounge",
    "Family Outdoor Retreat",
    "Cozy Garden Escape",
    "Premium Living Space",
  ];
  const styleLabel = STYLES.find((s) => s.id === styles[0])?.label || "Custom";
  return names[index] || `${styleLabel} Concept ${index + 1}`;
}
