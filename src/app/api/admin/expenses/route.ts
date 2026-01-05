import { NextResponse } from 'next/server';
import { getExpenses, addExpense, deleteExpense } from '@/lib/db';

export async function GET() {
  try {
    const data = await getExpenses();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, amount, category, date } = await req.json();
    if(!title || !amount) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    
    const result = await addExpense(title, parseFloat(amount), category, date);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
    // Assuming query param for delete in standard flow, or body. 
    // Adapting to simple pattern -> creating dynamic route is better usually but sticking to pattern
    return NextResponse.json({ error: 'Method not allowed on collection' }, { status: 405 });
}
