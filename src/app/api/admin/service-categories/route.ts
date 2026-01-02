import { NextRequest, NextResponse } from 'next/server';
import { getServiceCategories, addServiceCategory } from '@/lib/db';

export async function GET() {
  try {
    const data = await getServiceCategories();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { label } = await req.json();
    if (!label) return NextResponse.json({ error: 'Label required' }, { status: 400 });
    
    const result = await addServiceCategory(label);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
