import { NextRequest, NextResponse } from 'next/server';
import { getPosts, addPost, deletePost } from '@/lib/db';

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await addPost(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add post' }, { status: 500 });
  }
}
