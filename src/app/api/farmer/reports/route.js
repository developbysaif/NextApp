import { NextResponse } from 'next/server';
import { ServerStorage } from '@/lib/server-storage';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const reports = ServerStorage.read('farmer_reports.json');
        return NextResponse.json({ success: true, data: reports }, { status: 200 });
    } catch (error) {
        console.error('Error fetching farmer reports:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const reports = ServerStorage.read('farmer_reports.json');

        const newReport = {
            ...body,
            _id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };

        reports.push(newReport);
        ServerStorage.write('farmer_reports.json', reports);

        return NextResponse.json({ success: true, message: 'Farmer report submitted', data: newReport }, { status: 201 });
    } catch (error) {
        console.error('Error submitting farmer report:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
