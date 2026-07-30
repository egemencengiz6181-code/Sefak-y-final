import type { AbstractIntlMessages } from 'next-intl';

/**
 * Namespaces that client components actually read via useTranslations().
 * Everything else in messages/*.json is consumed only on the server
 * (page bodies, generateMetadata) and must never reach the browser.
 */
const CLIENT_NAMESPACES = [
  'Navbar',      // Navbar.tsx, hover-footer.tsx
  'Footer',      // hover-footer.tsx, AnalysisModal.tsx
  'HeroMain',    // hero-main.tsx
  'AnalysisModal', // AnalysisModal.tsx, MobileStickyButton.tsx
  'Contact',     // contact/page.tsx, lets-work-section.tsx
  'LetsWork',    // lets-work-section.tsx
  'About',       // about/page.tsx
  'FormLanding', // form/page.tsx
] as const;

/**
 * Services.items holds the full long-form copy for every service page
 * (~40 kB — intro, body, phase texts, meta tags). The only client consumer
 * is the Navbar mega-menu, which needs nothing but the label and the
 * one-line description, so the rest is stripped out.
 */
const SERVICE_ITEM_CLIENT_KEYS = ['title', 'description'] as const;

const SERVICES_CLIENT_KEYS = ['title', 'subtitle', 'sections', 'cta', 'back'] as const;

type Dict = Record<string, unknown>;

function pick(source: Dict | undefined, keys: readonly string[]): Dict {
  if (!source) return {};
  const out: Dict = {};
  for (const key of keys) {
    if (source[key] !== undefined) out[key] = source[key];
  }
  return out;
}

/**
 * Builds the message subset handed to NextIntlClientProvider. Keeping the
 * server-only copy out of the RSC flight payload removes ~40 kB of inline
 * JSON from the HTML of every single page.
 */
export function getClientMessages(messages: AbstractIntlMessages): AbstractIntlMessages {
  const all = messages as unknown as Dict;
  const out: Dict = {};

  for (const ns of CLIENT_NAMESPACES) {
    if (all[ns] !== undefined) out[ns] = all[ns];
  }

  const services = all.Services as Dict | undefined;
  if (services) {
    const trimmed = pick(services, SERVICES_CLIENT_KEYS);
    const items = services.items as Record<string, Dict> | undefined;

    if (items) {
      const trimmedItems: Dict = {};
      for (const [slug, item] of Object.entries(items)) {
        trimmedItems[slug] = pick(item, SERVICE_ITEM_CLIENT_KEYS);
      }
      trimmed.items = trimmedItems;
    }

    out.Services = trimmed;
  }

  return out as AbstractIntlMessages;
}
