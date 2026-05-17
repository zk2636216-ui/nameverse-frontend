import Link from 'next/link';
import { Heart, Star, BookOpen, Sparkles, Flower2 } from 'lucide-react';
import namesData from '../../../../public/data/christian-girl-names.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

// ==========================================
// METADATA - World Class SEO
// ==========================================
export const metadata = {
  title: '100+ Christian Girl Names with Meanings | Biblical Baby Girl Names | NameVerse',
  description: 'Discover 100+ beautiful Christian girl names with meanings, origins & lucky numbers. Find the perfect Biblical baby girl name with Hebrew & Greek roots. Complete guide to authentic Christian names for your baby girl.',
  keywords: 'Christian girl names, Biblical girl names, Christian baby girl names, Hebrew girl names, Greek girl names, Bible names for girls, Christian names with meanings, popular Christian girl names, unique Christian girl names, Biblical names from Bible, best Christian girl names 2025, Christian girl names with lucky numbers, Catholic girl names, Protestant girl names, Christian names for newborn girls',
  alternates: {
    canonical: `${SITE_URL}/christian/girl-names`,
  },
  openGraph: {
    title: '100+ Christian Girl Names with Meanings | Biblical Baby Girl Names',
    description: 'Discover 100+ beautiful Christian girl names with meanings, origins & lucky numbers. Find the perfect Biblical baby girl name.',
    type: 'website',
    url: `${SITE_URL}/christian/girl-names`,
    siteName: 'NameVerse',
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Christian Girl Names with Meanings - NameVerse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '100+ Christian Girl Names with Meanings | Biblical Baby Girl Names',
    description: 'Discover 100+ beautiful Christian girl names with meanings, origins & lucky numbers.',
    images: [`${SITE_URL}/logo.png`],
  },
  robots: { 
    index: true, 
    follow: true, 
    'max-image-preview': 'large', 
    'max-snippet': -1 
  },
};

// ==========================================
// STRUCTURED DATA
// ==========================================
function generateStructuredData(names) {
  const nameItems = names.slice(0, 30).map((n, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: n.name,
    url: `${SITE_URL}/christian/girl-names#${n.name.toLowerCase()}`,
    description: `${n.name} means "${n.meaning}" - ${n.origin} origin`
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/christian/girl-names#webpage`,
        "name": "Christian Girl Names with Meanings",
        "description": "Complete collection of 100+ Christian girl names with meanings, origins and lucky numbers",
        "url": `${SITE_URL}/christian/girl-names`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "name": "NameVerse"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
             { "@type": "ListItem", "position": 2, "name": "Christian Names", "item": `${SITE_URL}/names/religion/christian/1` },
            { "@type": "ListItem", "position": 3, "name": "Christian Girl Names", "item": `${SITE_URL}/christian/girl-names` }
          ]
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": "Christian Girl Names Collection",
          "numberOfItems": names.length,
          "itemListElement": nameItems
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the most popular Christian girl names?",
            "datePublished": "2025-01-01",
            "author": { "@type": "Organization", "name": "NameVerse" },
            "answerCount": 1,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The most popular Christian girl names include Isabella, Abigail, Elizabeth, Hannah, Grace, Chloe, Leah, Naomi, Sarah, Eva, Genesis, Eliana, Anna, Gabriella, Lydia, Julia, Delilah, Josephine, and Madeline. These names have deep roots in the Bible and Christian tradition.",
              "datePublished": "2025-01-01",
              "upvoteCount": 0,
              "author": { "@type": "Organization", "name": "NameVerse" }
            }
          },
          {
            "@type": "Question",
            "name": "How do I choose a Christian name for my baby girl?",
            "datePublished": "2025-01-01",
            "author": { "@type": "Organization", "name": "NameVerse" },
            "answerCount": 1,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When choosing a Christian name for your baby girl, consider the Biblical meaning, origin, and whether it has a connection to scripture. Names with positive meanings like 'Grace of God', 'God is my oath', or 'Father's joy' are highly recommended in Christian tradition.",
              "datePublished": "2025-01-01",
              "upvoteCount": 0,
              "author": { "@type": "Organization", "name": "NameVerse" }
            }
          },
          {
            "@type": "Question",
            "name": "What Christian girl names mean 'Grace of God'?",
            "datePublished": "2025-01-01",
            "author": { "@type": "Organization", "name": "NameVerse" },
            "answerCount": 1,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Several Christian girl names carry the meaning related to grace, including Grace, Hannah, and Anna. These names express gratitude for God's grace and blessings.",
              "datePublished": "2025-01-01",
              "upvoteCount": 0,
              "author": { "@type": "Organization", "name": "NameVerse" }
            }
          }
        ]
      }
    ]
  };
}

