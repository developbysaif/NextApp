import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Disease from '@/models/Disease';

export async function GET() {
    try {
        await connectDB();
        const diseases = await Disease.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: diseases }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();
        
        if (!data.name || !data.category) {
            return NextResponse.json({ success: false, error: 'Name and Category are required' }, { status: 400 });
        }

        const disease = await Disease.create(data);
        return NextResponse.json({ success: true, data: disease }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await Disease.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Disease profile removed' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const data = await req.json();
        const { id, ...updateData } = data;

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const updated = await Disease.findByIdAndUpdate(id, updateData, { new: true });
        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
