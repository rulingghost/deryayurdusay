import { NextResponse } from 'next/server';
import { getFaqs } from '@/lib/db';

export async function GET() {
  try {
    const faqs = await getFaqs();
    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
