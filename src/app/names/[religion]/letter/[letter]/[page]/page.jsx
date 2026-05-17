import { validateMetaTitle, validateMetaDescription, generateCanonicalUrl } from '@/lib/seo/meta-helpers';
import { generateOptimizedTitle, generateOptimizedDescription, generateOptimizedKeywords, generateNamePageSchemas } from '@/lib/seo/name-page-seo';
import { serverFetchNamesByLetter } from '@/lib/api/server-fetch';
import { Sparkles, Moon, ChevronLeft, ChevronRight, Search, Star, BookOpen, Heart } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import FavoriteButton from '@/components/FavoriteButton';

const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
const NAMES_PER_PAGE = 50;

// ISR with 30-day cache - name data by letter rarely changes
export const revalidate = 2592000; // 30 days
export const dynamicParams = true;

// Pre-generate common letter/religion combinations at build time
export async function generateStaticParams() {
  const religions = ['islamic', 'christian', 'hindu'];
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const params = [];

  for (const religion of religions) {
    for (const letter of letters) {
      // Pre-generate first 3 pages for each letter/religion combo
      for (let page = 1; page <= 3; page++) {
        params.push({
          religion,
          letter,
          page: String(page),
        });
      }
    }
  }

  return params;
}

function normalizeReligion(religion) {
  if (!religion || typeof religion !== 'string') return null;
  const normalized = religion.toLowerCase();
  if (normalized === 'islam' || normalized === 'muslim') return 'islamic';
  if (normalized === 'hinduism') return 'hindu';
  if (normalized === 'christianity') return 'christian';
  return VALID_RELIGIONS.includes(normalized) ? normalized : null;
}

