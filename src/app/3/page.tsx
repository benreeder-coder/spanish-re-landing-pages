"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { content } from "@/data/content";

/* ─── Scroll-triggered visibility ─── */
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

/* ─── Dimension line component (architectural annotation) ─── */
function DimensionLine({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-px h-2 bg-blueprint-deep/30" />
      <div className="flex-1 h-px bg-blueprint-deep/20 border-t border-dashed border-blueprint-deep/30" />
      <span className="text-[9px] font-robotoMono text-blueprint-deep/40 uppercase tracking-wider whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-blueprint-deep/20 border-t border-dashed border-blueprint-deep/30" />
      <div className="w-px h-2 bg-blueprint-deep/30" />
    </div>
  );
}

/* ─── Corner coordinate marker ─── */
function CornerRef({ label, position }: { label: string; position: "tl" | "tr" | "bl" | "br" }) {
  const pos = {
    tl: "top-3 left-3",
    tr: "top-3 right-3",
    bl: "bottom-3 left-3",
    br: "bottom-3 right-3",
  }[position];
  return (
    <span className={`absolute ${pos} text-[8px] font-robotoMono text-blueprint-cyan/50 tracking-wider`}>
      {label}
    </span>
  );
}

/* ─── Technical icons for features ─── */
const techIcons: Record<string, React.ReactNode> = {
  chat: (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className="w-7 h-7">
      <rect x="3" y="4" width="22" height="15" rx="0" strokeDasharray="3 2" />
      <path d="M8 19v5l5-5" strokeDasharray="3 2" />
      <line x1="8" y1="9" x2="14" y2="9" />
      <line x1="8" y1="13" x2="20" y2="13" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className="w-7 h-7">
      <path d="M6 2h11l5 5v19H6V2z" strokeDasharray="3 2" />
      <path d="M17 2v5h5" />
      <line x1="10" y1="12" x2="18" y2="12" />
      <line x1="10" y1="16" x2="16" y2="16" />
      <line x1="10" y1="20" x2="14" y2="20" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className="w-7 h-7">
      <rect x="3" y="3" width="22" height="22" strokeDasharray="3 2" />
      <path d="M8 14l4 4 8-9" strokeWidth="1.5" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className="w-7 h-7">
      <path d="M14 20V6M14 6l-5 5M14 6l5 5" strokeWidth="1.5" />
      <path d="M4 22h20" strokeDasharray="3 2" />
      <line x1="4" y1="22" x2="4" y2="26" />
      <line x1="24" y1="22" x2="24" y2="26" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className="w-7 h-7">
      <rect x="8" y="2" width="12" height="24" strokeDasharray="3 2" />
      <line x1="8" y1="6" x2="20" y2="6" />
      <line x1="8" y1="22" x2="20" y2="22" />
      <circle cx="14" cy="24.5" r="1" fill="currentColor" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className="w-7 h-7">
      <circle cx="14" cy="14" r="4" strokeDasharray="3 2" />
      <circle cx="14" cy="14" r="10" strokeDasharray="2 3" />
      <line x1="14" y1="0" x2="14" y2="4" />
      <line x1="14" y1="24" x2="14" y2="28" />
      <line x1="0" y1="14" x2="4" y2="14" />
      <line x1="24" y1="14" x2="28" y2="14" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════════════════
   VARIATION 3 — BLUEPRINT TECHNICAL
   ═══════════════════════════════════════════════════════════════════ */

export default function BlueprintTechnical() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <main className="bg-blueprint-light text-blueprint-deep font-inter selection:bg-blueprint-cyan/30 selection:text-blueprint-deep overflow-x-hidden">

      {/* ── Top bar ── */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-blueprint-light/90 backdrop-blur-sm border-b border-dashed border-blueprint-deep/20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
          <Link href="/" className="text-[10px] font-robotoMono tracking-[0.2em] uppercase text-blueprint-deep/50 hover:text-blueprint-cyan transition-colors">
            &larr; BACK_TO_INDEX
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[10px] font-robotoMono tracking-[0.2em] uppercase text-blueprint-deep/30">
              DWG_NO: 003
            </span>
            <span className="text-[10px] font-robotoMono tracking-[0.2em] uppercase text-blueprint-deep/30">
              REV: A
            </span>
          </div>
        </div>
      </nav>

      <div className="pt-[44px]">
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
   HERO — Blueprint grid with schematic frame
   ───────────────────────────────────────────────────────────────── */
function HeroSection() {
  const anim = useInView(0.05);
  return (
    <section className="relative blueprint-grid min-h-screen flex items-center py-20">
      {/* Schematic border frame */}
      <div className="absolute inset-6 md:inset-10 border border-dashed border-blueprint-deep/15 pointer-events-none">
        <CornerRef label="A1" position="tl" />
        <CornerRef label="A2" position="tr" />
        <CornerRef label="B1" position="bl" />
        <CornerRef label="B2" position="br" />
      </div>

      <div ref={anim.ref} className={`relative z-10 max-w-6xl mx-auto px-8 md:px-16 w-full transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {/* Technical label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 border border-blueprint-cyan bg-blueprint-cyan/20" />
          <span className="text-[10px] font-robotoMono tracking-[0.3em] uppercase text-blueprint-cyan">
            SYSTEM SCHEMATIC // AI AUTOMATION
          </span>
        </div>

        {/* Headline with dimension markers */}
        <div className="relative mb-4">
          <h1 className="font-robotoMono text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-blueprint-deep font-bold">
            {content.hero.headline}
          </h1>
        </div>

        <DimensionLine label="SCOPE" className="max-w-md mb-8" />

        {/* Subheadline in dashed box */}
        <div className="border border-dashed border-blueprint-deep/20 p-6 max-w-xl mb-10 bg-white/40">
          <span className="text-[9px] font-robotoMono text-blueprint-deep/30 uppercase tracking-wider block mb-2">
            ABSTRACT:
          </span>
          <p className="text-sm md:text-base leading-relaxed text-blueprint-deep/70">
            {content.hero.subheadline}
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <a
            href="#pricing"
            className="inline-flex items-center gap-3 bg-blueprint-cyan text-white font-robotoMono text-xs tracking-wider uppercase px-8 py-4 hover:bg-blueprint-deep transition-colors duration-300"
          >
            <span>{content.hero.cta}</span>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 font-robotoMono text-xs tracking-wider uppercase text-blueprint-deep/50 hover:text-blueprint-cyan px-4 py-4 border border-dashed border-blueprint-deep/20 hover:border-blueprint-cyan/40 transition-colors"
          >
            VIEW_SPECIFICATIONS →
          </a>
        </div>

        {/* Drawing title block — bottom right */}
        <div className="mt-16 md:mt-24 flex justify-end">
          <div className="border border-blueprint-deep/15 text-right">
            <div className="border-b border-blueprint-deep/15 px-4 py-2">
              <span className="text-[8px] font-robotoMono text-blueprint-deep/30 uppercase tracking-wider">
                PROJECT: RE_AUTOMATION_ES
              </span>
            </div>
            <div className="px-4 py-2 flex gap-6">
              <span className="text-[8px] font-robotoMono text-blueprint-deep/30 uppercase tracking-wider">
                SCALE: 1:1
              </span>
              <span className="text-[8px] font-robotoMono text-blueprint-deep/30 uppercase tracking-wider">
                DATE: 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PROBLEM — Technical data sheet style
   ───────────────────────────────────────────────────────────────── */
function ProblemSection() {
  const anim = useInView();
  return (
    <section className="relative py-20 md:py-32 bg-white border-t border-dashed border-blueprint-deep/15">
      <div ref={anim.ref} className={`max-w-6xl mx-auto px-8 md:px-16 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 border border-blueprint-deep/40 bg-blueprint-deep/10" />
          <span className="text-[10px] font-robotoMono tracking-[0.3em] uppercase text-blueprint-deep/40">
            SECTION 02 // PROBLEM ANALYSIS
          </span>
        </div>
        <h2 className="font-robotoMono text-2xl md:text-3xl font-bold text-blueprint-deep mb-4 leading-tight">
          {content.problem.heading}
        </h2>
        <DimensionLine label="DEFICIENCIES" className="max-w-sm mb-12" />

        {/* Problem cards — data sheet rows */}
        <div className="grid md:grid-cols-2 gap-4">
          {content.problem.points.map((point, i) => (
            <div key={i} className="border border-dashed border-blueprint-deep/15 p-6 bg-blueprint-light/50 hover:border-blueprint-cyan/40 transition-colors group">
              <div className="flex items-start gap-4">
                <span className="font-robotoMono text-2xl text-blueprint-cyan/50 group-hover:text-blueprint-cyan transition-colors leading-none font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="text-[9px] font-robotoMono text-blueprint-deep/30 uppercase tracking-wider">
                    ITEM_{String(i + 1).padStart(2, "0")}:
                  </span>
                  <h3 className="font-robotoMono text-sm font-bold text-blueprint-deep mt-1 mb-2">
                    {point.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-blueprint-deep/50">
                    {point.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FEATURES — System architecture diagram
   ───────────────────────────────────────────────────────────────── */
function FeaturesSection() {
  const anim = useInView();
  return (
    <section id="features" className="relative blueprint-grid py-20 md:py-32 border-t border-dashed border-blueprint-deep/15">
      {/* Schematic frame */}
      <div className="absolute inset-4 md:inset-8 border border-dashed border-blueprint-deep/8 pointer-events-none" />

      <div ref={anim.ref} className={`relative max-w-6xl mx-auto px-8 md:px-16 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 border border-blueprint-cyan bg-blueprint-cyan/20" />
          <span className="text-[10px] font-robotoMono tracking-[0.3em] uppercase text-blueprint-cyan">
            SECTION 03 // SYSTEM MODULES
          </span>
        </div>
        <h2 className="font-robotoMono text-2xl md:text-3xl font-bold text-blueprint-deep mb-2 leading-tight">
          Four Integrated Automation Modules
        </h2>
        <DimensionLine label="ARCHITECTURE" className="max-w-xs mb-14" />

        {/* Feature grid — 2×2 with connecting lines */}
        <div className="grid md:grid-cols-2 gap-6">
          {content.features.map((feature, i) => (
            <div key={i} className="relative group">
              {/* Connecting dotted line to next (horizontal) */}
              {i % 2 === 0 && i < content.features.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 border-t border-dotted border-blueprint-deep/20 z-0" />
              )}
              {/* Connecting dotted line down (vertical, for first row) */}
              {i < 2 && (
                <div className="hidden md:block absolute -bottom-3 left-1/2 h-6 border-l border-dotted border-blueprint-deep/20 z-0" />
              )}

              <div className="relative z-10 border border-dashed border-blueprint-deep/15 bg-white/70 p-6 hover:border-blueprint-cyan/50 hover:bg-white transition-all">
                {/* Module number */}
                <span className="absolute top-2 right-3 text-[8px] font-robotoMono text-blueprint-deep/20 tracking-wider">
                  MOD_{String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon in circle */}
                <div className="w-14 h-14 border border-dashed border-blueprint-deep/20 flex items-center justify-center mb-5 text-blueprint-cyan group-hover:border-blueprint-cyan/40 transition-colors">
                  {techIcons[feature.icon] || techIcons.settings}
                </div>

                <h3 className="font-robotoMono text-sm font-bold text-blueprint-deep mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-blueprint-deep/50">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HOW IT WORKS — Flowchart process
   ───────────────────────────────────────────────────────────────── */
function HowItWorksSection() {
  const anim = useInView();
  return (
    <section className="relative py-20 md:py-32 bg-white border-t border-dashed border-blueprint-deep/15">
      <div ref={anim.ref} className={`max-w-6xl mx-auto px-8 md:px-16 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 border border-blueprint-deep/40 bg-blueprint-deep/10" />
          <span className="text-[10px] font-robotoMono tracking-[0.3em] uppercase text-blueprint-deep/40">
            SECTION 04 // PROCESS FLOW
          </span>
        </div>
        <h2 className="font-robotoMono text-2xl md:text-3xl font-bold text-blueprint-deep mb-2 leading-tight">
          {content.howItWorks.heading}
        </h2>
        <DimensionLine label="WORKFLOW" className="max-w-xs mb-14" />

        {/* Flowchart — horizontal on desktop */}
        <div className="grid md:grid-cols-4 gap-4">
          {content.howItWorks.steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Arrow connector */}
              {i < 3 && (
                <div className="hidden md:flex absolute top-10 -right-2 w-4 items-center z-20">
                  <div className="flex-1 border-t border-blueprint-deep/25" />
                  <svg className="w-2 h-2 text-blueprint-deep/25 -ml-px" viewBox="0 0 8 8" fill="currentColor">
                    <path d="M0 0l8 4-8 4z" />
                  </svg>
                </div>
              )}

              <div className="border border-blueprint-deep/15 bg-blueprint-light/40 p-6 hover:border-blueprint-cyan/40 transition-colors group h-full">
                {/* Step number circle */}
                <div className="w-10 h-10 border-2 border-blueprint-deep/20 flex items-center justify-center mb-5 group-hover:border-blueprint-cyan group-hover:text-blueprint-cyan transition-colors">
                  <span className="font-robotoMono text-sm font-bold">{step.number}</span>
                </div>

                <span className="text-[9px] font-robotoMono text-blueprint-deep/30 uppercase tracking-wider">
                  PHASE_{step.number}:
                </span>
                <h3 className="font-robotoMono text-sm font-bold text-blueprint-deep mt-1 mb-3">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-blueprint-deep/50">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TRUST SIGNALS — Certification stamps
   ───────────────────────────────────────────────────────────────── */
function TrustSection() {
  const anim = useInView();
  return (
    <section className="relative blueprint-grid py-20 md:py-28 border-t border-dashed border-blueprint-deep/15">
      <div ref={anim.ref} className={`max-w-6xl mx-auto px-8 md:px-16 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="text-center mb-12">
          <span className="text-[10px] font-robotoMono tracking-[0.3em] uppercase text-blueprint-deep/40">
            SECTION 05 // CERTIFICATIONS
          </span>
          <h2 className="font-robotoMono text-2xl md:text-3xl font-bold text-blueprint-deep mt-4 leading-tight">
            {content.trustSignals.heading}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {content.trustSignals.badges.map((badge, i) => (
            <div key={i} className="relative border border-blueprint-deep/15 bg-white/60 p-6 text-center group hover:border-blueprint-cyan/50 transition-colors">
              {/* Stamp-like corner markers */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-blueprint-deep/15" />
              <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-blueprint-deep/15" />
              <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-blueprint-deep/15" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-blueprint-deep/15" />

              {/* Verified icon */}
              <div className="mx-auto w-10 h-10 border border-dashed border-blueprint-cyan/40 flex items-center justify-center mb-4 text-blueprint-cyan">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path d="M5 10l4 4 6-7" />
                </svg>
              </div>

              <h3 className="font-robotoMono text-xs font-bold text-blueprint-deep mb-2 uppercase tracking-wide">
                {badge.title}
              </h3>
              <p className="text-[11px] leading-relaxed text-blueprint-deep/40">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PRICING — Bill of Materials / Spec sheet
   ───────────────────────────────────────────────────────────────── */
function PricingSection() {
  const anim = useInView();
  return (
    <section id="pricing" className="relative py-20 md:py-32 bg-white border-t border-dashed border-blueprint-deep/15">
      <div ref={anim.ref} className={`max-w-3xl mx-auto px-8 md:px-16 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="text-center mb-12">
          <span className="text-[10px] font-robotoMono tracking-[0.3em] uppercase text-blueprint-deep/40">
            SECTION 06 // BILL OF MATERIALS
          </span>
          <h2 className="font-robotoMono text-2xl md:text-3xl font-bold text-blueprint-deep mt-4 leading-tight">
            {content.pricing.heading}
          </h2>
        </div>

        {/* Spec sheet table */}
        <div className="border border-blueprint-deep/20">
          {/* Header row */}
          <div className="bg-blueprint-deep text-white px-6 py-4 flex items-center justify-between">
            <span className="font-robotoMono text-xs uppercase tracking-wider">
              Complete System Package
            </span>
            <span className="font-robotoMono text-xs uppercase tracking-wider opacity-60">
              QTY: 1
            </span>
          </div>

          {/* Heading row */}
          <div className="bg-blueprint-light/50 px-6 py-8 text-center border-b border-dashed border-blueprint-deep/15">
            <span className="font-robotoMono text-2xl md:text-3xl font-bold text-blueprint-deep tracking-tight uppercase">
              Custom Package
            </span>
            <p className="font-robotoMono text-xs text-blueprint-deep/40 mt-2 uppercase tracking-wider">
              {content.pricing.subtext}
            </p>
          </div>

          {/* Line items */}
          {content.pricing.includes.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3.5 border-b border-dashed border-blueprint-deep/10 hover:bg-blueprint-light/30 transition-colors">
              <span className="font-robotoMono text-[10px] text-blueprint-cyan w-8 flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-blueprint-deep/70">{item}</span>
              <span className="ml-auto font-robotoMono text-[10px] text-blueprint-deep/25">
                INCL.
              </span>
            </div>
          ))}

          {/* CTA row */}
          <div className="p-6">
            <a
              href="#"
              className="block w-full text-center bg-blueprint-cyan text-white font-robotoMono text-xs uppercase tracking-wider py-4 hover:bg-blueprint-deep transition-colors duration-300"
            >
              {content.pricing.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FAQ — Technical drawing toggle
   ───────────────────────────────────────────────────────────────── */
function FAQSection({ openFAQ, setOpenFAQ }: { openFAQ: number | null; setOpenFAQ: (v: number | null) => void }) {
  const anim = useInView();
  return (
    <section className="relative blueprint-grid py-20 md:py-32 border-t border-dashed border-blueprint-deep/15">
      <div ref={anim.ref} className={`max-w-4xl mx-auto px-8 md:px-16 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 border border-blueprint-deep/40 bg-blueprint-deep/10" />
          <span className="text-[10px] font-robotoMono tracking-[0.3em] uppercase text-blueprint-deep/40">
            SECTION 07 // REFERENCE NOTES
          </span>
        </div>
        <h2 className="font-robotoMono text-2xl md:text-3xl font-bold text-blueprint-deep mb-2 leading-tight">
          {content.faq.heading}
        </h2>
        <DimensionLine label="NOTES" className="max-w-xs mb-12" />

        <div className="space-y-0">
          {content.faq.items.map((item, i) => {
            const isOpen = openFAQ === i;
            return (
              <div key={i} className="border border-dashed border-blueprint-deep/15 -mt-px bg-white/50">
                <button
                  onClick={() => setOpenFAQ(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left group hover:bg-white transition-colors"
                >
                  {/* Plus/minus in square */}
                  <div className={`w-6 h-6 border flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? "border-blueprint-cyan text-blueprint-cyan" : "border-blueprint-deep/20 text-blueprint-deep/40 group-hover:border-blueprint-cyan/50"}`}>
                    <span className="font-robotoMono text-sm leading-none">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>

                  <span className="font-robotoMono text-xs text-blueprint-deep/25 flex-shrink-0">
                    N{String(i + 1).padStart(2, "0")}
                  </span>

                  <span className={`font-robotoMono text-xs md:text-sm font-bold transition-colors ${isOpen ? "text-blueprint-cyan" : "text-blueprint-deep group-hover:text-blueprint-cyan"}`}>
                    {item.question}
                  </span>
                </button>

                {/* Answer panel */}
                <div className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-6 pb-5 pl-[calc(1.5rem+2.5rem+1rem)]">
                    <p className="text-xs md:text-sm leading-relaxed text-blueprint-deep/50">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FINAL CTA — Deep blue with grid
   ───────────────────────────────────────────────────────────────── */
function FinalCTASection() {
  const anim = useInView();
  return (
    <section className="relative blueprint-grid-dark py-24 md:py-36 border-t border-blueprint-deep/30">
      {/* Schematic frame */}
      <div className="absolute inset-4 md:inset-8 border border-dashed border-white/8 pointer-events-none" />

      <div ref={anim.ref} className={`relative max-w-3xl mx-auto px-8 md:px-16 text-center transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-2 h-2 border border-blueprint-cyan bg-blueprint-cyan/30" />
          <span className="text-[10px] font-robotoMono tracking-[0.3em] uppercase text-blueprint-cyan/70">
            FINAL DRAWING // ACTION REQUIRED
          </span>
        </div>

        <h2 className="font-robotoMono text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
          {content.finalCTA.heading}
        </h2>
        <p className="text-sm text-white/40 max-w-md mx-auto mb-10 leading-relaxed">
          {content.finalCTA.subheadline}
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-3 bg-blueprint-cyan text-white font-robotoMono text-xs tracking-wider uppercase px-10 py-4 hover:bg-white hover:text-blueprint-deep transition-colors duration-300"
        >
          {content.finalCTA.cta}
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>

        {/* Title block */}
        <div className="mt-16 flex justify-center">
          <div className="border border-white/10">
            <div className="border-b border-white/10 px-6 py-2 flex gap-8">
              <span className="text-[8px] font-robotoMono text-white/20 uppercase tracking-wider">
                DWG: RE_AUTO_003
              </span>
              <span className="text-[8px] font-robotoMono text-white/20 uppercase tracking-wider">
                AI AUTOMATION SYSTEM
              </span>
            </div>
            <div className="px-6 py-2 flex gap-8">
              <span className="text-[8px] font-robotoMono text-white/20 uppercase tracking-wider">
                SCALE: NTS
              </span>
              <span className="text-[8px] font-robotoMono text-white/20 uppercase tracking-wider">
                SHEET 1 OF 1
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
