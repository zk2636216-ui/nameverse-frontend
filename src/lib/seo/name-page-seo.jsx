// lib/seo/name-page-seo-enhanced.jsx
// PRODUCTION-GRADE SEO SYSTEM - Deterministic rotation, E-E-A-T safe, stable indexing

import { getSiteUrl } from '@/lib/seo/site';
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';

const SITE_URL = getSiteUrl();

/**
 * Deterministic hash function for consistent rotation
 * Same name + religion = same variant every time
 * No Math.random() = SEO stable
 */
function getStableHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getStableVariantIndex(name, religion, variantsCount) {
  const stableKey = `${name}-${religion}`;
  const hash = getStableHash(stableKey);
  return hash % variantsCount;
}

function formatTraitList(traits = []) {
  const list = Array.isArray(traits) ? traits.filter(Boolean) : [];
  return list.slice(0, 3).join(', ');
}

function getPersonalitySummary(data) {
  const traits = [
    ...(Array.isArray(data.emotional_traits) ? data.emotional_traits : []),
    ...(Array.isArray(data.hidden_personality_traits) ? data.hidden_personality_traits : []),
  ].filter(Boolean);
  return formatTraitList(traits);
}

function formatLanguages(data) {
  if (Array.isArray(data.languages) && data.languages.length > 0) {
    return data.languages.slice(0, 3).join(', ');
  }
  return '';
}

/**
 * Extract clean core emotion from meaning
 * Server-side safe, handles long/poetic/multilingual meanings
 */
function extractCoreEmotion(meaning) {
  if (!meaning || typeof meaning !== 'string') return 'Beautiful';
  
  // Clean: remove extra spaces, take first meaningful part
  let cleaned = meaning.trim();
  
  // Split by comma, period, or line break - take first clause
  cleaned = cleaned.split(',')[0];
  cleaned = cleaned.split('.')[0];
  cleaned = cleaned.split('\n')[0];
  
  // Take first 2-3 words up to 25 chars
  const words = cleaned.split(' ').filter(w => w.length > 0);
  const coreWords = words.slice(0, 2).join(' ');
  
  // Fallback if too short or too long
  if (coreWords.length < 2) return words[0] || 'Meaningful';
  if (coreWords.length > 30) return coreWords.substring(0, 27) + '...';
  
  return coreWords;
}

/**
 * SEO Fingerprint Lock System
 * Same name + religion = same base structure
 * Only wording changes slightly within stable variant
 */
function getSEOStableVariant(name, religion) {
  const stableKey = `${name.toLowerCase()}-${religion}`;
  const hash = getStableHash(stableKey);
  
  // 4 stable variants based on hash (0-3)
  // Same name always gets same variant number
  const variantMap = {
    0: { type: 'question', style: 'direct' },
    1: { type: 'question', style: 'soft' },
    2: { type: 'statement', style: 'meaning' },
    3: { type: 'statement', style: 'story' }
  };
  
  return variantMap[hash % 4];
}

/**
 * TITLE SYSTEM - 2 MODES ONLY, Deterministic rotation
 * No Math.random() - SEO stable
 * Neutral hooks - E-E-A-T safe
 */
export function generateOptimizedTitle(data, religion) {
  const name = data.name;
  const gender = typeof data.gender === 'string' ? data.gender.toLowerCase() : '';
  const genderLabel = gender === 'male' ? 'Boy' : gender === 'female' ? 'Girl' : '';
  const religionDisplay = religion === 'islamic' ? 'Islamic' : 
                          religion === 'christian' ? 'Christian' : 
                          religion === 'hindu' ? 'Hindu' : religion;
  const genderPhrase = genderLabel ? `${genderLabel} ` : '';

  // Shorter title to fit 60-char Bing/SEO limit
  // "Muhammad Islamic Boy Name Meaning" = 34 chars
  const title = `${name} ${religionDisplay} ${genderPhrase}Name Meaning`;

  return validateMetaTitle(title);
}

