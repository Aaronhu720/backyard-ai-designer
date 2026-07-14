"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  { label: "Analyzing your backyard photos", duration: 2000 },
  { label: "Understanding your design preferences", duration: 2000 },
  { label: "Generating design concepts", duration: 3000 },
  { label: "Calculating budget estimates", duration: 2000 },
  { label: "Preparing your results", duration: 1500 },
];

export default function GeneratingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = steps.reduce((sum, s) => sum + s.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 100;
      const pct = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(pct);

      let acc = 0;
      for (let i = 0; i < steps.length; i++) {
        acc += steps[i].duration;
        if (elapsed < acc) { setCurrentStep(i); break; }
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        const projectData = sessionStorage.getItem("fullProject");
        const photosData = sessionStorage.getItem("projectPhotos");
        if (projectData) {
          const payload = JSON.parse(projectData);
          if (photosData) {
            payload.uploadedPhotos = JSON.parse(photosData);
          }
          fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
            .then((res) => res.json())
            .then((data) => router.push(`/result/${data.id}`))
            .catch(() => router.push("/result/demo"));
        } else {
          router.push("/result/demo");
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF7F3" }}>
      <div className="max-w-md mx-auto px-6 text-center">
        {/* Animated leaf icon */}
        <div className="relative w-28 h-28 mx-auto mb-10">
          <div className="absolute inset-0 rounded-full animate-ping opacity-10" style={{ background: "#2D4A3E" }} />
          <div className="absolute inset-3 rounded-full animate-pulse" style={{ background: "#EEF4F0" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 animate-spin" style={{ color: "#2D4A3E", animationDuration: "3s" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM19.5 10.5c0 .75-.75 1.5-1.5 1.5M19.5 10.5c0-.75-.75-1.5-1.5-1.5M19.5 10.5H21m-6 0c0 .75.75 1.5 1.5 1.5M15 10.5c0-.75.75-1.5 1.5-1.5m0 3V15m0-6V7.5" />
            </svg>
          </div>
        </div>

        <h1 className="font-display text-2xl font-normal mb-2" style={{ color: "#1B3A2D" }}>
          Creating your design
        </h1>
        <p className="text-sm mb-8" style={{ color: "#9A8E82" }}>
          Our AI is working on your personalized backyard concepts.
          <br />This usually takes 1–3 minutes.
        </p>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full mb-8 overflow-hidden" style={{ background: "#EDE7DE" }}>
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg, #2D4A3E, #5B7F63)" }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                i < currentStep ? "opacity-100" : i === currentStep ? "opacity-100 font-medium" : "opacity-30"
              }`}
              style={{ color: i < currentStep ? "#5B7F63" : i === currentStep ? "#2A2520" : "#9A8E82" }}
            >
              {i < currentStep ? (
                <svg className="w-5 h-5 shrink-0" style={{ color: "#5B7F63" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : i === currentStep ? (
                <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: "#2D4A3E" }} />
                </div>
              ) : (
                <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#D9D0C7" }} />
                </div>
              )}
              {step.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
