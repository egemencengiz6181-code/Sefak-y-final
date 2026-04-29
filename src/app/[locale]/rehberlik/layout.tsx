import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const origin = 'https://www.sefakoyfinal.com';
  const path = `${origin}/${locale}/rehberlik`;

  const title = locale === 'en'
    ? 'Guidance & Counseling | Sefaköy Final LGS Academy'
    : 'Rehberlik & Psikolojik Danışmanlık | Sefaköy Final LGS Dershanesi';
  const description = locale === 'en'
    ? 'Psychological support, attention tests and individual guidance services for our students.'
    : 'Öğrencilerimiz için psikolojik destek, dikkat testleri ve bireysel rehberlik hizmetleri.';

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        tr: `${origin}/tr/rehberlik`,
        en: `${origin}/en/rehberlik`,
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      locale: locale === 'en' ? 'en_US' : 'tr_TR',
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function RehberlikLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
