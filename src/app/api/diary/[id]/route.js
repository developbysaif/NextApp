import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Diary from '@/models/Diary';

export async function PUT(request, { params }) {
    try {
        await dbConnect();
        const id = params.id;
        const body = await request.json();
        
        const updatedEntry = await Diary.findByIdAndUpdate(id, body, { new: true });
        if (!updatedEntry) return NextResponse.json({ success: false, error: 'Entry not found' }, { status: 404 });
        
        return NextResponse.json({ success: true, data: { ...updatedEntry.toObject(), id: updatedEntry._id.toString() } });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await dbConnect();
        const id = params.id;
        await Diary.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
