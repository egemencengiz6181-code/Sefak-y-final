"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import ContactPopup from "@/components/shared/ContactPopup";

export default function HeroMain() {
  const t = useTranslations("HeroMain");
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── SIMPLE GRADIENT BACKGROUND ── */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background to-muted" />

      {/* ── SCHOOL IMAGE BACKGROUND — LCP için priority ── */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <Image
          src="/okul/okul.jpeg"
          alt=""
          fill
          className="object-cover object-center opacity-[0.08]"
          sizes="100vw"
          priority
        />
      </div>

      {/* ── VIGNETTE OVERLAY ── */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,rgba(255,255,255,0.82)_100%)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,rgba(0,0,0,0.82)_100%)]" />

      {/* ── SUBTLE GLOW — CSS only, no blur ── */}
      <div
        className="absolute z-[2] w-[600px] h-[600px] rounded-full opacity-[0.12] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #E21F26 0%, #2E3192 50%, transparent 80%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "hero-glow-pulse 14s ease-in-out infinite",
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div className="hero-animate hero-animate-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E21F26]/30 bg-[#E21F26]/10 bg-background/90 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E21F26] animate-pulse" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#E21F26]/80">
            Sefaköy · Küçükçekmece / İstanbul
          </span>
        </div>

        {/* Title */}
        <h1 className="hero-animate hero-animate-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.04] text-slate-900 dark:text-white mb-8">
          {t("title_prefix")}{" "}
          <span
            style={{
              background: "linear-gradient(to right, #E21F26, #E65F5F, #2E3192)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              display: "inline-block",
            }}
          >
            {t("title_highlight")}
          </span>
          <br />
          {t("title_suffix")}
        </h1>

        {/* Subtitle */}
        <p className="hero-animate hero-animate-3 text-lg md:text-xl text-slate-500 dark:text-white/40 font-light leading-relaxed max-w-2xl mx-auto mb-12">
          {t("subtitle")}
        </p>

        {/* CTA */}
        <div className="hero-animate hero-animate-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setPopupOpen(true)}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E21F26] hover:bg-[#BE1821] text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_32px_rgba(226,31,38,0.45)] hover:shadow-[0_0_48px_rgba(226,31,38,0.6)]"
          >
            <MessageCircle className="w-4 h-4" />
            {t("cta")}
            <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
          </button>
        </div>
      </div>

      {/* ── BOTTOM FADE ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] bg-gradient-to-t from-background to-transparent" />

      <ContactPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </section>
  );
}