/**
 * DESCRIPTION SYSTEM - clear benefit copy for CTR
 * Deterministic per name
 */
export function generateOptimizedDescription(data, religion) {
  const name = data.name;
  const shortMeaning = data.short_meaning || data.meaning || '';
  const religionDisplay = religion === 'islamic' ? 'Islamic' : 
                          religion === 'christian' ? 'Christian' : 
                          religion === 'hindu' ? 'Hindu' : '';
  const gender = typeof data.gender === 'string' ? data.gender.toLowerCase() : '';
  const genderText = gender === 'male' ? 'boy name' : gender === 'female' ? 'girl name' : 'name';
  const origin = data.origin || '';
  const luckyNumber = data.lucky_number || '';
  const luckyDay = data.lucky_day || '';
  const luckyColors = Array.isArray(data.lucky_colors) ? data.lucky_colors.slice(0, 3).join(', ') : '';
  const personality = getPersonalitySummary(data);
  const languageSnippet = formatLanguages(data);
  const coreEmotion = extractCoreEmotion(shortMeaning);

  const intro = `${name} is ${religionDisplay === 'Islamic' ? 'an' : 'a'} ${religionDisplay.toLowerCase()} ${genderText} meaning "${coreEmotion}"`;
  const attributes = [];
  if (origin) attributes.push(`${origin} origin`);
  if (luckyNumber) attributes.push(`lucky number ${luckyNumber}`);
  if (luckyDay) attributes.push(`lucky day ${luckyDay}`);
  if (luckyColors) attributes.push(`lucky colors ${luckyColors}`);
  if (personality) attributes.push(`${personality} personality traits`);
  if (languageSnippet) attributes.push(`used in ${languageSnippet}`);

  let description = attributes.length > 0 ? `${intro} with ${attributes.join(', ')}.` : `${intro}.`;
  description += ` Learn pronunciation, variations, origin and spiritual significance.`;

  description = description
    .replace(/\s+/g, ' ')
    .replace(/\.\./g, '.')
    .trim();

  if (description.length > 158) {
    description = `${intro}. Learn pronunciation, variations, origin and spiritual significance.`;
  }
  if (description.length > 158) {
    description = description.substring(0, 155) + '...';
  }

  return validateMetaDescription(description);
}

/**
 * Keywords - minimal, focused, stable (12 max)
 */
export function generateOptimizedKeywords(data, religion) {
  const name = data.name;
  const keywords = new Set();
  const origin = data.origin || '';
  const gender = typeof data.gender === 'string' ? data.gender.toLowerCase() : '';
  const luckyNumber = data.lucky_number || '';
  const luckyColors = Array.isArray(data.lucky_colors) ? data.lucky_colors : [];
  const languageList = Array.isArray(data.languages) ? data.languages : [];
  const personality = getPersonalitySummary(data);

  keywords.add(`${name} name meaning`);
  keywords.add(`${name} Islamic baby name meaning`);
  keywords.add(`meaning of ${name}`);
  if (origin) keywords.add(`${name} name origin`);
  if (religion === 'islamic') {
    keywords.add(`${name} Islamic name`);
  } else if (religion === 'christian') {
    keywords.add(`${name} Christian name`);
  } else if (religion === 'hindu') {
    keywords.add(`${name} Hindu name`);
  }

  if (gender === 'male') {
    keywords.add(`Islamic boy name ${name}`);
  } else if (gender === 'female') {
    keywords.add(`Islamic girl name ${name}`);
  }

  if (luckyNumber) {
    keywords.add(`${name} lucky number`);
    keywords.add(`${name} lucky number meaning`);
  }
  if (luckyColors.length) keywords.add(`${name} lucky colors`);
  if (languageList.length) {
    keywords.add(`${name} language`);
    if (languageList.includes('Arabic') || languageList.includes('arabic')) {
      keywords.add(`${name} Arabic meaning`);
    }
  }
  if (personality) keywords.add(`${name} personality`);
  keywords.add(`${name} name pronunciation`);
  keywords.add(`what does ${name} mean`);

  return Array.from(keywords).slice(0, 12).join(', ');
}

