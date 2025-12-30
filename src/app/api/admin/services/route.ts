import { NextRequest, NextResponse } from 'next/server';
import { addService, updateService } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { name, price, category, duration } = await req.json();
    if (!name || !price) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
    }
    await addService(name, price, category, parseInt(duration) || 60);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add service' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, price, category, duration } = await req.json();
    if (!id || !name || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    await updateService(id, name, price, category, parseInt(duration) || 60);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}