function normalizeLetter(letter) {
   if (!letter || typeof letter !== 'string') return 'A';
   const regex = /^[A-Z#]$/i;
   return regex.test(letter) ? letter.toUpperCase() : 'A';
}

function normalizePage(page) {
  const pageNumber = parseInt(page, 10);
  return Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
}

function generateSlug(name) {
  if (!name || typeof name !== 'string') return '';
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function getReligionEmoji(religion) {
  if (religion === 'islamic') return '☪️';
  if (religion === 'hindu') return '🕉️';
  if (religion === 'christian') return '✝️';
  return '✨';
}

function getReligionGradient(religion) {
  if (religion === 'islamic') return 'from-emerald-600 via-teal-600 to-green-700';
  if (religion === 'hindu') return 'from-orange-500 via-amber-500 to-yellow-600';
  if (religion === 'christian') return 'from-blue-600 via-indigo-600 to-purple-700';
  return 'from-emerald-600 via-teal-500 to-emerald-700';
}

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const religion = normalizeReligion(awaitedParams.religion) || 'islamic';
  const letter = normalizeLetter(awaitedParams.letter);
  const page = normalizePage(awaitedParams.page);
  const religionLabel = religion.charAt(0).toUpperCase() + religion.slice(1);
  const canonical = generateCanonicalUrl(`/names/${religion}/letter/${letter}/${page}`);

  // Generate dynamic count for more compelling title
  const countPhrase = page === 1 ? '50+' : 'Names';
  
  const titleRaw =
    page === 1
      ? `${religionLabel} Baby Names Starting with ${letter} - Meanings, Origins & Lucky Numbers | NameVerse`
      : `${religionLabel} Names Starting with ${letter} - Page ${page} | NameVerse`;

  const descRaw =
    page === 1
      ? `Discover authentic ${religionLabel} baby names beginning with "${letter}". Each name includes meaning, origin, gender, and lucky number. Explore ${countPhrase} curated ${religionLabel} names on NameVerse - trusted by parents worldwide.`
      : `Browse page ${page} of ${religionLabel} baby names starting with "${letter}". Find detailed name meanings, cultural origins, and lucky numbers. Continue your search for the perfect ${religionLabel} name.`;

  return {
    title: validateMetaTitle(titleRaw),
    description: validateMetaDescription(descRaw),
    keywords: [
      `${religionLabel} baby names starting with ${letter}`,
      `${religionLabel} names meaning ${letter}`,
      `${letter} letter ${religionLabel} names`,
      `baby name meanings ${letter}`,
      `${religionLabel} name origin ${letter}`,
      `best ${religionLabel} baby names ${letter}`,
      `${letter} baby name list`,
      `${religionLabel} names directory`,
    ].filter(Boolean).join(', '),
    openGraph: {
      title: validateMetaTitle(titleRaw),
      description: validateMetaDescription(descRaw),
      url: canonical,
      type: 'website',
      siteName: 'NameVerse',
    },
    twitter: {
      card: 'summary_large_image',
      title: validateMetaTitle(titleRaw),
      description: validateMetaDescription(descRaw),
      site: '@NameVerse',
    },
    alternates: {
      canonical,
      languages: {
        en: canonical,
        'x-default': canonical,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  };
}

function FAQSection({ religion, letter, totalCount, faqData }) {
  const religionLabel = religion.charAt(0).toUpperCase() + religion.slice(1);

  // Use provided faqData or fallback to default
  const faqs = faqData && faqData.length > 0 
    ? faqData.map((faq, index) => ({
        question: faq.q,
        answer: faq.a,
      }))
    : [
        {
          question: `What are the most popular ${religionLabel} baby names starting with "${letter}"?`,
          answer: `NameVerse features ${totalCount}+ ${religionLabel} baby names beginning with "${letter}". Each name comes with its authentic meaning, cultural origin, gender classification, and lucky number. Browse our complete list to discover traditional and modern ${religionLabel} names for your baby.`,
        },
        {
          question: `What do ${religionLabel} names starting with "${letter}" mean?`,
          answer: `${religionLabel} names beginning with "${letter}" carry rich cultural and spiritual meanings rooted in ${
            religion === 'islamic'
              ? 'Arabic, Quranic, and Islamic heritage'
              : religion === 'hindu'
              ? 'Sanskrit, Vedic, and Hindu traditions'
              : 'Biblical, Latin, and Christian traditions'
          }. Each name on NameVerse includes a detailed meaning explanation, helping parents choose a name with a beautiful and significant meaning.`,
        },
        {
          question: `Are ${religionLabel} names starting with "${letter}" suitable for boys or girls?`,
          answer: `${religionLabel} names starting with "${letter}" include both boy names, girl names, and some unisex options. On each name card, you can find the gender classification. Use our filters to browse exclusively ${religionLabel} boy names or ${religionLabel} girl names beginning with "${letter}".`,
        },
        {
          question: `How do I find the origin of a ${religionLabel} name starting with "${letter}"?`,
          answer: `Every name on NameVerse includes its origin — whether Arabic, Persian, Urdu, Sanskrit, Hebrew, Latin, or Greek. Simply click on any ${religionLabel} name starting with "${letter}" to access its full profile, including origin, meaning, pronunciation, lucky number, and lucky stone.`,
        },
        {
          question: `Can I save my favourite ${religionLabel} baby names starting with "${letter}"?`,
          answer: `Yes! NameVerse allows you to save favourite baby names using the heart icon on each name card. Create a personalised shortlist of your top ${religionLabel} names beginning with "${letter}" to compare and share with family.`,
        },
      ];

  const publishedDate = new Date().toISOString().split('T')[0];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      datePublished: publishedDate,
      author: { '@type': 'Organization', 'name': 'NameVerse' },
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        datePublished: publishedDate,
        upvoteCount: 0,
        author: { '@type': 'Organization', 'name': 'NameVerse' },
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="max-w-4xl mx-auto px-4 pb-20" aria-labelledby="faq-heading">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            Frequently Asked Questions
          </span>
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-gray-900">
            About {religionLabel} Names Starting with &ldquo;{letter}&rdquo;
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-left font-semibold text-gray-900 hover:text-emerald-700 transition-colors list-none">
                <span className="pr-4">{faq.question}</span>
                <span className="flex-shrink-0 w-7 h-7 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 group-open:rotate-180 transition-transform text-lg font-light">
                  ⌄
                </span>
              </summary>
              <div className="px-6 pb-5 text-gray-600 leading-relaxed text-sm border-t border-emerald-50 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

// FAQ Section
export default async function LetterNamesPage({ params }) {
  const rawParams = await params;
  const religion = normalizeReligion(rawParams?.religion) || 'islamic';
  const letter = normalizeLetter(rawParams?.letter);
  const page = normalizePage(rawParams?.page);
  const religionLabel = religion.charAt(0).toUpperCase() + religion.slice(1);
  const gradient = getReligionGradient(religion);
  const emoji = getReligionEmoji(religion);

  const response = await serverFetchNamesByLetter(letter, {
    religion,
    page,
    limit: NAMES_PER_PAGE,
    sort: 'asc',
  });

  const names = (response.data || []).filter(
    (item) => item.name && typeof item.name === 'string'
  );
  const pagination = response.pagination || { totalPages: 1, totalCount: 0 };
  const { totalPages = 1, totalCount = 0 } = pagination;
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;
  const createUrl = (newPage) => `/names/${religion}/letter/${letter}/${newPage}`;
  const prevUrl = hasPrev ? createUrl(currentPage - 1) : null;
  const nextUrl = hasNext ? createUrl(currentPage + 1) : null;

  // Generate name for SEO (using first name as example, or a representative name)
  const exampleName = names.length > 0 ? names[0].name : `${letter}Name`;
  const exampleSlug = generateSlug(exampleName);

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nameverse.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: `${religionLabel} Names`, item: `https://nameverse.vercel.app/names/${religion}` },
      { '@type': 'ListItem', position: 3, name: `Letter ${letter}`, item: `https://nameverse.vercel.app/names/${religion}/letter/${letter}/1` },
      { '@type': 'ListItem', position: 4, name: `Page ${page}`, item: generateCanonicalUrl(`/names/${religion}/letter/${letter}/${page}`) },
    ],
  };

  // ItemList schema for names
  const itemListSchema = names.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `${religionLabel} Baby Names Starting with ${letter}`,
        numberOfItems: totalCount,
        itemListElement: names.slice(0, 10).map((n, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: n.name,
          url: `https://nameverse.vercel.app/names/${religion}/${generateSlug(n.name)}`,
        })),
      }
    : null;

  // Generate SEO metadata using the first name as representative
  const seoData = names.length > 0 
    ? names[0] 
    : { 
        name: exampleName, 
        origin: 'Various', 
        gender: 'Unisex',
        religion: religion,
        short_meaning: `A beautiful ${religionLabel} name starting with ${letter}`,
        meaning: `A beautiful ${religionLabel} name starting with ${letter} with deep cultural significance`,
        lucky_number: Math.floor(Math.random() * 9) + 1,
        lucky_colors: ['Blue', 'Green', 'White'],
        languages: ['Arabic', 'English', 'Urdu'],
        emotional_traits: ['Compassionate', 'Wise'],
        hidden_personality_traits: ['Thoughtful', 'Creative']
      };

  const { article: articleSchema, faq: faqSchema, faqData: generatedFaqData, breadcrumb: seoBreadcrumb } = generateNamePageSchemas(
    seoData, 
    religion, 
    exampleSlug
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoBreadcrumb) }}
      />
      {articleSchema && (
        <Script
          id="article-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {itemListSchema && (
        <Script
          id="itemlist-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

      {/* Hero */}
      <section className={`relative py-16 px-4 bg-gradient-to-r ${gradient} text-white overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.4)_1px,transparent_0)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-white/30">
            <Sparkles className="w-4 h-4" />
            <span>{totalCount.toLocaleString()} {religionLabel} Names Found</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
            {emoji} {religionLabel} Names Starting with &ldquo;{letter}&rdquo;
          </h1>
          <p className="text-base md:text-lg text-white/85 max-w-2xl mx-auto mb-6 leading-relaxed">
            Discover authentic {religionLabel} baby names beginning with <strong>{letter}</strong> — complete with meanings, origins, and lucky numbers.
            Page {currentPage} of {totalPages}.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-full border border-white/25">
              <Search className="w-3.5 h-3.5" /> {totalCount}+ names
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-full border border-white/25">
              <Star className="w-3.5 h-3.5" /> Meanings included
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-full border border-white/25">
              <Heart className="w-3.5 h-3.5" /> Save favourites
            </span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 py-4" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          <li>
            <Link href="/" className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`/names/${religion}/letter/A/1`} className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors">
              {religionLabel} Names
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Letter {letter}</li>
          <li>/</li>
          <li className="text-gray-700 font-semibold">Page {currentPage}</li>
        </ol>
      </nav>

      {/* Alphabet Nav */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 text-center">
            Browse by Letter
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {ALPHABET.map((l) => (
              <Link
                key={l}
                href={`/names/${religion}/letter/${l}/1`}
                aria-label={`${religionLabel} names starting with ${l}`}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-200 ${
                  l === letter
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-110'
                    : 'bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200 hover:border-emerald-300'
                }`}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Religion Switcher */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {VALID_RELIGIONS.map((r) => (
            <Link
              key={r}
              href={`/names/${r}/letter/${letter}/1`}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                r === religion
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              {getReligionEmoji(r)} {r.charAt(0).toUpperCase() + r.slice(1)}
            </Link>
          ))}
        </div>
      </div>

      {/* Names Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16" aria-label={`${religionLabel} names starting with ${letter}`}>
        {names.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Names Found</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              No {religionLabel} names starting with &ldquo;{letter}&rdquo; were found. Try browsing another letter or religion.
            </p>
            <Link
              href={`/names/${religion}/letter/A/1`}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-semibold"
            >
              Browse All {religionLabel} Names
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
              {names.map((nameItem, index) => {
                const itemKey = nameItem.slug || generateSlug(nameItem.name) || nameItem._id || index;
                return (
                  <Link
                    key={itemKey}
                    href={`/names/${religion}/${generateSlug(nameItem.name)}`}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 border border-gray-100 hover:border-emerald-300 group hover:-translate-y-1 block"
                    title={`${nameItem.name} meaning — ${religionLabel} baby name`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
                          {nameItem.name || 'Unknown'}
                        </h3>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {nameItem.quranicReference && (
                            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium">
                              Quranic
                            </span>
                          )}
                          {nameItem.gender && (
                            <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                              nameItem.gender.toLowerCase() === 'boy' || nameItem.gender.toLowerCase() === 'male'
                                ? 'bg-blue-50 text-blue-600'
                                : 'bg-pink-50 text-pink-600'
                            }`}>
                              {nameItem.gender}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                        <FavoriteButton
                          nameData={{
                            name: nameItem.name,
                            slug: generateSlug(nameItem.name),
                            religion,
                            meaning: nameItem.short_meaning || nameItem.meaning,
                            origin: nameItem.origin,
                          }}
                          size="small"
                        />
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                          <Moon className="w-5 h-5 text-emerald-600" />
                        </div>
                      </div>
                    </div>

                    <p className="text-emerald-700 font-semibold text-sm mb-3 line-clamp-2 leading-snug">
                      &ldquo;{nameItem.short_meaning || nameItem.meaning || 'No meaning available'}&rdquo;
                    </p>

                    <div className="space-y-1.5 text-xs text-gray-500 border-t border-gray-50 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-600">Origin</span>
                        <span className="text-right">
                          {Array.isArray(nameItem.origin)
                            ? nameItem.origin.join(', ')
                            : nameItem.origin || 'Unknown'}
                        </span>
                      </div>
                      {nameItem.luckyNumber && (
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-600">Lucky No.</span>
                          <span className="inline-flex items-center justify-center w-7 h-7 bg-amber-50 text-amber-700 rounded-full font-bold text-xs border border-amber-100">
                            {nameItem.luckyNumber}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            <nav className="flex items-center justify-center gap-3" aria-label="Pagination">
              {hasPrev && (
                <Link
                  href={prevUrl}
                  className="flex items-center gap-2 bg-white text-emerald-700 border border-emerald-200 px-5 py-3 rounded-xl hover:bg-emerald-50 hover:border-emerald-400 transition-all font-semibold shadow-sm"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Link>
              )}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  const p = totalPages <= 7 ? i + 1 : currentPage <= 4 ? i + 1 : currentPage >= totalPages - 3 ? totalPages - 6 + i : currentPage - 3 + i;
                  return (
                    <Link
                      key={p}
                      href={createUrl(p)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                        p === currentPage
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
                      }`}
                      aria-current={p === currentPage ? 'page' : undefined}
                    >
                      {p}
                    </Link>
                  );
                })}
              </div>
              {hasNext && (
                <Link
                  href={nextUrl}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl hover:bg-emerald-700 transition-all font-semibold shadow-sm"
                  aria-label="Next page"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </nav>

            <p className="text-center text-sm text-gray-400 mt-4">
              Showing page {currentPage} of {totalPages} &bull; {totalCount.toLocaleString()} total names
            </p>
          </>
        )}
      </section>

      {/* FAQ Section */}
      <FAQSection 
        religion={religion} 
        letter={letter} 
        totalCount={totalCount} 
        faqData={generatedFaqData} 
      />

      {/* SEO Text Block */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Find the Perfect {religionLabel} Baby Name Starting with &ldquo;{letter}&rdquo;
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            Choosing a baby name is one of the most meaningful decisions a parent can make. NameVerse provides a comprehensive, curated database of {religionLabel} names starting with &ldquo;{letter}&rdquo;, each with its authentic meaning, cultural origin, and spiritual significance. Whether you are looking for a traditional {religionLabel} name or a modern variation, our database helps you find the ideal name for your child.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Browse other letters or switch between Islamic, Hindu, and Christian name collections to find the name that best represents your heritage and values. Every name on NameVerse is research-backed and presented with care for accuracy and cultural authenticity.
          </p>
        </div>
      </section>
    </main>
  );
}