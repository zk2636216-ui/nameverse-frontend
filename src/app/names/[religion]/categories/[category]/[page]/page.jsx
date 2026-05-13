// src/app/names/categories/[category]/[page]/page.jsx
import Link from 'next/link';
import { fetchNamesWithAdvancedFilters } from '@/lib/api/names';
import { validateMetaTitle, validateMetaDescription, generateCanonicalUrl } from '@/lib/seo/meta-helpers';
import { Sparkles, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import FavoriteButton from '@/components/FavoriteButton';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];
const STATIC_CATEGORIES = ['modern', 'traditional', 'nature', 'religious', 'classical', 'unique'];

// ISR with 30-day cache - name categories rarely change
export const revalidate = 2592000; // 30 days
export const dynamicParams = true;

function normalizeReligion(religion) {
  if (!religion || typeof religion !== 'string') return null;
  const normalized = religion.toLowerCase();

  // Handle common variations
  if (normalized === 'islam' || normalized === 'muslim') return 'islamic';
  if (normalized === 'hinduism') return 'hindu';
  if (normalized === 'christianity') return 'christian';

  const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];
  return VALID_RELIGIONS.includes(normalized) ? normalized : null;
}

function resolveCategory(category, availableCategories) {
  if (!category) return 'modern';
  const normalized = category.toString().trim().toLowerCase();
  const exactMatch = availableCategories.find((value) => String(value).toLowerCase() === normalized);
  if (exactMatch) return String(exactMatch);
  const fallbackMatch = STATIC_CATEGORIES.find((value) => value.toLowerCase() === normalized);
  return fallbackMatch || category.toLowerCase();
}

function validateAndSanitizeParams(params, availableCategories) {
  const { religion, category, page } = params;

  // Handle common variations for religion normalization
  let normalizedReligion = religion?.toLowerCase();
  if (normalizedReligion === 'islam' || normalizedReligion === 'muslim') normalizedReligion = 'islamic';
  if (normalizedReligion === 'hinduism') normalizedReligion = 'hindu';
  if (normalizedReligion === 'christianity') normalizedReligion = 'christian';
  normalizedReligion = VALID_RELIGIONS.includes(normalizedReligion) ? normalizedReligion : 'islamic';
  const normalizedCategory = resolveCategory(category, availableCategories);
  const normalizedPage = parseInt(page) > 0 ? parseInt(page) : 1;

  return {
    religion: normalizedReligion,
    category: normalizedCategory,
    page: normalizedPage,
  };
}

