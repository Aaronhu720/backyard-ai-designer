"use client";

import { useState, useEffect } from "react";

const SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
    alt: "Modern backyard with patio and warm landscape lighting",
    label: "Modern retreat",
  },
  {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
    alt: "Luxury outdoor living space with pool and lounge area",
    label: "Resort living",
  },
  {
    url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop",
    alt: "Contemporary home with landscaped garden and lighting",
    label: "Garden oasis",
  },
  {
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop",
    alt: "Elegant patio with pergola and outdoor dining",
    label: "Family gathering",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-bark/15" style={{ aspectRatio: "16/10" }}>
      {SLIDES.map((slide, i) => (
        <img
          key={i}
          src={slide.url}
          alt={slide.alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* Floating card: Concept ready */}
      <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl px-5 py-3.5 flex items-center gap-3">
        <div className="w-10 h-10 bg-forest-50 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-forest-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div className="text-xs" style={{ color: "#9A8E82" }}>Concept ready</div>
          <div className="text-sm font-bold transition-all duration-700" style={{ color: "#2A2520" }}>
            {SLIDES[current].label}
          </div>
        </div>
      </div>

      {/* Floating card: Plan includes */}
      <div className="absolute right-5 bottom-5 bg-forest-600/95 backdrop-blur-md text-white rounded-2xl shadow-xl px-5 py-4">
        <div className="text-[10px] font-bold tracking-[0.15em] uppercase opacity-70 mb-1">Your plan includes</div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold font-display">3 concepts</span>
          <span className="text-sm opacity-70">+ budget range</span>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-5 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === current ? "white" : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
