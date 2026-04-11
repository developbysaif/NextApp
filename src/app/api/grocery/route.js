import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Grocery from '@/models/Grocery';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        await dbConnect();
        const items = await Grocery.find({}).sort({ createdAt: -1 });
        // Map _id to id so frontend doesn't break
        const mappedItems = items.map(item => ({
            ...item.toObject(),
            id: item._id.toString()
        }));
        return NextResponse.json({ success: true, data: mappedItems });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const newItem = await Grocery.create(body);
        
        return NextResponse.json({ 
            success: true, 
            data: { ...newItem.toObject(), id: newItem._id.toString() } 
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
