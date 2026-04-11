import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Grocery from '@/models/Grocery';

export async function PUT(request, { params }) {
    try {
        await dbConnect();
        const id = params.id;
        const body = await request.json();
        
        const updatedItem = await Grocery.findByIdAndUpdate(id, body, { new: true });
        if (!updatedItem) return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
        
        return NextResponse.json({ success: true, data: { ...updatedItem.toObject(), id: updatedItem._id.toString() } });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await dbConnect();
        const id = params.id;
        await Grocery.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
