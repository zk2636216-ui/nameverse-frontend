/**
 * Structured Data (Schema.org) Helpers
 * Generate JSON-LD schemas for rich snippets
 */

/**
 * Generate Product schema for name pages (for rich snippets)
 * @param {Object} name - Name data
 * @param {string} religion - Religion category
 * @param {string} slug - Name slug
 * @returns {Object} Product schema
 */
export function generateNameProductSchema(name, religion, slug) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${name.name} - ${name.religion || religion} Baby Name`,
    description: name.long_meaning || name.short_meaning || `Discover the meaning and origin of ${name.name}`,
    brand: {
      '@type': 'Brand',
      name: 'NameVerse'
    },
    category: `${name.religion || religion} Baby Names`,
    url: `https://nameverse.vercel.app/names/${religion}/${slug}`,
    image: `https://nameverse.vercel.app/logo.png`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://nameverse.vercel.app/names/${religion}/${slug}`
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Origin',
        value: name.origin || 'Cultural'
      },
      {
        '@type': 'PropertyValue',
        name: 'Religion',
        value: name.religion || religion
      },
      {
        '@type': 'PropertyValue',
        name: 'Gender',
        value: name.gender || 'Unisex'
      },
      ...(name.lucky_number ? [{
        '@type': 'PropertyValue',
        name: 'Lucky Number',
        value: name.lucky_number.toString()
      }] : []),
      ...(name.lucky_day ? [{
        '@type': 'PropertyValue',
        name: 'Lucky Day',
        value: name.lucky_day
      }] : []),
      ...(name.lucky_stone ? [{
        '@type': 'PropertyValue',
        name: 'Lucky Stone',
        value: name.lucky_stone
      }] : []),
    ]
  };
}

/**
 * Generate enhanced Article schema
 * @param {Object} article - Article data
 * @returns {Object} Article schema
 */
export function generateArticleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || article.subtitle || article.summary,
    image: article.cover_image_url || 'https://nameverse.vercel.app/logo.png',
    datePublished: article.createdAt || article.created_at,
    dateModified: article.updatedAt || article.updated_at || article.createdAt,
    author: {
      '@type': 'Person',
      name: article.author || 'NameVerse Editorial Team',
      url: 'https://nameverse.vercel.app/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'NameVerse',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nameverse.vercel.app/logo.png',
        width: 200,
        height: 200
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nameverse.vercel.app/blog/${article.slug}`
    },
    wordCount: article.content?.split(/\s+/).length || 500,
    articleBody: article.content?.substring(0, 500),
    keywords: article.tags?.join(', ') || article.category,
    articleSection: article.category,
    inLanguage: 'en-US'
  };
}

/**
 * Generate FAQPage schema
 * @param {Array} faqs - Array of {question, answer} objects
 * @returns {Object} FAQPage schema
 */
export function generateFAQSchema(faqs, pageDate = null) {
  if (!faqs || faqs.length === 0) return null;
  
  const publishedDate = pageDate || new Date().toISOString().split('T')[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question || faq.q,
      datePublished: publishedDate,
      author: {
        '@type': 'Organization',
        name: 'NameVerse'
      },
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer || faq.a,
        datePublished: publishedDate,
        upvoteCount: 0,
        author: {
          '@type': 'Organization',
          name: 'NameVerse'
        }
      }
    }))
  };
}

/**
 * Generate BreadcrumbList schema
 * @param {Array} items - Breadcrumb items [{label, href}]
 * @returns {Object} BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items) {
  if (!items || items.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://nameverse.vercel.app'
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href && { item: `https://nameverse.vercel.app${item.href}` })
      }))
    ]
  };
}

/**
 * Generate CollectionPage schema for category pages
 * @param {Object} data - Collection data
 * @returns {Object} CollectionPage schema
 */
export function generateCollectionSchema(data) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: data.title || `${data.religion} Baby Names Collection`,
    description: data.description || `Browse beautiful ${data.religion} baby names with meanings and origins`,
    url: `https://nameverse.vercel.app${data.url || '/names'}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'NameVerse',
      url: 'https://nameverse.vercel.app'
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: data.totalNames || data.count || 0,
      itemListElement: (data.names || []).slice(0, 10).map((name, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Thing',
          name: name.name,
          description: name.short_meaning || name.meaning,
          url: `https://nameverse.vercel.app/names/${religion || name.religion}/${name.slug}`
        }
      }))
    }
  };
}

/**
 * Generate AggregateRating schema (if you have ratings)
 * @param {Object} data - Rating data
 * @returns {Object} AggregateRating schema
 */
export function generateRatingSchema(data) {
  if (!data.ratingValue || !data.reviewCount) return null;

  return {
    '@type': 'AggregateRating',
    ratingValue: data.ratingValue.toString(),
    reviewCount: data.reviewCount.toString(),
    bestRating: '5',
    worstRating: '1'
  };
}

/**
 * Render JSON-LD script tag
 * @param {Object} schema - Schema object
 * @returns {JSX} Script element
 */
export function renderSchema(schema) {
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default {
  generateNameProductSchema,
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateCollectionSchema,
  generateRatingSchema,
  renderSchema,
};
