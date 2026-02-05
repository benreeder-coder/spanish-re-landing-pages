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

/* ─── Gradient border wrapper ─── */
function GradientBorder({
  children,
  className = "",
  borderWidth = 1,
  from = "rgba(26,122,122,0.5)",
  to = "rgba(212,147,92,0.5)",
}: {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  from?: string;
  to?: string;
}) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{
        padding: `${borderWidth}px`,
        background: `linear-gradient(135deg, ${from}, ${to})`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Amber-glow icons ─── */
const glassIcons: Record<string, React.ReactNode> = {
  chat: (
    <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
      <path d="M5 7h18v12H13l-5 4v-4H5V7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="10.5" cy="13" r="1" fill="currentColor" />
      <circle cx="14" cy="13" r="1" fill="currentColor" />
      <circle cx="17.5" cy="13" r="1" fill="currentColor" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
      <path d="M8 3h8l5 5v17H8V3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M16 3v5h5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M11 14h6M11 18h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
      <rect x="4" y="4" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 14l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
      <path d="M14 19V7M14 7l-4.5 4.5M14 7l4.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 21a3 3 0 003 3h12a3 3 0 003-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
      <path d="M7 4h3l2.5 5.5-2 1.5a10.5 10.5 0 005 5l1.5-2L22.5 16.5V20a2.5 2.5 0 01-2.5 2.5C11.5 22.5 4 15 4 9.5A2.5 2.5 0 016.5 7h.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
      <circle cx="14" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M14 3v3.5M14 21.5V25M3 14h3.5M21.5 14H25M6.4 6.4l2.5 2.5M19.1 19.1l2.5 2.5M6.4 21.6l2.5-2.5M19.1 8.9l2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════════════════
   VARIATION 5 — GLASSMORPHISM FUTURIST
   ═══════════════════════════════════════════════════════════════════ */

export default function GlassmorphismFuturist() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <main className="bg-glass-darkBg text-white font-dmSans selection:bg-glass-amber/30 selection:text-white overflow-x-hidden">
      {/* Persistent dot grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Glass nav ── */}
      <nav className="fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-4">
          <div className="glass-card rounded-full px-6 py-3 flex items-center justify-between">
            <Link href="/" className="text-xs tracking-wide text-white/40 hover:text-glass-amber transition-colors">
              &larr; Back to Designs
            </Link>
            <span className="text-xs tracking-wide text-white/20 hidden md:block">
              05 / Glassmorphism Futurist
            </span>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
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
   HERO — Glass panel with floating shapes
   ───────────────────────────────────────────────────────────────── */
function HeroSection() {
  const anim = useInView(0.05);
  return (
    <section className="relative min-h-screen flex items-center py-28 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-glass-teal/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-glass-amber/10 blur-[100px] pointer-events-none" />

      {/* Floating geometric shapes */}
      <div className="absolute top-[15%] right-[20%] w-20 h-20 border border-glass-teal/10 rotate-45 animate-float pointer-events-none" />
      <div className="absolute bottom-[25%] left-[8%] w-12 h-12 rounded-full border border-glass-amber/10 animate-float pointer-events-none" style={{ animationDelay: "1s" }} />
      <div className="absolute top-[40%] right-[8%] w-6 h-6 bg-glass-amber/10 rounded-full animate-float pointer-events-none" style={{ animationDelay: "2s" }} />

      <div ref={anim.ref} className={`relative z-10 max-w-5xl mx-auto px-6 md:px-10 w-full transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Main glass panel */}
        <GradientBorder className="max-w-3xl">
          <div className="glass-card-strong rounded-[15px] p-8 md:p-14">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-glass-amber animate-glow" />
              <span className="text-xs tracking-[0.2em] uppercase text-glass-amber/80">
                AI Automation for Real Estate
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.08] font-bold tracking-tight text-white mb-6">
              {content.hero.headline.split(" in ")[0]}
              <span className="bg-gradient-to-r from-glass-teal to-glass-amber bg-clip-text text-transparent">
                {" "}in Spain
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm md:text-base leading-relaxed text-white/50 max-w-xl mb-10">
              {content.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 bg-glass-amber text-glass-darkBg font-semibold text-sm px-8 py-4 rounded-xl hover:bg-glass-amberLight transition-colors duration-300 animate-glow"
              >
                {content.hero.cta}
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 glass-card text-sm text-white/60 px-8 py-4 rounded-xl hover:text-glass-amber transition-colors"
              >
                View Specifications
              </a>
            </div>
          </div>
        </GradientBorder>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PROBLEM — Staggered glass cards
   ───────────────────────────────────────────────────────────────── */
function ProblemSection() {
  const anim = useInView();
  return (
    <section className="relative py-20 md:py-32">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-glass-tealDeep/40 blur-[120px] pointer-events-none" />

      <div ref={anim.ref} className={`relative max-w-5xl mx-auto px-6 md:px-10 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {/* Header */}
        <div className="mb-14">
          <span className="text-xs tracking-[0.2em] uppercase text-glass-teal/70">The Problem</span>
          <h2 className="text-2xl md:text-4xl font-bold mt-3 leading-tight">
            {content.problem.heading}
          </h2>
        </div>

        {/* Staggered cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {content.problem.points.map((point, i) => (
            <div
              key={i}
              className={`glass-card rounded-2xl p-6 md:p-8 group hover:bg-white/[0.09] transition-all duration-300 ${i % 2 === 1 ? "md:translate-y-8" : ""}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl font-bold bg-gradient-to-b from-glass-amber/60 to-glass-amber/20 bg-clip-text text-transparent leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-glass-amber transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/40">
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
   FEATURES — Glass card grid with hover lift
   ───────────────────────────────────────────────────────────────── */
function FeaturesSection() {
  const anim = useInView();
  return (
    <section id="features" className="relative py-20 md:py-32">
      {/* Ambient glows */}
      <div className="absolute top-0 right-[10%] w-[300px] h-[300px] rounded-full bg-glass-teal/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[15%] w-[250px] h-[250px] rounded-full bg-glass-amber/8 blur-[80px] pointer-events-none" />

      <div ref={anim.ref} className={`relative max-w-5xl mx-auto px-6 md:px-10 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs tracking-[0.2em] uppercase text-glass-amber/70">The System</span>
          <h2 className="text-2xl md:text-4xl font-bold mt-3 leading-tight">
            Four Modules.{" "}
            <span className="bg-gradient-to-r from-glass-teal to-glass-amber bg-clip-text text-transparent">
              One System.
            </span>
          </h2>
        </div>

        {/* 2×2 Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {content.features.map((feature, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-7 group hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(26,122,122,0.15)] transition-all duration-300"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-glass-amber/10 flex items-center justify-center mb-5 text-glass-amber group-hover:bg-glass-amber/20 transition-colors">
                {glassIcons[feature.icon] || glassIcons.settings}
              </div>

              <h3 className="text-base font-semibold text-white mb-2 group-hover:text-glass-amberLight transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/40">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HOW IT WORKS — Connected glass steps
   ───────────────────────────────────────────────────────────────── */
function HowItWorksSection() {
  const anim = useInView();
  return (
    <section className="relative py-20 md:py-32">
      <div ref={anim.ref} className={`relative max-w-5xl mx-auto px-6 md:px-10 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs tracking-[0.2em] uppercase text-glass-teal/70">Process</span>
          <h2 className="text-2xl md:text-4xl font-bold mt-3 leading-tight">
            {content.howItWorks.heading}
          </h2>
        </div>

        {/* Steps — horizontal with connectors */}
        <div className="grid md:grid-cols-4 gap-5">
          {content.howItWorks.steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector line */}
              {i < 3 && (
                <div className="hidden md:block absolute top-8 -right-2.5 w-5 h-px" style={{ background: `linear-gradient(to right, rgba(26,122,122,0.4), rgba(212,147,92,0.4))` }} />
              )}

              <div className="glass-card rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 h-full">
                {/* Diamond step indicator */}
                <div className="w-9 h-9 rotate-45 border border-glass-teal/30 flex items-center justify-center mb-6 group-hover:border-glass-amber/50 transition-colors">
                  <span className="-rotate-45 text-xs font-bold text-glass-teal group-hover:text-glass-amber transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-white/40">
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
   TRUST SIGNALS — Inline glass badges
   ───────────────────────────────────────────────────────────────── */
function TrustSection() {
  const anim = useInView();
  return (
    <section className="relative py-16 md:py-24">
      <div ref={anim.ref} className={`max-w-5xl mx-auto px-6 md:px-10 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="text-center mb-10">
          <span className="text-xs tracking-[0.2em] uppercase text-white/30">
            {content.trustSignals.heading}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {content.trustSignals.badges.map((badge, i) => (
            <div key={i} className="glass-card rounded-xl p-5 text-center group hover:bg-white/[0.09] transition-all duration-300">
              {/* Check icon */}
              <div className="mx-auto w-8 h-8 rounded-lg bg-glass-teal/15 flex items-center justify-center mb-3 text-glass-teal group-hover:text-glass-amber group-hover:bg-glass-amber/15 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8l3 3 5-6" />
                </svg>
              </div>

              <h3 className="text-xs font-semibold text-white mb-1.5">
                {badge.title}
              </h3>
              <p className="text-[11px] leading-relaxed text-white/30">
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
   PRICING — Gradient-bordered glass card
   ───────────────────────────────────────────────────────────────── */
function PricingSection() {
  const anim = useInView();
  return (
    <section id="pricing" className="relative py-20 md:py-32">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-glass-amber/8 blur-[100px] pointer-events-none" />

      <div ref={anim.ref} className={`relative max-w-5xl mx-auto px-6 md:px-10 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs tracking-[0.2em] uppercase text-glass-amber/70">Investment</span>
          <h2 className="text-2xl md:text-4xl font-bold mt-3 leading-tight">
            {content.pricing.heading}
          </h2>
        </div>

        {/* Pricing card with gradient border */}
        <div className="max-w-lg mx-auto">
          <GradientBorder
            from="rgba(26,122,122,0.6)"
            to="rgba(212,147,92,0.6)"
            borderWidth={1}
          >
            <div className="glass-card-strong rounded-[15px] p-8 md:p-12">
              {/* Heading with glow */}
              <div className="text-center mb-8">
                <span
                  className="text-3xl md:text-4xl font-bold tracking-tight"
                  style={{
                    color: "#D4935C",
                    textShadow: "0 0 30px rgba(212,147,92,0.4), 0 0 60px rgba(212,147,92,0.15)",
                  }}
                >
                  Let&apos;s Talk
                </span>
                <p className="text-sm text-white/30 mt-2">
                  {content.pricing.subtext}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px mb-8" style={{ background: "linear-gradient(to right, transparent, rgba(26,122,122,0.3), rgba(212,147,92,0.3), transparent)" }} />

              {/* Inclusions */}
              <ul className="space-y-3.5 mb-10">
                {content.pricing.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-glass-teal/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-glass-teal" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M3 6l2.5 2.5L9 4" />
                      </svg>
                    </div>
                    <span className="text-sm text-white/50">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#"
                className="block w-full text-center bg-glass-amber text-glass-darkBg font-semibold text-sm py-4 rounded-xl hover:bg-glass-amberLight transition-colors duration-300 animate-glow"
              >
                {content.pricing.cta}
              </a>
            </div>
          </GradientBorder>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FAQ — Glass accordion
   ───────────────────────────────────────────────────────────────── */
function FAQSection({ openFAQ, setOpenFAQ }: { openFAQ: number | null; setOpenFAQ: (v: number | null) => void }) {
  const anim = useInView();
  return (
    <section className="relative py-20 md:py-32">
      <div ref={anim.ref} className={`max-w-3xl mx-auto px-6 md:px-10 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.2em] uppercase text-glass-teal/70">Questions</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-3 leading-tight">
            {content.faq.heading}
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {content.faq.items.map((item, i) => {
            const isOpen = openFAQ === i;
            return (
              <div key={i} className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "bg-white/[0.09]" : ""}`}>
                <button
                  onClick={() => setOpenFAQ(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                >
                  <span className={`text-sm font-medium transition-colors ${isOpen ? "text-glass-amber" : "text-white/80 group-hover:text-glass-amber"}`}>
                    {item.question}
                  </span>
                  <svg
                    className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${isOpen ? "text-glass-amber rotate-180" : "text-white/30"}`}
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed text-white/40">
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
   FINAL CTA — Glass panel with gradient accent
   ───────────────────────────────────────────────────────────────── */
function FinalCTASection() {
  const anim = useInView();
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-[20%] w-[400px] h-[400px] rounded-full bg-glass-teal/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[15%] w-[300px] h-[300px] rounded-full bg-glass-amber/10 blur-[100px] pointer-events-none" />

      <div ref={anim.ref} className={`relative max-w-3xl mx-auto px-6 md:px-10 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {/* Gradient accent line */}
        <div className="w-20 h-px mx-auto mb-10" style={{ background: "linear-gradient(to right, rgba(26,122,122,0.6), rgba(212,147,92,0.6))" }} />

        <GradientBorder className="max-w-2xl mx-auto">
          <div className="glass-card-strong rounded-[15px] p-8 md:p-14 text-center">
            <span className="text-xs tracking-[0.2em] uppercase text-glass-amber/70 mb-6 block">
              Get Started
            </span>

            <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
              {content.finalCTA.heading}
            </h2>
            <p className="text-sm text-white/40 max-w-md mx-auto mb-10 leading-relaxed">
              {content.finalCTA.subheadline}
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 bg-glass-amber text-glass-darkBg font-semibold text-sm px-10 py-4 rounded-xl hover:bg-glass-amberLight transition-colors duration-300 animate-glow"
            >
              {content.finalCTA.cta}
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>
        </GradientBorder>

        {/* Footer text */}
        <p className="mt-14 text-center text-[11px] text-white/15 tracking-wider">
          AI Automation for Spanish Real Estate Agencies
        </p>
      </div>
    </section>
  );
}
