'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'

const categories = [
  {
    title: "📖 Islamic Names",
    desc: "Quranic, Arabic, Persian & Urdu origins with transliteration and spiritual significance. Each name includes references to Quranic verses or Hadith when available.",
    longDesc: "Explore 18,000+ authentic Muslim baby names with scholarly meaning verification, including popular 2026 names like RAYAN, AYAN, and ZAYN.",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
    borderAccent: "border-emerald-200 dark:border-emerald-800",
    accentText: "text-emerald-700 dark:text-emerald-400",
    accentBg: "bg-emerald-600 hover:bg-emerald-700",
    accentLight: "bg-emerald-100",
    icon: "🕌",
    stats: "18,000+ names | 98% verified",
    links: [
      { label: "♂ Boy Names", href: "/islamic/boy-names" },
      { label: "♀ Girl Names", href: "/islamic/girl-names" },
      { label: "All Islamic Names →", href: "/names/religion/islamic/1", primary: true },
    ]
  },
  {
    title: "✝️ Christian Names",
    desc: "Biblical Hebrew, Greek & Latin origins including saints, apostles, and modern Christian favorites with strong theological meanings.",
    longDesc: "Discover 11,000+ Christian baby names from Old and New Testament origins, including rare biblical names, virtue names like Grace and Faith, and modern apostolic names for 2026.",
    bgClass: "bg-blue-50 dark:bg-blue-950/30",
    borderAccent: "border-blue-200 dark:border-blue-800",
    accentText: "text-blue-700 dark:text-blue-400",
    accentBg: "bg-blue-600 hover:bg-blue-700",
    accentLight: "bg-blue-100",
    icon: "⛪",
    stats: "11,000+ names | Biblical sources",
    links: [
      { label: "♂ Boy Names", href: "/christian/boy-names" },
      { label: "♀ Girl Names", href: "/christian/girl-names" },
      { label: "All Christian Names →", href: "/names/religion/christian/1", primary: true },
    ]
  },
  {
    title: "🕉️ Hindu Names",
    desc: "Sanskrit, Vedic & mythological origins including gods, goddesses, and modern Indian names with astrological significance.",
    longDesc: "Browse 15,000+ Hindu baby names from ancient Vedas and Puranas. Each name includes deity association, nakshatra compatibility, and modern variations popular in 2026.",
    bgClass: "bg-orange-50 dark:bg-orange-950/30",
    borderAccent: "border-orange-200 dark:border-orange-800",
    accentText: "text-orange-700 dark:text-orange-400",
    accentBg: "bg-orange-600 hover:bg-orange-700",
    accentLight: "bg-orange-100",
    icon: "🔱",
    stats: "15,000+ names | Vedic sources",
    links: [
      { label: "♂ Boy Names", href: "/hindu/boy-names" },
      { label: "♀ Girl Names", href: "/hindu/girl-names" },
      { label: "All Hindu Names →", href: "/names/religion/hindu/1", primary: true },
    ]
  },
]

const faqs = [
  {
    q: "How do I find the perfect Islamic baby name with meaning?",
    a: "Browse our Islamic names collection filtered by boy or girl, then explore by letter A–Z. Each name includes its Quranic reference, Arabic meaning, and 2026 trending status so you can choose an authentic and modern name confidently."
  },
  {
    q: "What are the most popular Muslim boy names in 2026?",
    a: "The top trending Islamic boy names in 2026 are Muhammad, Rayan, Ayan, Zayn, and Yusuf. These names combine Quranic authenticity with modern appeal and are rising globally across Pakistan, UAE, UK, and the US."
  },
  {
    q: "Which Christian baby names are trending in 2026?",
    a: "Top Christian boy names in 2026 include Liam, Noah, Elijah, Ezra, and Theodore. For girls, Olivia, Isla, Grace, and Aurora lead the charts. All carry strong Biblical or theological roots with timeless appeal."
  },
  {
    q: "What are the best Hindu baby names from the Vedas?",
    a: "Popular Vedic-origin Hindu names in 2026 include Vihaan, Arjun, Ishaan for boys and Ananya, Diya, and Kavya for girls. Each carries Sanskrit meaning tied to deities, virtues, or natural elements from the Puranas."
  },
  {
    q: "Can I find gender-neutral names that work across religions?",
    a: "Yes — names like Noor (Islamic/Arabic), Arya (Hindu/Sanskrit), and Eden (Biblical/Hebrew) work beautifully across traditions. Our collections cross-tag unisex names so you can filter by religion and gender-neutral preference together."
  },
  {
    q: "Are all the name meanings verified and accurate?",
    a: "We verify Islamic names against Quranic text and classical Arabic dictionaries, Christian names against Biblical concordances, and Hindu names against Sanskrit etymological references. Our 98% verification rate reflects scholarly review of primary sources."
  },
]

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const religionLetters = [
  {
    religion: 'islamic',
    label: 'Islamic',
    emoji: '🕌',
    gradient: 'from-emerald-500 to-emerald-700',
    hoverBg: 'hover:bg-emerald-50',
    activeBg: 'bg-emerald-600',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
  },
  {
    religion: 'christian',
    label: 'Christian',
    emoji: '✝️',
    gradient: 'from-blue-500 to-blue-700',
    hoverBg: 'hover:bg-blue-50',
    activeBg: 'bg-blue-600',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
  },
  {
    religion: 'hindu',
    label: 'Hindu',
    emoji: '🕉️',
    gradient: 'from-orange-500 to-orange-700',
    hoverBg: 'hover:bg-orange-50',
    activeBg: 'bg-orange-600',
    bgLight: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
  },
];

