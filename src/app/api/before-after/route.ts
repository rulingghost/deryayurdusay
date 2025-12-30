import { NextResponse } from 'next/server';
import { getBeforeAfter } from '@/lib/db';

export async function GET() {
  try {
    const data = await getBeforeAfter();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch before/after' }, { status: 500 });
  }
}
