import Home from "@/pages/Home/Home";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

async function fetchHomeSeo() {
  const base = process.env.NEXT_PUBLIC_API_BASE || "/api";
  // On server, '/api' is not proxied via nginx. Use service name when needed.
  const serverBase = base.startsWith("/api") ? "http://backend:8000" : base;
  try {
    const res = await fetch(`${serverBase}/api/home/page/content/`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as any;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchHomeSeo();
  if (!data) return {};

  const keywords = (data.seo_keywords || "")
    .split(/[,;]+/)
    .map((s: string) => s.trim())
    .filter(Boolean);

  const base = process.env.NEXT_PUBLIC_API_BASE || "/api";
  const serverBase = base.startsWith("/api") ? "http://backend:8000" : base;
  const toMedia = (p?: string) => (p ? `${serverBase}/media/${p}` : undefined);

  const meta: Metadata = {
    title: data.seo_title || data.og_title || undefined,
    description: data.seo_description || data.og_description || undefined,
    keywords: keywords.length ? keywords : undefined,
    alternates: data.canonical_url ? { canonical: data.canonical_url } : undefined,
    robots: {
      index: !!data.robots_index,
      follow: !!data.robots_follow,
    },
    openGraph: {
      title: data.og_title || data.seo_title || undefined,
      description: data.og_description || data.seo_description || undefined,
      images: data.og_image_url ? [{ url: toMedia(data.og_image_url)! }] : undefined,
      type: "website",
    },
    twitter: {
      card: data.twitter_image_url ? "summary_large_image" : "summary",
      title: data.twitter_title || data.seo_title || undefined,
      description: data.twitter_description || data.seo_description || undefined,
      images: data.twitter_image_url ? [toMedia(data.twitter_image_url)!] : undefined,
    },
  };
  return meta;
}

export default function Page() {
  return <Home />;
}