const latestBlogPosts = [
  {
    id: 'holy-quran-names-with-tafseer',
    title: 'Quran-Inspired Names with Tafseer',
    excerpt: '40+ Quranic names with detailed Tafseer — perfect for parents seeking deep spiritual meaning.',
    category: 'Islamic Names',
    emoji: '📖'
  },
  {
    id: 'why-islamic-names-popular-2026',
    title: 'Why Islamic Names Are the Most Popular Choice',
    excerpt: 'Discover the global rise of Islamic baby names in 2026 and why parents worldwide love them.',
    category: 'Islamic Names',
    emoji: '🌍'
  },
  {
    id: 'trends-predictions-2026-2030',
    title: 'Baby Name Trends & Predictions 2026–2030',
    excerpt: 'Expert predictions on baby name trends for the next 5 years across all religions and cultures.',
    category: 'Trends',
    emoji: '📈'
  },
  {
    id: 'unique-rare-names-2026',
    title: 'Unique & Rare Baby Names for 2026',
    excerpt: 'Stand out with these rare and unique baby names from Islamic, Christian, and Hindu traditions.',
    category: 'Unique',
    emoji: '✨'
  },
  {
    id: 'vishnu-lakshmi-ganesha',
    title: 'Vishnu, Lakshmi & Ganesha Names',
    excerpt: 'Divine Hindu baby names inspired by Vishnu, Lakshmi, and Ganesha for 2026.',
    category: 'Baby Names',
    emoji: '🔱'
  },
  {
    id: 'christian-girl-names-bible',
    title: 'Christian Girl Names from the Bible',
    excerpt: 'Beautiful Christian girl names from the Bible with meanings, origins, and 2026 trending insights.',
    category: 'Christian Names',
    emoji: '✝️'
  },
];

