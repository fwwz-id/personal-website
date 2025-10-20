import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/og/*", "/blog", "/blog/*"],
    },
    sitemap: `https://${
      process.env.VERCEL_PRODUCTION_URL || "personal.fwwz.space"
    }/sitemap.xml`,
  };
}
