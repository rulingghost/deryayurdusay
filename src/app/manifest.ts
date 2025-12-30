import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Derya Yurdusay Nail Art Studio',
    short_name: 'Derya Yurdusay',
    description: 'Derya Yurdusay Nail Art Studio Premium Güzellik Hizmetleri',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF5F7',
    theme_color: '#D45A8A',
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
