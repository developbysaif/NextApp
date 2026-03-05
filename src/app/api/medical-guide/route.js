import { NextResponse } from 'next/server';
import { ServerStorage } from '@/lib/server-storage';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const guides = ServerStorage.read('medical_guides.json');
        return NextResponse.json({ success: true, data: guides }, { status: 200 });
    } catch (error) {
        console.error('Error fetching medical guides:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const guides = ServerStorage.read('medical_guides.json');

        const newGuide = {
            ...body,
            _id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };

        guides.push(newGuide);
        ServerStorage.write('medical_guides.json', guides);

        return NextResponse.json({ success: true, message: 'Medical guide added successfully', data: newGuide }, { status: 201 });
    } catch (error) {
        console.error('Error adding medical guide:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
