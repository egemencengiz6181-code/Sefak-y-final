'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
const LocationMap = dynamic(() => import('@/components/shared/LocationMap'), { ssr: false, loading: () => <div className="h-[450px] bg-background" /> });
const LetsWorkSection = dynamic(() => import('@/components/ui/lets-work-section'), { ssr: false, loading: () => <div className="h-64" /> });

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent z-10">
      {/* Partikül Arka Plan */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary-light rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-accent rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-1000" />
      </div>

      <section className="h-screen flex items-center justify-center px-6 relative z-10 animate-fade-in">
        <div className="text-center">
          <span className="hero-animate hero-animate-1 text-primary-light tracking-[0.2em] uppercase text-2xl md:text-3xl mb-6 block font-black">
            Sefaköy Final YKS - LGS Dershanesi
          </span>
          <h1 className="hero-animate hero-animate-2 text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-gradient-to-b from-slate-900 via-slate-900 to-primary/20 dark:from-white dark:via-white dark:to-primary/20 bg-clip-text text-transparent leading-tight">
            {t('hero_slogan')}
          </h1>
          <div
            className="hero-animate hero-animate-3 w-px bg-gradient-to-b from-primary/50 to-transparent mx-auto mt-12"
            style={{ height: '100px' }}
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        <div className="mb-40 text-center md:text-left">
          <h2 className="text-primary-light text-sm tracking-widest uppercase mb-6 font-semibold">{t('title')}</h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">
            {t('subtitle')}
          </h3>
          <p className="text-xl md:text-2xl text-foreground/50 max-w-4xl font-light leading-relaxed">
            {t('content')}
          </p>
        </div>

        {/* Vizyon/Misyon Sütunları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-48">
          {[
            { key: 'vision', color: 'from-primary/20' },
            { key: 'mission', color: 'from-accent/20' }
          ].map((item, i) => (
            <div key={item.key} className="group relative">
              <div className={`absolute -inset-10 bg-gradient-to-b ${item.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`} />
              <span className="text-6xl font-black text-black/5 dark:text-white/5 absolute -top-10 -left-6 select-none group-hover:text-primary/10 transition-colors">0{i+1}</span>
              <h4 className="text-3xl font-bold mb-6 group-hover:text-primary-light transition-colors">{t(`${item.key}.title`)}</h4>
              <p className="text-lg text-foreground/40 font-light leading-relaxed group-hover:text-foreground/70 transition-colors">
                {t(`${item.key}.text`)}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* Harita */}
      <LocationMap />
      <LetsWorkSection />
    </div>
  );
}

