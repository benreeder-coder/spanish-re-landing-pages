"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { content } from "@/data/content";

/* ─── Inline SVG Icons keyed by content.features[].icon ─── */
const featureIcons: Record<string, React.ReactNode> = {
  chat: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
      <path d="M6 8h20v14H14l-6 4v-4H6V8z" />
      <circle cx="12" cy="15" r="1" fill="currentColor" />
      <circle cx="16" cy="15" r="1" fill="currentColor" />
      <circle cx="20" cy="15" r="1" fill="currentColor" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
      <path d="M9 4h10l6 6v18H9V4z" />
      <path d="M19 4v6h6" />
      <path d="M13 16h6M13 20h8M13 24h4" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
      <rect x="6" y="6" width="20" height="20" rx="3" />
      <path d="M11 16l4 4 6-8" strokeWidth="1.8" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
      <path d="M16 20V8M16 8l-5 5M16 8l5 5" strokeWidth="1.5" />
      <path d="M6 22v4h20v-4" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
      <path d="M8 4h4l3 7-3 2a14 14 0 006 6l2-3 7 3v4c0 1-1 2-2 2C13 26 4 17 4 10c0-1 1-2 2-2h2z" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
      <circle cx="16" cy="16" r="4" />
      <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M7.5 24.5l2.8-2.8M21.7 10.3l2.8-2.8" />
    </svg>
  ),
};

/* ─── Intersection Observer hook for scroll-triggered animations ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ═══════════════════════════════════════════════════════════════════
   VARIATION 1 — DARK LUXE EDITORIAL
   ═══════════════════════════════════════════════════════════════════ */

export default function DarkLuxeEditorial() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <main className="bg-luxe-black text-luxe-gray font-inter selection:bg-luxe-gold/30 selection:text-white overflow-x-hidden">

      {/* ── Top Nav ── */}
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <Link href="/" className="text-xs tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors">
            &larr; Back to Designs
          </Link>
          <span className="text-xs tracking-[0.25em] uppercase text-white/40 hidden md:block">
            Concept 01 &mdash; Dark Luxe Editorial
          </span>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════
         SECTION 1 — HERO
         ══════════════════════════════════════════════════════════════ */}
      <HeroSection />

      {/* ══════════════════════════════════════════════════════════════
         SECTION 2 — PROBLEM
         ══════════════════════════════════════════════════════════════ */}
      <ProblemSection />

      {/* ══════════════════════════════════════════════════════════════
         SECTION 3 — FEATURES
         ══════════════════════════════════════════════════════════════ */}
      <FeaturesSection />

      {/* ══════════════════════════════════════════════════════════════
         SECTION 4 — HOW IT WORKS
         ══════════════════════════════════════════════════════════════ */}
      <HowItWorksSection />

      {/* ══════════════════════════════════════════════════════════════
         SECTION 5 — TRUST SIGNALS
         ══════════════════════════════════════════════════════════════ */}
      <TrustSection />

      {/* ══════════════════════════════════════════════════════════════
         SECTION 6 — PRICING
         ══════════════════════════════════════════════════════════════ */}
      <PricingSection />

      {/* ══════════════════════════════════════════════════════════════
         SECTION 7 — FAQ
         ══════════════════════════════════════════════════════════════ */}
      <FAQSection openFAQ={openFAQ} setOpenFAQ={setOpenFAQ} />

      {/* ══════════════════════════════════════════════════════════════
         SECTION 8 — FINAL CTA
         ══════════════════════════════════════════════════════════════ */}
      <FinalCTASection />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────────────────────────── */
