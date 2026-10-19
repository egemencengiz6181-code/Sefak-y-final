import fs from 'node:fs';
import path from 'node:path';
import { getTranslations } from 'next-intl/server';
import RankingsTabs from './RankingsTabs';
import { yksRankings, lgsRankings, type Ranking } from './data';

// Görseli henüz public/ altına eklenmemiş dereceleri gösterme (kırık görsel olmasın)
const withImage = (list: Ranking[]) =>
  list.filter((r) => fs.existsSync(path.join(process.cwd(), 'public', r.image)));

export default async function RankingsPage() {
  const t = await getTranslations('Rankings');

  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section className="pt-36 pb-14 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/70">
            {t('eyebrow')}
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
            {t('title')}
          </h1>
          <p className="text-lg text-foreground/50 max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="pb-28 px-6">
        <div className="max-w-6xl mx-auto">
          <RankingsTabs
            yks={withImage(yksRankings)}
            lgs={withImage(lgsRankings)}
            labels={{ yks: t('tab_yks'), lgs: t('tab_lgs'), empty: t('empty'), close: t('close') }}
          />
        </div>
      </section>
    </main>
  );
}
