import "@/styles/global.scss";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  title: {
    default: "DevTools Store — Premium AI-Powered Developer Tools",
    template: "%s | DevTools Store",
  },
  description:
    "Boost your development workflow with premium AI tools. Write assignments, check grammar, create diagrams, and detect AI content. One-time purchases from $10, monthly subscriptions from $5/mo, or save with yearly plans from $60/yr. Trusted by 10K+ developers.",
  keywords: [
    "AI developer tools",
    "assignment writer",
    "grammar checker",
    "diagram maker",
    "AI content detector",
    "AI content bypass",
    "developer productivity",
    "AI subscriptions monthly yearly",
    "developer software",
    "annual developer plan",
  ],
  authors: [{ name: "DevTools Store" }],
  creator: "DevTools Store",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "DevTools Store — Premium AI-Powered Developer Tools",
    description:
      "Professional AI tools for developers. Assignment Writer, Grammar Guru, Diagram Maker, and AI Detector & Bypass. Pay once or subscribe monthly/yearly. No hidden fees.",
    type: "website",
    locale: "en_US",
    siteName: "DevTools Store",
    url: "https://devtools-store.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools Store — AI-Powered Developer Tools",
    description:
      "Professional AI tools for developers. Get started with our suite of powerful developer tools today.",
    creator: "@devtoolsstore",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: "index, follow",
  },
  alternates: {
    canonical: "https://devtools-store.com",
  },
};
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DevTools Store",
  url: "https://devtools-store.com",
  description:
    "Premium AI-powered developer tools for productivity and workflow optimization",
  sameAs: [
    "https://twitter.com/devtoolsstore",
    "https://linkedin.com/company/devtools-store",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="msapplication-TileColor" content="#1a1a1a" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
