import Link from 'next/link';
import { Heart, Star, BookOpen, Sparkles, Moon } from 'lucide-react';
import namesData from '../../../../public/data/islamic-boy-names.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

// ==========================================
// METADATA - World Class SEO
// ==========================================
export const metadata = {
  title: '150+ Islamic Boy Names with Meanings | Muslim Baby Boy Names from Quran | NameVerse',
  description: 'Discover 150+ beautiful Islamic boy names with meanings, origins & lucky numbers. Find the perfect Muslim baby boy name with Arabic roots. Complete guide to authentic Islamic names for your baby boy.',
  keywords: 'Islamic boy names, Muslim boy names, Islamic baby boy names, Quranic boy names, Arabic boy names, Muslim baby names for boys, Islamic names with meanings, popular Islamic boy names, unique Muslim boy names, Islamic boy names from Quran, best Islamic boy names 2025, Muslim boy names with lucky numbers, Arabic baby boy names, Islamic names for newborn boys, traditional Islamic boy names',
  alternates: {
    canonical: `${SITE_URL}/islamic/boy-names`,
  },
  openGraph: {
    title: '150+ Islamic Boy Names with Meanings | Muslim Baby Boy Names',
    description: 'Discover 150+ beautiful Islamic boy names with meanings, origins & lucky numbers. Find the perfect Muslim baby boy name.',
    type: 'website',
    url: `${SITE_URL}/islamic/boy-names`,
    siteName: 'NameVerse',
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Islamic Boy Names with Meanings - NameVerse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '150+ Islamic Boy Names with Meanings | Muslim Baby Boy Names',
    description: 'Discover 150+ beautiful Islamic boy names with meanings, origins & lucky numbers.',
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
    url: `${SITE_URL}/islamic/boy-names#${n.name.toLowerCase()}`,
    description: `${n.name} means "${n.meaning}" - ${n.origin} origin`
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/islamic/boy-names#webpage`,
        "name": "Islamic Boy Names with Meanings",
        "description": "Complete collection of 150+ Islamic boy names with meanings, origins and lucky numbers",
        "url": `${SITE_URL}/islamic/boy-names`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "name": "NameVerse"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
            { "@type": "ListItem", "position": 2, "name": "Islamic Names", "item": `${SITE_URL}/names/religion/islamic/1` },
            { "@type": "ListItem", "position": 3, "name": "Islamic Boy Names", "item": `${SITE_URL}/islamic/boy-names` }
          ]
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": "Islamic Boy Names Collection",
          "numberOfItems": names.length,
          "itemListElement": nameItems
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the most popular Islamic boy names?",
            "datePublished": "2025-01-01",
            "author": { "@type": "Organization", "name": "NameVerse" },
            "answerCount": 1,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The most popular Islamic boy names include Muhammad, Ahmad, Ali, Hassan, Hussain, Umar, Usman, Bilal, Yusuf, Ibrahim, Hamza, and Khalid. These names have deep roots in Islamic history and Arabic tradition.",
              "datePublished": "2025-01-01",
              "upvoteCount": 0,
              "author": { "@type": "Organization", "name": "NameVerse" }
            }
          },
          {
            "@type": "Question",
            "name": "How do I choose an Islamic name for my baby boy?",
            "datePublished": "2025-01-01",
            "author": { "@type": "Organization", "name": "NameVerse" },
            "answerCount": 1,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When choosing an Islamic name for your baby boy, consider the Arabic meaning, origin, and whether it has Quranic reference. Names with positive meanings like 'Praised', 'Wise', 'Merciful', or 'Eternal' are highly recommended in Islamic tradition.",
              "datePublished": "2025-01-01",
              "upvoteCount": 0,
              "author": { "@type": "Organization", "name": "NameVerse" }
            }
          },
          {
            "@type": "Question",
            "name": "What Islamic boy names mean 'Praised'?",
            "datePublished": "2025-01-01",
            "author": { "@type": "Organization", "name": "NameVerse" },
            "answerCount": 1,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Several Islamic boy names carry the meaning 'Praised', including Muhammad and Ahmad. These names express gratitude and are beloved choices among Muslim families worldwide.",
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
export default function IslamicBoyNamesPage() {
  const structuredData = generateStructuredData(namesData);
  const quranicNames = namesData.filter(n => n.quranicReference);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[size:20px_20px]"></div>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-white/30">
              <Sparkles className="w-4 h-4" />
              <span>150+ Islamic Names</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              Islamic Boy Names
              <br />
              <span className="text-emerald-200">with Meanings</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-emerald-100 max-w-4xl mx-auto mb-10 leading-relaxed">
              Discover beautiful Muslim baby boy names from the Quran with Arabic origins, 
              verified meanings, lucky numbers & spiritual significance
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
                <BookOpen className="w-5 h-5" />
                <span>Quranic References</span>
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
                <Moon className="w-5 h-5" />
                <span>Arabic Roots</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 py-5" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li><Link href="/" className="text-emerald-600 hover:text-emerald-800 font-medium">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/names/religion/islamic/1" className="text-emerald-600 hover:text-emerald-800 font-medium">Islamic Names</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-emerald-700 font-semibold">Boy Names</li>
          </ol>
        </nav>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">150+</div>
              <div className="text-sm text-gray-600">Total Names</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">{quranicNames.length}</div>
              <div className="text-sm text-gray-600">Quranic Names</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Arabic Origin</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">2025</div>
              <div className="text-sm text-gray-600">Updated</div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-emerald-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Complete Guide to Islamic Boy Names
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              <p className="leading-relaxed">
                Choosing a name for your baby boy is one of the most important decisions parents make. 
                In Islamic tradition, names carry deep significance and connect children to the rich 
                heritage of Arabic language and Quranic wisdom. Our collection features <strong className="text-emerald-700">150+ authentic Islamic boy names</strong> with verified meanings, 
                Arabic origins, and lucky numbers.
              </p>
              <p className="leading-relaxed">
                Each name in our database has been carefully researched to ensure accuracy of meaning and spiritual significance. 
                Whether you're looking for traditional Quranic names like Muhammad and Ali, or modern favorites like Rayyan and Ayaan, 
                you'll find the perfect name for your little one.
              </p>
            </div>
          </div>
        </section>

        {/* Names Grid */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Complete List of Islamic Boy Names
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {namesData.map((nameItem, index) => (
              <div 
                key={index}
                id={nameItem.name.toLowerCase()}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-emerald-100 hover:border-emerald-300 group hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {nameItem.name}
                    </h3>
                    {nameItem.quranicReference && (
                      <span className="inline-block mt-2 bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium">
                        Quranic
                      </span>
                    )}
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Moon className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                
                <p className="text-emerald-600 font-semibold text-lg mb-4">
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
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What are the most popular Islamic boy names?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The most popular Islamic boy names include Muhammad, Ahmad, Ali, Hassan, Hussain, Umar, Usman, 
                Bilal, Yusuf, Ibrahim, Hamza, and Khalid. These names have deep roots in Islamic history 
                and Arabic tradition, making them timeless choices for Muslim families worldwide.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How do I choose an Islamic name for my baby boy?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                When choosing an Islamic name for your baby boy, consider the Arabic meaning, origin, 
                and whether it has Quranic reference. Names with positive meanings like 'Praised', 'Wise', 
                'Merciful', or 'Eternal' are highly recommended in Islamic tradition.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What Islamic boy names mean 'Praised'?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Several Islamic boy names carry the meaning 'Praised', including Muhammad and Ahmad. 
                These names express gratitude and are beloved choices among Muslim families worldwide.
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
              href="/islamic/girl-names"
              className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg mb-2">Islamic Girl Names</h3>
              <p className="text-pink-100 text-sm">Browse 200+ Muslim girl names</p>
            </Link>
            <Link
               href="/names/religion/islamic/1"
              className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg mb-2">All Islamic Names</h3>
              <p className="text-emerald-100 text-sm">Discover 25,000+ Islamic names</p>
            </Link>
            <Link 
              href="/christian/boy-names"
              className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg mb-2">Christian Boy Names</h3>
              <p className="text-blue-100 text-sm">Find 100+ Biblical boy names</p>
            </Link>
            <Link 
              href="/guides/islamic-baby-names"
              className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg mb-2">Islamic Guide</h3>
              <p className="text-purple-100 text-sm">Expert naming guide</p>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}