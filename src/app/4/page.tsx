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

/* ─── Wave SVG Dividers ─── */
function WaveDividerBottom({ fillColor = "#F5E6D3", className = "" }: { fillColor?: string; className?: string }) {
  return (
    <div className={`absolute bottom-0 left-0 w-full overflow-hidden leading-none ${className}`}>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px]">
        <path
          d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,30 1440,40 L1440,100 L0,100 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}

function WaveDividerTop({ fillColor = "#F5E6D3", className = "" }: { fillColor?: string; className?: string }) {
  return (
    <div className={`absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 ${className}`}>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px]">
        <path
          d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,30 1440,40 L1440,100 L0,100 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}

/* ─── Olive-toned feature icons ─── */
const warmIcons: Record<string, React.ReactNode> = {
  chat: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <path d="M6 8c0-1.1.9-2 2-2h16a2 2 0 012 2v12a2 2 0 01-2 2H14l-6 4v-4H8a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="1.2" fill="currentColor" />
      <circle cx="16" cy="14" r="1.2" fill="currentColor" />
      <circle cx="20" cy="14" r="1.2" fill="currentColor" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <path d="M10 4h8l6 6v18H10a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M18 4v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 16h8M12 20h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <rect x="5" y="5" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 16l4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <path d="M16 22V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 14l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 24a3 3 0 003 3h14a3 3 0 003-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <path d="M9 4h3.5l2.5 6-2.5 2a12 12 0 005.5 5.5l2-2.5 6 2.5V21a3 3 0 01-3 3C13.5 24 4 14.5 4 9a3 3 0 013-3h2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.8 7.8l2.8 2.8M21.4 21.4l2.8 2.8M7.8 24.2l2.8-2.8M21.4 10.6l2.8-2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════════════════
   VARIATION 4 — MEDITERRANEAN WARMTH
   ═══════════════════════════════════════════════════════════════════ */

export default function MediterraneanWarmth() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <main className="bg-med-cream text-med-navy font-openSans selection:bg-med-terracotta/20 selection:text-med-navy overflow-x-hidden">

      {/* ── Soft floating nav ── */}
      <nav className="fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-5">
          <div className="bg-white/80 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between shadow-[0_2px_20px_rgba(212,115,90,0.08)]">
            <Link href="/" className="text-xs tracking-wide text-med-navy/50 hover:text-med-terracotta transition-colors font-medium">
              &larr; Back to Designs
            </Link>
            <span className="text-xs tracking-wide text-med-navy/30 hidden md:block">
              Concept 04 &mdash; Mediterranean
            </span>
          </div>
        </div>
      </nav>

      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TrustSection />
      <PricingSection />
      <FAQSection openFAQ={openFAQ} setOpenFAQ={setOpenFAQ} />
      <FinalCTASection />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HERO — Warm cream with organic shapes
   ───────────────────────────────────────────────────────────────── */
function HeroSection() {
  const anim = useInView(0.05);
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-32 overflow-hidden">
      {/* Warm radial glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-med-terracotta/[0.06] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-15%] w-[500px] h-[500px] rounded-full bg-med-olive/[0.05] blur-[80px] pointer-events-none" />

      {/* Decorative circle */}
      <div className="absolute top-32 right-[8%] w-48 h-48 md:w-72 md:h-72 rounded-full border border-med-terracotta/10 pointer-events-none" />
      <div className="absolute top-36 right-[10%] w-40 h-40 md:w-60 md:h-60 rounded-full border border-med-olive/10 pointer-events-none" />

      <div ref={anim.ref} className={`relative z-10 max-w-5xl mx-auto px-6 md:px-10 w-full transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-med-terracotta/40" />
          <span className="text-xs tracking-[0.2em] uppercase text-med-terracotta font-medium">
            AI-Powered Automation
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-cormorant text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.05] tracking-tight text-med-navy font-bold max-w-3xl mb-6">
          {content.hero.headline.split(" in ")[0]}
          <span className="text-med-terracotta italic"> in Spain</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg leading-relaxed text-med-navy/60 max-w-xl mb-10">
          {content.hero.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 bg-med-terracotta text-white font-medium text-sm px-8 py-4 rounded-full hover:bg-med-navy transition-colors duration-300 shadow-[0_4px_20px_rgba(212,115,90,0.3)]"
          >
            {content.hero.cta}
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium text-med-olive border border-med-olive/30 px-8 py-4 rounded-full hover:bg-med-olive/10 transition-colors"
          >
            Explore Features
          </a>
        </div>
      </div>

      {/* Bottom wave */}
      <WaveDividerBottom fillColor="#FFFFFF" />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PROBLEM — Warm cards
   ───────────────────────────────────────────────────────────────── */
function ProblemSection() {
  const anim = useInView();
  return (
    <section className="relative bg-white py-20 md:py-28">
      <div ref={anim.ref} className={`max-w-5xl mx-auto px-6 md:px-10 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          {/* Left heading */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-med-terracotta/40" />
              <span className="text-xs tracking-[0.2em] uppercase text-med-terracotta font-medium">
                The Challenge
              </span>
            </div>
            <h2 className="font-cormorant text-3xl md:text-[2.5rem] font-bold text-med-navy leading-[1.1]">
              {content.problem.heading}
            </h2>
          </div>

          {/* Right — problem items */}
          <div className="md:col-span-7 space-y-5">
            {content.problem.points.map((point, i) => (
              <div
                key={i}
                className="bg-med-cream/60 rounded-2xl p-6 group hover:shadow-[0_4px_24px_rgba(212,115,90,0.08)] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="font-cormorant text-2xl text-med-terracotta/40 font-bold leading-none pt-0.5 group-hover:text-med-terracotta transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-cormorant text-lg font-bold text-med-navy mb-1.5">
                      {point.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-med-navy/50">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WaveDividerBottom fillColor="#F5E6D3" />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FEATURES — Rounded card grid
   ───────────────────────────────────────────────────────────────── */
function FeaturesSection() {
  const anim = useInView();
  return (
    <section id="features" className="relative bg-med-cream pt-24 pb-20 md:pt-32 md:pb-28">
      <div ref={anim.ref} className={`max-w-5xl mx-auto px-6 md:px-10 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-med-olive/40" />
            <span className="text-xs tracking-[0.2em] uppercase text-med-olive font-medium">
              The System
            </span>
            <div className="w-8 h-px bg-med-olive/40" />
          </div>
          <h2 className="font-cormorant text-3xl md:text-5xl font-bold text-med-navy leading-[1.1]">
            Everything Your Agency Needs,
            <br className="hidden md:block" />
            <span className="text-med-terracotta italic">Automated</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {content.features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 group hover:shadow-[0_8px_32px_rgba(212,115,90,0.1)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-med-olive/10 flex items-center justify-center mb-5 text-med-olive group-hover:bg-med-terracotta/10 group-hover:text-med-terracotta transition-colors">
                {warmIcons[feature.icon] || warmIcons.settings}
              </div>

              <h3 className="font-cormorant text-xl font-bold text-med-navy mb-2">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-med-navy/50">
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
   HOW IT WORKS — Flowing numbered steps
   ───────────────────────────────────────────────────────────────── */
function HowItWorksSection() {
  const anim = useInView();
  return (
    <section className="relative bg-white py-20 md:py-28">
      <WaveDividerTop fillColor="#F5E6D3" />

      <div ref={anim.ref} className={`max-w-5xl mx-auto px-6 md:px-10 pt-12 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-med-terracotta/40" />
            <span className="text-xs tracking-[0.2em] uppercase text-med-terracotta font-medium">
              Process
            </span>
            <div className="w-8 h-px bg-med-terracotta/40" />
          </div>
          <h2 className="font-cormorant text-3xl md:text-5xl font-bold text-med-navy leading-[1.1]">
            {content.howItWorks.heading}
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8 md:gap-5">
          {content.howItWorks.steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              {/* Connecting curve on desktop */}
              {i < 3 && (
                <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px">
                  <svg className="w-full h-4" viewBox="0 0 100 16" preserveAspectRatio="none">
                    <path
                      d="M0,8 Q25,0 50,8 Q75,16 100,8"
                      fill="none"
                      stroke="#D4735A"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.3"
                    />
                  </svg>
                </div>
              )}

              {/* Number circle */}
              <div className="mx-auto w-14 h-14 rounded-full bg-med-terracotta/10 flex items-center justify-center mb-5 group-hover:bg-med-terracotta group-hover:text-white transition-colors duration-300">
                <span className="font-cormorant text-xl font-bold text-med-terracotta group-hover:text-white transition-colors">
                  {step.number}
                </span>
              </div>

              <h3 className="font-cormorant text-lg font-bold text-med-navy mb-2">
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed text-med-navy/50 max-w-[220px] mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TRUST SIGNALS — Soft rounded badges
   ───────────────────────────────────────────────────────────────── */
function TrustSection() {
  const anim = useInView();
  return (
    <section className="relative bg-med-cream py-20 md:py-24">
      <div ref={anim.ref} className={`max-w-5xl mx-auto px-6 md:px-10 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.2em] uppercase text-med-olive font-medium">
            {content.trustSignals.heading}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {content.trustSignals.badges.map((badge, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center border border-med-terracotta/10 hover:border-med-terracotta/30 hover:shadow-[0_4px_20px_rgba(212,115,90,0.06)] transition-all duration-300">
              {/* Check circle */}
              <div className="mx-auto w-10 h-10 rounded-full bg-med-terracotta/10 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-med-terracotta" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 10l4 4 6-7" />
                </svg>
              </div>

              <h3 className="font-cormorant text-base font-bold text-med-navy mb-1.5">
                {badge.title}
              </h3>
              <p className="text-xs leading-relaxed text-med-navy/40">
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
   PRICING — Warm card with terracotta accent
   ───────────────────────────────────────────────────────────────── */
function PricingSection() {
  const anim = useInView();
  return (
    <section id="pricing" className="relative bg-white py-20 md:py-32">
      <div ref={anim.ref} className={`max-w-5xl mx-auto px-6 md:px-10 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-med-terracotta/40" />
            <span className="text-xs tracking-[0.2em] uppercase text-med-terracotta font-medium">
              Investment
            </span>
            <div className="w-8 h-px bg-med-terracotta/40" />
          </div>
          <h2 className="font-cormorant text-3xl md:text-5xl font-bold text-med-navy leading-[1.1]">
            {content.pricing.heading}
          </h2>
        </div>

        {/* Pricing card */}
        <div className="max-w-lg mx-auto">
          <div className="bg-med-cream rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(31,58,95,0.06)]">
            {/* Terracotta accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-med-terracotta via-med-terracotta/80 to-med-olive" />

            <div className="p-8 md:p-12">
              {/* Heading */}
              <div className="text-center mb-8">
                <span className="font-cormorant text-3xl md:text-4xl font-bold text-med-navy italic">
                  Let&apos;s Talk
                </span>
                <p className="text-sm text-med-navy/40 mt-2">{content.pricing.subtext}</p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex-1 h-px bg-med-navy/10" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-med-navy/30">Includes</span>
                <div className="flex-1 h-px bg-med-navy/10" />
              </div>

              {/* Inclusions */}
              <ul className="space-y-3 mb-10">
                {content.pricing.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-med-olive/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-med-olive" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M3 6l2.5 2.5L9 4" />
                      </svg>
                    </div>
                    <span className="text-sm text-med-navy/60">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#"
                className="block w-full text-center bg-med-navy text-white font-medium text-sm py-4 rounded-full hover:bg-med-terracotta transition-colors duration-300 shadow-[0_4px_16px_rgba(31,58,95,0.2)]"
              >
                {content.pricing.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FAQ — Warm accordion
   ───────────────────────────────────────────────────────────────── */
function FAQSection({ openFAQ, setOpenFAQ }: { openFAQ: number | null; setOpenFAQ: (v: number | null) => void }) {
  const anim = useInView();
  return (
    <section className="relative bg-med-cream py-20 md:py-28">
      <div ref={anim.ref} className={`max-w-3xl mx-auto px-6 md:px-10 transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-med-olive/40" />
            <span className="text-xs tracking-[0.2em] uppercase text-med-olive font-medium">
              Questions
            </span>
            <div className="w-8 h-px bg-med-olive/40" />
          </div>
          <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-med-navy leading-[1.1]">
            {content.faq.heading}
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {content.faq.items.map((item, i) => {
            const isOpen = openFAQ === i;
            return (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-[0_1px_4px_rgba(31,58,95,0.04)]">
                <button
                  onClick={() => setOpenFAQ(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                >
                  <span className={`font-cormorant text-base md:text-lg font-bold transition-colors ${isOpen ? "text-med-terracotta" : "text-med-navy group-hover:text-med-terracotta"}`}>
                    {item.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? "bg-med-olive text-white rotate-180" : "bg-med-olive/10 text-med-olive"}`}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 5l4 4 4-4" />
                    </svg>
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed text-med-navy/50">
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
   FINAL CTA — Warm gradient with wave
   ───────────────────────────────────────────────────────────────── */
function FinalCTASection() {
  const anim = useInView();
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden" style={{ background: "linear-gradient(135deg, #D4735A 0%, #b85a44 50%, #1F3A5F 100%)" }}>
      <WaveDividerTop fillColor="#F5E6D3" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-[5%] w-64 h-64 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute bottom-10 left-[8%] w-40 h-40 rounded-full border border-white/5 pointer-events-none" />

      <div ref={anim.ref} className={`relative z-10 max-w-3xl mx-auto px-6 md:px-10 text-center transition-all duration-1000 ${anim.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-px bg-white/30" />
          <span className="text-xs tracking-[0.2em] uppercase text-white/60 font-medium">
            Get Started
          </span>
          <div className="w-8 h-px bg-white/30" />
        </div>

        <h2 className="font-cormorant text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-4">
          {content.finalCTA.heading}
        </h2>
        <p className="text-base text-white/60 max-w-md mx-auto mb-10 leading-relaxed">
          {content.finalCTA.subheadline}
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-2 bg-med-cream text-med-navy font-medium text-sm px-10 py-4 rounded-full hover:bg-white transition-colors duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.15)]"
        >
          {content.finalCTA.cta}
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>

        {/* Footer note */}
        <p className="mt-16 text-xs text-white/20 tracking-wide">
          AI Automation for Spanish Real Estate Agencies
        </p>
      </div>
    </section>
  );
}
