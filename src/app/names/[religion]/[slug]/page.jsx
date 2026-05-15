import { notFound } from 'next/navigation';
import { getSiteUrl } from '@/lib/seo/site';
import { generateNamePageMetadata, generateNamePageSchemas } from '@/lib/seo/name-page-seo';
import { serverFetchNameDetail } from '@/lib/api/server-fetch';
import NameDetail from '@/components/name/NameDetail';
import Script from 'next/script';

// ISR with 30-day cache — name data rarely changes
export const revalidate = 2592000; // 30 days
export const dynamicParams = true;

const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];

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

  const nameData = await serverFetchNameDetail(religion, slug);
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

  const nameData = await serverFetchNameDetail(religion, slug);
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