function HeroSection() {
  const anim = useInView(0.05);
  return (
    <section className="relative min-h-screen flex items-end pb-20 md:pb-28 overflow-hidden">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Subtle radial glow top-right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-luxe-gold/[0.04] blur-[120px] pointer-events-none" />

      {/* Decorative vertical gold line */}
      <div className="absolute top-0 left-[12%] md:left-[18%] w-px h-full bg-gradient-to-b from-transparent via-luxe-gold/20 to-transparent" />

      <div ref={anim.ref} className={`relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Eyebrow */}
        <p className="text-xs tracking-[0.35em] uppercase text-luxe-gold mb-8 md:mb-10">
          AI-Powered Real Estate Automation
        </p>

        {/* Headline — intentionally asymmetric, pushed left */}
        <h1 className="font-playfair text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight text-white max-w-4xl mb-8">
          {content.hero.headline.split(" in ")[0]}
          <br />
          <span className="italic text-luxe-gold/90">in Spain</span>
        </h1>

        {/* Subheadline — narrower column, offset right */}
        <div className="md:ml-[18%] max-w-xl mb-12">
          <p className="text-base md:text-lg leading-relaxed text-luxe-gray/70">
            {content.hero.subheadline}
          </p>
        </div>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <a
            href="#pricing"
            className="group inline-flex items-center gap-3 bg-luxe-gold text-luxe-black font-medium text-sm tracking-wide px-8 py-4 hover:bg-luxe-cream transition-colors duration-300"
          >
            {content.hero.cta}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a href="#features" className="text-sm text-luxe-gray/50 hover:text-luxe-gold tracking-wide transition-colors border-b border-luxe-gray/20 hover:border-luxe-gold/40 pb-1">
            Explore the System
          </a>
        </div>

        {/* Bottom editorial rule */}
        <div className="mt-20 flex items-center gap-4">
          <div className="w-12 h-px bg-luxe-gold/40" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-luxe-gray/30">
            Scroll to discover
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PROBLEM
   ───────────────────────────────────────────────────────────────── */
function ProblemSection() {
  const anim = useInView();
  return (
    <section className="relative py-28 md:py-40">
      {/* Horizontal gold rule at top */}
      <div className="absolute top-0 left-6 md:left-12 right-6 md:right-12 h-px bg-luxe-gold/10" />

      <div ref={anim.ref} className={`max-w-7xl mx-auto px-6 md:px-12 transition-all duration-1000 delay-100 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">
          {/* Left column — 5 cols */}
          <div className="md:col-span-5">
            <p className="text-xs tracking-[0.35em] uppercase text-luxe-gold/70 mb-6">
              The Problem
            </p>
            <h2 className="font-playfair text-3xl md:text-[2.75rem] leading-[1.1] text-white max-w-md">
              {content.problem.heading}
            </h2>
          </div>

          {/* Right column — 7 cols, pain points */}
          <div className="md:col-span-7 md:pt-4 space-y-10">
            {content.problem.points.map((point, i) => (
              <div key={i} className="group grid grid-cols-[auto_1fr] gap-5 items-start">
                <span className="font-playfair text-2xl text-luxe-gold/40 pt-0.5 group-hover:text-luxe-gold transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-white text-base font-medium mb-2 tracking-wide">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-luxe-gray/50">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FEATURES
   ───────────────────────────────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 md:py-40">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <p className="text-xs tracking-[0.35em] uppercase text-luxe-gold/70 mb-6">
          The System
        </p>
        <h2 className="font-playfair text-3xl md:text-5xl text-white max-w-lg leading-[1.1]">
          Four Integrated<br />
          <span className="italic text-luxe-gold/80">Automation Modules</span>
        </h2>
      </div>

      {/* Alternating editorial feature blocks */}
      <div className="space-y-0">
        {content.features.map((feature, i) => (
          <FeatureBlock key={i} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}

function FeatureBlock({ feature, index }: { feature: typeof content.features[0]; index: number }) {
  const anim = useInView(0.1);
  const isEven = index % 2 === 0;

  return (
    <div ref={anim.ref} className={`transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      {/* Top border */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-px bg-luxe-gold/[0.08]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20">
        <div className={`grid md:grid-cols-12 gap-8 md:gap-12 items-start ${isEven ? "" : "direction-rtl"}`}>
          {/* Number + icon column */}
          <div className={`md:col-span-3 flex items-center gap-4 ${isEven ? "" : "md:col-start-10 md:order-2"}`} style={{ direction: "ltr" }}>
            <span className="font-playfair text-5xl md:text-6xl text-luxe-gold/15">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="text-luxe-gold/60">
              {featureIcons[feature.icon] || featureIcons.settings}
            </div>
          </div>

          {/* Text column */}
          <div className={`md:col-span-6 ${isEven ? "md:col-start-5" : "md:col-start-1 md:order-1"}`} style={{ direction: "ltr" }}>
            <h3 className="font-playfair text-xl md:text-2xl text-white mb-4 leading-snug">
              {feature.title}
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-luxe-gray/50 max-w-lg">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HOW IT WORKS
   ───────────────────────────────────────────────────────────────── */
function HowItWorksSection() {
  const anim = useInView();
  return (
    <section className="relative py-28 md:py-40 bg-[#060606]">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div ref={anim.ref} className={`relative max-w-7xl mx-auto px-6 md:px-12 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Header — offset right */}
        <div className="md:ml-[30%] mb-20 md:mb-28">
          <p className="text-xs tracking-[0.35em] uppercase text-luxe-gold/70 mb-6">
            Process
          </p>
          <h2 className="font-playfair text-3xl md:text-5xl text-white leading-[1.1]">
            {content.howItWorks.heading}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical gold line */}
          <div className="absolute left-4 md:left-[calc(30%-1px)] top-0 bottom-0 w-px bg-gradient-to-b from-luxe-gold/30 via-luxe-gold/10 to-transparent" />

          <div className="space-y-16 md:space-y-20">
            {content.howItWorks.steps.map((step, i) => (
              <TimelineStep key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStep({ step, index }: { step: typeof content.howItWorks.steps[0]; index: number }) {
  const anim = useInView(0.2);
  return (
    <div ref={anim.ref} className={`relative grid md:grid-cols-12 gap-6 md:gap-8 pl-12 md:pl-0 transition-all duration-700 delay-${index * 100} ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      {/* Gold dot on timeline */}
      <div className="absolute left-2 md:left-[calc(30%-6px)] top-1 w-3 h-3 rounded-full border-2 border-luxe-gold/60 bg-luxe-black" />

      {/* Number — left of line on desktop */}
      <div className="hidden md:flex md:col-span-3 justify-end pr-10 pt-0.5">
        <span className="font-playfair text-4xl text-luxe-gold/20">{step.number}</span>
      </div>

      {/* Content — right of line */}
      <div className="md:col-span-7 md:col-start-5 md:pl-8">
        <span className="md:hidden font-playfair text-sm text-luxe-gold/30 mb-2 block">{step.number}</span>
        <h3 className="font-playfair text-xl text-white mb-3">{step.title}</h3>
        <p className="text-sm leading-relaxed text-luxe-gray/50 max-w-md">{step.description}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TRUST SIGNALS
   ───────────────────────────────────────────────────────────────── */
function TrustSection() {
  const anim = useInView();
  return (
    <section className="py-20 md:py-28">
      <div ref={anim.ref} className={`max-w-7xl mx-auto px-6 md:px-12 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-xs tracking-[0.35em] uppercase text-luxe-gold/70 mb-12 text-center">
          {content.trustSignals.heading}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-luxe-gold/[0.08]">
          {content.trustSignals.badges.map((badge, i) => (
            <div key={i} className="bg-luxe-black p-6 md:p-10 text-center group hover:bg-[#0f0f0f] transition-colors">
              <h3 className="font-playfair text-base md:text-lg text-white mb-3 group-hover:text-luxe-gold transition-colors">
                {badge.title}
              </h3>
              <p className="text-xs md:text-sm text-luxe-gray/40 leading-relaxed">
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
   PRICING
   ───────────────────────────────────────────────────────────────── */
function PricingSection() {
  const anim = useInView();
  return (
    <section id="pricing" className="relative py-28 md:py-40">
      {/* Decorative gold line */}
      <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-luxe-gold/10 to-transparent pointer-events-none" />

      <div ref={anim.ref} className={`max-w-7xl mx-auto px-6 md:px-12 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="max-w-xl mx-auto text-center mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-luxe-gold/70 mb-6">Investment</p>
          <h2 className="font-playfair text-3xl md:text-5xl text-white leading-[1.1]">
            {content.pricing.heading}
          </h2>
        </div>

        {/* Pricing card */}
        <div className="max-w-lg mx-auto relative">
          {/* Gold border effect */}
          <div className="absolute -inset-px bg-gradient-to-b from-luxe-gold/30 via-luxe-gold/10 to-luxe-gold/30" />

          <div className="relative bg-[#0c0c0c] p-10 md:p-14">
            {/* Heading */}
            <div className="text-center mb-10">
              <span className="font-playfair text-3xl md:text-4xl text-white tracking-tight">
                Let&apos;s Talk
              </span>
              <p className="text-sm text-luxe-gray/40 mt-3">
                {content.pricing.subtext}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-luxe-gold/15 mb-10" />

            {/* Inclusions */}
            <ul className="space-y-4 mb-12">
              {content.pricing.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-luxe-gold/60 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l4 4 6-8" />
                  </svg>
                  <span className="text-sm text-luxe-gray/60">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#"
              className="block w-full text-center bg-luxe-gold text-luxe-black font-medium text-sm tracking-wide py-4 hover:bg-luxe-cream transition-colors duration-300"
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
   FAQ
   ───────────────────────────────────────────────────────────────── */
function FAQSection({ openFAQ, setOpenFAQ }: { openFAQ: number | null; setOpenFAQ: (v: number | null) => void }) {
  const anim = useInView();
  return (
    <section className="py-28 md:py-40 bg-[#060606]">
      <div ref={anim.ref} className={`max-w-7xl mx-auto px-6 md:px-12 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">
          {/* Left column */}
          <div className="md:col-span-4">
            <p className="text-xs tracking-[0.35em] uppercase text-luxe-gold/70 mb-6">FAQ</p>
            <h2 className="font-playfair text-3xl md:text-4xl text-white leading-[1.15]">
              {content.faq.heading}
            </h2>
          </div>

          {/* Right column — accordion */}
          <div className="md:col-span-7 md:col-start-6">
            {content.faq.items.map((item, i) => {
              const isOpen = openFAQ === i;
              return (
                <div key={i} className="border-b border-luxe-gold/[0.08]">
                  <button
                    onClick={() => setOpenFAQ(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-4 py-6 text-left group"
                  >
                    <span className={`font-playfair text-base md:text-lg transition-colors ${isOpen ? "text-luxe-gold" : "text-white group-hover:text-luxe-gold/80"}`}>
                      {item.question}
                    </span>
                    <svg
                      className={`w-4 h-4 text-luxe-gold/40 flex-shrink-0 mt-1.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "max-h-48 opacity-100 pb-6" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-sm leading-relaxed text-luxe-gray/50 max-w-lg">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FINAL CTA
   ───────────────────────────────────────────────────────────────── */
function FinalCTASection() {
  const anim = useInView();
  return (
    <section className="relative py-28 md:py-40">
      {/* Top gold accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-luxe-gold/40" />

      <div ref={anim.ref} className={`max-w-7xl mx-auto px-6 md:px-12 text-center transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-xs tracking-[0.35em] uppercase text-luxe-gold/70 mb-8">
          Let&apos;s Begin
        </p>
        <h2 className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white leading-[1.05] max-w-2xl mx-auto mb-6">
          {content.finalCTA.heading}
        </h2>
        <p className="text-base text-luxe-gray/50 max-w-lg mx-auto mb-12 leading-relaxed">
          {content.finalCTA.subheadline}
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-3 bg-luxe-cream text-luxe-black font-medium text-sm tracking-wide px-10 py-4 hover:bg-white transition-colors duration-300"
        >
          {content.finalCTA.cta}
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>

        {/* Footer rule */}
        <div className="mt-24 flex items-center justify-center gap-4">
          <div className="w-8 h-px bg-luxe-gold/20" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-luxe-gray/20">
            AI Automation for Spanish Real Estate
          </span>
          <div className="w-8 h-px bg-luxe-gold/20" />
        </div>
      </div>
    </section>
  );
}
