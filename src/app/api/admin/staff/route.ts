import { NextResponse } from 'next/server';
import { getStaff, addStaff, deleteStaff } from '@/lib/db';

export async function GET() {
  const data = await getStaff();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const { name, role } = await request.json();
    const data = await addStaff(name, role);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add staff' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) {
      await deleteStaff(parseInt(id));
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete staff' }, { status: 500 });
  }
}
