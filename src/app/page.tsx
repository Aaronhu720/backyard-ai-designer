import Link from "next/link";
import Header from "@/components/Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FAF7F3" }}>
      <Header transparent />

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #FAF7F3 0%, #EEF4F0 50%, #E8E2D8 100%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-forest-50 rounded-full text-forest-400 text-xs font-bold tracking-widest uppercase mb-8">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                AI-Powered Outdoor Planning
              </div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-[68px] font-normal leading-[1.08] tracking-tight mb-6" style={{ color: "#1B3A2D" }}>
                Transform Your Backyard{" "}
                <em className="font-display" style={{ fontStyle: "italic", color: "#2D4A3E" }}>with AI</em>
                {" "}in Minutes
              </h1>
              <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "#6B5F54" }}>
                Turn a few backyard photos into tailored outdoor-living concepts,
                feature ideas, and a practical cost range — before the first contractor
                conversation.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
                <Link href="/start" className="btn-primary text-base px-8 py-4 gap-2">
                  Start My Backyard Design
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
                <a href="#how-it-works" className="inline-flex items-center gap-1.5 text-sm font-semibold py-4 transition-colors" style={{ color: "#4A4340" }}>
                  See how it works
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </a>
              </div>
              <div className="flex items-center gap-6 text-sm" style={{ color: "#9A8E82" }}>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-forest-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  No design experience needed
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-forest-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Rough cost guidance included
                </span>
              </div>
            </div>

            {/* Right: hero image with floating cards */}
            <div className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-bark/10 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                  alt="Contemporary backyard with patio, pergola and warm landscape lighting"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card: Concept ready */}
              <div className="absolute -left-6 top-8 bg-white rounded-2xl shadow-xl shadow-bark/8 px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-forest-50 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-forest-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-sand-700">Concept ready</div>
                  <div className="text-sm font-bold text-bark">Modern retreat</div>
                </div>
              </div>
              {/* Floating card: Plan includes */}
              <div className="absolute -right-4 bottom-6 bg-forest-500 text-white rounded-2xl shadow-xl px-5 py-4">
                <div className="text-[10px] font-bold tracking-[0.15em] uppercase opacity-70 mb-1">Your plan includes</div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold font-display">3 concepts</span>
                  <span className="text-sm opacity-70">+ budget range</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6" style={{ background: "#2D4A3E" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-bold tracking-[0.15em] uppercase mb-4" style={{ color: "#7A9E82" }}>
              A clearer way to start
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-normal text-white leading-tight max-w-lg">
              From backyard photos to a confident first plan.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                  </svg>
                ),
                title: "Show us your space",
                desc: "Upload 3–10 useful angles from your phone.",
              },
              {
                num: "02",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                ),
                title: "Choose the feeling",
                desc: "Select the styles, features, and budget that fit.",
              },
              {
                num: "03",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
                title: "Review your concepts",
                desc: "Get visual directions, priorities, and cost guidance.",
              },
            ].map((step) => (
              <div key={step.num} className="relative">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                    {step.icon}
                  </div>
                  <span className="font-display text-3xl" style={{ color: "rgba(255,255,255,0.15)" }}>{step.num}</span>
                </div>
                <h3 className="font-display text-xl text-white mb-2 font-normal">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section id="what-you-get" className="py-24 px-6" style={{ background: "#FAF7F3" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="eyebrow mb-4">Designed for decisions</p>
            <h2 className="font-display text-3xl md:text-4xl font-normal leading-tight max-w-xl" style={{ color: "#1B3A2D" }}>
              Not just a pretty picture. A useful project starting point.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-5 h-5 text-forest-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                ),
                title: "Personalized visual concepts",
                desc: "Multiple directions grounded in your actual space, selected style, and must-have features.",
              },
              {
                icon: (
                  <svg className="w-5 h-5 text-forest-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                ),
                title: "Itemized rough estimate",
                desc: "Feature-level ranges with area assumptions and 20%–40% labor guidance.",
              },
              {
                icon: (
                  <svg className="w-5 h-5 text-forest-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
                title: "Consultation-ready proposal",
                desc: "A clean PDF to align your household and start a productive contractor conversation.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-7">
                <div className="w-10 h-10 bg-forest-50 rounded-xl flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg text-bark mb-2 font-normal">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9A8E82" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6" style={{ background: "#EEF4F0" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow mb-4">Ready to imagine your space?</p>
          <h2 className="font-display text-3xl md:text-[42px] font-normal leading-tight mb-8" style={{ color: "#1B3A2D" }}>
            Your backyard deserves more than another saved inspiration board.
          </h2>
          <Link href="/start" className="btn-primary text-base px-10 py-4 gap-2">
            Start My Backyard Design
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12" style={{ background: "#1B3A2D" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
              <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 007.92 12.446A9 9 0 1112 2.992z" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/40">Backyard</span>
              <span className="text-sm font-bold text-white/90">AI Designer</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-md mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
            Conceptual backyard design, rough cost guidance, and a clearer first conversation with your outdoor living professional.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              &copy; 2026 Backyard AI Designer
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              Concepts are illustrative. Final plans require site verification.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
