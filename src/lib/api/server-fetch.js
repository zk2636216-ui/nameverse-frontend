/**
 * Server-Side Data Fetcher (SSR/ISR)
 *
 * Uses native fetch() with next.revalidate to enable ISR caching.
 * CRITICAL: Using native fetch with next.revalidate tells Next.js
 * this data can be cached, enabling ISR.
 *
 * All these functions must be used in Server Components only.
 * NEVER use axios-based fetches (apiClient) in Server Components.
 */

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || 'https://name-meaning-site-backend.vercel.app').replace(/\/+$/, '');
const ISR_TTL = 2592000; // 30 days

const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];

function normalizeReligion(val) {
  if (!val) return 'islamic';
  const n = String(val).toLowerCase();
  if (n === 'muslim' || n === 'islam') return 'islamic';
  if (n === 'christianity') return 'christian';
  if (n === 'hinduism') return 'hindu';
  return VALID_RELIGIONS.includes(n) ? n : 'islamic';
}

/**
 * Helper to build fetch options with ISR revalidation
 */
function isrFetchOptions(revalidate = ISR_TTL) {
  return { next: { revalidate } };
}

/**
 * Generic fetch wrapper with error handling and ISR support
 */
async function isrFetch(url, revalidate = ISR_TTL) {
  try {
    const res = await fetch(url, isrFetchOptions(revalidate));
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Fetch filters for a specific religion
 * Backend: GET /api/v1/names/:religion/filters
 */
export async function serverFetchFilters(religion) {
  if (!religion) return { genders: [], origins: [], letters: [], categories: [], totalNames: 0 };

  const normalizedReligion = normalizeReligion(religion);
  const data = await isrFetch(`${API_BASE}/api/v1/names/${normalizedReligion}/filters`);

  if (data?.success && data.data) {
    return {
      genders: data.data.genders || [],
      origins: data.data.origins || [],
      letters: data.data.letters || [],
      categories: data.data.categories || [],
      themes: data.data.themes || [],
      languages: data.data.languages || [],
      lucky_days: data.data.lucky_days || [],
      lucky_colors: data.data.lucky_colors || [],
      lucky_stones: data.data.lucky_stones || [],
      totalNames: data.data.total_names || 0,
    };
  }

  return { genders: [], origins: [], letters: [], categories: [], totalNames: 0 };
}

/**
 * Fetch names by letter with full ISR support
 */
export async function serverFetchNamesByLetter(letter, options = {}) {
  if (!letter) return { data: [], pagination: { totalPages: 1, totalCount: 0 }, success: false };

  const { religion = 'islamic', limit = 50, page = 1, sort = 'asc' } = options;
  const normalizedReligion = normalizeReligion(religion);

  const params = new URLSearchParams();
  params.set('alphabet', String(letter).toLowerCase());
  params.set('limit', String(limit));
  params.set('page', String(page));
  params.set('sort', sort);

  const data = await isrFetch(`${API_BASE}/api/v1/names/${normalizedReligion}?${params.toString()}`);

  if (!data) {
    return { data: [], pagination: { totalPages: 1, totalCount: 0 }, success: false };
  }

  const names = data.data || data.names || [];
  const pagination = data.pagination || {};

  return {
    data: names,
    pagination: {
      totalPages: pagination.pages || data.totalPages || Math.ceil((pagination.total || names.length) / limit),
      totalCount: pagination.total || data.totalCount || names.length,
      page,
      limit,
    },
    success: true,
  };
}

/**
 * Fetch names with advanced filters + ISR
 */
export async function serverFetchNamesWithAdvancedFilters(options = {}) {
  const {
    religion,
    page = 1,
    limit = 50,
    sort = 'asc',
    gender,
    origin,
    category,
    alphabet,
  } = options;

  const normalizedReligion = normalizeReligion(religion);
  if (!normalizedReligion) {
    return { data: [], pagination: { totalPages: 1, totalCount: 0 }, success: false };
  }

  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('limit', String(limit));
  params.set('sort', sort);
  if (gender) params.set('gender', gender);
  if (origin) params.set('origin', origin);
  if (category) params.set('category', category);
  if (alphabet) params.set('startsWith', String(alphabet).toLowerCase());

  const data = await isrFetch(`${API_BASE}/api/v1/names/${normalizedReligion}?${params.toString()}`);

  if (!data) {
    return { data: [], pagination: { totalPages: 1, totalCount: 0 }, success: false };
  }

  const names = data.data || data.names || [];
  const pagination = data.pagination || {};

  return {
    data: names,
    pagination: {
      totalPages: pagination.pages || data.totalPages || Math.ceil((pagination.total || names.length) / limit),
      totalCount: pagination.total || data.totalCount || names.length,
      page,
      limit,
    },
    success: true,
  };
}

/**
 * Fetch name detail by religion and slug
 * Backend: GET /api/v1/names/:religion/:slug
 * Used by generateMetadata() and the page component
 */
export async function serverFetchNameDetail(religion, slug) {
  if (!religion || !slug) return null;

  const normalizedReligion = normalizeReligion(religion);
  const safeSlug = encodeURIComponent(String(slug).trim().toLowerCase());

  // Try v1 endpoint first
  let data = await isrFetch(`${API_BASE}/api/v1/names/${normalizedReligion}/${safeSlug}`);

  // Fallback to legacy endpoint
  if (!data || data.success === false || !data.data) {
    data = await isrFetch(`${API_BASE}/api/names/${normalizedReligion}/${safeSlug}`);
  }

  if (data?.success && data.data) {
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
}

/**
 * Fetch trending names with ISR
 * Backend: GET /api/names?religion=X&limit=20
 */
export async function serverFetchTrendingNames(options = {}) {
  const { religion = 'islamic', page = 1, limit = 20 } = options;
  const validReligion = VALID_RELIGIONS.includes(religion.toLowerCase()) ? religion.toLowerCase() : 'islamic';

  const data = await isrFetch(`${API_BASE}/api/names?religion=${validReligion}&page=${page}&limit=${limit}`);

  if (!data) {
    return { data: [], pagination: { page, limit, total: 0, totalPages: 0 }, success: false };
  }

  return {
    data: data.data || data.names || [],
    pagination: data.pagination || { page, limit, total: 0, totalPages: 0 },
    religion: validReligion,
    success: data.success !== false,
  };
}

/**
 * Fetch related names with ISR
 * Backend: GET /api/names/:religion/:slug/related
 */
export async function serverFetchRelatedNames(religion, slug) {
  if (!religion || !slug) return { data: [], count: 0, success: false };

  const data = await isrFetch(`${API_BASE}/api/names/${religion}/${slug}/related`);

  if (!data) return { data: [], count: 0, success: false };

  return {
    data: data.data || data.names || [],
    count: data.count || data.total || (data.data ? data.data.length : 0),
    success: data.success !== false,
  };
}

/**
 * Fetch similar names with ISR
 * Backend: GET /api/names/:religion/:slug/similar
 */
export async function serverFetchSimilarNames(religion, slug) {
  if (!religion || !slug) return { data: [], count: 0, success: false };

  const data = await isrFetch(`${API_BASE}/api/names/${religion}/${slug}/similar`);

  if (!data) return { data: [], count: 0, success: false };

  return {
    data: data.data || data.names || [],
    count: data.count || data.total || (data.data ? data.data.length : 0),
    success: data.success !== false,
  };
}

/**
 * Fetch names by category with ISR
 * Backend: GET /api/v1/names?religion=X&category=Y&page=1&limit=20
 */
export async function serverFetchNamesByCategory(religion, category, options = {}) {
  if (!religion || !category) {
    return { data: [], pagination: { page: 1, perPage: 20, total: 0, totalPages: 0 }, success: false };
  }

  const { page = 1, perPage = 20 } = options;
  const data = await isrFetch(`${API_BASE}/api/v1/names?religion=${religion}&page=${page}&limit=${perPage}&category=${encodeURIComponent(category)}`);

  if (!data) {
    return { data: [], pagination: { page, perPage, total: 0, totalPages: 0 }, success: false };
  }

  return {
    data: data.data || data.names || [],
    pagination: data.pagination || { page, perPage, total: 0, totalPages: 0 },
    category,
    success: data.success !== false,
  };
}

/**
 * Fetch names by origin with ISR
 * Backend: GET /api/v1/names?religion=X&origin=Y&page=1&limit=50
 */
export async function serverFetchNamesByOrigin(religion, origin, options = {}) {
  if (!religion || !origin) {
    return { data: [], pagination: { page: 1, perPage: 50, total: 0, totalPages: 0 }, success: false };
  }

  const { page = 1, perPage = 50 } = options;
  const data = await isrFetch(`${API_BASE}/api/v1/names?religion=${religion}&page=${page}&limit=${perPage}&origin=${encodeURIComponent(origin)}`);

  if (!data) {
    return { data: [], pagination: { page, perPage, total: 0, totalPages: 0 }, success: false };
  }

  return {
    data: data.data || data.names || [],
    pagination: data.pagination || { page, perPage, total: 0, totalPages: 0 },
    origin,
    success: data.success !== false,
  };
}

/**
 * Search names with ISR (cached briefly since searches are more dynamic)
 * Backend: GET /api/v1/names/search?q=...
 * Uses shorter revalidation (1 hour) since search queries vary widely
 */
export async function serverSearchNames(query, options = {}) {
  if (!query || query.trim().length < 2) {
    return { data: [], count: 0, success: false };
  }

  const { religion, limit = 8 } = options;
  const trimmedQuery = query.trim();

  const params = new URLSearchParams();
  params.set('q', trimmedQuery);
  params.set('limit', String(limit));
  if (religion) params.set('religion', religion);

  // Search results use 1-hour cache since they change more frequently
  const data = await isrFetch(`${API_BASE}/api/v1/names/search?${params.toString()}`, 3600);

  if (!data) {
    return { data: [], count: 0, success: false };
  }

  return {
    data: data.data || data.results || [],
    count: data.count || data.total || data.data?.length || 0,
    success: data.success !== false,
  };
}

// Export all server fetch functions
const serverAPI = {
  serverFetchFilters,
  serverFetchNamesByLetter,
  serverFetchNamesWithAdvancedFilters,
  serverFetchNameDetail,
  serverFetchTrendingNames,
  serverFetchRelatedNames,
  serverFetchSimilarNames,
  serverFetchNamesByCategory,
  serverFetchNamesByOrigin,
  serverSearchNames,
};

export default serverAPI;