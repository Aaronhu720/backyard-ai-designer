const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
];

const CONCEPT_DESCRIPTIONS = [
  "A clean modern patio with natural stone pavers, minimalist outdoor furniture, and warm ambient lighting. The space features a sleek pergola with retractable shade and a built-in seating area perfect for evening gatherings.",
  "A family-oriented backyard retreat featuring lush artificial turf, a cozy fire pit area, and a spacious dining zone under a wooden pergola. Kid-friendly landscaping with soft edges and durable materials throughout.",
  "An intimate garden escape with layered planting beds, a bubbling water feature, and string lights creating a magical atmosphere. Comfortable lounge seating surrounded by fragrant flowering plants.",
  "A premium outdoor living space with a full outdoor kitchen, luxury lounge furniture, and professional landscape lighting. High-end materials including travertine pavers and custom metalwork throughout.",
];

export interface MockDesignResult {
  concepts: {
    name: string;
    imageUrl: string;
    description: string;
    recommendedFeatures: string[];
  }[];
  promptUsed: string;
}

export function generateMockDesigns(
  prompt: string,
  selectedFeatures: string[],
  count: number = 3
): MockDesignResult {
  const concepts = [];
  const names = [
    "Modern Patio Lounge",
    "Family Outdoor Retreat",
    "Cozy Garden Escape",
    "Premium Living Space",
  ];

  for (let i = 0; i < Math.min(count, 4); i++) {
    concepts.push({
      name: names[i],
      imageUrl: MOCK_IMAGES[i],
      description: CONCEPT_DESCRIPTIONS[i],
      recommendedFeatures: selectedFeatures.slice(0, Math.min(5, selectedFeatures.length)),
    });
  }

  return { concepts, promptUsed: prompt };
}
