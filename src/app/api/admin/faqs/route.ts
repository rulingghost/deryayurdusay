import { NextRequest, NextResponse } from 'next/server';
import { getFaqs, addFaq } from '@/lib/db';

export async function GET() {
  try {
    const data = await getFaqs();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { question, answer, order } = await req.json();
    const result = await addFaq(question, answer, order || 1);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
