import { MetadataRoute } from 'next';
import { getPosts, getServices } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://deryayurdusay.com';

  // Get dynamic data
  const posts = await getPosts();
  
  // Static routes
  const routes = [
    '',
    '/admin',
    '/admin/dashboard',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic blog routes
  const blogRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes];
}
