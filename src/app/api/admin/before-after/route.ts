import { NextRequest, NextResponse } from 'next/server';
import { getBeforeAfter, addBeforeAfter } from '@/lib/db';
import { put } from '@vercel/blob';

export async function GET() {
  try {
    const data = await getBeforeAfter();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch before/after' }, { status: 500 });
  }
}

async function uploadFile(file: File): Promise<string> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(file.name, file, { access: 'public' });
    return blob.url;
  } else {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    return `data:${file.type};base64,${base64}`;
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const beforeFile = formData.get('before_image') as File;
    const afterFile = formData.get('after_image') as File;
    const beforeUrlStr = formData.get('before_url') as string; // Optional fallback
    const afterUrlStr = formData.get('after_url') as string;   // Optional fallback

    let beforeUrl = beforeUrlStr;
    let afterUrl = afterUrlStr;

    if (beforeFile && beforeFile.size > 0) {
       beforeUrl = await uploadFile(beforeFile);
    }
    
    if (afterFile && afterFile.size > 0) {
       afterUrl = await uploadFile(afterFile);
    }

    if (!title || !beforeUrl || !afterUrl) {
       return NextResponse.json({ error: 'Missing Required Fields' }, { status: 400 });
    }

    const result = await addBeforeAfter(title, beforeUrl, afterUrl);
    return NextResponse.json(result);
  } catch (error) {
    console.error('B/A Upload Error:', error);
    return NextResponse.json({ error: 'Failed to add before/after' }, { status: 500 });
  }
}
