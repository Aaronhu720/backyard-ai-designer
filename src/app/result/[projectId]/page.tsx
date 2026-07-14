"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";

interface Concept {
  name: string;
  imageUrl: string;
  description: string;
  recommendedFeatures: string[];
}

interface Estimate {
  lineItems: { featureLabel: string; lowCost: number; highCost: number; note: string }[];
  subtotalLow: number;
  subtotalHigh: number;
  laborLow: number;
  laborHigh: number;
  totalLow: number;
  totalHigh: number;
}

interface ProjectResult {
  id: string;
  customerName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  selectedStyles: string[];
  selectedFeatures: string[];
  budgetRange: string;
  concepts: Concept[];
  estimate: Estimate;
}

function fmt(n: number) { return "$" + n.toLocaleString(); }

export default function ResultPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState<ProjectResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId === "demo") { setProject(getDemoProject()); setLoading(false); return; }
    fetch(`/api/projects/${projectId}`)
      .then((res) => res.json())
      .then((data) => { setProject(data); setLoading(false); })
      .catch(() => { setProject(getDemoProject()); setLoading(false); });
  }, [projectId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF7F3" }}>
      <div className="animate-spin w-8 h-8 border-4 border-t-transparent rounded-full" style={{ borderColor: "#2D4A3E", borderTopColor: "transparent" }} />
    </div>
  );
  if (!project) return null;

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F3" }}>
      <Header />

      <div className="max-w-5xl mx-auto px-6 py-10 pb-20">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: "#EEF4F0", color: "#5B7F63" }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Design complete
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-normal mb-2" style={{ color: "#1B3A2D" }}>
            Your backyard makeover
          </h1>
          <p style={{ color: "#9A8E82" }}>
            {project.customerName} &middot; {project.address}, {project.city}, {project.state} {project.zipCode}
          </p>
        </div>

        {/* Design Concepts */}
        <div className="mb-14">
          <h2 className="font-display text-xl font-normal mb-6" style={{ color: "#1B3A2D" }}>
            Design concepts
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.concepts.map((concept, i) => (
              <div key={i} className="card overflow-hidden group">
                <div className="aspect-[16/10] relative overflow-hidden" style={{ background: "#EDE7DE" }}>
                  <img
                    src={concept.imageUrl}
                    alt={concept.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(0,0,0,0.5)", color: "white", backdropFilter: "blur(8px)" }}>
                    Concept {i + 1}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-normal mb-2" style={{ color: "#1B3A2D" }}>
                    {concept.name}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#9A8E82" }}>
                    {concept.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {concept.recommendedFeatures.map((f) => (
                      <span key={f} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "#EEF4F0", color: "#2D4A3E" }}>
                        {f.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Estimate */}
        <div className="card p-8 mb-8">
          <h2 className="font-display text-xl font-normal mb-6" style={{ color: "#1B3A2D" }}>
            Budget estimate
          </h2>

          <div className="overflow-x-auto" style={{ borderRadius: 12, border: "1px solid #EDE7DE" }}>
            <table className="w-full text-sm" style={{ fontVariantNumeric: "tabular-nums" }}>
              <thead>
                <tr style={{ background: "#FAF7F3" }}>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider" style={{ color: "#9A8E82" }}>Feature</th>
                  <th className="text-right py-3 px-4 text-xs font-bold uppercase tracking-wider" style={{ color: "#9A8E82" }}>Low</th>
                  <th className="text-right py-3 px-4 text-xs font-bold uppercase tracking-wider" style={{ color: "#9A8E82" }}>High</th>
                  <th className="text-right py-3 px-4 text-xs font-bold uppercase tracking-wider hidden md:table-cell" style={{ color: "#9A8E82" }}>Note</th>
                </tr>
              </thead>
              <tbody>
                {project.estimate.lineItems.map((item, i) => (
                  <tr key={i} style={{ borderTop: "1px solid #EDE7DE" }}>
                    <td className="py-3 px-4" style={{ color: "#2A2520" }}>{item.featureLabel}</td>
                    <td className="py-3 px-4 text-right font-mono text-xs" style={{ color: "#6B5F54" }}>{fmt(item.lowCost)}</td>
                    <td className="py-3 px-4 text-right font-mono text-xs" style={{ color: "#6B5F54" }}>{fmt(item.highCost)}</td>
                    <td className="py-3 px-4 text-right text-xs hidden md:table-cell" style={{ color: "#B5AA9F" }}>{item.note}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: "1px solid #EDE7DE" }}>
                  <td className="py-3 px-4" style={{ color: "#9A8E82" }}>Subtotal</td>
                  <td className="py-3 px-4 text-right font-mono text-xs" style={{ color: "#6B5F54" }}>{fmt(project.estimate.subtotalLow)}</td>
                  <td className="py-3 px-4 text-right font-mono text-xs" style={{ color: "#6B5F54" }}>{fmt(project.estimate.subtotalHigh)}</td>
                  <td className="py-3 px-4 hidden md:table-cell" />
                </tr>
                <tr style={{ borderTop: "1px solid #EDE7DE" }}>
                  <td className="py-3 px-4" style={{ color: "#9A8E82" }}>Labor &amp; installation (20–40%)</td>
                  <td className="py-3 px-4 text-right font-mono text-xs" style={{ color: "#6B5F54" }}>{fmt(project.estimate.laborLow)}</td>
                  <td className="py-3 px-4 text-right font-mono text-xs" style={{ color: "#6B5F54" }}>{fmt(project.estimate.laborHigh)}</td>
                  <td className="py-3 px-4 hidden md:table-cell" />
                </tr>
                <tr style={{ borderTop: "2px solid #D9D0C7", background: "#EEF4F0" }}>
                  <td className="py-4 px-4 font-semibold" style={{ color: "#1B3A2D" }}>Total estimate</td>
                  <td className="py-4 px-4 text-right font-bold font-mono" style={{ color: "#2D4A3E" }}>{fmt(project.estimate.totalLow)}</td>
                  <td className="py-4 px-4 text-right font-bold font-mono" style={{ color: "#2D4A3E" }}>{fmt(project.estimate.totalHigh)}</td>
                  <td className="py-4 px-4 hidden md:table-cell" />
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 rounded-xl text-xs leading-relaxed" style={{ background: "#FAF7F3", color: "#9A8E82", border: "1px solid #EDE7DE" }}>
            <strong style={{ color: "#6B5F54" }}>Disclaimer:</strong> This is a rough estimate based on average market prices. Final quote requires an on-site measurement and assessment. Prices may vary based on materials, labor availability, and local market conditions.
          </div>
        </div>

        {/* Actions */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          <button className="btn-primary justify-center py-3">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download PDF
          </button>
          <button className="btn-secondary justify-center py-3">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Book consultation
          </button>
          <button className="btn-secondary justify-center py-3">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            Regenerate
          </button>
          <button className="btn-secondary justify-center py-3" onClick={() => window.history.go(-2)}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
            </svg>
            Edit design
          </button>
        </div>
      </div>
    </div>
  );
}

function getDemoProject(): ProjectResult {
  return {
    id: "demo",
    customerName: "John Smith",
    address: "1234 Oak Avenue",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90210",
    selectedStyles: ["modern", "family_friendly"],
    selectedFeatures: ["patio_pavers", "artificial_turf", "pergola", "patio_heater", "landscape_lighting"],
    budgetRange: "20k_50k",
    concepts: [
      { name: "Modern Patio Lounge", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", description: "A clean modern patio with natural stone pavers, minimalist outdoor furniture, and warm ambient lighting. The space features a sleek pergola with retractable shade and a built-in seating area perfect for evening gatherings.", recommendedFeatures: ["patio_pavers", "artificial_turf", "pergola", "patio_heater", "landscape_lighting"] },
      { name: "Family Outdoor Retreat", imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop", description: "A family-oriented backyard retreat featuring lush artificial turf, a cozy fire pit area, and a spacious dining zone under a wooden pergola. Kid-friendly landscaping with soft edges and durable materials.", recommendedFeatures: ["artificial_turf", "pergola", "patio_heater", "landscape_lighting"] },
      { name: "Cozy Garden Escape", imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", description: "An intimate garden escape with layered planting beds, string lights creating a magical atmosphere. Comfortable lounge seating surrounded by fragrant flowering plants.", recommendedFeatures: ["patio_pavers", "landscape_lighting", "artificial_turf"] },
    ],
    estimate: {
      lineItems: [
        { featureLabel: "Patio Pavers", lowCost: 4800, highCost: 10000, note: "400 sq ft × $12–$25/sq ft" },
        { featureLabel: "Artificial Turf", lowCost: 4000, highCost: 7500, note: "500 sq ft × $8–$15/sq ft" },
        { featureLabel: "Pergola", lowCost: 3000, highCost: 10000, note: "$3,000–$10,000 each" },
        { featureLabel: "Patio Heater", lowCost: 150, highCost: 600, note: "$150–$600 each" },
        { featureLabel: "Landscape Lighting", lowCost: 800, highCost: 3500, note: "$800–$3,500 each" },
      ],
      subtotalLow: 12750, subtotalHigh: 31600, laborLow: 2550, laborHigh: 12640, totalLow: 15300, totalHigh: 44240,
    },
  };
}
