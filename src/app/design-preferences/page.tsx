"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import StepIndicator from "@/components/StepIndicator";
import { STYLES, FEATURES, BUDGET_RANGES } from "@/lib/constants";

export default function DesignPreferencesPage() {
  const router = useRouter();
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function toggleStyle(id: string) {
    setSelectedStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setErrors((prev) => ({ ...prev, styles: "" }));
  }

  function toggleFeature(id: string) {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
    setErrors((prev) => ({ ...prev, features: "" }));
  }

  function handleSubmit() {
    const errs: Record<string, string> = {};
    if (selectedStyles.length === 0) errs.styles = "Select at least one style";
    if (selectedFeatures.length === 0) errs.features = "Select at least one feature";
    if (!budgetRange) errs.budget = "Select a budget range";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const preferences = { selectedStyles, selectedFeatures, budgetRange };
    sessionStorage.setItem("projectPreferences", JSON.stringify(preferences));
    const formData = JSON.parse(sessionStorage.getItem("projectForm") || "{}");
    sessionStorage.setItem("fullProject", JSON.stringify({ ...formData, ...preferences }));
    router.push("/generating");
  }

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F3" }}>
      <Header />
      <StepIndicator current={3} />

      <div className="max-w-3xl mx-auto px-6 pb-16">
        <div className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-normal mb-2" style={{ color: "#1B3A2D" }}>
            Choose the feeling.
          </h1>
          <p style={{ color: "#9A8E82" }}>
            Select the styles, features, and budget that fit your vision.
          </p>
        </div>

        <div className="space-y-10">
          {/* Styles */}
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: "#2A2520" }}>
              What style speaks to you?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => toggleStyle(style.id)}
                  className={`chip ${selectedStyles.includes(style.id) ? "chip-active" : ""} text-left flex items-center gap-2.5`}
                >
                  <span className="text-lg">{style.icon}</span>
                  <span>{style.label}</span>
                </button>
              ))}
            </div>
            {errors.styles && <p className="text-red-500 text-xs mt-2">{errors.styles}</p>}
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: "#2A2520" }}>
              What features do you want?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FEATURES.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`chip ${selectedFeatures.includes(feature.id) ? "chip-active" : ""}`}
                >
                  {selectedFeatures.includes(feature.id) && (
                    <svg className="w-4 h-4 inline mr-1.5 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                  {feature.label}
                </button>
              ))}
            </div>
            {errors.features && <p className="text-red-500 text-xs mt-2">{errors.features}</p>}
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: "#2A2520" }}>
              What&apos;s your approximate budget?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {BUDGET_RANGES.map((range) => (
                <button
                  key={range.id}
                  onClick={() => { setBudgetRange(range.id); setErrors((prev) => ({ ...prev, budget: "" })); }}
                  className={`chip ${budgetRange === range.id ? "chip-active" : ""} flex items-center gap-2 justify-center`}
                >
                  <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    budgetRange === range.id ? "border-forest-500" : "border-sand-400"
                  }`}>
                    {budgetRange === range.id && <span className="w-1.5 h-1.5 rounded-full bg-forest-500" />}
                  </span>
                  {range.label}
                </button>
              ))}
            </div>
            {errors.budget && <p className="text-red-500 text-xs mt-2">{errors.budget}</p>}
          </div>

          {/* Selected summary */}
          {(selectedStyles.length > 0 || selectedFeatures.length > 0) && (
            <div className="card p-5" style={{ background: "#EEF4F0", border: "1px solid #D5E5DA" }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#5B7F63" }}>
                Your selections
              </div>
              {selectedStyles.length > 0 && (
                <div className="mb-2">
                  <span className="text-xs font-semibold mr-2" style={{ color: "#2A2520" }}>Styles:</span>
                  <span className="text-sm" style={{ color: "#6B5F54" }}>
                    {selectedStyles.map((id) => STYLES.find((s) => s.id === id)?.label).join(", ")}
                  </span>
                </div>
              )}
              {selectedFeatures.length > 0 && (
                <div>
                  <span className="text-xs font-semibold mr-2" style={{ color: "#2A2520" }}>Features:</span>
                  <span className="text-sm" style={{ color: "#6B5F54" }}>
                    {selectedFeatures.map((id) => FEATURES.find((f) => f.id === id)?.label).join(", ")}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-4">
            <button onClick={() => router.back()} className="btn-secondary flex-1">Back</button>
            <button onClick={handleSubmit} className="btn-primary flex-1">
              Generate my design
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
