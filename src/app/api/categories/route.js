import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/models/Category';

export async function GET() {
    try {
        await connectDB();
        const categories = await Category.find({}).sort({ name: 1 });
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();
        
        if (!data.name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const category = await Category.create(data);
        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const name = searchParams.get('name');
        
        if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 });

        await Category.findOneAndDelete({ name });
        return NextResponse.json({ message: 'Category deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
