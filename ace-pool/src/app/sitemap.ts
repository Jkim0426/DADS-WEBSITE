import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.acepoolsla.com";
  const now = new Date();

  return [
    { url: BASE,                                    lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/services/pool-cleaning`,        lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/pool-repair`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/pool-heater`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/pool-pump`,            lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/acid-wash`,            lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/spa-service`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/privacy`,                       lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms`,                         lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
}
