import { getTranslations } from 'next-intl/server';
import ServicesPageClient from './ServicesPageClient';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services' });

  const cards = [
    { slug: '5-sinif',       icon: 'BookOpen',      span: 'md:col-span-1', title: t('items.5-sinif.title'),       description: t('items.5-sinif.description') },
    { slug: '6-sinif',       icon: 'BookOpen',      span: 'md:col-span-1', title: t('items.6-sinif.title'),       description: t('items.6-sinif.description') },
    { slug: '7-sinif',       icon: 'GraduationCap', span: 'md:col-span-1', title: t('items.7-sinif.title'),       description: t('items.7-sinif.description') },
    { slug: '8-sinif',       icon: 'Trophy',        span: 'md:col-span-1', title: t('items.8-sinif.title'),       description: t('items.8-sinif.description') },
    { slug: '8-sinif-vip',   icon: 'Star',          span: 'md:col-span-1', title: t('items.8-sinif-vip.title'),   description: t('items.8-sinif-vip.description') },
    { slug: 'ozel-ders',     icon: 'Users',         span: 'md:col-span-1', title: t('items.ozel-ders.title'),     description: t('items.ozel-ders.description') },
    { slug: 'deneme-kulubu', icon: 'FileText',      span: 'md:col-span-1', title: t('items.deneme-kulubu.title'), description: t('items.deneme-kulubu.description') },
  ];

  return (
    <ServicesPageClient
      pageTitle={t('title')}
      pageSubtitle={t('subtitle')}
      sectionLise={t('sections.lise')}
      sectionMezun={t('sections.mezun')}
      sectionVip={t('sections.vip')}
      sectionDestek={t('sections.destek')}
      cards={cards}
    />
  );
}
