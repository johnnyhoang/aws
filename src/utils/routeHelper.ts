import { PortalMode } from '../context/LearningContext';
import { NavTab } from '../components/Navbar';

export const PORTAL_SLUGS: Record<PortalMode, string> = {
  fundamentals: 'fundamentals',
  web_domain: 'web-domain',
  database: 'database',
  linux_admin: 'linux',
  aws: 'aws',
  open_source: 'opensource',
  email_mastery: 'email',
  vercel: 'vercel',
  resend: 'resend',
  supabase: 'supabase',
  neon: 'neon',
  app_system: 'app-system'
};

export const SLUG_TO_PORTAL: Record<string, PortalMode> = {
  'fundamentals': 'fundamentals',
  'it': 'fundamentals',
  'fund': 'fundamentals',
  'web-domain': 'web_domain',
  'web_domain': 'web_domain',
  'domain': 'web_domain',
  'web': 'web_domain',
  'database': 'database',
  'db': 'database',
  'linux': 'linux_admin',
  'linux-admin': 'linux_admin',
  'linux_admin': 'linux_admin',
  'sysadmin': 'linux_admin',
  'aws': 'aws',
  'cloud': 'aws',
  'opensource': 'open_source',
  'open-source': 'open_source',
  'open_source': 'open_source',
  'oss': 'open_source',
  'email': 'email_mastery',
  'mail': 'email_mastery',
  'email-mastery': 'email_mastery',
  'email_mastery': 'email_mastery',
  'vercel': 'vercel',
  'frontend-cloud': 'vercel',
  'resend': 'resend',
  'email-api': 'resend',
  'supabase': 'supabase',
  'baas': 'supabase',
  'neon': 'neon',
  'neon-db': 'neon',
  'serverless-postgres': 'neon',
  'app-system': 'app_system',
  'app_system': 'app_system',
  'unified-infra': 'app_system',
  'unified_infra': 'app_system',
  'infra': 'app_system',
  'app': 'app_system'
};

export interface ParsedRoute {
  portalMode?: PortalMode;
  activeTab?: NavTab;
}

/**
 * Parse current URL (pathname, search, hash) to extract portalMode and activeTab
 */
export const parseCurrentUrl = (): ParsedRoute => {
  if (typeof window === 'undefined') return {};

  const pathname = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
  const params = new URLSearchParams(window.location.search);

  // 1. Check query param: ?book=opensource&tab=learn
  const bookParam = params.get('book')?.toLowerCase();
  const tabParam = params.get('tab')?.toLowerCase() as NavTab;

  if (bookParam && SLUG_TO_PORTAL[bookParam]) {
    return {
      portalMode: SLUG_TO_PORTAL[bookParam],
      activeTab: (tabParam === 'learn' || tabParam === 'test' || tabParam === 'play') ? tabParam : undefined
    };
  }

  // 2. Check hash route: #/opensource/test
  if (hash) {
    const parts = hash.split('/').filter(Boolean);
    const slug = parts[0];
    const subTab = parts[1] as NavTab;
    if (slug && SLUG_TO_PORTAL[slug]) {
      return {
        portalMode: SLUG_TO_PORTAL[slug],
        activeTab: (subTab === 'learn' || subTab === 'test' || subTab === 'play') ? subTab : undefined
      };
    }
  }

  // 3. Check path route: /opensource or /opensource/test
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0) {
    const slug = segments[0];
    const subTab = segments[1] as NavTab;
    if (slug && SLUG_TO_PORTAL[slug]) {
      return {
        portalMode: SLUG_TO_PORTAL[slug],
        activeTab: (subTab === 'learn' || subTab === 'test' || subTab === 'play') ? subTab : undefined
      };
    }
  }

  return {};
};

/**
 * Update browser URL cleanly without page reload
 */
export const syncUrlRoute = (portalMode: PortalMode, activeTab: NavTab) => {
  if (typeof window === 'undefined') return;

  const slug = PORTAL_SLUGS[portalMode] || 'fundamentals';
  const targetPath = activeTab === 'learn' ? `/${slug}` : `/${slug}/${activeTab}`;

  if (window.location.pathname !== targetPath) {
    window.history.pushState({ portalMode, activeTab }, '', targetPath);
  }
};
