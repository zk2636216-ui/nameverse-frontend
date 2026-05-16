import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AppInstallPopup from "./install";
import Script from 'next/script';
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import ResourceHints from "@/components/Performance/ResourceHints";
import PerformanceInit from "./performance";
import StructuredData from "@/components/SEO/StructuredData";
import GoogleBotMeta from "@/components/SEO/GoogleBotMeta";
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';
import { AppProvider } from "@/contexts/AppContext";
import LoadingWrapper from "@/components/LoadingAnimation/LoadingWrapper";
import { Suspense } from 'react';

// Use environment variable or default - will be overridden client-side if needed
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.vercel.app";

// ✅ Global SEO Metadata
export const metadata = {
  title: {
    default: validateMetaTitle("Baby Names 2026 — Islamic, Hindu & Christian"),
    template: "%s | NameVerse"
  },
  description: validateMetaDescription(
    "Explore 60,000+ baby names with meanings, origins, and numerology. Discover Islamic, Hindu, and Christian names in Urdu, Arabic, Hindi & English."
  ),
  keywords:
    "baby names, baby names 2026, baby names a to z, baby names muslim, muslim baby names list, baby names girl, baby boy names 2026, baby names muslim boy, name meanings, name meanings in urdu, name meanings in islam, baby names with meanings, unique baby names, modern baby names, islamic boy names from quran, hindu girl names meaning love, christian baby names with meanings, nameverse meaning, nameverse website, baby name generator, name suggestions, muslim baby names list, hindu baby names list, christian baby names list, Arabic baby names, Urdu baby names, meaning of names list, religious baby names, Quranic names, Biblical names, Sanskrit names, trending baby names, popular baby names 2026, baby names cool, baby name ideas, name numerology, baby names inspiration, popular baby names list, top baby names 2026",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  authors: [{ name: "NameVerse", url: siteUrl }],
  creator: "NameVerse",
  publisher: "NameVerse",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl, languages: { en: siteUrl, 'x-default': siteUrl } },
  openGraph: {
    title: validateMetaTitle("NameVerse — Baby Names & Meanings for Islamic, Hindu & Christian Families"),
    description: validateMetaDescription(
      "Discover baby names with meanings, origins, and numerology across Islamic, Hindu, and Christian traditions in English, Urdu, Arabic & Hindi."
    ),
    url: siteUrl,
    siteName: "NameVerse",
    images: [
      { 
        url: `${siteUrl}/logo.png`, 
        width: 512, 
        height: 512, 
        type: "image/png", 
        alt: "NameVerse — Baby Names & Meanings from Around the World" 
      },
    ],
    locale: "en_US",
    type: "website",
    siteName: "NameVerse"
  },
  twitter: {
    card: "summary_large_image",
    title: validateMetaTitle("Baby Names & Meanings — Islamic, Hindu, Christian | NameVerse"),
    description: validateMetaDescription(
      "Explore thousands of baby names by religion and origin — Islamic, Hindu, and Christian — with detailed meanings and numerology."
    ),
    images: [`${siteUrl}/logo.png`],
    creator: "@NameVerseOfficial",
    site: "@NameVerseOfficial",
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: [
      { url: '/apple-touch.png', sizes: '180x180', type: 'image/png' },
      { url: '/logo.png', sizes: '152x152', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo.png',
      },
    ],
  },
  manifest: `/manifest.json`, // Use relative path to avoid CORS issues
  category: "Baby Names, Culture, Religion",
};

// Viewport configuration (Next.js App Router)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#1E40AF",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="application-name" content="NameVerse" />
        <meta name="content-language" content="en" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="google-site-verification" content="iPU1wdP26kg58gDN3U4H39YuS20alsLvjfXRM-QtKLw" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="NameVerse" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="msapplication-TileColor" content="#4F46E5" />
        <meta name="msapplication-TileImage" content="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="ahrefs-site-verification" content="650afaf6635223ff618a281883a22b69b937a121e933b19907debeca67754cd4" />

        {/* ✅ Performance: Resource Hints */}
        <ResourceHints />

        {/* ✅ Icons - use relative paths */}
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="shortcut icon" type="image/png" href="/logo.png" />

        {/* ✅ Enhanced crawl hints */}
        <GoogleBotMeta siteUrl={siteUrl} />

        {/* ✅ Authoritative Site Name Signal (prevents "Vercel" appearing as site name in GSC) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              "name": "NameVerse",
              "alternateName": ["NameVerse Baby Names", "NameVerse Names"],
              "url": siteUrl,
              "description": "65,000+ baby names with meanings, origins, and numerology across Islamic, Hindu & Christian traditions.",
              "inLanguage": "en-US",
              "publisher": {
                "@type": "Organization",
                "@id": `${siteUrl}/#organization`,
                "name": "NameVerse",
                "url": siteUrl,
                "logo": {
                  "@type": "ImageObject",
                  "url": `${siteUrl}/logo.png`,
                  "width": 512,
                  "height": 512
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${siteUrl}/search?query={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* ✅ Organization Schema for site name authority */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${siteUrl}/#organization`,
              "name": "NameVerse",
              "url": siteUrl,
              "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo.png`,
                "width": 512,
                "height": 512
              },
              "description": "NameVerse - 65,000+ baby names with meanings, origins, and numerology across Islamic, Hindu & Christian traditions.",
              "sameAs": [
                "https://twitter.com/NameVerseOfficial"
              ]
            })
          }}
        />

        {/* ✅ Enhanced Structured Data */}
        <StructuredData
          organization={true}
          website={true}
          breadcrumbs={[
            { name: "Home", url: siteUrl },
            { name: "Baby Names", url: `${siteUrl}/names` },
          ]}
          collectionPage={{
            name: "Popular Baby Names by Religion",
            description: "Browse top baby names from different faiths — Muslim, Hindu, and Christian — with meanings and translations.",
            url: `${siteUrl}/names`,
            items: [],
          }}
        />
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1510675468129183"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Ahrefs analytics script */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="Xu6eED27Kx1ZuJhBcJDJsA"
          strategy="lazyOnload"
        />
      </head>

      <body className="antialiased bg-white text-gray-900">
        <div id="temp-wrapper">
          <AppProvider>
            <PerformanceInit />
            <Suspense fallback={<div>Loading Navbar...</div>}>
              <Navbar />
            </Suspense>
            {children}
            <Footer />
            <AppInstallPopup />
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