export default function CategoryButtons() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="w-full">

      {/* ── Hero Section ── */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-6 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,rgba(16,185,129,0.3)_1px,transparent_0)] bg-[size:24px_24px]"></div>
        <div className="relative max-w-7xl mx-auto px-4">

          {/* ── Breadcrumb ── */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
              <li>
                <Link href="/" className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-300">/</li>
              <li className="text-gray-700 font-semibold" aria-current="page">Baby Names</li>
            </ol>
          </nav>

          {/* ── H1 Title ── */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
            65,000+ Baby Names with Meanings —{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-orange-600 bg-clip-text text-transparent">
              Islamic, Hindu & Christian Names A–Z
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mb-8 leading-relaxed">
            Discover 65,000+ verified baby names across Islamic Quranic, Christian Biblical, and 
            Hindu Sanskrit traditions — plus 21,000+ rare & unique global names. Each name includes 
            its authentic meaning, linguistic origin, gender, and cultural significance.
          </p>

          {/* ── Quick Stats ── */}
          <div className="flex flex-wrap gap-4 mb-2">
            {[
              { label: 'Islamic Names', count: '18,000+', color: 'bg-emerald-500' },
              { label: 'Christian Names', count: '11,000+', color: 'bg-blue-500' },
              { label: 'Hindu Names', count: '15,000+', color: 'bg-orange-500' },
              { label: 'Other Names', count: '21,000+', color: 'bg-purple-500' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className={`w-2.5 h-2.5 rounded-full ${stat.color}`}></div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{stat.count}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Cards ── */}
      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 ${cat.bgClass} border border-gray-100 dark:border-gray-800 hover:scale-[1.02] group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <div className={`w-full h-full rounded-full ${cat.accentBg} blur-3xl`}></div>
              </div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-4xl">{cat.icon}</span>
                <span className="text-xs font-mono bg-white/50 dark:bg-gray-800/50 px-2.5 py-1 rounded-full text-gray-600 dark:text-gray-400 font-semibold">
                  {cat.stats}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {cat.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                {cat.desc}
              </p>

              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-5 border-l-2 border-purple-300 pl-3 italic">
                {cat.longDesc}
              </p>

              <div className="flex gap-2 mb-3">
                {cat.links.filter(l => !l.primary).map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex-1 text-center text-xs font-semibold py-2.5 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-300 hover:text-purple-700 dark:hover:text-purple-400 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {cat.links.filter(l => l.primary).map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block w-full text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:${cat.accentLight} hover:border-purple-300 transition-all group-hover:shadow-md text-sm`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── SEO Content Section ── */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-emerald-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Find the Perfect Baby Name in 2026 — 65,000+ Names to Explore
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            <p>
              Choosing a baby name is one of the most meaningful decisions a parent can make. Whether you are looking for an authentic <Link href="/islamic/boy-names" className="text-emerald-600 hover:underline font-medium">Islamic boy name</Link> with Quranic roots, a <Link href="/christian/girl-names" className="text-blue-600 hover:underline font-medium">Christian girl name</Link> from the New Testament, or a <Link href="/hindu/boy-names" className="text-orange-600 hover:underline font-medium">Hindu boy name</Link> rooted in Sanskrit tradition — our verified collection of 65,000+ names covers every faith, culture, and style preference for 2026.
            </p>
            <p>
              Every name in our database includes its linguistic origin, scholarly meaning, religious significance, gender classification, lucky number, and real-time 2026 trending data so you can make a confident, informed choice. Our team of nameologists and religious scholars has verified each name against primary sources including the Quran, Biblical concordances, and Sanskrit etymological references, giving you a 98% verification accuracy rate.
            </p>
            <p>
              Start by exploring <Link href="/names/religion/islamic/1" className="text-emerald-600 hover:underline font-medium">all Islamic names</Link>,{' '}
              <Link href="/names/religion/christian/1" className="text-blue-600 hover:underline font-medium">all Christian names</Link>, or{' '}
              <Link href="/names/religion/hindu/1" className="text-orange-600 hover:underline font-medium">all Hindu names</Link>. 
              You can also browse by your favorite starting letter below — we have curated A–Z collections for each religion.
            </p>
          </div>
        </div>
      </section>

      {/* ── Gender Quick Links ── */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Browse by Religion & Gender</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "🕌 Islamic Boys", href: "/islamic/boy-names", color: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40" },
            { label: "🕌 Islamic Girls", href: "/islamic/girl-names", color: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40" },
            { label: "✝️ Christian Boys", href: "/christian/boy-names", color: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40" },
            { label: "✝️ Christian Girls", href: "/christian/girl-names", color: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40" },
            { label: "🔱 Hindu Boys", href: "/hindu/boy-names", color: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/40" },
            { label: "🔱 Hindu Girls", href: "/hindu/girl-names", color: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/40" },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${item.color} border rounded-xl p-3.5 text-center text-sm font-semibold text-gray-800 dark:text-gray-200 transition-all hover:shadow-md hover:scale-[1.03]`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Browse Names by Letter A-Z for Each Religion ── */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Browse Baby Names by Letter A to Z
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Instantly jump to any letter in our Islamic, Christian, or Hindu name collections. Click a letter to see every baby name starting with that letter — complete with meanings, origins, and lucky numbers.
          </p>
          {religionLetters.map((rl) => (
            <div key={rl.religion} className={`mb-6 last:mb-0 ${rl.bgLight} dark:bg-gray-700/30 rounded-2xl p-4 md:p-5`}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r ${rl.gradient} text-white text-sm font-bold shadow-sm`}>
                  {rl.emoji}
                </span>
                <h3 className={`text-base font-bold ${rl.textColor}`}>
                  {rl.label} Baby Names by Letter
                </h3>
                <Link
                  href={`/names/religion/${rl.religion}/1`}
                  className={`ml-auto text-xs font-semibold ${rl.textColor} hover:underline`}
                >
                  View All &rarr;
                </Link>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ALPHABET.map((letter) => (
                  <Link
                    key={letter}
                    href={`/names/${rl.religion}/letter/${letter}/1`}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-200 bg-white border ${rl.borderColor} ${rl.textColor} ${rl.hoverBg} hover:shadow-sm hover:scale-110 dark:bg-gray-800 dark:border-gray-600`}
                    aria-label={`${rl.label} baby names starting with ${letter}`}
                    title={`Browse ${rl.label} baby names beginning with ${letter}`}
                  >
                    {letter}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Each letter page shows up to 50 names per page with meanings, origins, gender, and lucky numbers. Browse all A–Z letters or jump directly to your favourite starting letter above.
            </p>
          </div>
        </div>
      </section>

      {/* ── Latest Blog Posts ── */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Latest Baby Name Guides</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Expert articles and naming insights for 2026</p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            View All Articles <span className="text-lg leading-none">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {latestBlogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{post.emoji}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {post.category}
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Read Guide <span className="text-sm">→</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6 sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            View All Articles <span className="text-lg leading-none">→</span>
          </Link>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="max-w-3xl mx-auto px-4 mb-20">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Baby Names FAQ: Everything Parents Need to Know
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
            Expert answers to the most common questions about choosing the perfect name for your baby
          </p>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-gray-900 dark:text-white font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="pr-4">{faq.q}</span>
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map(f => {
                  const publishedDate = new Date().toISOString().split('T')[0];
                  return {
                    "@type": "Question",
                    "name": f.q,
                    "datePublished": publishedDate,
                    "author": { "@type": "Organization", "name": "NameVerse" },
                    "answerCount": 1,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": f.a,
                      "datePublished": publishedDate,
                      "upvoteCount": 0,
                      "author": { "@type": "Organization", "name": "NameVerse" }
                    }
                  };
                })
              })
            }}
          />
        </div>
      </section>

    </div>
  )
}