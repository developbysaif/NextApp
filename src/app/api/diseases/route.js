import { NextResponse } from 'next/server';
import { ServerStorage } from '@/lib/server-storage';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const diseases = ServerStorage.getDiseases();
        return NextResponse.json({ success: true, data: diseases }, { status: 200 });
    } catch (error) {
        console.error('Error fetching diseases:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const diseases = ServerStorage.getDiseases();

        const newDisease = {
            ...body,
            _id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };

        diseases.push(newDisease);
        ServerStorage.saveDiseases(diseases);

        return NextResponse.json({ success: true, message: 'Disease added successfully', data: newDisease }, { status: 201 });
    } catch (error) {
        console.error('Error adding disease:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        let diseases = ServerStorage.getDiseases();
        diseases = diseases.filter(d => d._id !== id && d.id != id);
        ServerStorage.saveDiseases(diseases);
        return NextResponse.json({ success: true, message: 'Disease deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
