import { getTranslations } from 'next-intl/server';
import ReferencesMarquee from '@/components/sections/ReferencesMarquee';

type Student = {
  name: string;
  school: string;
  percentile: string;
  quote: string;
  program: string;
};

const students: Student[] = [
  {
    name: 'Ahmet Y.',
    school: 'Galatasaray Lisesi',
    percentile: '%0.12',
    quote: 'VIP sınıfı sayesinde her konuyu bireysel olarak pekiştirebildim. Hedefime emin adımlarla ulaştım.',
    program: '8. Sınıf VIP',
  },
  {
    name: 'Zeynep K.',
    school: 'İstanbul Kız Lisesi',
    percentile: '%0.28',
    quote: 'Haftalık deneme analizleri eksiklerimi görmemi sağladı. Her hafta biraz daha ilerledim.',
    program: '8. Sınıf',
  },
  {
    name: 'Mert A.',
    school: 'Kabataş Erkek Lisesi',
    percentile: '%0.45',
    quote: 'Öğretmenlerim hem soru çözümünde hem psikolojik destekte her zaman yanımdaydı.',
    program: '8. Sınıf VIP',
  },
  {
    name: 'Elif D.',
    school: 'Cağaloğlu Anadolu Lisesi',
    percentile: '%0.67',
    quote: 'Rehberlik servisimiz doğru hedef okul stratejisini birlikte belirlememize yardımcı oldu.',
    program: '7. Sınıf → 8. Sınıf',
  },
  {
    name: 'Burak S.',
    school: 'İstanbul Erkek Lisesi',
    percentile: '%0.38',
    quote: 'XYS modeliyle eksik konularıma odaklanarak puanımı hızla yükselttim.',
    program: '8. Sınıf VIP',
  },
  {
    name: 'Selin T.',
    school: 'Haydarpaşa Lisesi',
    percentile: '%0.89',
    quote: 'Küçük sınıf ortamında bireysel ilgi gördüm; motivasyonum hiç düşmedi.',
    program: '8. Sınıf',
  },
  {
    name: 'Kaan M.',
    school: 'Pertevniyal Anadolu Lisesi',
    percentile: '%1.14',
    quote: 'Baykuş Kütüphanesi\'nde düzenli çalışma alışkanlığı kazandım. Bu fark yarattı.',
    program: '7. Sınıf → 8. Sınıf',
  },
  {
    name: 'Ayşe N.',
    school: 'Vefa Lisesi',
    percentile: '%0.91',
    quote: 'Deneme kulübü sayesinde sınav stresini çok önceden aştım ve rahat performans gösterdim.',
    program: 'Deneme Kulübü + 8. Sınıf',
  },
];

function AchievementCard({ name, school, percentile, quote, program }: Student) {
  return (
    <div className="group relative rounded-2xl p-px overflow-hidden">
      {/* Gradient border layer */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E21F26]/40 via-[#2E3192]/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Card body */}
      <div className="relative rounded-[15px] bg-white dark:bg-neutral-900 px-5 py-7 flex flex-col gap-3 h-full">
        {/* Badge: percentile */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full bg-[#E21F26]/10 text-[#E21F26] dark:bg-[#E21F26]/20 dark:text-[#EF8487]">
            LGS {percentile}
          </span>
          <span className="text-[10px] font-semibold text-foreground/40 truncate max-w-[110px] text-right">{program}</span>
        </div>
        {/* School */}
        <p className="text-lg font-black text-foreground leading-tight">{school}</p>
        {/* Quote */}
        <p className="text-xs text-foreground/50 leading-relaxed flex-1">"{quote}"</p>
        {/* Student name */}
        <p className="text-xs font-semibold text-foreground/35 mt-1">— {name}</p>
      </div>
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl bg-primary/15" />
    </div>
  );
}

export default async function ReferencesPage() {
  const t = await getTranslations('References');

  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 blur-[140px] rounded-full" />
        </div>
        <div className="relative max-w-3xl mx-auto space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/70">
            Başarı Hikayeleri
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
            {t('title')}
          </h1>
          <p className="text-lg text-foreground/50 max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* ── Student Cards Grid ─────────────────────────────────────────────── */}
      <section className="pb-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {students.map((student) => (
            <AchievementCard key={student.name} {...student} />
          ))}
        </div>
      </section>

      {/* ── Marquee Section ────────────────────────────────────────────────── */}
      <ReferencesMarquee />
    </main>
  );
}
