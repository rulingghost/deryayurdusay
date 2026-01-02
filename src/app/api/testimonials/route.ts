import { NextResponse } from 'next/server';
import { getTestimonials } from '@/lib/db';

export async function GET() {
  try {
    const testimonials = await getTestimonials(true);
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
