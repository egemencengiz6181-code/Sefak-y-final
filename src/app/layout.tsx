import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.halkalifinal.com'),
  title: {
    default: 'Halkalı Final LGS Dershanesi',
    template: '%s | Halkalı Final LGS Dershanesi',
  },
  description: "Küçükçekmece — Halkalı Final LGS Dershanesi. LGS'de hedef liseye giden yol.",
  authors: [{ name: 'Halkalı Final LGS Dershanesi', url: 'https://www.halkalifinal.com' }],
  creator: 'Halkalı Final LGS Dershanesi',
  publisher: 'Halkalı Final LGS Dershanesi',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/logos/final%20logo%20png.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Halkalı Final LGS Dershanesi',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@halkalifinal_lgs',
    creator: '@halkalifinal_lgs',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
