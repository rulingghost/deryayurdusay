import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { addGalleryImage } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const caption = formData.get('caption') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    let imageUrl: string;

    // Use Vercel Blob in production, base64 in development
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Production: Upload to Vercel Blob
      const blob = await put(file.name, file, {
        access: 'public',
      });
      imageUrl = blob.url;
    } else {
      // Development: Convert to base64
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      imageUrl = `data:${file.type};base64,${base64}`;
    }

    // Save to database
    await addGalleryImage(imageUrl, caption || '', category || 'art');

    return NextResponse.json({ success: true, url: imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
