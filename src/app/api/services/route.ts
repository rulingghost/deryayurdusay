import { NextResponse } from 'next/server';
import { getServices, createTable } from '@/lib/db';

export async function GET() {
  try {
    await createTable(); // Ensure table exists
    const services = await getServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
