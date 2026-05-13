import SearchResultsClient from './ClientComponent';
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

// ISR with 1-hour cache for search results - popular terms get cached
export const revalidate = 2592000; // 1 hour
export const dynamicParams = true;

// ---------------- Metadata ----------------
export const generateMetadata = async ({ params }) => {
  const resolvedParams = await params;
  const { term } = resolvedParams;
  const decodedTerm = decodeURIComponent(term || '');
  const canonicalUrl = `${DOMAIN}/search/${encodeURIComponent(decodedTerm)}`;

  return {
    title: validateMetaTitle(`${decodedTerm} - Names | NameVerse`),
    description: validateMetaDescription(`Search NameVerse for ${decodedTerm} and discover baby names, meanings, origins, and pronunciation details.`),
    keywords: [
      decodedTerm,
      `${decodedTerm} names`,
      `${decodedTerm} meanings`,
      'name meanings',
      'name origins',
      'baby names',
      'name inspiration',
      `${decodedTerm} etymology`,
    ].join(', '),
    authors: [{ name: 'NameVerse' }],
    openGraph: {
      title: validateMetaTitle(`${decodedTerm} - Names`),
      description: validateMetaDescription(`Search NameVerse for ${decodedTerm} and discover baby names, meanings, and cultural origins.`),
      type: 'website',
      url: canonicalUrl,
      siteName: 'NameVerse',
    },
    twitter: {
      card: 'summary_large_image',
      title: validateMetaTitle(`${decodedTerm} - Names`),
      description: validateMetaDescription(`Search NameVerse for ${decodedTerm} and discover baby names, meanings, and cultural origins.`),
    },
    robots: { index: false, follow: true },
    alternates: { canonical: canonicalUrl, languages: { en: canonicalUrl, 'x-default': canonicalUrl } },
  };
};

export default function SearchPage({ params }) {
  const { term } = params;
  const decodedTerm = decodeURIComponent(term || '');

  return (
    <SearchResultsClient searchTerm={decodedTerm} />
  );
}
