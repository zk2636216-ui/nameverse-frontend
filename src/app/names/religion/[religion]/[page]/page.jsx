import { notFound } from 'next/navigation';
import Link from 'next/link';
import StructuredData from '@/components/SEO/StructuredData.jsx';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.jsx';
import { fetchNamesWithAdvancedFilters } from '@/lib/api/names';
import { validateMetaTitle, validateMetaDescription, generateCanonicalUrl } from '@/lib/seo/meta-helpers';
import { ChevronLeft, ChevronRight, Sparkles, Moon, Globe, BookOpen, Heart, Star, TrendingUp, Users, Languages, Award } from 'lucide-react';
import FavoriteButton from '@/components/FavoriteButton';

const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];
const RELIGION_LABELS = {
  islamic: 'Islamic',
  christian: 'Christian',
  hindu: 'Hindu',
};

// ISR with 30-day cache - name lists rarely change
export const revalidate = 2592000; // 30 days
export const dynamicParams = true;

// Site URL (use public env var on client-safe code paths)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

function normalizeReligion(religion) {
  if (!religion || typeof religion !== 'string') return null;
  const normalized = religion.toLowerCase();

  // Handle common variations
  if (normalized === 'islam' || normalized === 'muslim') return 'islamic';
  if (normalized === 'hinduism') return 'hindu';
  if (normalized === 'christianity') return 'christian';

  return VALID_RELIGIONS.includes(normalized) ? normalized : null;
}

function normalizePage(page) {
  const pageNumber = parseInt(page, 10);
  return Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
}

function generateSlug(name) {
  if (!name || typeof name !== 'string') return '';
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const religion = normalizeReligion(awaitedParams?.religion);
  const page = normalizePage(awaitedParams?.page);
  const label = RELIGION_LABELS[religion] || 'Baby';
  const canonical = generateCanonicalUrl(`/names/religion/${religion}/${page}`);

  // Religion-specific keywords with 30+ engaging terms
  const religionKeywords = {
    islamic: [
      'islamic baby names',
      'quranic names',
      'muslim baby names',
      'arabic baby names',
      'urdu baby names',
      'islamic boy names',
      'islamic girl names',
      'quran names',
      'muslim names with meaning',
      'arabic names with meanings',
      'urdu names with meanings',
      'islamic name search',
      'quranic baby names',
      'muslim name finder',
      'arabic name origins',
      'islamic spiritual names',
      'muslim traditional names',
      'islamic modern names',
      'prophet names islamic',
      'quranic boy names',
      'quranic girl names',
      'arabic boy names',
      'arabic girl names',
      'urdu boy names',
      'urdu girl names',
      'islamic cultural names',
      'muslim faith names',
      'islamic name database',
      'quran inspired names',
      'hadith names',
      'islamic name meanings',
      'arabic name meanings',
      'urdu name meanings',
      'islamic baby name meanings',
      'muslim baby name origins',
      'islamic naming traditions',
      'arabic naming culture',
      'muslim naming customs',
      'quranic naming guide',
      'islamic name pronunciation',
      'arabic name pronunciation',
      'urdu name pronunciation'
    ],
    hindu: [
      'hindu baby names',
      'sanskrit names',
      'vedic names',
      'indian baby names',
      'hindi baby names',
      'hindu boy names',
      'hindu girl names',
      'sanskrit baby names',
      'vedic baby names',
      'hindu names with meaning',
      'sanskrit names with meanings',
      'indian names with meanings',
      'hindu name search',
      'sanskrit name finder',
      'hindu spiritual names',
      'indian traditional names',
      'hindu modern names',
      'vedic god names',
      'hindu mythological names',
      'sanskrit boy names',
      'sanskrit girl names',
      'indian boy names',
      'indian girl names',
      'hindi boy names',
      'hindi girl names',
      'hindu cultural names',
      'vedic naming traditions',
      'hindu naming customs',
      'sanskrit naming guide',
      'hindu name pronunciation',
      'sanskrit name origins',
      'indian name meanings',
      'hindu baby name meanings',
      'vedic baby name origins',
      'hindu faith names',
      'indian spiritual names',
      'sanskrit divine names',
      'hindu auspicious names',
      'vedic sacred names',
      'hindu name database',
      'sanskrit name search'
    ],
    christian: [
      'christian baby names',
      'biblical names',
      'bible names',
      'christian boy names',
      'christian girl names',
      'biblical boy names',
      'biblical girl names',
      'christian names with meaning',
      'bible names with meanings',
      'christian name search',
      'biblical name finder',
      'christian spiritual names',
      'bible traditional names',
      'christian modern names',
      'jesus names',
      'apostle names',
      'saint names christian',
      'christian boy names biblical',
      'christian girl names biblical',
      'christian faith names',
      'biblical naming traditions',
      'christian naming customs',
      'bible naming guide',
      'christian name pronunciation',
      'biblical name origins',
      'christian baby name meanings',
      'bible baby name origins',
      'christian cultural names',
      'biblical prophet names',
      'christian disciple names',
      'saint inspired names',
      'christian blessed names',
      'bible verse names',
      'christian sacred names',
      'biblical name database',
      'christian name search tool',
      'bible name meanings',
      'christian name etymology',
      'biblical name history'
    ]
  };

  const keywords = religionKeywords[religion] || [
    'baby names',
    'name search',
    'baby name meanings',
    'cultural names',
    'spiritual names'
  ];

  const pageTitle = `${RELIGION_LABELS[religion]} Baby Names — Authentic ${RELIGION_LABELS[religion]} Names & Meanings | Page ${page}`;
  const pageDescription = validateMetaDescription(
    `Explore ${label} baby names — Page ${page}. Browse authentic ${label} names with meanings, origins, pronunciations, and popular picks from Quranic, Sanskrit, and Biblical traditions. Find meaningful names for your child across cultures.`
  );

  return {
    title: validateMetaTitle(pageTitle),
    description: pageDescription,
    keywords: keywords.join(', '),
    openGraph: {
      title: validateMetaTitle(`${RELIGION_LABELS[religion]} Baby Names — NameVerse`),
      description: pageDescription.substring(0, 180),
      url: canonical,
      type: 'website',
      siteName: 'NameVerse',
      images: [
        { url: `${SITE_URL}/api/og?section=${encodeURIComponent(religion)}&page=${page}`, width: 1200, height: 630 }
      ]
    },
    alternates: {
      canonical,
      languages: { en: canonical, 'x-default': canonical },
    },
    robots: { index: true, follow: true },
  };
}

