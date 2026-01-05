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

// Approval
export async function PUT(req: NextRequest) {
  try {
    const { id, approved } = await req.json();
    // Assuming simple toggle implementation in DB logic, or update field
    // Since we don't have updateTestimonial in imports yet, we assume it needs to be added or use raw sql if db.ts was visible to me now
    // But better to stick to db.ts exports. I will assume updateTestimonialStatus exists or I need to add it.
    // Let's modify db.ts first or assume I can add it.
    // For now, I will use a direct sql if possible or wait for db.ts update. 
    // Actually, I can't edit db.ts in this same Tool call easily if I don't target it.
    // I will target db.ts in NEXT step or SAME step if possible.
    // I will write the route assuming the function exists, then update db.ts
    const { updateTestimonialStatus } = await import('@/lib/db');
    await updateTestimonialStatus(id, approved);
    return NextResponse.json({ success: true });
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
