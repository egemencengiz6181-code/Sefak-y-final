import type { MetadataRoute } from 'next';

const origin = 'https://www.sefakoyfinal.com';
const locales = ['tr'] as const;

// Must stay in sync with generateStaticParams in services/[slug]/page.tsx
const serviceSlugs = [
  'ilkokul-grubu',
  '5-sinif',
  '6-sinif',
  '7-sinif',
  '8-sinif',
  '8-sinif-vip',
  '9-sinif',
  '10-sinif',
  '11-sinif',
  '12-sinif',
  'mezun',
  'ozel-ders',
  'deneme-kulubu',
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── Static routes ────────────────────────────────────────────────────────────
  const staticPaths = ['', '/about', '/services', '/rehberlik', '/derecelerimiz', '/references', '/contact'];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${origin}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === '' ? ('daily' as const) : ('weekly' as const),
      priority: path === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${origin}/${l}${path}`])
        ),
      },
    }))
  );

  // ── Services detail routes ───────────────────────────────────────────────────
  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${origin}/${locale}/services/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${origin}/${l}/services/${slug}`])
        ),
      },
    }))
  );

  return [...staticEntries, ...serviceEntries];
}
