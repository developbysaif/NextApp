import { NextResponse } from 'next/server';
import { ServerStorage } from '@/lib/server-storage';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const doctors = ServerStorage.read('doctors.json');
        return NextResponse.json({ success: true, data: doctors }, { status: 200 });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const doctors = ServerStorage.read('doctors.json');

        const newDoctor = {
            ...body,
            _id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };

        doctors.push(newDoctor);
        ServerStorage.saveDoctors(doctors);

        return NextResponse.json({ success: true, message: 'Doctor added successfully', data: newDoctor }, { status: 201 });
    } catch (error) {
        console.error('Error adding doctor:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
