import HomePageClient from "../components/HomePage/Homepage";
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';
import fs from 'fs';
import path from 'path';

// ISR with 30-day cache for the homepage
export const revalidate = 2592000; // 30 days

// ✅ Read domain from .env
const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.vercel.app";

// Read blog posts data server-side
const blogPostsPath = path.join(process.cwd(), 'public', 'data', 'blog-posts.json');
let latestArticles = [];
try {
  const fileContents = fs.readFileSync(blogPostsPath, 'utf8');
  const allPosts = JSON.parse(fileContents);
  // Sort by publishDate descending and take top 6 for homepage
  const sortedPosts = allPosts
    .filter(post => post.publishDate)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  latestArticles = sortedPosts.slice(0, 3);
} catch (error) {
}

const publishedDate = new Date().toISOString().split('T')[0];

const homepageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${DOMAIN}/#website`,
      "url": DOMAIN,
      "name": "NameVerse — 65,000+ Baby Names with Meanings 2026",
      "description": "Discover 65,000+ verified Islamic Quranic, Christian Biblical & Hindu Sanskrit baby names A–Z with authentic meanings, origins, lucky numbers, and 2026 trending data. Fast search by religion, gender, letter & meaning.",
      "inLanguage": "en-US",
      "publisher": {
        "@id": `${DOMAIN}/#organization`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${DOMAIN}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "about": {
        "@type": "Thing",
        "name": "Baby Names by Religion"
      }
    },
    {
      "@type": "Organization",
      "@id": `${DOMAIN}/#organization`,
      "name": "NameVerse",
      "url": DOMAIN,
      "logo": {
        "@type": "ImageObject",
        "url": `${DOMAIN}/logo.png`,
        "width": 512,
        "height": 512,
        "caption": "NameVerse — 65,000+ Baby Names with Meanings 2026"
      },
      "description": "NameVerse is the leading baby names platform with 65,000+ verified Islamic, Christian & Hindu baby names with authentic meanings, origins, and 2026 trending data.",
      "foundingDate": "2025",
      "founders": [{ "@type": "Person", "name": "Zakriya Khan" }]
    },
    {
      "@type": "FAQPage",
      "@id": `${DOMAIN}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is NameVerse and how does it help find baby names?",
          "answerCount": 1,
          "datePublished": publishedDate,
          "upvoteCount": 0,
          "author": { "@type": "Organization", "name": "NameVerse" },
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "NameVerse is the world's most comprehensive baby name platform with 65,000+ verified names from Islamic, Christian, and Hindu traditions. You can search by religion, gender, starting letter, origin, and meaning to find the perfect name with authentic meanings and 2026 trending data.",
            "datePublished": publishedDate,
            "upvoteCount": 0,
            "author": { "@type": "Organization", "name": "NameVerse" }
          }
        },
        {
          "@type": "Question",
          "name": "What are the best baby names in 2026?",
          "answerCount": 1,
          "datePublished": publishedDate,
          "upvoteCount": 0,
          "author": { "@type": "Organization", "name": "NameVerse" },
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Top trending baby names in 2026 include Muhammad, Rayan, Ayan, and Zayn (Islamic), Liam, Noah, Elijah, and Ezra (Christian), and Vihaan, Arjun, Ananya, and Diya (Hindu). NameVerse tracks real-time popularity across all traditions.",
            "datePublished": publishedDate,
            "upvoteCount": 0,
            "author": { "@type": "Organization", "name": "NameVerse" }
          }
        },
        {
          "@type": "Question",
          "name": "Are NameVerse name meanings verified and accurate?",
          "answerCount": 1,
          "datePublished": publishedDate,
          "upvoteCount": 0,
          "author": { "@type": "Organization", "name": "NameVerse" },
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, NameVerse verifies Islamic names against Quranic text and classical Arabic dictionaries, Christian names against Biblical concordances, and Hindu names against Sanskrit etymological references with a 98% verification accuracy rate.",
            "datePublished": publishedDate,
            "upvoteCount": 0,
            "author": { "@type": "Organization", "name": "NameVerse" }
          }
        },
        {
          "@type": "Question",
          "name": "How do I search baby names by religion on NameVerse?",
          "answerCount": 1,
          "datePublished": publishedDate,
          "upvoteCount": 0,
          "author": { "@type": "Organization", "name": "NameVerse" },
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can browse 18,000+ Islamic Quranic names, 11,000+ Christian Biblical names, and 15,000+ Hindu Sanskrit names A–Z. Each section allows filtering by boy/girl, starting letter, origin, and meaning with lucky numbers and trending data.",
            "datePublished": publishedDate,
            "upvoteCount": 0,
            "author": { "@type": "Organization", "name": "NameVerse" }
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": DOMAIN },
        { "@type": "ListItem", "position": 2, "name": "Baby Names", "item": `${DOMAIN}/names` },
        { "@type": "ListItem", "position": 3, "name": "Islamic Names", "item": `${DOMAIN}/names/religion/islamic/1` },
        { "@type": "ListItem", "position": 4, "name": "Christian Names", "item": `${DOMAIN}/names/religion/christian/1` },
        { "@type": "ListItem", "position": 5, "name": "Hindu Names", "item": `${DOMAIN}/names/religion/hindu/1` }
      ]
    }
  ]
};

// ============================================================
// GSC #1 RANKING: "NameVerse" brand keyword dominance strategy
// ------------------------------------------------------------
// Targets: "NameVerse", "NameVerse baby names", "NameVerse names",
// "NameVerse meaning", "NameVerse website", "what is NameVerse"
// ============================================================
export const metadata = {
  title: "NameVerse — 65,000+ Baby Names with Meanings & Origins 2026",
  description: validateMetaDescription(
    "NameVerse is the world's #1 baby names platform with 65,000+ verified Islamic Quranic, Christian Biblical & Hindu Sanskrit names A–Z. Search NameVerse for authentic meanings, origins, lucky numbers & trending data. Trusted by 5M+ parents worldwide."
  ),
  keywords: [
    "NameVerse",
    "NameVerse baby names",
    "NameVerse names",
    "NameVerse meaning",
    "NameVerse website",
    "what is NameVerse",
    "NameVerse baby names with meanings",
    "NameVerse Islamic names",
    "NameVerse Hindu names",
    "NameVerse Christian names",
    "NameVerse name meanings",
    "baby names",
    "baby names with meanings",
    "popular baby names",
    "unique baby names",
    "Islamic baby names",
    "Hindu baby names",
    "Christian baby names",
    "name meanings",
    "religious baby names",
    "name origins",
    "trending baby names"
  ].join(', '),
  openGraph: {
    title: "NameVerse — 65,000+ Baby Names with Meanings & Origins 2026",
    description: validateMetaDescription(
      "NameVerse is the world's #1 platform for baby names with meanings. Search NameVerse for 65,000+ verified Islamic, Hindu & Christian names with authentic meanings, origins, and 2026 trending data."
    ),
    url: DOMAIN + "/",
    type: "website",
    siteName: "NameVerse",
    images: [{ 
      url: `${DOMAIN}/logo.png`, 
      width: 1200, 
      height: 630, 
      type: "image/png", 
      alt: "NameVerse — 65K+ baby names with meanings" 
    }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@NameVerseOfficial",
    title: "NameVerse — 65,000+ Baby Names with Meanings & Origins 2026",
    description: validateMetaDescription(
      "NameVerse is the world's #1 baby names platform. Search NameVerse for 65,000+ verified Islamic, Hindu & Christian names with authentic meanings, origins, lucky numbers & trending data. Trusted by 5M+ parents."
    ),
    images: [`${DOMAIN}/og-image.jpg`],
  },
  alternates: {
    canonical: DOMAIN + "/",
    languages: {
      "x-default": DOMAIN + "/",
      en: DOMAIN + "/",
    },
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Zakriya Khan", url: DOMAIN + "/" }],
};

// ✅ Next.js 14+ themeColor export
export function generateThemeColor() {
  return "#0f766e";
}

// ✅ Next.js 14+ viewport export
export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  };
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageStructuredData) }}
      />

      <HomePageClient latestArticles={latestArticles} />
    </>
  );
}