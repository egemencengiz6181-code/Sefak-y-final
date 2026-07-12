'use client';

import React from 'react';
import { FlaskConical, Trophy, Users, BookOpen, BookMarked } from 'lucide-react';
import Image from 'next/image';

interface SectionWithMockupProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  badge?: string;
}

const stats = [
  { icon: Trophy,        value: '46+',  label: 'Yıl Deneyim' },
  { icon: Users,         value: '500+', label: 'Mezun Öğrenci' },
  { icon: FlaskConical,  value: '%94',  label: 'Başarı Oranı' },
  { icon: BookOpen,      value: '1-8',  label: 'Sınıf Aralığı' },
];

const SectionWithMockup: React.FC<SectionWithMockupProps> = ({ title, description, badge }) => {
  return (
    <section className="relative bg-white dark:bg-black overflow-hidden py-28 md:py-40">
      {/* Border lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />

      {/* Ambient glows — static, no JS */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-[#E21F26]/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-[#2E3192]/[0.08] blur-[100px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10">

        {/* ── Header ── */}
        <div className="mb-16 md:mb-20">
          {badge && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E21F26]/25 bg-[#E21F26]/10 text-[11px] font-bold tracking-[0.3em] uppercase text-[#E21F26] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E21F26] animate-pulse" />
              {badge}
            </span>
          )}
          <h2 className="text-3xl md:text-5xl lg:text-[56px] font-bold tracking-tighter leading-tight text-slate-900 dark:text-white max-w-2xl">
            {title}
          </h2>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: image stack — CSS float animation ── */}
          <div className="relative h-[320px] sm:h-[420px] md:h-[480px] lg:h-[580px]">
            {/* Back image */}
            <div
              className="absolute bottom-0 left-0 w-[74%] h-[72%] rounded-2xl overflow-hidden border border-white/[0.07]"
              style={{ animation: 'float-up 9s ease-in-out infinite' }}
            >
              <div className="relative w-full h-full">
                <Image src="/okul2/okul-giris.jpg" alt="Sefaköy Final Giriş" fill sizes="(max-width: 768px) 60vw, 30vw" className="object-cover object-center" loading="lazy" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-transparent to-transparent" />
            </div>

            {/* Front image */}
            <div
              className="absolute top-0 right-0 w-[70%] h-[78%] rounded-2xl overflow-hidden border border-white/[0.11] shadow-2xl"
              style={{ animation: 'float-down 7s ease-in-out 1.2s infinite' }}
            >
              <div className="relative w-full h-full">
                <Image src="/okul2/okul-sinif.jpg" alt="Sefaköy Final Sınıf" fill sizes="(max-width: 768px) 60vw, 30vw" className="object-cover object-center" loading="lazy" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/45" />
              <div className="absolute top-0 left-0 w-1 h-16 bg-gradient-to-b from-[#E21F26] to-transparent rounded-full" />
            </div>

            {/* Stat badge */}
            <div className="absolute bottom-4 right-2 sm:bottom-8 sm:right-2 md:-right-4 z-20 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/60 backdrop-blur-xl shadow-xl">
              <div className="w-9 h-9 rounded-xl bg-[#E21F26]/20 flex items-center justify-center shrink-0">
                <Trophy className="w-4 h-4 text-[#E21F26]" />
              </div>
              <div>
                <p className="text-slate-900 dark:text-white font-bold text-sm leading-none">%94 Başarı</p>
                <p className="text-slate-500 dark:text-white/40 text-xs mt-0.5">LGS Başarı Oranı</p>
              </div>
            </div>

            {/* Red glow */}
            <div className="absolute bottom-0 left-1/4 w-1/2 h-16 bg-[#E21F26]/15 blur-[52px] rounded-full pointer-events-none" />
          </div>

          {/* ── Right: text + stats ── */}
          <div className="flex flex-col gap-8 lg:pt-4">
            <p className="text-slate-600 dark:text-white/55 text-base md:text-[17px] leading-[1.85] max-w-lg">
              {description}
            </p>

            <div className="h-px w-full bg-gradient-to-r from-[#E21F26]/30 via-white/10 to-transparent" />

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="group relative flex flex-col gap-3 p-5 rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.03] dark:bg-white/[0.03] hover:border-[#E21F26]/30 hover:bg-[#E21F26]/[0.04] transition-all duration-300 cursor-default"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#E21F26]/10 flex items-center justify-center group-hover:bg-[#E21F26]/20 transition-colors">
                    <Icon className="w-4 h-4 text-[#E21F26]" />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-bold text-2xl leading-none">{value}</p>
                    <p className="text-slate-500 dark:text-white/40 text-xs mt-1">{label}</p>
                  </div>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#E21F26]/5 to-transparent pointer-events-none" />
                </div>
              ))}

              {/* Kişiye Özel Kitap */}
              <div className="col-span-2 group relative flex flex-col gap-4 p-7 rounded-2xl border-2 border-[#E21F26]/30 bg-gradient-to-br from-[#E21F26]/10 via-[#E21F26]/5 to-[#2E3192]/10 hover:border-[#E21F26]/60 hover:from-[#E21F26]/15 hover:via-[#E21F26]/8 hover:to-[#2E3192]/15 transition-all duration-300 cursor-default shadow-[0_0_30px_rgba(226,31,38,0.08)] hover:shadow-[0_0_40px_rgba(226,31,38,0.18)]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E21F26] to-[#BE1821] flex items-center justify-center shadow-[0_4px_12px_rgba(226,31,38,0.4)] group-hover:shadow-[0_6px_20px_rgba(226,31,38,0.5)] transition-shadow">
                    <BookMarked className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#E21F26] mb-0.5 block">Yapay Zeka Destekli</span>
                    <p className="text-slate-900 dark:text-white font-black text-base leading-snug">Kişiye Özel Kitap &amp; Sıfır Hata</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">Öğrencilerimize özel olarak hazırladığımız sıfır hata kitapçıkları, denemelerde sık yapılan hataları içeren sorular barındırır. Kişiye özel kitaplar ise yapay zeka analizi ile hazırlanmış benzer soruları içerir; öğrencinin eksiklerini hızla kapatır.</p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E21F26]/15 border border-[#E21F26]/30 text-[#E21F26] text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E21F26] animate-pulse" />
                    Her Öğrenciye Özel
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E3192]/10 border border-[#2E3192]/20 text-[#2E3192] dark:text-blue-400 text-xs font-semibold">
                    Yapay Zeka Analizi
                  </span>
                </div>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#E21F26]/8 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWithMockup;
