import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${process.env.VERCEL_PRODUCTION_URL || 'personal.fwwz.space'}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `https://${process.env.VERCEL_PRODUCTION_URL || 'personal.fwwz.space'}/blog`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `https://${process.env.VERCEL_PRODUCTION_URL || 'personal.fwwz.space'}/blog/rag-vs-mcp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `https://${process.env.VERCEL_PRODUCTION_URL || 'personal.fwwz.space'}/blog/tidak-perlu-bootcamp-untuk-jadi-programmer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}