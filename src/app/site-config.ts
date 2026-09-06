import type { Metadata } from "next";

export const siteConfig = {
  name: "Tamim Hasan Portfolio",
  shortName: "Tamim Portfolio",
  description:
    "Frontend web developer portfolio of Tamim Hasan, featuring modern Next.js, TypeScript, React, JavaScript, and full-stack projects.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://tamim-hassan-portfolio.vercel.app",
  email: "tamimhasanbd06@gmail.com",
  phone: "+8801883650010",
  author: "Tamim Hasan",
  keywords: [
    "Tamim Hasan portfolio",
    "Web Developer portfolio",
    "Frontend Web Developer portfolio",
    "portfolio",
    "Next.js developer portfolio",
  ],
} as const;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords: [...siteConfig.keywords],
    alternates: {
      canonical: path,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName: siteConfig.name,
      title,
      description,
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
      title,
      description,
      images: ["/assets/brand/og.png"],
    },
  };
}
