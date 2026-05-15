'use client';

import Script from 'next/script';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, List, Grid, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useMemo, useCallback } from 'react';
import FavoriteButton from '@/components/FavoriteButton';
import SearchWithSuggestions from '@/components/SearchWithSuggestions';

export default function SearchResultsClient({
  initialNames,
  searchTerm,
  totalNames,
}) {
  const router = useRouter();

  const initialTotalResults = totalNames;
  const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';
  const dynamicTitle = `${searchTerm} - Names | NameVerse`;
  const dynamicDescription = `Discover ${initialTotalResults} name results for ${searchTerm}. Expert meanings, origins, and inspiration for your search.`;
  const canonicalURL = `${DOMAIN}/search/${encodeURIComponent(searchTerm)}`;

  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('all');
  const [names, setNames] = useState(initialNames || []);
  const [searchResultsCount, setSearchResultsCount] = useState(initialTotalResults || 0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const displayNames = names;

  // SEO Schemas
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the meaning and etymology behind names in ${searchTerm}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most names here present linguistic roots, cultural context, and how they have been used or changed through history and modern usage."
        }
      },
      {
        "@type": "Question",
        "name": "How can knowing a name's origin enhance my understanding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many names trace back to fascinating origins—learning their background can reveal cultural shifts, religious significance, and how traditions spread across regions."
        }
      },
      {
        "@type": "Question",
        "name": `Can I find detailed information about ${searchTerm}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, you'll find comprehensive meanings, origins, and cultural context for names related to "${searchTerm}".`
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN },
      { "@type": "ListItem", position: 2, name: "Search", item: `${DOMAIN}/search` },
      { "@type": "ListItem", position: 3, name: searchTerm, item: canonicalURL }
    ]
  };

  const seoParagraphs = useMemo(() => [
    `Discover ${searchTerm} names with clear meanings, cultural origins, and pronunciation guides — perfect for new parents and curious minds.`,
    `Browse popular, modern, and unique ${searchTerm} name suggestions, curated lists, and gender-specific options to help you find the ideal name quickly.`,
    `Each entry includes origin, short meaning, usage notes, and related names so you can compare options and choose with confidence.`,
  ], [searchTerm]);

  useEffect(() => {
    const controller = new AbortController();
    const source = controller.signal;
    const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'https://name-meaning-site-backend.vercel.app';

    async function loadResults() {
      if (!searchTerm || searchTerm.trim().length < 2) {
        setNames([]);
        setSearchResultsCount(0);
        setError(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({ q: searchTerm.trim(), limit: '20' });
        // Use default caching to allow browser/CDN caching of search results
        const response = await fetch(`${apiBase}/api/v1/names/search?${params.toString()}`, {
          signal: source,
        });
        const payload = await response.json();
        const results = payload.data || payload.results || [];
        const count = payload.count || payload.total || results.length;
        setNames(results);
        setSearchResultsCount(count);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Unable to load search results.');
          setNames([]);
          setSearchResultsCount(0);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadResults();
    return () => controller.abort();
  }, [searchTerm]);

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      <main className="min-h-screen bg-white pt-4 pb-12">
        <nav className="max-w-4xl mx-auto mb-4 flex items-center gap-4 px-4">
          <Link href="/" aria-label="Back to Home" className="rounded-full p-2 bg-indigo-50 hover:bg-indigo-100">
            <ArrowLeft className="w-5 h-5 text-indigo-700" />
          </Link>
          <span className="font-medium text-gray-600">Back to Home</span>
        </nav>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto px-4 mb-4">
          <SearchWithSuggestions />
        </div>

        <nav
          className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3 justify-between items-center px-4 py-6 mb-4 border-b border-gray-100"
          aria-label="View options"
        >
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-indigo-900 tracking-tight">{searchTerm}</h1>
            <span className="text-base text-indigo-700 font-semibold">({searchResultsCount} results)</span>
          </div>

          <div className="flex gap-1 bg-gray-50 rounded-md px-2 py-1">
            <button
              onClick={() => setViewMode('grid')}
              aria-pressed={viewMode === 'grid'}
              aria-label="Grid view"
              className={`p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 transition
                ${viewMode === 'grid'
                  ? 'bg-indigo-700 text-white shadow'
                  : 'text-indigo-700 hover:text-indigo-800'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-pressed={viewMode === 'list'}
              aria-label="List view"
              className={`p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 transition
                ${viewMode === 'list'
                  ? 'bg-indigo-700 text-white shadow'
                  : 'text-indigo-700 hover:text-indigo-800'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </nav>

        

        <section className="max-w-4xl mx-auto px-4 pt-2 pb-6" role="main">
          {isLoading ? (
            <SkeletonResults />
          ) : searchResultsCount === 0 ? (
            <EmptyState searchTerm={searchTerm} />
          ) : (
            <div className="space-y-12">
              {/* Names Section */}
              {(activeTab === 'all' || activeTab === 'names') && displayNames.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-indigo-900 mb-5">Names & Meanings</h2>
                  <ResultGrid viewMode={viewMode}>
                    {displayNames.map((name, idx) => (
                      <NameCard
                        key={name._id || idx}
                        name={name}
                        viewMode={viewMode}
                        index={idx}
                        searchTerm={searchTerm}
                        router={router}
                      />
                    ))}
                  </ResultGrid>
                </div>
              )}

              
            </div>
          )}
        </section>

        <section className="bg-white px-4 py-10 border-t border-gray-100 mt-8 shadow-sm">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-indigo-900 mb-5">
              Complete Guide to {searchTerm} Names & Meanings
            </h2>

            {/* Enhanced SEO Content */}
            <div className="prose prose-indigo max-w-none mb-6">
              {seoParagraphs.map((txt, i) => (
                <p key={i} className="text-base text-gray-700 leading-relaxed mb-4">{txt}</p>
              ))}

              {displayNames && displayNames.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-indigo-800 mb-3">Quick Picks — Popular {searchTerm} Names</h4>
                  <div className="flex flex-wrap gap-2">
                    {displayNames.slice(0, 8).map((n) => {
                      const religionMap = {
                        'islam': 'islamic',
                        'islamic': 'islamic',
                        'hindu': 'hindu',
                        'hinduism': 'hindu',
                        'christian': 'christian',
                        'christianity': 'christian',
                      };
                      const religion = religionMap[n.religion?.toLowerCase()] || 'islamic';
                      return (
                        <Link
                          key={n._id}
                          href={`/names/${religion}/${n.slug}`}
                          className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
                        >
                          {n.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-indigo-900 mb-4">Why Choose a Name from {searchTerm}?</h3>
            <ul className="space-y-3 text-base text-gray-800 font-semibold list-disc pl-6 mb-6">
              <li>
                <strong>Deep Cultural Heritage:</strong> Explore the origin, cultural background, and symbolism of names related to{' '}
                <strong>{searchTerm}</strong>, connecting your baby to centuries of tradition and meaning.
              </li>
              <li>
                <strong>Comprehensive Information:</strong> Discover rich meanings, etymology, linguistic notes, and usage patterns across different cultures and time periods.
              </li>
              <li>
                <strong>Multiple Language Support:</strong> Access authentic pronunciations and meanings in English, Urdu, Arabic, Hindi, and other languages.
              </li>
              <li>
                <strong>Spiritual Significance:</strong> Learn about the religious and spiritual importance of each name in Islamic, Christian, or Hindu traditions.
              </li>
              <li>
                <strong>Numerology & Lucky Elements:</strong> Enhance your knowledge about naming traditions including lucky numbers, colors, stones, and personality traits.
              </li>
            </ul>
            <div className="bg-white rounded-xl border border-gray-100 p-6 mt-8 shadow-md">
              <h3 className="font-bold text-indigo-900 mb-2">Frequently Asked Questions</h3>
              <ul className="space-y-4 text-base text-gray-700 font-medium">
                <li>
                  <span className="font-extrabold text-indigo-700">Q:</span> What is the meaning and etymology behind names in {searchTerm}?
                </li>
                <li>
                  <span className="font-extrabold text-indigo-700">A:</span> Most names here present linguistic roots, cultural context, and how they have been used or changed through history and modern usage.
                </li>
                <li>
                  <span className="font-extrabold text-indigo-700">Q:</span> How can knowing a name's origin enhance my understanding?
                </li>
                <li>
                  <span className="font-extrabold text-indigo-700">A:</span> Many names trace back to fascinating origins—learning their background can reveal cultural shifts, religious significance, and how traditions spread across regions.
                </li>
                <li>
                  <span className="font-extrabold text-indigo-700">Q:</span> Can I find detailed information about {searchTerm}?
                </li>
                <li>
                  <span className="font-extrabold text-indigo-700">A:</span> Yes, you'll find comprehensive meanings, origins, and cultural context for names related to "{searchTerm}".
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function ResultGrid({ viewMode, children }) {
  return viewMode === 'grid'
    ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">{children}</div>
    : <div className="flex flex-col gap-4">{children}</div>;
}

function EmptyState({ searchTerm }) {
  return (
    <div className="text-center py-16 min-h-[300px] flex flex-col justify-center bg-white rounded-2xl shadow-lg">
      <Search className="w-14 h-14 mx-auto mb-4 text-gray-200" aria-hidden="true" />
      <h2 className="text-2xl font-extrabold text-indigo-700 mb-3">No Results Found</h2>
      <p className="text-gray-600 mb-4 text-base">
        No names found for <span className="font-bold">{searchTerm}</span>. Try different keywords or browse popular names.
      </p>
      <Link href="/" className="inline-block mt-2 px-8 py-3 bg-indigo-700 text-white rounded-full font-bold text-base shadow hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" aria-label="Back to Home">
        Back to Home
      </Link>
    </div>
  );
}

function NameCard({ name, viewMode, index, searchTerm, router }) {
  // API returns "Islam" but we need "islamic" for the URL
  const religionMap = {
    'islam': 'islamic',
    'islamic': 'islamic',
    'hindu': 'hindu',
    'hinduism': 'hindu',
    'christian': 'christian',
    'christianity': 'christian',
  };
  const religion = religionMap[name.religion?.toLowerCase()] || 'islamic';
  const url = `/names/${religion}/${name.slug || name.name?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <article
      className="group transition-transform duration-300 hover:scale-[1.038] hover:shadow-xl rounded-2xl border border-gray-100 bg-white px-6 py-7 flex flex-col items-start cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
      tabIndex={0}
      aria-label={`View details for ${name.name}`}
      role="button"
    >
      <div className="flex items-start justify-between w-full mb-3">
        <h3
          className="text-2xl font-extrabold text-indigo-900 tracking-tight group-hover:text-indigo-700 transition-colors cursor-pointer"
          itemProp="name"
          onClick={() => router.push(url)}
        >
          {name.name}
        </h3>
        <FavoriteButton
          nameData={{
            name: name.name,
            slug: name.slug || name.name?.toLowerCase().replace(/\s+/g, '-'),
            religion: religion,
            meaning: name.short_meaning || name.long_meaning,
            origin: name.origin
          }}
          size="small"
        />
      </div>
      {(name.short_meaning || name.long_meaning) && (
        <p className="text-gray-700 text-base mb-2 line-clamp-2 cursor-pointer" onClick={() => router.push(url)}>
          {name.short_meaning || name.long_meaning}
        </p>
      )}
      {name.origin && (
        <span className="inline-block text-xs mt-2 px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-bold uppercase tracking-wider cursor-pointer" itemProp="description" onClick={() => router.push(url)}>
          {name.origin}
        </span>
      )}
    </article>
  );
}


function SkeletonResults() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="rounded-2xl bg-gray-100 animate-pulse p-6 h-44">
          <div className="w-3/4 h-6 bg-gray-300 rounded mb-3"></div>
          <div className="w-1/2 h-4 bg-gray-200 rounded mb-2"></div>
          <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}
