export const STYLES = [
  { id: "modern", label: "Modern", icon: "✦" },
  { id: "family_friendly", label: "Family Friendly", icon: "👨‍👩‍👧‍👦" },
  { id: "low_budget", label: "Low Budget Refresh", icon: "💰" },
  { id: "luxury", label: "Luxury Backyard", icon: "✨" },
  { id: "outdoor_dining", label: "Outdoor Dining", icon: "🍽️" },
  { id: "fire_pit_lounge", label: "Fire Pit Lounge", icon: "🔥" },
  { id: "pergola_shade", label: "Pergola Shade Area", icon: "🏛️" },
  { id: "pet_friendly", label: "Pet Friendly", icon: "🐾" },
  { id: "poolside", label: "Poolside Upgrade", icon: "🏊" },
] as const;

export const FEATURES = [
  { id: "patio_pavers", label: "Patio Pavers" },
  { id: "artificial_turf", label: "Artificial Turf" },
  { id: "pergola", label: "Pergola" },
  { id: "fire_pit", label: "Fire Pit" },
  { id: "outdoor_kitchen", label: "Outdoor Kitchen" },
  { id: "patio_heater", label: "Patio Heater" },
  { id: "dining_set", label: "Dining Set" },
  { id: "outdoor_sofa", label: "Outdoor Sofa" },
  { id: "landscape_lighting", label: "Landscape Lighting" },
  { id: "garden_bed", label: "Garden Bed" },
  { id: "fence_improvement", label: "Fence Improvement" },
  { id: "storage_shed", label: "Storage Shed" },
] as const;

export const BUDGET_RANGES = [
  { id: "5k_10k", label: "$5,000 – $10,000" },
  { id: "10k_20k", label: "$10,000 – $20,000" },
  { id: "20k_50k", label: "$20,000 – $50,000" },
  { id: "50k_plus", label: "$50,000+" },
  { id: "not_sure", label: "Not Sure" },
] as const;

export const BACKYARD_SIZES = [
  { id: "small", label: "Small", sqft: 500 },
  { id: "medium", label: "Medium", sqft: 1000 },
  { id: "large", label: "Large", sqft: 2000 },
  { id: "not_sure", label: "Not Sure", sqft: 1000 },
] as const;

export const CURRENT_CONDITIONS = [
  "Empty yard",
  "Grass",
  "Concrete",
  "Dirt",
  "Old patio",
  "Pool area",
] as const;

export const PHOTO_LABELS = [
  "Backyard wide view",
  "Left side",
  "Right side",
  "Ground area",
  "House-facing view",
  "Fence / wall area",
] as const;

export const PROJECT_STATUSES = [
  { id: "new_lead", label: "New Lead", color: "bg-blue-100 text-blue-800" },
  { id: "contacted", label: "Contacted", color: "bg-yellow-100 text-yellow-800" },
  { id: "quoted", label: "Quoted", color: "bg-purple-100 text-purple-800" },
  { id: "closed_won", label: "Closed Won", color: "bg-green-100 text-green-800" },
  { id: "closed_lost", label: "Closed Lost", color: "bg-red-100 text-red-800" },
] as const;
