'use client';

import { useTranslations } from 'next-intl';
import Reveal from '@/components/shared/Reveal';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface FormData {
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  grade: string;
  currentSchool: string;
  district: string;
  program: string;
  note: string;
}

const INITIAL_FORM: FormData = {
  studentName: '',
  parentName: '',
  phone: '',
  email: '',
  grade: '',
  currentSchool: '',
  district: '',
  program: '',
  note: '',
};

export default function FormLandingPage() {
  const t = useTranslations('FormLanding');
  const params = useParams();
  const locale = params.locale as string;
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format message for contact API
      const message = `
Öğrenci: ${form.studentName}
Veli: ${form.parentName}
Telefon: ${form.phone}
E-posta: ${form.email || 'Belirtilmedi'}
Sınıf: ${form.grade}
Okul: ${form.currentSchool}
İlçe: ${form.district}
Program: ${form.program}
Not: ${form.note || 'Yok'}
      `.trim();

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.studentName} (Veli: ${form.parentName})`,
          email: form.email || 'form@landing.com',
          subject: `Reklam Formu - ${form.grade} - ${form.program}`,
          message,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (e) {
      console.error(e);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const isValid =
    form.studentName &&
    form.parentName &&
    form.phone &&
    form.grade &&
    form.currentSchool &&
    form.district &&
    form.program;

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-gradient-to-b from-background via-background to-muted">
      {/* Subtle glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-[0.08] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, #E21F26 0%, #2E3192 50%, transparent 80%)',
        }}
      />

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        {/* Logo */}
        <Reveal direction="down" className="flex justify-center mb-12">
          <div className="relative w-32 h-32">
            <Image
              src="/logos/sefak%C3%B6ylogo.png"
              alt="Sefaköy Final"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Reveal>

        {!success ? (
            <Reveal className="space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-slate-900 to-slate-900/40 dark:from-white dark:to-white/40 bg-clip-text text-transparent">
                  {t('title')}
                </h1>
                <p className="text-lg text-foreground/50 font-light max-w-lg mx-auto">
                  {t('subtitle')}
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="p-8 md:p-10 rounded-[32px] bg-background/95 border border-black/10 dark:border-white/10 space-y-6 shadow-xl"
              >
                {/* Student Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#E21F26] ml-1">
                    {t('form.student_name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.studentName}
                    onChange={(e) => set('studentName', e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] outline-none transition-all text-foreground"
                  />
                </div>

                {/* Parent Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#E21F26] ml-1">
                    {t('form.parent_name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.parentName}
                    onChange={(e) => set('parentName', e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] outline-none transition-all text-foreground"
                  />
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#E21F26] ml-1">
                      {t('form.phone')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] outline-none transition-all text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#E21F26]/60 ml-1">
                      {t('form.email')}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] outline-none transition-all text-foreground"
                    />
                  </div>
                </div>

                {/* Grade */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#E21F26] ml-1">
                    {t('form.grade')} *
                  </label>
                  <select
                    required
                    value={form.grade}
                    onChange={(e) => set('grade', e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] outline-none transition-all text-foreground"
                  >
                    <option value="">Seçiniz</option>
                    <option value={t('grades.5')}>{t('grades.5')}</option>
                    <option value={t('grades.6')}>{t('grades.6')}</option>
                    <option value={t('grades.7')}>{t('grades.7')}</option>
                    <option value={t('grades.8')}>{t('grades.8')}</option>
                    <option value={t('grades.8-vip')}>{t('grades.8-vip')}</option>
                  </select>
                </div>

                {/* Current School */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#E21F26] ml-1">
                    {t('form.current_school')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.currentSchool}
                    onChange={(e) => set('currentSchool', e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] outline-none transition-all text-foreground"
                  />
                </div>

                {/* District */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#E21F26] ml-1">
                    {t('form.district')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.district}
                    onChange={(e) => set('district', e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] outline-none transition-all text-foreground"
                  />
                </div>

                {/* Program */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#E21F26] ml-1">
                    {t('form.program')} *
                  </label>
                  <select
                    required
                    value={form.program}
                    onChange={(e) => set('program', e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] outline-none transition-all text-foreground"
                  >
                    <option value="">Seçiniz</option>
                    <option value={t('programs.5-6')}>{t('programs.5-6')}</option>
                    <option value={t('programs.7-8')}>{t('programs.7-8')}</option>
                    <option value={t('programs.8-vip')}>{t('programs.8-vip')}</option>
                    <option value={t('programs.destek')}>{t('programs.destek')}</option>
                    <option value={t('programs.undecided')}>{t('programs.undecided')}</option>
                  </select>
                </div>

                {/* Note */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#E21F26]/60 ml-1">
                    {t('form.note')}
                  </label>
                  <textarea
                    rows={3}
                    value={form.note}
                    onChange={(e) => set('note', e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] outline-none transition-all text-foreground resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isValid || loading}
                  className="w-full py-5 bg-[#E21F26] hover:bg-[#BE1821] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all shadow-[0_0_20px_rgba(226,31,38,0.3)] hover:shadow-[0_0_30px_rgba(226,31,38,0.5)] disabled:shadow-none"
                >
                  {loading ? t('form.submitting') : t('form.submit')}
                </button>
              </form>
            </Reveal>
          ) : (
            <Reveal
              direction="none"
              className="text-center space-y-8 py-20"
            >
              <div className="success-pop">
                <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-foreground">{t('success.title')}</h2>
                <p className="text-xl text-foreground/50 max-w-md mx-auto">
                  {t('success.message')}
                </p>
              </div>
              <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#E21F26] hover:bg-[#BE1821] text-white font-semibold rounded-2xl transition-all shadow-[0_0_20px_rgba(226,31,38,0.3)] hover:shadow-[0_0_30px_rgba(226,31,38,0.5)]"
              >
                <ArrowLeft className="w-5 h-5" />
                {t('success.back')}
              </Link>
            </Reveal>
          )}
      </div>
    </div>
  );
}
