import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${process.env.VERCEL_PRODUCTION_URL || 'fwwz.id'}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `https://${process.env.VERCEL_PRODUCTION_URL || 'fwwz.id'}/blog`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `https://${process.env.VERCEL_PRODUCTION_URL || 'fwwz.id'}/blog/how-do-i-learn-rag`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}