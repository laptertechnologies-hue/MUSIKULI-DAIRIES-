import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/dashboard', '/login-redirect', '/reset-password', '/forgot-password', '/api/'],
    },
    sitemap: 'https://musikulidairies.com/sitemap.xml',
  };
}