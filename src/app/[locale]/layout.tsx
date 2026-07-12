import type { Metadata } from 'next';
import {getMessages, getTranslations} from 'next-intl/server';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileStickyButton from '@/components/shared/MobileStickyButton';
import Providers from './providers';
import {locales} from '@/config/locales';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
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
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
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
        {/* JSON-LD: LocalBusiness structured data */}
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
              sameAs: [],
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
        {/* Arka Plan İkonu (Global Mühür) — sadece desktop, lazy */}
        <div className="hidden md:block fixed top-[15%] right-[-250px] w-[900px] h-[900px] opacity-[0.08] rotate-12 pointer-events-none z-0">
          <Image 
            src="/logos/sefak%C3%B6ylogo.png" 
            alt="" 
            fill 
            className="object-contain"
            loading="lazy"
            sizes="900px"
          />
        </div>

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
