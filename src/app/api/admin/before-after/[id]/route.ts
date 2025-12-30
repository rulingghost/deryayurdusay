import { NextRequest, NextResponse } from 'next/server';
import { deleteBeforeAfter } from '@/lib/db';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    await deleteBeforeAfter(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete before/after' }, { status: 500 });
  }
}
