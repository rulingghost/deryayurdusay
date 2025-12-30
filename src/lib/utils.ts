export function optimizeUnsplash(url: string, width: number = 800, quality: number = 75) {
  if (!url || !url.includes('unsplash.com')) return url;
  
  // Remove existing params
  const baseUrl = url.split('?')[0];
  
  // Add performance params
  // auto=format: serves WebP/AVIF depending on browser support
  // q: quality
  // w: width
  // fit=crop: ensures aspect ratio
  return `${baseUrl}?auto=format&fit=crop&q=${quality}&w=${width}`;
}
