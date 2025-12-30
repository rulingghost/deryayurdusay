import { NextResponse } from 'next/server';
import { getGalleryImages, createTable } from '@/lib/db';

export async function GET() {
  try {
    await createTable();
    const images = await getGalleryImages();
    return NextResponse.json(images);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