export default async function ReligionByPage({ params }) {
  const awaitedParams = await params;
  const religion = normalizeReligion(awaitedParams?.religion);
  const page = normalizePage(awaitedParams?.page);

  if (!religion) {
    return notFound();
  }

  const response = await fetchNamesWithAdvancedFilters({
    religion,
    page,
    limit: 50,
    sort: 'asc',
  });

  // If backend fails, don't return 404 — show an empty 'No names found' state instead.
  const names = Array.isArray(response.data) && response.success ? response.data : [];
  const pagination = response.pagination || { page: 1, limit: 50, totalCount: 0, totalPages: 1 };
  const { totalPages = 1, totalCount = 0 } = pagination;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  const prevUrl = hasPrev ? `/names/religion/${religion}/${page - 1}` : null;
  const nextUrl = hasNext ? `/names/religion/${religion}/${page + 1}` : null;
  const title = `${RELIGION_LABELS[religion]} Names`;
  const canonical = generateCanonicalUrl(`/names/religion/${religion}/${page}`);

  return (
    <>
      <StructuredData
        organization={true}
        website={true}
        breadcrumbs={[
          { name: 'Home', url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app' },
          { name: `${RELIGION_LABELS[religion]} Names`, url: canonical }
        ]}
        collectionPage={{
          name: title,
          description: `A curated list of ${RELIGION_LABELS[religion]} baby names with meanings and origins. Page ${page}.`,
          url: canonical,
          items: (names || []).slice(0, 20).map((n) => ({
            title: n.name || n.title,
            path: `names/${religion}/${(n.slug || (n.name || n.title || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, ''))}`
          }))
        }}
      />
    
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <section className="relative py-16 px-4 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3)_0%,transparent_52%)]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <Breadcrumbs items={[{ label: 'Names', href: '/names' }, { label: RELIGION_LABELS[religion], href: `/names/religion/${religion}/1` }]} className="mb-4" />
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-5 h-5 text-white" />
            <span>{RELIGION_LABELS[religion]} Names</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {religion === 'islamic' && 'Islamic Baby Names - Quranic & Arabic Names with Meanings'}
            {religion === 'hindu' && 'Hindu Baby Names - Sanskrit & Vedic Names with Spiritual Significance'}
            {religion === 'christian' && 'Christian Baby Names - Biblical Names with Faith & Heritage'}
          </h1>
          <p className="text-lg text-indigo-100 max-w-3xl">
            {religion === 'islamic' && `Explore ${totalCount} authentic Islamic baby names from the Quran and Islamic tradition. Discover Quranic names with Arabic and Urdu meanings, perfect for Muslim families seeking spiritual baby names with deep cultural significance.`}
            {religion === 'hindu' && `Browse ${totalCount} beautiful Hindu baby names rooted in Sanskrit and Vedic traditions. Find meaningful names with Hindi translations, connecting your child to Hindu heritage and spiritual wisdom.`}
            {religion === 'christian' && `Discover ${totalCount} meaningful Christian baby names inspired by the Bible and Christian faith. Choose biblical names with spiritual depth, perfect for families seeking faith-based naming inspiration.`}
          </p>
          <p className="mt-4 text-sm text-indigo-100/90">
            Page {page} of {totalPages} • Comprehensive {RELIGION_LABELS[religion]} Name Database
          </p>

          {/* Religion Navigation Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { id: 'islamic', name: 'Islamic Names', icon: Globe, color: 'emerald' },
              { id: 'hindu', name: 'Hindu Names', icon: Sparkles, color: 'orange' },
              { id: 'christian', name: 'Christian Names', icon: BookOpen, color: 'blue' }
            ].map((rel) => {
              const Icon = rel.icon;
              const isActive = rel.id === religion;
              return (
                <Link
                  key={rel.id}
                  href={`/names/religion/${rel.id}/1`}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-lg'
                      : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {rel.name}
                  {isActive && <span className="text-xs">(Current)</span>}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Religion Statistics & Features */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{totalCount.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Names</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{totalPages}</div>
              <div className="text-sm text-gray-600">Pages Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">50</div>
              <div className="text-sm text-gray-600">Names Per Page</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-600">Authentic Meanings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose This Religion Section */}
      <section className="py-12 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Why Choose {RELIGION_LABELS[religion]} Names?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {religion === 'islamic' && 'Islamic names carry profound spiritual meaning from the Quran and Islamic tradition, connecting your child to faith and heritage.'}
              {religion === 'hindu' && 'Hindu names draw from ancient Sanskrit wisdom and Vedic traditions, offering spiritual depth and cultural richness.'}
              {religion === 'christian' && 'Christian names reflect Biblical heritage and faith values, providing timeless spiritual significance and family legacy.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {religion === 'islamic' && [
              {
                icon: Globe,
                title: 'Quranic Origins',
                description: 'Names directly from the Holy Quran with authentic Arabic meanings and Islamic significance.'
              },
              {
                icon: Languages,
                title: 'Arabic & Urdu',
                description: 'Beautiful names with meanings in Arabic script and Urdu translations for global Muslim communities.'
              },
              {
                icon: Heart,
                title: 'Spiritual Connection',
                description: 'Each name carries blessings and connects your child to Islamic faith and Prophet Muhammad (PBUH).'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}

            {religion === 'hindu' && [
              {
                icon: Star,
                title: 'Sanskrit Heritage',
                description: 'Ancient Sanskrit names with profound meanings rooted in Vedic wisdom and Hindu philosophy.'
              },
              {
                icon: Award,
                title: 'Auspicious Meanings',
                description: 'Names chosen for their positive vibrations and spiritual significance in Hindu culture.'
              },
              {
                icon: Users,
                title: 'Cultural Legacy',
                description: 'Connect your child to rich Hindu traditions, mythology, and divine qualities.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}

            {religion === 'christian' && [
              {
                icon: BookOpen,
                title: 'Biblical Foundation',
                description: 'Names inspired by the Bible, carrying stories of faith, virtue, and divine purpose.'
              },
              {
                icon: Heart,
                title: 'Faith Values',
                description: 'Christian names that reflect virtues like love, hope, faith, and spiritual strength.'
              },
              {
                icon: TrendingUp,
                title: 'Timeless Appeal',
                description: 'Classic names with enduring spiritual significance across generations of Christian families.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Explore {RELIGION_LABELS[religion]} Names by Category
            </h2>
            <p className="text-gray-600">
              Discover more ways to find the perfect {RELIGION_LABELS[religion].toLowerCase()} name for your baby
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href={`/names/${religion}/letter/A/1`}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all text-center"
            >
              <div className="text-2xl font-bold text-indigo-600 mb-1">A-Z</div>
              <div className="text-sm text-gray-600">Browse by Letter</div>
            </Link>

            <Link
              href={`/islamic/boy-names`}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all text-center"
            >
              <div className="text-2xl font-bold text-emerald-600 mb-1">♂</div>
              <div className="text-sm text-gray-600">Boy Names</div>
            </Link>

            <Link
              href={`/islamic/girl-names`}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all text-center"
            >
              <div className="text-2xl font-bold text-pink-600 mb-1">♀</div>
              <div className="text-sm text-gray-600">Girl Names</div>
            </Link>

            <Link
              href={`/search`}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all text-center"
            >
              <div className="text-2xl font-bold text-purple-600 mb-1">🔍</div>
              <div className="text-sm text-gray-600">Search Names</div>
            </Link>
          </div>


        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        {names.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">No names found</h2>
            <p className="text-gray-600">No names were returned for this page. Try another page or check the religion value.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {names.map((nameItem, index) => {
                const displayName = nameItem.name || nameItem.title || `Name ${index + 1}`;
                const displayMeaning = nameItem.short_meaning || nameItem.meaning || nameItem.long_meaning || 'Meaning not available';
                const slug = nameItem.slug || generateSlug(displayName);

                return (
                  <div key={slug} className="group block rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-indigo-600">{displayName}</h2>
                        <p className="mt-2 text-sm text-gray-500">{nameItem.origin || 'Unknown origin'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <FavoriteButton
                          nameData={{
                            name: displayName,
                            slug: slug,
                            religion: religion,
                            meaning: displayMeaning,
                            origin: nameItem.origin
                          }}
                          size="small"
                        />
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                          <Moon className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/names/${religion}/${slug}`}
                      className="text-sm leading-6 text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      {displayMeaning}
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
              {hasPrev ? (
                <Link
                  href={prevUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Link>
              ) : (
                <span className="text-sm text-gray-500">No previous page</span>
              )}

              <span className="text-sm text-gray-600">
                Showing page {page} of {totalPages}
              </span>

              {hasNext ? (
                <Link
                  href={nextUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-sm text-gray-500">No next page</span>
              )}
            </div>
          </>
        )}
      </section>

      {/* Related Content & Learning Section */}
      <section className="bg-gradient-to-r from-slate-50 to-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Learn More About {RELIGION_LABELS[religion]} Naming
              </h3>
              <div className="space-y-4">
                {religion === 'islamic' && [
                  { title: 'Islamic Naming Traditions', desc: 'Understanding the importance of names in Islamic culture' },
                  { title: 'Quranic Name Meanings', desc: 'Deep dive into names from the Holy Quran' },
                  { title: 'Prophet Names & Stories', desc: 'Learn about names of Islamic prophets and their significance' }
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={`/blog/ultimate-guide-islamic-names`}
                    className="block bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </Link>
                ))}

                {religion === 'hindu' && [
                  { title: 'Hindu Naming Ceremony', desc: 'Traditional Hindu naming rituals and customs' },
                  { title: 'Sanskrit Name Origins', desc: 'The linguistic roots of Hindu names' },
                  { title: 'Vedic Name Significance', desc: 'Understanding auspicious meanings in Hindu tradition' }
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={`/blog/hindu-vedic-naming-guide`}
                    className="block bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </Link>
                ))}

                {religion === 'christian' && [
                  { title: 'Biblical Name Stories', desc: 'The stories behind Christian biblical names' },
                  { title: 'Christian Saints & Names', desc: 'Names inspired by Christian saints and martyrs' },
                  { title: 'Faith-Based Naming Guide', desc: 'Choosing names that reflect Christian values' }
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={`/blog/christian-biblical-names-guide`}
                    className="block bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Popular {RELIGION_LABELS[religion]} Names
              </h3>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                  {religion === 'islamic' && [
                    { name: 'Muhammad', meaning: 'Praiseworthy' },
                    { name: 'Fatima', meaning: 'One who abstains' },
                    { name: 'Aisha', meaning: 'Living, prosperous' },
                    { name: 'Ali', meaning: 'Exalted, noble' },
                    { name: 'Omar', meaning: 'Long-lived' },
                    { name: 'Zahra', meaning: 'Radiant, bright' }
                  ].map((name, index) => (
                    <div
                      key={index}
                      className="text-center p-3 rounded-lg hover:bg-emerald-50 transition-colors relative"
                    >
                      <div className="absolute top-2 right-2">
                        <FavoriteButton
                          nameData={{
                            name: name.name,
                            slug: name.name.toLowerCase(),
                            religion: 'islamic',
                            meaning: name.meaning
                          }}
                          size="small"
                        />
                      </div>
                      <Link href={`/names/islamic/${name.name.toLowerCase()}`}>
                        <div className="font-semibold text-emerald-700">{name.name}</div>
                        <div className="text-xs text-gray-600">{name.meaning}</div>
                      </Link>
                    </div>
                  ))}

                  {religion === 'hindu' && [
                    { name: 'Aarav', meaning: 'Peaceful' },
                    { name: 'Saanvi', meaning: 'Goddess Lakshmi' },
                    { name: 'Vihaan', meaning: 'Dawn' },
                    { name: 'Ananya', meaning: 'Unique' },
                    { name: 'Arjun', meaning: 'White, clear' },
                    { name: 'Diya', meaning: 'Light' }
                  ].map((name, index) => (
                    <div
                      key={index}
                      className="text-center p-3 rounded-lg hover:bg-orange-50 transition-colors relative"
                    >
                      <div className="absolute top-2 right-2">
                        <FavoriteButton
                          nameData={{
                            name: name.name,
                            slug: name.name.toLowerCase(),
                            religion: 'hindu',
                            meaning: name.meaning
                          }}
                          size="small"
                        />
                      </div>
                      <Link href={`/names/hindu/${name.name.toLowerCase()}`}>
                        <div className="font-semibold text-orange-700">{name.name}</div>
                        <div className="text-xs text-gray-600">{name.meaning}</div>
                      </Link>
                    </div>
                  ))}

                  {religion === 'christian' && [
                    { name: 'Noah', meaning: 'Rest, comfort' },
                    { name: 'Sophia', meaning: 'Wisdom' },
                    { name: 'James', meaning: 'Supplanter' },
                    { name: 'Mary', meaning: 'Beloved' },
                    { name: 'David', meaning: 'Beloved' },
                    { name: 'Sarah', meaning: 'Princess' }
                  ].map((name, index) => (
                    <div
                      key={index}
                      className="text-center p-3 rounded-lg hover:bg-blue-50 transition-colors relative"
                    >
                      <div className="absolute top-2 right-2">
                        <FavoriteButton
                          nameData={{
                            name: name.name,
                            slug: name.name.toLowerCase(),
                            religion: 'christian',
                            meaning: name.meaning
                          }}
                          size="small"
                        />
                      </div>
                      <Link href={`/names/christian/${name.name.toLowerCase()}`}>
                        <div className="font-semibold text-blue-700">{name.name}</div>
                        <div className="text-xs text-gray-600">{name.meaning}</div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