// ==========================================
// PAGE COMPONENT
// ==========================================
export default function ChristianGirlNamesPage() {
  const structuredData = generateStructuredData(namesData);
  const biblicalNames = namesData.filter(n => n.biblical);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-white/30">
              <Sparkles className="w-4 h-4" />
              <span>100+ Biblical Names</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              Christian Girl Names
              <br />
              <span className="text-pink-200">with Meanings</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-pink-100 max-w-4xl mx-auto mb-10 leading-relaxed">
              Discover beautiful Biblical girl names with Hebrew & Greek origins, 
              verified meanings, lucky numbers & spiritual significance
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
                <BookOpen className="w-5 h-5" />
                <span>Biblical References</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
                <Star className="w-5 h-5" />
                <span>Lucky Numbers</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
                <Heart className="w-5 h-5" />
                <span>Verified Meanings</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
                <Flower2 className="w-5 h-5" />
                <span>Faith-Based</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 py-5" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li><Link href="/" className="text-pink-600 hover:text-pink-800 font-medium">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/names/religion/christian/1" className="text-pink-600 hover:text-pink-800 font-medium">Christian Names</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-pink-700 font-semibold">Girl Names</li>
          </ol>
        </nav>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">100+</div>
              <div className="text-sm text-gray-600">Total Names</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">{biblicalNames.length}</div>
              <div className="text-sm text-gray-600">Biblical Names</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">6</div>
              <div className="text-sm text-gray-600">Origins</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">2025</div>
              <div className="text-sm text-gray-600">Updated</div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-pink-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Complete Guide to Christian Girl Names
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              <p className="leading-relaxed">
                Choosing a name for your baby girl is one of the most beautiful decisions parents make. 
                In Christian tradition, names carry deep significance and connect children to the rich 
                heritage of Biblical history. Our collection features <strong className="text-pink-700">100+ authentic Christian girl names</strong> with verified meanings, 
                Hebrew & Greek origins, and lucky numbers.
              </p>
              <p className="leading-relaxed">
                Each name in our database has been carefully researched to ensure accuracy of meaning and spiritual significance. 
                Whether you're looking for traditional Biblical names like Sarah and Hannah, or modern favorites like Emma and Sophia, 
                you'll find the perfect name for your little one.
              </p>
            </div>
          </div>
        </section>

        {/* Names Grid */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Complete List of Christian Girl Names
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {namesData.map((nameItem, index) => (
              <Link
                key={index}
                href={`/names/religion/christian/1#${nameItem.name.toLowerCase()}`}
                id={nameItem.name.toLowerCase()}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-pink-100 hover:border-pink-300 group hover:-translate-y-1 block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                      {nameItem.name}
                    </h3>
                    {nameItem.biblical && (
                      <span className="inline-block mt-2 bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full font-medium">
                        Biblical
                      </span>
                    )}
                  </div>
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <Flower2 className="w-6 h-6 text-pink-600" />
                  </div>
                </div>
                
                <p className="text-pink-600 font-semibold text-lg mb-4">
                  "{nameItem.meaning}"
                </p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Origin:</span>
                    <span>{nameItem.origin}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Lucky Number:</span>
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 text-amber-700 rounded-full font-bold">
                      {nameItem.luckyNumber}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What are the most popular Christian girl names?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The most popular Christian girl names include Isabella, Abigail, Elizabeth, Hannah, Grace, 
                Chloe, Leah, Naomi, Sarah, Eva, Genesis, Eliana, Anna, Gabriella, Lydia, Julia, Delilah, 
                Josephine, and Madeline. These names have deep roots in the Bible and Christian tradition.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How do I choose a Christian name for my baby girl?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                When choosing a Christian name for your baby girl, consider the Biblical meaning, origin, 
                and whether it has a connection to scripture. Names with positive meanings like 'Grace of God', 
                'God is my oath', or 'Father's joy' are highly recommended in Christian tradition.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What Christian girl names mean 'Grace of God'?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Several Christian girl names carry the meaning related to grace, including Grace, Hannah, 
                and Anna. These names express gratitude for God's grace and blessings and are beloved 
                choices among Christian families.
              </p>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Explore More Names
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              href="/christian/boy-names"
              className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg mb-2">Christian Boy Names</h3>
              <p className="text-blue-100 text-sm">Browse 100+ Biblical boy names</p>
            </Link>
            <Link
               href="/names/religion/christian/1"
              className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg mb-2">All Christian Names</h3>
              <p className="text-pink-100 text-sm">Discover 15,000+ Christian names</p>
            </Link>
            <Link 
              href="/islamic/boy-names"
              className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg mb-2">Islamic Boy Names</h3>
              <p className="text-emerald-100 text-sm">Find 150+ Muslim boy names</p>
            </Link>
            <Link 
              href="/guides/christian-baby-names"
              className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg mb-2">Christian Guide</h3>
              <p className="text-purple-100 text-sm">Expert naming guide</p>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}