export async function generateMetadata({ params }) {
  const rawParams = await params;
  const religion = VALID_RELIGIONS.includes(rawParams.religion?.toLowerCase()) ? rawParams.religion.toLowerCase() : 'islamic';
  const category = resolveCategory(rawParams.category, STATIC_CATEGORIES);
  const religionLabel = religion.charAt(0).toUpperCase() + religion.slice(1);
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const page = parseInt(rawParams.page, 10) > 0 ? parseInt(rawParams.page, 10) : 1;
  const canonical = generateCanonicalUrl(`/names/${religion}/categories/${category}/${page}`);

  return {
    title: validateMetaTitle(`Search ${religionLabel} ${categoryLabel} Names | NameVerse`),
    description: validateMetaDescription(
      `Search page ${page} of ${religionLabel} ${categoryLabel} baby names on NameVerse. Find names with meaning, origin, gender, and lucky number in the ${categoryLabel} category.`
    ),
    keywords: [
      `search ${religionLabel} ${categoryLabel} names`,
      `${categoryLabel} baby names`,
      `${religionLabel} names by category`,
      `find ${categoryLabel} baby names`,
      `${categoryLabel} name meanings`,
      `best ${categoryLabel} names`,
      `unique ${religionLabel} names`,
      `top ${categoryLabel} baby names`,
      `NameVerse`,
      `baby name search by category`
    ].join(', '),
    openGraph: {
      title: validateMetaTitle(`${religionLabel} ${categoryLabel} Names | NameVerse`),
      description: validateMetaDescription(
        `Explore ${religionLabel} ${categoryLabel} baby names with meanings, origin details, and naming inspiration.`
      ),
      url: canonical,
      type: 'website',
      siteName: 'NameVerse',
    },
    alternates: {
      canonical,
      languages: {
        en: canonical,
        'x-default': canonical,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function CategoryNamesPage({ params }) {
  const rawParams = await params;
  const availableCategories = STATIC_CATEGORIES;
  const { religion, category, page } = validateAndSanitizeParams(rawParams, availableCategories);

  let names = [];
  let pagination = { totalPages: 1, totalCount: 0 };
  let success = false;

  try {
    const response = await fetchNamesWithAdvancedFilters({
      religion,
      category,
      page,
      limit: 50,
      sort: 'asc',
    });
    names = response.data || [];
    names = names.filter(item => item.name && typeof item.name === 'string');
    pagination = response.pagination || { totalPages: 1, totalCount: 0 };
    success = response.success || false;
  } catch (error) {
    success = false;
  }

  if (!success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Names</h1>
          <p className="text-gray-600">Unable to load names at this time. Please try again later.</p>
        </div>
      </div>
    );
  }

  const { totalPages = 1, totalCount = 0 } = pagination;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const prevUrl = hasPrev ? `/names/${religion}/categories/${category}/${page - 1}` : null;
  const nextUrl = hasNext ? `/names/${religion}/categories/${category}/${page + 1}` : null;

  function generateSlug(name) {
    if (!name || typeof name !== 'string') return '';
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-white/30">
            <Sparkles className="w-4 h-4" />
            <span>{totalCount} Names Found</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Names in {category.charAt(0).toUpperCase() + category.slice(1)} Category
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-4xl mx-auto mb-10 leading-relaxed">
            Page {page} of {totalPages} • Discover beautiful names in the {category} category
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 py-5" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li><Link href="/" className="text-emerald-600 hover:text-emerald-800 font-medium">Home</Link></li>
          <li className="text-gray-400">/</li>
          <li><Link href={`/names/religion/${religion}/1`} className="text-emerald-600 hover:text-emerald-800 font-medium">All Names</Link></li>
          <li className="text-gray-400">/</li>
          <li className="text-emerald-700 font-semibold">Categories</li>
          <li className="text-gray-400">/</li>
          <li><Link href={`/names/${religion}/categories/${category}/1`} className="text-emerald-600 hover:text-emerald-800 font-medium">{category.charAt(0).toUpperCase() + category.slice(1)}</Link></li>
          <li className="text-gray-400">/</li>
          <li className="text-emerald-700 font-semibold">Page {page}</li>
        </ol>
      </nav>

      {/* Category Navigation */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {availableCategories.map((cat) => (
            <Link
              key={cat}
              href={`/names/${religion}/categories/${cat}/1`}
              className={`px-4 py-2 flex items-center justify-center rounded-lg font-semibold transition-all ${
                cat === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          ))}
        </div>
      </div>

      {/* Names Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {names.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Names Found</h2>
            <p className="text-gray-600">No names found in {category} category. Try another category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {names.map((nameItem, index) => {
                const displayMeaning = nameItem.short_meaning || nameItem.meaning || nameItem.long_meaning || 'No meaning available';
                const itemKey = nameItem.slug || generateSlug(nameItem.name) || nameItem._id || index;

                return (
                  <Link
                    key={itemKey}
                    href={`/names/${religion}/${generateSlug(nameItem.name)}`}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-emerald-100 hover:border-emerald-300 group hover:-translate-y-1 block"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                          {nameItem.name || 'Unknown'}
                        </h3>
                        {nameItem.quranicReference && (
                          <span className="inline-block mt-2 bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium">
                            Quranic
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <FavoriteButton
                          nameData={{
                            name: nameItem.name,
                            slug: generateSlug(nameItem.name),
                            religion: religion,
                            meaning: nameItem.short_meaning || nameItem.meaning,
                            origin: nameItem.origin
                          }}
                          size="small"
                        />
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                          <Moon className="w-6 h-6 text-emerald-600" />
                        </div>
                      </div>
                    </div>

                    <p className="text-emerald-600 font-semibold text-lg mb-4">
                      "{displayMeaning}"
                    </p>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Origin:</span>
                        <span>{nameItem.origin || 'Unknown'}</span>
                      </div>
                      {nameItem.luckyNumber && (
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Lucky Number:</span>
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 text-amber-700 rounded-full font-bold">
                            {nameItem.luckyNumber || 'N/A'}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4">
              {hasPrev && (
                <Link
                  href={prevUrl}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </Link>
              )}

              <span className="text-gray-600">
                Page {page} of {totalPages}
              </span>

              {hasNext && (
                <Link
                  href={nextUrl}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </Link>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
