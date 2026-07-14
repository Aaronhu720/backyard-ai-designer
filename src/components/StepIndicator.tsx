"use client";

const steps = [
  { num: 1, label: "Your Info" },
  { num: 2, label: "Photos" },
  { num: 3, label: "Design" },
  { num: 4, label: "Results" },
];

const timeEstimates = ["About 3 min left", "About 2 min left", "About 1 min left", ""];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="py-8 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Step label + time */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="eyebrow">Step {current} of {steps.length}</span>
            <span className="text-sand-300 select-none">—</span>
            <span className="text-sm text-sand-700">{timeEstimates[current - 1]}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-sand-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${(current / steps.length) * 100}%`,
              background: "linear-gradient(90deg, #2D4A3E, #5B7F63)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
