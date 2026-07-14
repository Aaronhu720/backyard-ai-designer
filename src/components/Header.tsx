"use client";

import Link from "next/link";

export default function Header({ transparent = false }: { transparent?: boolean }) {
  return (
    <header
      className={`w-full py-4 px-6 md:px-12 flex items-center justify-between ${
        transparent ? "absolute top-0 left-0 right-0 z-50" : "bg-white border-b border-sand-200"
      }`}
    >
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-10 h-10 bg-forest-500 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 007.92 12.446A9 9 0 1112 2.992z" />
          </svg>
        </div>
        <div className="flex flex-col leading-none">
          <span className={`text-[10px] font-bold tracking-[0.15em] uppercase ${transparent ? "text-white/70" : "text-forest-400"}`}>
            Backyard
          </span>
          <span className={`text-lg font-bold tracking-tight ${transparent ? "text-white" : "text-bark"}`}>
            AI Designer
          </span>
        </div>
      </Link>
      <nav className="flex items-center gap-6">
        <Link
          href="/admin"
          className={`text-sm font-medium ${
            transparent ? "text-white/70 hover:text-white" : "text-sand-800 hover:text-bark"
          } transition-colors hidden md:block`}
        >
          Team login
        </Link>
        <Link
          href="/start"
          className="btn-primary text-sm px-6 py-2.5 gap-1.5"
        >
          Start My Backyard Design
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>
      </nav>
    </header>
  );
}
