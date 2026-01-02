export function optimizeUnsplash(url: string, width: number = 800, quality: number = 75) {
  if (!url || !url.includes('unsplash.com')) return url;
  
  // Remove existing params
  const baseUrl = url.split('?')[0];
  
  // Add performance params
  return `${baseUrl}?auto=format&fit=crop&q=${quality}&w=${width}`;
}

export async function compressImage(file: File): Promise<File> {
  // If not an image, return as is
  if (!file.type.startsWith('image/')) return file;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200; // Safe width for web
        
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > MAX_WIDTH) {
          height = Math.round(height * (MAX_WIDTH / width));
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            resolve(file); // Fail safe
            return;
        }
        
        // High quality scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (!blob) {
            resolve(file); // Fail safe
            return;
          }
          // Create new file with jpeg compression
          const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        }, 'image/jpeg', 0.8); // 80% quality
      };
      img.onerror = (error) => resolve(file); // Fail safe
    };
    reader.onerror = (error) => resolve(file); // Fail safe
  });
}
