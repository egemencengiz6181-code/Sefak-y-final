'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Reveal from '@/components/shared/Reveal';

const LocationMap = dynamic(() => import('@/components/shared/LocationMap'), { ssr: false, loading: () => <div className="h-[450px] bg-background" /> });
const LetsWorkSection = dynamic(() => import('@/components/ui/lets-work-section'), { ssr: false, loading: () => <div className="h-64" /> });

const INITIAL = { name: '', email: '', subject: '', message: '' };

export default function ContactPage() {
  const t = useTranslations('Contact');
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const set = (key: keyof typeof INITIAL, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('request failed');
      setForm(INITIAL);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-6 py-4 rounded-2xl bg-background/50 border border-black/10 dark:border-white/10 focus:border-primary-light outline-none transition-colors font-light text-sm';

  return (
    <div className="min-h-screen pt-40 pb-24 relative overflow-hidden bg-transparent z-10">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <Reveal
            as="h1"
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-slate-900 to-slate-900/40 dark:from-white dark:to-white/40 bg-clip-text text-transparent leading-tight"
          >
            {t('title')}
          </Reveal>
          <Reveal
            as="p"
            delay={100}
            className="text-xl text-foreground/40 max-w-2xl mx-auto font-light"
          >
            {t('subtitle')}
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          <Reveal direction="left" delay={200}>
            <div className="space-y-12">
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-accent-muted flex items-center justify-center border border-black/5 dark:border-white/5 transition-colors group-hover:bg-primary/20">
                  <MapPin className="w-6 h-6 text-primary-light" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('info.address')}</h3>
                  <p className="text-foreground/40 font-light leading-relaxed">
                    Kartaltepe Mahallesi Halkalı Caddesi 2. Orkide Sokak, No: 2, Küçükçekmece/İstanbul
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-accent-muted flex items-center justify-center border border-black/5 dark:border-white/5 transition-colors group-hover:bg-primary/20">
                  <Phone className="w-6 h-6 text-primary-light" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('info.phone')}</h3>
                  <div className="space-y-2">
                    <a href="tel:+902126011500" className="block text-foreground/40 font-light hover:text-primary-light transition-colors">
                      0 212 601 15 00
                    </a>
                    <a href="tel:+905493880884" className="block text-foreground/40 font-light hover:text-primary-light transition-colors">
                      0 549 388 08 84
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-accent-muted flex items-center justify-center border border-black/5 dark:border-white/5 transition-colors group-hover:bg-primary/20">
                  <Mail className="w-6 h-6 text-primary-light" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('info.email')}</h3>
                  <a href="mailto:sefakoy.finalabd@gmail.com" className="text-foreground/40 font-light leading-relaxed hover:text-primary-light transition-colors block">
                    sefakoy.finalabd@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={200}
            className="p-10 rounded-[40px] bg-slate-100 dark:bg-accent-muted border border-black/10 dark:border-white/10 relative"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium text-foreground/40 ml-1">{t('form.name')}</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium text-foreground/40 ml-1">{t('form.email')}</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-subject" className="text-sm font-medium text-foreground/40 ml-1">{t('form.subject')}</label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => set('subject', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm font-medium text-foreground/40 ml-1">{t('form.message')}</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-5 bg-[#E21F26] hover:bg-[#BE1821] disabled:opacity-60 text-white font-medium rounded-2xl transition-all shadow-[0_0_20px_rgba(226,31,38,0.3)] hover:shadow-[0_0_30px_rgba(226,31,38,0.5)] flex items-center justify-center gap-2 group"
              >
                {status === 'sending' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : status === 'sent' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : null}
                {status === 'sent' ? 'Mesajınız Alındı' : t('form.send')}
                {status === 'idle' && <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              </button>

              {status === 'error' && (
                <p role="alert" className="text-sm text-[#E21F26] text-center">
                  Mesaj gönderilemedi. Lütfen tekrar deneyin veya bizi arayın.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>

      {/* Harita ve CTA */}
      <LocationMap />
      <LetsWorkSection />
    </div>
  );
}
