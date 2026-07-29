import type { Metadata } from 'next';
import {getMessages, getTranslations} from 'next-intl/server';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileStickyButton from '@/components/shared/MobileStickyButton';
import Providers from './providers';
import {locales} from '@/config/locales';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Index' });

  const origin = 'https://www.sefakoyfinal.com';

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Sefaköy LGS Dershanesi',
      'Küçükçekmece dershanesi',
      'LGS hazırlık',
      'YKS hazırlık',
      'İstanbul dershaneleri',
      'Sefaköy Final',
      'ortaokul kursu',
      'lise kursu',
      '5. sınıf kursu',
      '6. sınıf kursu',
      '7. sınıf kursu',
      '8. sınıf kursu',
      'TYT AYT kursu',
    ],
    category: 'education',
    alternates: {
      canonical: `${origin}/${locale}`,
    },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      siteName: 'Sefaköy Final LGS Dershanesi',
      title: t('title'),
      description: t('description'),
      url: `${origin}/${locale}`,
      images: [
        {
          url: `${origin}/logos/sefak%C3%B6ylogo.png`,
          width: 1200,
          height: 630,
          alt: 'Sefaköy Final LGS Dershanesi',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${origin}/logos/sefak%C3%B6ylogo.png`],
    },
    appleWebApp: {
      capable: true,
      title: 'Sefaköy Final',
      statusBarStyle: 'default',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* JSON-LD: EducationalOrganization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Sefaköy Final LGS Dershanesi',
              alternateName: 'Sefaköy Final',
              url: 'https://www.sefakoyfinal.com',
              logo: 'https://www.sefakoyfinal.com/logos/sefak%C3%B6ylogo.png',
              description: 'İstanbul Küçükçekmece Sefaköy\'de LGS ve YKS hazırlık kursu. 46 yıllık deneyim, %94 başarı oranı.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Sefaköy',
                addressLocality: 'Küçükçekmece',
                addressRegion: 'İstanbul',
                addressCountry: 'TR',
              },
              telephone: '+902126011500',
              email: 'sefakoy.finalabd@gmail.com',
              sameAs: ['https://www.instagram.com/sefakoyfinal/'],
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                  opens: '09:00',
                  closes: '21:00',
                },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-primary/30 min-h-screen relative font-sans" suppressHydrationWarning>
        <Providers locale={locale} messages={messages ?? {}}>
            <Navbar />
            <main className="relative z-10 pb-20 md:pb-0">
              {children}
            </main>
            <Footer />
            {/* Mobil sticky buton — her sayfada görünür, layout seviyesinde */}
            <MobileStickyButton />
        </Providers>
      </body>
    </html>
  );
}