/**
 * Build FAQ item list from page data.
 */
function generateDynamicFaqItems(data, religion) {
  const name = data.name || 'This name';
  const origin = data.origin || '';
  const religionDisplay = religion === 'islamic' ? 'Islamic' : religion === 'christian' ? 'Christian' : religion === 'hindu' ? 'Hindu' : religion;
  const simpleMeaning = extractCoreEmotion(data.short_meaning || data.meaning || 'meaningful');
  const gender = typeof data.gender === 'string' ? data.gender.toLowerCase() : '';
  const nameType = gender === 'male' ? 'boy name' : gender === 'female' ? 'girl name' : 'name';
  const pronunciation = data.pronunciation?.english ? `${data.pronunciation.english}${data.pronunciation?.ipa ? ` (${data.pronunciation.ipa})` : ''}` : '';
  const personality = getPersonalitySummary(data);
  const languages = Array.isArray(data.languages) ? data.languages.join(', ') : '';
  const luckDetails = [];
  if (data.lucky_number) luckDetails.push(`lucky number ${data.lucky_number}`);
  if (data.lucky_day) luckDetails.push(`lucky day ${data.lucky_day}`);
  if (data.lucky_colors?.length) luckDetails.push(`lucky colors ${data.lucky_colors.join(', ')}`);
  if (data.lucky_stone) luckDetails.push(`lucky stone ${data.lucky_stone}`);

  const items = [
    {
      q: `What does ${name} mean in ${religionDisplay}?`,
      a: data.short_meaning || data.meaning || `${name} is a ${religionDisplay.toLowerCase()} ${nameType} that suggests ${simpleMeaning}.`,
    },
    {
      q: `Is ${name} an ${religionDisplay.toLowerCase()} ${nameType}?`,
      a: `Yes, ${name} is widely used as an ${religionDisplay.toLowerCase()} ${nameType} and is chosen for its meaningful origin.`,
    },
    {
      q: `What is the origin of the name ${name}?`,
      a: origin ? `${name} comes from ${origin} origin and carries spiritual meaning in ${religionDisplay.toLowerCase()} tradition.` : `${name} has a meaningful origin and is popular in ${religionDisplay.toLowerCase()} communities.`,
    },
    {
      q: `What is ${name}'s lucky number and lucky color?`,
      a: luckDetails.length ? `${name} is associated with ${luckDetails.join(', ')}.` : `${name} does not have a specific lucky number or color listed, but it is valued for its positive meaning.`,
    },
    {
      q: `How do you pronounce ${name}?`,
      a: pronunciation ? `The pronunciation of ${name} is ${pronunciation}.` : `The pronunciation of ${name} is commonly spoken in Arabic and Islamic name traditions.`,
    },
    {
      q: `What personality traits are associated with ${name}?`,
      a: personality ? `${name} is often linked to ${personality}.` : `${name} is believed to reflect positive personality qualities and strong character traits.`,
    },
    {
      q: `What are variations of ${name}?`,
      a: data.name_variations?.length ? `Common variations include ${data.name_variations.slice(0, 5).join(', ')}.` : `There are several variations of ${name} used in different languages and cultures.`,
    },
    {
      q: `Why do parents choose the name ${name}?`,
      a: `${name} is chosen for its spiritual meaning, good origin, and positive cultural associations.`,
    },
  ];

  if (languages) {
    items.push({
      q: `In which languages is ${name} used?`,
      a: `${name} appears in languages such as ${languages}.`,
    });
  }

  if (data.similar_sounding_names?.length) {
    items.push({
      q: `What are names similar to ${name}?`,
      a: `Names similar to ${name} include ${data.similar_sounding_names.slice(0, 5).join(', ')}.`,
    });
  }

  return items.slice(0, 10);
}

/**
 * Generate structured data - stable, clean
 */
