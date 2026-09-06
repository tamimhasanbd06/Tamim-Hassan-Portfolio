import type { Metadata, Viewport } from "next";
import PwaInstaller from "@/components/common/PwaInstaller";
import RouteChangeLoader from "@/components/common/RouteChangeLoader";
import "./globals.css";
import { siteConfig } from "./site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Tamim Hasan Portfolio | Frontend Web Developer",
    template: "%s | Tamim Hasan Portfolio",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  generator: "Next.js",
  category: "technology",
  keywords: [...siteConfig.keywords],
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title: "Tamim Hasan Portfolio | Frontend Web Developer",
    description: siteConfig.description,
    images: [
      {
        url: "/assets/brand/og.png",
        width: 1200,
        height: 630,
        alt: "Tamim Hasan Frontend Web Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tamim Hasan Portfolio | Frontend Web Developer",
    description: siteConfig.description,
    images: ["/assets/brand/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/assets/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/assets/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/assets/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: siteConfig.shortName,
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#000814",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    url: siteConfig.url,
    jobTitle: "Frontend Web Developer",
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bandar",
      addressRegion: "Narayanganj",
      addressCountry: "Bangladesh",
    },
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
    ],
    sameAs: [
      "https://github.com/tamimhasanbd06",
      "https://www.linkedin.com/in/tamim-hasan-th018836/",
      "https://www.facebook.com/tamimhasanbd06",
    ],
  };

  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
        {children}
        <RouteChangeLoader />
        <PwaInstaller />
      </body>
    </html>
  );
}
