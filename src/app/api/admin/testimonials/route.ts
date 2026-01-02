import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials, addTestimonial, deleteTestimonial } from '@/lib/db';

export async function GET() {
  try {
    const data = await getTestimonials(false); // Get all
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, comment, rating, service } = await req.json();
    const result = await addTestimonial(name, comment, rating, service);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
    // This assumes ID is passed in url like /api/admin/testimonials/[id] but here we can handle query param or just separate file
    // For simplicity with standard Next.js route handlers, usually better to have [id]/route.ts
    // But sticking to query param or body for bulk? Standard REST uses dynamic route.
    return NextResponse.json({ error: 'Use dynamic route' }, { status: 405 });
}
