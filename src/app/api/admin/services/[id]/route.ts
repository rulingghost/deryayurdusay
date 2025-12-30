import { NextRequest, NextResponse } from 'next/server';
import { deleteService } from '@/lib/db';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const idNum = parseInt(id);
    await deleteService(idNum);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
