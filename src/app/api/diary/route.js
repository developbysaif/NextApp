import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Diary from '@/models/Diary';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        await dbConnect();
        const entries = await Diary.find({}).sort({ date: -1, time: -1 });
        const mappedEntries = entries.map(entry => ({
            ...entry.toObject(),
            id: entry._id.toString()
        }));
        return NextResponse.json({ success: true, data: mappedEntries });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const newEntry = await Diary.create(body);
        
        return NextResponse.json({ 
            success: true, 
            data: { ...newEntry.toObject(), id: newEntry._id.toString() } 
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
