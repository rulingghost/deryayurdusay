import { NextResponse } from 'next/server';
import { updateTemplate, deleteTemplate } from '@/lib/db';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = await req.json();
  const { name, content } = body;
  const { id } = await params;
  const result = await updateTemplate(parseInt(id), name, content);
  return NextResponse.json(result);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteTemplate(parseInt(id));
  return NextResponse.json({ success: true });
}
