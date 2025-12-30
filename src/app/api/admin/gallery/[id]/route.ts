import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

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
    
    // Delete from database
    if (process.env.POSTGRES_URL) {
      await sql`DELETE FROM gallery WHERE id = ${idNum}`;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
