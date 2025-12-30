import { NextRequest, NextResponse } from 'next/server';
import { getBeforeAfter, addBeforeAfter } from '@/lib/db';

export async function GET() {
  try {
    const data = await getBeforeAfter();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch before/after' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, before_url, after_url } = await req.json();
    const result = await addBeforeAfter(title, before_url, after_url);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add before/after' }, { status: 500 });
  }
}
