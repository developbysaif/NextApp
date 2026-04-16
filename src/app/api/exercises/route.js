import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Exercise from '@/models/Exercise';

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');
        
        const filter = type && type !== 'all' ? { type } : {};
        const exercises = await Exercise.find(filter).sort({ createdAt: -1 });
        return NextResponse.json(exercises, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();
        
        if (!data.title || !data.type || !data.instructions || !data.duration) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const exercise = await Exercise.create(data);
        return NextResponse.json(exercise, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await Exercise.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Exercise removed' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
