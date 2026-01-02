import { NextResponse } from 'next/server';
import { updateTemplate, deleteTemplate } from '@/lib/db';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { name, content } = body;
  const result = await updateTemplate(parseInt(params.id), name, content);
  return NextResponse.json(result);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await deleteTemplate(parseInt(params.id));
  return NextResponse.json({ success: true });
}
