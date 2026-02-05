"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { content } from "@/data/content";

/* ─── Scroll-triggered visibility hook ─── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Brutalist icon set — sharp, geometric, no curves ─── */
const icons: Record<string, React.ReactNode> = {
  chat: (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <rect x="4" y="6" width="32" height="22" stroke="#39FF14" strokeWidth="3" />
      <path d="M12 28v8l8-8" stroke="#39FF14" strokeWidth="3" />
      <line x1="12" y1="14" x2="20" y2="14" stroke="#39FF14" strokeWidth="2" />
      <line x1="12" y1="19" x2="28" y2="19" stroke="#39FF14" strokeWidth="2" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <path d="M8 4h16l8 8v24H8V4z" stroke="#39FF14" strokeWidth="3" />
      <path d="M24 4v8h8" stroke="#39FF14" strokeWidth="3" />
      <line x1="14" y1="20" x2="26" y2="20" stroke="#39FF14" strokeWidth="2" />
      <line x1="14" y1="26" x2="22" y2="26" stroke="#39FF14" strokeWidth="2" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <rect x="4" y="4" width="32" height="32" stroke="#39FF14" strokeWidth="3" />
      <path d="M12 20l6 6 10-12" stroke="#39FF14" strokeWidth="3" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <path d="M20 28V8" stroke="#39FF14" strokeWidth="3" />
      <path d="M12 16l8-8 8 8" stroke="#39FF14" strokeWidth="3" />
      <path d="M6 30h28v6H6v-6z" stroke="#39FF14" strokeWidth="3" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <rect x="12" y="2" width="16" height="36" stroke="#39FF14" strokeWidth="3" />
      <line x1="12" y1="8" x2="28" y2="8" stroke="#39FF14" strokeWidth="2" />
      <line x1="12" y1="30" x2="28" y2="30" stroke="#39FF14" strokeWidth="2" />
      <rect x="18" y="33" width="4" height="2" fill="#39FF14" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
      <rect x="4" y="4" width="32" height="32" stroke="#39FF14" strokeWidth="3" />
      <rect x="14" y="14" width="12" height="12" stroke="#39FF14" strokeWidth="2" />
      <line x1="20" y1="4" x2="20" y2="14" stroke="#39FF14" strokeWidth="2" />
      <line x1="20" y1="26" x2="20" y2="36" stroke="#39FF14" strokeWidth="2" />
      <line x1="4" y1="20" x2="14" y2="20" stroke="#39FF14" strokeWidth="2" />
      <line x1="26" y1="20" x2="36" y2="20" stroke="#39FF14" strokeWidth="2" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════════════════
   VARIATION 2 — BOLD BRUTALIST
   ═══════════════════════════════════════════════════════════════════ */

export default function BoldBrutalist() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <main className="bg-black text-white font-spaceMono selection:bg-brutal-neon selection:text-black overflow-x-hidden" style={{ borderRadius: 0 }}>

      {/* ── Top Bar ── */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black border-b-4 border-brutal-neon">
        <div className="flex items-center justify-between px-4 md:px-8 py-3">
          <Link href="/" className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-brutal-neon hover:text-white transition-colors">
            [&larr; BACK]
          </Link>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40">
            CONCEPT_02 // BRUTALIST
          </span>
        </div>
      </div>

      <div className="pt-[52px]">
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TrustSection />
        <PricingSection />
        <FAQSection openFAQ={openFAQ} setOpenFAQ={setOpenFAQ} />
        <FinalCTASection />
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HERO — Hard 50/50 split
   ───────────────────────────────────────────────────────────────── */
function HeroSection() {
  const anim = useInView(0.05);
  return (
    <section ref={anim.ref} className="min-h-screen grid md:grid-cols-2">
      {/* Left — Black panel */}
      <div className={`bg-black text-white p-8 md:p-16 flex flex-col justify-end border-b-4 md:border-b-0 md:border-r-4 border-white transition-all duration-500 ${anim.visible ? "opacity-100" : "opacity-0"}`}>
        <p className="text-[10px] tracking-[0.4em] uppercase text-brutal-neon mb-8">
          AI AUTOMATION SYSTEM
        </p>
        <p className="text-sm md:text-base leading-relaxed text-white/70 max-w-md mb-12">
          {content.hero.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#pricing"
            className="inline-block bg-brutal-neon text-black font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 border-4 border-brutal-neon hover:bg-black hover:text-brutal-neon transition-all duration-150"
          >
            {content.hero.cta}
          </a>
          <a
            href="#features"
            className="inline-block bg-transparent text-white font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 border-4 border-white hover:bg-white hover:text-black transition-all duration-150"
          >
            SEE THE SYSTEM →
          </a>
        </div>
      </div>

      {/* Right — White panel with oversized headline */}
      <div className={`bg-white text-black p-8 md:p-16 flex items-center transition-all duration-500 delay-200 ${anim.visible ? "opacity-100" : "opacity-0"}`}>
        <div>
          <h1 className="text-[clamp(3rem,10vw,8rem)] leading-[0.85] uppercase font-bold tracking-tighter">
            AUTO
            <br />
            MATE
            <br />
            <span className="text-brutal-neon" style={{ WebkitTextStroke: "3px #000" }}>
              SPAIN
            </span>
          </h1>
          <div className="mt-8 w-full h-1 bg-black" />
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-black/50">
            Real Estate × Artificial Intelligence
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PROBLEM — Numbered list, thick rules
   ───────────────────────────────────────────────────────────────── */
function ProblemSection() {
  const anim = useInView();
  return (
    <section className="bg-black border-t-4 border-white">
      <div ref={anim.ref} className={`transition-all duration-700 ${anim.visible ? "opacity-100" : "opacity-0"}`}>
        {/* Section header */}
        <div className="border-b-4 border-white p-8 md:p-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-brutal-neon">THE PROBLEM</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl uppercase font-bold tracking-tighter mt-4 leading-[0.9]">
            {content.problem.heading}
          </h2>
        </div>

        {/* Problem items */}
        {content.problem.points.map((point, i) => (
          <div key={i} className="border-b-4 border-white grid md:grid-cols-[120px_1fr] group hover:bg-white hover:text-black transition-all duration-150">
            {/* Number */}
            <div className="p-8 md:border-r-4 border-white flex items-start">
              <span className="text-5xl md:text-7xl font-bold text-brutal-neon group-hover:text-black transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            {/* Content */}
            <div className="px-8 pb-8 md:p-8">
              <h3 className="text-lg md:text-xl uppercase font-bold tracking-tight mb-3">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-60 font-sans max-w-xl">
                {point.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FEATURES — 3×2 checkerboard grid
   ───────────────────────────────────────────────────────────────── */
function FeaturesSection() {
  const anim = useInView();
  return (
    <section id="features" className="border-t-4 border-white">
      {/* Header bar */}
      <div className="bg-brutal-neon text-black p-8 md:px-16 md:py-10 border-b-4 border-black">
        <span className="text-[10px] tracking-[0.4em] uppercase">THE SYSTEM</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl uppercase font-bold tracking-tighter mt-2 leading-[0.9]">
          FOUR MODULES.<br />ZERO EFFORT.
        </h2>
      </div>

      {/* 2×2 Grid */}
      <div ref={anim.ref} className={`grid md:grid-cols-2 transition-all duration-700 ${anim.visible ? "opacity-100" : "opacity-0"}`}>
        {content.features.map((feature, i) => {
          // Checkerboard: 2×2 grid
          const row = Math.floor(i / 2);
          const col = i % 2;
          const isBlack = (row + col) % 2 === 0;

          return (
            <div
              key={i}
              className={`p-8 md:p-10 border-b-4 border-r-0 md:border-r-4 border-black flex flex-col justify-between min-h-[280px] md:min-h-[320px] group transition-all duration-150 ${
                isBlack
                  ? "bg-black text-white border-white hover:bg-brutal-neon hover:text-black"
                  : "bg-white text-black border-black hover:bg-brutal-neon"
              } ${isBlack ? "[&]:border-white" : ""}`}
              style={{ borderColor: isBlack ? "#fff" : "#000" }}
            >
              {/* Icon */}
              <div className={`mb-6 ${isBlack ? "text-brutal-neon group-hover:text-black" : "text-black"} transition-colors`}>
                {icons[feature.icon] || icons.settings}
              </div>

              <div>
                <h3 className="text-base md:text-lg uppercase font-bold tracking-tight mb-3">
                  {feature.title}
                </h3>
                <p className={`text-xs md:text-sm leading-relaxed font-sans ${isBlack ? "text-white/60 group-hover:text-black/60" : "text-black/60"} transition-colors`}>
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HOW IT WORKS — Horizontal step blocks
   ───────────────────────────────────────────────────────────────── */
function HowItWorksSection() {
  const anim = useInView();
  return (
    <section className="bg-black border-t-4 border-white">
      {/* Header */}
      <div className="border-b-4 border-white p-8 md:p-16">
        <span className="text-[10px] tracking-[0.4em] uppercase text-brutal-neon">PROCESS</span>
        <h2 className="text-3xl md:text-5xl uppercase font-bold tracking-tighter mt-4 leading-[0.9]">
          {content.howItWorks.heading}
        </h2>
      </div>

      {/* Steps — horizontal on desktop, stacked on mobile */}
      <div ref={anim.ref} className={`grid md:grid-cols-4 transition-all duration-700 ${anim.visible ? "opacity-100" : "opacity-0"}`}>
        {content.howItWorks.steps.map((step, i) => (
          <div
            key={i}
            className="border-b-4 md:border-b-0 md:border-r-4 border-white last:border-r-0 p-8 md:p-10 flex flex-col justify-between min-h-[240px] group hover:bg-white hover:text-black transition-all duration-150"
          >
            {/* Step number */}
            <span className="text-6xl md:text-7xl font-bold text-brutal-neon group-hover:text-black transition-colors leading-none">
              {step.number}
            </span>

            <div className="mt-8">
              <h3 className="text-sm md:text-base uppercase font-bold tracking-tight mb-3">
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed opacity-50 font-sans">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TRUST SIGNALS — Double-bordered badges
   ───────────────────────────────────────────────────────────────── */
function TrustSection() {
  const anim = useInView();
  return (
    <section className="bg-white text-black border-t-4 border-black py-16 md:py-24 px-8 md:px-16">
      <div ref={anim.ref} className={`transition-all duration-700 ${anim.visible ? "opacity-100" : "opacity-0"}`}>
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-black/40">TRUST</span>
          <h2 className="text-3xl md:text-5xl uppercase font-bold tracking-tighter mt-4 leading-[0.9]">
            {content.trustSignals.heading}
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {content.trustSignals.badges.map((badge, i) => {
            const isAlt = i % 2 !== 0;
            return (
              <div
                key={i}
                className={`p-6 md:p-8 group cursor-default transition-all duration-150 hover:bg-brutal-neon ${
                  isAlt
                    ? "bg-black text-white border-4 border-black outline outline-4 outline-black outline-offset-4 hover:text-black hover:border-brutal-neon hover:outline-brutal-neon"
                    : "bg-white text-black border-4 border-black outline outline-4 outline-black outline-offset-4 hover:border-brutal-neon hover:outline-brutal-neon"
                }`}
              >
                <h3 className="text-sm uppercase font-bold tracking-tight mb-3">
                  {badge.title}
                </h3>
                <p className={`text-xs leading-relaxed font-sans ${isAlt ? "text-white/50 group-hover:text-black/50" : "text-black/50"} transition-colors`}>
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PRICING — Double-border box, oversized price
   ───────────────────────────────────────────────────────────────── */
function PricingSection() {
  const anim = useInView();
  return (
    <section id="pricing" className="bg-black border-t-4 border-white py-20 md:py-32 px-8 md:px-16">
      <div ref={anim.ref} className={`max-w-2xl mx-auto transition-all duration-700 ${anim.visible ? "opacity-100" : "opacity-0"}`}>
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.4em] uppercase text-brutal-neon">INVESTMENT</span>
          <h2 className="text-3xl md:text-5xl uppercase font-bold tracking-tighter mt-4 leading-[0.9]">
            {content.pricing.heading}
          </h2>
        </div>

        {/* Pricing card — double border */}
        <div className="border-4 border-white outline outline-4 outline-white outline-offset-8 p-8 md:p-14">
          {/* Heading */}
          <div className="text-center mb-10">
            <span className="text-brutal-neon text-4xl md:text-6xl font-bold leading-none tracking-tighter uppercase">
              LET&apos;S TALK
            </span>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mt-4">
              {content.pricing.subtext}
            </p>
          </div>

          {/* Divider */}
          <div className="h-1 bg-white mb-10" />

          {/* Inclusions */}
          <ul className="space-y-4 mb-12">
            {content.pricing.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-brutal-neon font-bold text-lg leading-none mt-0.5">+</span>
                <span className="text-sm font-sans text-white/70">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#"
            className="block w-full text-center bg-brutal-neon text-black font-bold text-sm uppercase tracking-[0.2em] py-5 border-4 border-brutal-neon hover:bg-black hover:text-brutal-neon transition-all duration-150"
          >
            {content.pricing.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FAQ — Hard toggle, thick separators
   ───────────────────────────────────────────────────────────────── */
function FAQSection({ openFAQ, setOpenFAQ }: { openFAQ: number | null; setOpenFAQ: (v: number | null) => void }) {
  const anim = useInView();
  return (
    <section className="bg-white text-black border-t-4 border-black">
      {/* Header bar */}
      <div className="border-b-4 border-black p-8 md:p-16">
        <span className="text-[10px] tracking-[0.4em] uppercase text-black/40">INFO</span>
        <h2 className="text-3xl md:text-5xl uppercase font-bold tracking-tighter mt-4 leading-[0.9]">
          {content.faq.heading}
        </h2>
      </div>

      <div ref={anim.ref} className={`transition-all duration-700 ${anim.visible ? "opacity-100" : "opacity-0"}`}>
        {content.faq.items.map((item, i) => {
          const isOpen = openFAQ === i;
          return (
            <div key={i} className="border-b-4 border-black">
              <button
                onClick={() => setOpenFAQ(isOpen ? null : i)}
                className={`w-full flex items-center justify-between gap-4 p-8 md:px-16 md:py-8 text-left group transition-all duration-150 ${isOpen ? "bg-brutal-neon text-black" : "hover:bg-black hover:text-white"}`}
              >
                <span className="text-sm md:text-base uppercase font-bold tracking-tight">
                  {item.question}
                </span>
                <span className={`text-2xl font-bold flex-shrink-0 transition-none ${isOpen ? "text-black" : "text-brutal-neon group-hover:text-brutal-neon"}`}>
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {/* Answer — hard show/hide, no animation */}
              {isOpen && (
                <div className="bg-black text-white px-8 md:px-16 py-8 border-t-4 border-brutal-neon">
                  <p className="text-sm leading-relaxed font-sans text-white/70 max-w-2xl">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FINAL CTA — Full neon background
   ───────────────────────────────────────────────────────────────── */
function FinalCTASection() {
  const anim = useInView();
  return (
    <section className="bg-brutal-neon text-black border-t-4 border-black py-20 md:py-32 px-8 md:px-16">
      <div ref={anim.ref} className={`max-w-4xl mx-auto text-center transition-all duration-700 ${anim.visible ? "opacity-100" : "opacity-0"}`}>
        <h2 className="text-4xl md:text-6xl lg:text-[80px] uppercase font-bold tracking-tighter leading-[0.85] mb-6">
          {content.finalCTA.heading}
        </h2>
        <p className="text-sm md:text-base font-sans text-black/60 max-w-xl mx-auto mb-12 leading-relaxed">
          {content.finalCTA.subheadline}
        </p>

        <a
          href="#"
          className="inline-block bg-black text-brutal-neon font-bold text-sm md:text-base uppercase tracking-[0.2em] px-12 py-5 border-4 border-black hover:bg-white hover:text-black hover:border-black transition-all duration-150"
        >
          {content.finalCTA.cta}
        </a>

        {/* Bottom marker */}
        <div className="mt-20 flex items-center justify-center gap-4">
          <div className="w-8 h-1 bg-black/30" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-black/30">
            BUILT_DIFFERENT // 2026
          </span>
          <div className="w-8 h-1 bg-black/30" />
        </div>
      </div>
    </section>
  );
}
