import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sefakoyfinal.com'),
  title: {
    default: 'Sefaköy Final LGS Dershanesi',
    template: '%s | Sefaköy Final LGS Dershanesi',
  },
  description: "Küçükçekmece — Sefaköy Final LGS Dershanesi. LGS'de hedef okula giden yol.",
  authors: [{ name: 'Sefaköy Final LGS Dershanesi', url: 'https://www.sefakoyfinal.com' }],
  creator: 'Sefaköy Final LGS Dershanesi',
  publisher: 'Sefaköy Final LGS Dershanesi',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/logos/sefak%C3%B6ylogo.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Sefaköy Final LGS Dershanesi',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sefakoyfinal',
    creator: '@sefakoyfinal',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
