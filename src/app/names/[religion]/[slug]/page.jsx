import { notFound } from 'next/navigation';
import { getSiteUrl } from '@/lib/seo/site';
import { generateNamePageMetadata, generateNamePageSchemas } from '@/lib/seo/name-page-seo';
import NameDetail from '@/components/name/NameDetail';
import Script from 'next/script';
import { headers } from 'next/headers';

// ISR with 30-day cache — name data rarely changes
export const revalidate = 2592000; // 30 days
export const dynamicParams = true;

// Force static generation for this route
export const dynamic = 'force-static';

const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || 'https://name-meaning-site-backend.vercel.app').replace(/\/+$/, '');

/**
 * Server-side fetch using native fetch() with ISR revalidation
 * This is CRITICAL: using native fetch with next.revalidate tells Next.js
 * this data can be cached, enabling ISR (instead of making the route dynamic)
 */
async function fetchNameDetailSSR(religion, slug) {
  if (!religion || !slug) return null;

  const normalizedReligion = religion.toLowerCase();
  const safeSlug = encodeURIComponent(String(slug).trim().toLowerCase());

  try {
    const res = await fetch(`${API_BASE}/api/v1/names/${normalizedReligion}/${safeSlug}`, {
      next: { revalidate: 2592000 }, // 30 days — enables ISR caching
    });

    if (!res.ok) {
      // Try legacy endpoint as fallback
      const fallbackRes = await fetch(`${API_BASE}/api/names/${normalizedReligion}/${safeSlug}`, {
        next: { revalidate: 2592000 },
      });
      if (!fallbackRes.ok) return null;
      const fallbackData = await fallbackRes.json();
      if (fallbackData.success && fallbackData.data) return fallbackData.data;
      return null;
    }

    const data = await res.json();
    if (data.success && data.data) {
      const nameData = data.data;
      // Normalize religion
      if (nameData.religion) {
        const r = nameData.religion.toLowerCase();
        if (r === 'islamic' || r === 'muslim') nameData.religion = 'islamic';
        else if (r === 'christianity' || r === 'christian') nameData.religion = 'christian';
        else if (r === 'hinduism' || r === 'hindu') nameData.religion = 'hindu';
      }
      return nameData;
    }

    return null;
  } catch (error) {
    return null;
  }
}

function normalizeSlug(slug) {
  if (!slug || typeof slug !== 'string') return null;
  return slug.trim().toLowerCase();
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const religion = normalizeReligion(resolvedParams?.religion);
  const slug = normalizeSlug(resolvedParams?.slug);

  if (!religion || !slug) {
    return {
      title: 'Name Not Found | NameVerse',
      description: 'The requested baby name page could not be found on NameVerse.',
      keywords: ['NameVerse', 'baby names', 'name meaning site'],
    };
  }

  const nameData = await fetchNameDetailSSR(religion, slug);
  if (!nameData) {
    return {
      title: 'Name Not Found | NameVerse',
      description: 'The requested baby name page could not be found on NameVerse.',
      keywords: ['NameVerse', 'name not found', 'baby name meanings'],
    };
  }

  return generateNamePageMetadata(nameData, religion, slug);
}

function normalizeReligion(religion) {
  if (!religion || typeof religion !== 'string') return null;
  const normalized = religion.toLowerCase();

  if (normalized === 'islam' || normalized === 'muslim') return 'islamic';
  if (normalized === 'hinduism') return 'hindu';
  if (normalized === 'christianity') return 'christian';

  return VALID_RELIGIONS.includes(normalized) ? normalized : null;
}

export default async function NameDetailPage({ params }) {
  const resolvedParams = await params;
  const religion = normalizeReligion(resolvedParams?.religion);
  const slug = normalizeSlug(resolvedParams?.slug);

  if (!religion || !slug) {
    return notFound();
  }

  const nameData = await fetchNameDetailSSR(religion, slug);
  if (!nameData) {
    return notFound();
  }

  const pageUrl = `${getSiteUrl()}/names/${religion}/${slug}`;
  const schemas = generateNamePageSchemas(nameData, religion, slug);
  const faqData = schemas.faqData || [];

  return (
    <>
      {schemas.faq && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }}
        />
      )}

      {schemas.article && (
        <Script
          id="article-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }}
        />
      )}

      {schemas.breadcrumb && (
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }}
        />
      )}

      <NameDetail data={nameData} faqData={faqData} pageUrl={pageUrl} />
    </>
  );
}