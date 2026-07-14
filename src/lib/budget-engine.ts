import { BACKYARD_SIZES } from "./constants";

interface PriceRange {
  low: number;
  high: number;
  unit: "each" | "per_sqft";
}

const FEATURE_PRICES: Record<string, PriceRange> = {
  patio_pavers: { low: 12, high: 25, unit: "per_sqft" },
  artificial_turf: { low: 8, high: 15, unit: "per_sqft" },
  pergola: { low: 3000, high: 10000, unit: "each" },
  fire_pit: { low: 1200, high: 5000, unit: "each" },
  outdoor_kitchen: { low: 8000, high: 30000, unit: "each" },
  patio_heater: { low: 150, high: 600, unit: "each" },
  dining_set: { low: 800, high: 4000, unit: "each" },
  outdoor_sofa: { low: 1000, high: 6000, unit: "each" },
  landscape_lighting: { low: 800, high: 3500, unit: "each" },
  garden_bed: { low: 500, high: 3000, unit: "each" },
  fence_improvement: { low: 1500, high: 8000, unit: "each" },
  storage_shed: { low: 800, high: 5000, unit: "each" },
};

const SQFT_COVERAGE_RATIO: Record<string, number> = {
  patio_pavers: 0.4,
  artificial_turf: 0.5,
};

const LABOR_RATE = { low: 0.2, high: 0.4 };

export interface EstimateLineItem {
  feature: string;
  featureLabel: string;
  lowCost: number;
  highCost: number;
  note: string;
}

export interface EstimateResult {
  lineItems: EstimateLineItem[];
  subtotalLow: number;
  subtotalHigh: number;
  laborLow: number;
  laborHigh: number;
  totalLow: number;
  totalHigh: number;
}

export function calculateEstimate(
  selectedFeatures: string[],
  backyardSize: string
): EstimateResult {
  const sizeEntry = BACKYARD_SIZES.find((s) => s.id === backyardSize);
  const sqft = sizeEntry?.sqft ?? 1000;

  const lineItems: EstimateLineItem[] = [];

  for (const feature of selectedFeatures) {
    const price = FEATURE_PRICES[feature];
    if (!price) continue;

    let lowCost: number;
    let highCost: number;
    let note: string;

    if (price.unit === "per_sqft") {
      const ratio = SQFT_COVERAGE_RATIO[feature] ?? 0.3;
      const area = Math.round(sqft * ratio);
      lowCost = area * price.low;
      highCost = area * price.high;
      note = `${area} sq ft × $${price.low}–$${price.high}/sq ft`;
    } else {
      lowCost = price.low;
      highCost = price.high;
      note = `$${price.low.toLocaleString()}–$${price.high.toLocaleString()} each`;
    }

    const featureLabel = feature
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    lineItems.push({ feature, featureLabel, lowCost, highCost, note });
  }

  const subtotalLow = lineItems.reduce((sum, item) => sum + item.lowCost, 0);
  const subtotalHigh = lineItems.reduce((sum, item) => sum + item.highCost, 0);

  const laborLow = Math.round(subtotalLow * LABOR_RATE.low);
  const laborHigh = Math.round(subtotalHigh * LABOR_RATE.high);

  return {
    lineItems,
    subtotalLow,
    subtotalHigh,
    laborLow,
    laborHigh,
    totalLow: subtotalLow + laborLow,
    totalHigh: subtotalHigh + laborHigh,
  };
}
