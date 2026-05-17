import Link from 'next/link';
import { Heart, Star, BookOpen, Sparkles, Sun } from 'lucide-react';
import namesData from '../../../../public/data/hindu-boy-names.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

// ==========================================
// METADATA - World Class SEO
// ==========================================
export const metadata = {
  title: '150+ Hindu Boy Names with Meanings | Sanskrit Baby Boy Names | NameVerse',
  description: 'Discover 150+ beautiful Hindu boy names with meanings, origins & lucky numbers. Find the perfect Sanskrit baby boy name with Vedic roots. Complete guide to authentic Hindu names for your baby boy.',
  keywords: 'Hindu boy names, Sanskrit boy names, Hindu baby boy names, Vedic boy names, Indian boy names, Hindu names with meanings, popular Hindu boy names, unique Hindu boy names, Sanskrit names from Vedas, best Hindu boy names 2025, Hindu boy names with lucky numbers, Brahmin boy names, Hindu names for newborn boys, traditional Indian boy names',
  alternates: {
    canonical: `${SITE_URL}/hindu/boy-names`,
  },
  openGraph: {
    title: '150+ Hindu Boy Names with Meanings | Sanskrit Baby Boy Names',
    description: 'Discover 150+ beautiful Hindu boy names with meanings, origins & lucky numbers. Find the perfect Sanskrit baby boy name.',
    type: 'website',
    url: `${SITE_URL}/hindu/boy-names`,
    siteName: 'NameVerse',
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Hindu Boy Names with Meanings - NameVerse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '150+ Hindu Boy Names with Meanings | Sanskrit Baby Boy Names',
    description: 'Discover 150+ beautiful Hindu boy names with meanings, origins & lucky numbers.',
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
    url: `${SITE_URL}/hindu/boy-names#${n.name.toLowerCase()}`,
    description: `${n.name} means "${n.meaning}" - ${n.origin} origin`
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/hindu/boy-names#webpage`,
        "name": "Hindu Boy Names with Meanings",
        "description": "Complete collection of 150+ Hindu boy names with meanings, origins and lucky numbers",
        "url": `${SITE_URL}/hindu/boy-names`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "name": "NameVerse"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
            { "@type": "ListItem", "position": 2, "name": "Hindu Names", "item": `${SITE_URL}/names/religion/hindu/1` },
            { "@type": "ListItem", "position": 3, "name": "Hindu Boy Names", "item": `${SITE_URL}/hindu/boy-names` }
          ]
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": "Hindu Boy Names Collection",
          "numberOfItems": names.length,
          "itemListElement": nameItems
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the most popular Hindu boy names?",
            "datePublished": "2025-01-01",
            "author": { "@type": "Organization", "name": "NameVerse" },
            "answerCount": 1,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The most popular Hindu boy names include Aarav, Aarush, Aayush, Abhay, Abhinav, Aditya, Akash, Aryan, Dhruv, Ishan, Kabir, Krish, Laksh, Mohan, Neel, Om, Pranav, Reyansh, Rudra, Shaurya, Shiv, Vihaan, and Yuvan. These names have deep roots in Sanskrit and Hindu tradition.",
              "datePublished": "2025-01-01",
              "upvoteCount": 0,
              "author": { "@type": "Organization", "name": "NameVerse" }
            }
          },
          {
            "@type": "Question",
            "name": "How do I choose a Hindu name for my baby boy?",
            "datePublished": "2025-01-01",
            "author": { "@type": "Organization", "name": "NameVerse" },
            "answerCount": 1,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When choosing a Hindu name for your baby boy, consider the Sanskrit meaning, origin, and whether it has a connection to Hindu mythology or Vedas. Names with positive meanings like 'Peaceful', 'Sun', 'Sky', or 'Fearless' are highly recommended in Hindu tradition.",
              "datePublished": "2025-01-01",
              "upvoteCount": 0,
              "author": { "@type": "Organization", "name": "NameVerse" }
            }
          },
          {
            "@type": "Question",
            "name": "What Hindu boy names mean 'Sun'?",
            "datePublished": "2025-01-01",
            "author": { "@type": "Organization", "name": "NameVerse" },
            "answerCount": 1,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Several Hindu boy names carry the meaning 'Sun', including Aadavan, Aadhav, Aadhavan, Aadith, Aarav, Aarush, and Aaru. These names express brightness and vitality in Hindu tradition.",
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
export default function HinduBoyNamesPage() {
  const structuredData = generateStructuredData(namesData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-white/30">
              <Sparkles className="w-4 h-4" />
              <span>150+ Sanskrit Names</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              Hindu Boy Names
              <br />
              <span className="text-orange-200">with Meanings</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-orange-100 max-w-4xl mx-auto mb-10 leading-relaxed">
              Discover beautiful Sanskrit boy names with Vedic origins, 
              verified meanings, lucky numbers & spiritual significance
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
                <BookOpen className="w-5 h-5" />
                <span>Vedic References</span>
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
                <Sun className="w-5 h-5" />
                <span>Sanskrit Roots</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 py-5" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li><Link href="/" className="text-orange-600 hover:text-orange-800 font-medium">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/names/religion/hindu/1" className="text-orange-600 hover:text-orange-800 font-medium">Hindu Names</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-orange-700 font-semibold">Boy Names</li>
          </ol>
        </nav>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">150+</div>
              <div className="text-sm text-gray-600">Total Names</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Sanskrit Origin</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">2025</div>
              <div className="text-sm text-gray-600">Updated</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">9</div>
              <div className="text-sm text-gray-600">Lucky Numbers</div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-orange-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Complete Guide to Hindu Boy Names
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              <p className="leading-relaxed">
                Choosing a name for your baby boy is one of the most important decisions parents make. 
                In Hindu tradition, names carry deep significance and connect children to the rich 
                heritage of Sanskrit and Vedic wisdom. Our collection features <strong className="text-orange-700">150+ authentic Hindu boy names</strong> with verified meanings, 
                Sanskrit origins, and lucky numbers.
              </p>
              <p className="leading-relaxed">
                Each name in our database has been carefully researched to ensure accuracy of meaning and spiritual significance. 
                Whether you're looking for traditional Vedic names like Aarav and Dhruv, or modern favorites like Aarush and Aayush, 
                you'll find the perfect name for your little one.
              </p>
            </div>
          </div>
        </section>

        {/* Names Grid */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Complete List of Hindu Boy Names
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {namesData.map((nameItem, index) => (
              <Link
                key={index}
                href={`/names/hindu/${nameItem.name.toLowerCase().replace(/\s+/g, '-')}`}
                id={nameItem.name.toLowerCase()}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-orange-100 hover:border-orange-300 group hover:-translate-y-1 block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {nameItem.name}
                    </h3>
                    <span className="inline-block mt-2 bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full font-medium">
                      Sanskrit
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Sun className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                
                <p className="text-orange-600 font-semibold text-lg mb-4">
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
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What are the most popular Hindu boy names?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The most popular Hindu boy names include Aarav, Aarush, Aayush, Abhay, Abhinav, Aditya, 
                Akash, Aryan, Dhruv, Ishan, Kabir, Krish, Laksh, Mohan, Neel, Om, Pranav, Reyansh, 
                Rudra, Shaurya, Shiv, Vihaan, and Yuvan. These names have deep roots in Sanskrit 
                and Hindu tradition.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How do I choose a Hindu name for my baby boy?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                When choosing a Hindu name for your baby boy, consider the Sanskrit meaning, origin, 
                and whether it has a connection to Hindu mythology or Vedas. Names with positive meanings 
                like 'Peaceful', 'Sun', 'Sky', or 'Fearless' are highly recommended in Hindu tradition.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What Hindu boy names mean 'Sun'?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Several Hindu boy names carry the meaning 'Sun', including Aadavan, Aadhav, Aadhavan, 
                Aadith, Aarav, Aarush, and Aaru. These names express brightness and vitality in 
                Hindu tradition and are beloved choices among Indian families.
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
              href="/hindu/girl-names"
              className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg mb-2">Hindu Girl Names</h3>
              <p className="text-pink-100 text-sm">Browse 150+ Sanskrit girl names</p>
            </Link>
            <Link
               href="/names/religion/hindu/1"
              className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg mb-2">All Hindu Names</h3>
              <p className="text-orange-100 text-sm">Discover 20,000+ Hindu names</p>
            </Link>
            <Link 
              href="/islamic/boy-names"
              className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg mb-2">Islamic Boy Names</h3>
              <p className="text-emerald-100 text-sm">Find 150+ Muslim boy names</p>
            </Link>
            <Link 
              href="/guides/hindu-baby-names"
              className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg mb-2">Hindu Guide</h3>
              <p className="text-purple-100 text-sm">Expert naming guide</p>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}