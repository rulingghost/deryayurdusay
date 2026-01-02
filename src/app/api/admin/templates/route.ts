import { NextResponse } from 'next/server';
import { getTemplates, addTemplate } from '@/lib/db';

export async function GET() {
  const templates = await getTemplates();
  return NextResponse.json(templates);
}

export async function POST(req: Request) {
  const { name, content } = await req.json();
  const result = await addTemplate(name, content);
  return NextResponse.json(result);
}