export function generateOptimizedSchemas(data, religion, slug) {
  const pageUrl = `${SITE_URL}/names/${religion}/${slug}`;
  const name = data.name;
  const shortMeaning = data.short_meaning || data.meaning || '';
  const coreEmotion = extractCoreEmotion(shortMeaning);
  const faqItems = generateDynamicFaqItems(data, religion);

  const languageSnippet = formatLanguages(data);
  const personality = getPersonalitySummary(data);
  const luckyPieces = [];
  if (data.lucky_number) luckyPieces.push(`lucky number ${data.lucky_number}`);
  if (data.lucky_day) luckyPieces.push(`lucky day ${data.lucky_day}`);
  if (data.lucky_colors?.length) luckyPieces.push(`lucky colors ${data.lucky_colors.slice(0, 3).join(', ')}`);

  const descriptionParts = [`${name} means "${coreEmotion}"`, `${religion} name`];
  if (data.origin) descriptionParts.push(`${data.origin} origin`);
  if (personality) descriptionParts.push(`personality ${personality}`);
  if (languageSnippet) descriptionParts.push(`used in ${languageSnippet}`);
  if (luckyPieces.length) descriptionParts.push(luckyPieces.slice(0, 2).join(', '));

  const publishedDate = data.published_date || data.created_at || data.updated_at || new Date().toISOString().split('T')[0];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": generateOptimizedTitle(data, religion),
    "description": descriptionParts.join(', ') + '.',
    "url": pageUrl,
    "datePublished": publishedDate,
    "dateModified": new Date().toISOString().split('T')[0],
    "author": { "@type": "Organization", "name": "NameVerse" },
    "publisher": { "@type": "Organization", "name": "NameVerse" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "datePublished": publishedDate,
      "author": {
        "@type": "Organization",
        "name": "NameVerse"
      },
      "answerCount": 1,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
        "datePublished": publishedDate,
        "upvoteCount": 0,
        "author": {
          "@type": "Organization",
          "name": "NameVerse"
        }
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": `${religion.charAt(0).toUpperCase() + religion.slice(1)} Names`, "item": `${SITE_URL}/names/${religion}` },
      { "@type": "ListItem", "position": 3, "name": name, "item": pageUrl },
    ],
  };

  return {
    article: articleSchema,
    faq: faqSchema,
    faqData: faqItems,
    breadcrumb: breadcrumbSchema,
  };
}

/**
 * Main metadata generator - Stable, deterministic, SEO-safe
 */
export async function generateNamePageMetadata(data, religion, slug) {
  const pageUrl = `${SITE_URL}/names/${religion}/${slug}`;
  const name = data.name;
  const shortMeaning = data.short_meaning || data.meaning || '';
  
  // Safe meaning extraction for OG image
  const safeMeaning = extractCoreEmotion(shortMeaning);
  
  const title = generateOptimizedTitle(data, religion);
  const description = generateOptimizedDescription(data, religion);
  const keywords = generateOptimizedKeywords(data, religion);
  
  // Stable OG title (deterministic, not random)
  const ogTitle = `${name} Name Meaning in ${religion.charAt(0).toUpperCase() + religion.slice(1)}`;
  
  return {
    title,
    description,
    keywords,
    alternates: { canonical: pageUrl },
    
    openGraph: {
      title: ogTitle,
      description: description.substring(0, 180),
      url: pageUrl,
      siteName: 'NameVerse',
      type: 'website',
      images: [{ 
        url: `${SITE_URL}/api/og?name=${encodeURIComponent(name)}&meaning=${encodeURIComponent(safeMeaning.substring(0, 40))}&religion=${religion}`, 
        width: 1200, 
        height: 630 
      }],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: description.substring(0, 180),
      images: [`${SITE_URL}/api/og?name=${encodeURIComponent(name)}&religion=${religion}`],
    },
    
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    
    other: {
      'theme-color': '#D97706',
      'article:section': 'Baby Names',
    },
  };
}

export function generateNamePageSchemas(data, religion, slug) {
  return generateOptimizedSchemas(data, religion, slug);
}