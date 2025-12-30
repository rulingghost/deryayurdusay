import { NextRequest, NextResponse } from 'next/server';
import { deleteCampaign } from '@/lib/db';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await deleteCampaign(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete campaign' }, { status: 500 });
  }
}
