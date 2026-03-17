import { NextResponse } from 'next/server';
import { ServerStorage } from '@/lib/server-storage';

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const { isVerified } = await request.json();

        const doctors = ServerStorage.read('doctors.json');
        const doctorIndex = doctors.findIndex(d => d._id === id);

        if (doctorIndex === -1) {
            return NextResponse.json({ success: false, error: 'Doctor not found' }, { status: 404 });
        }

        doctors[doctorIndex].isVerified = isVerified;
        doctors[doctorIndex].updatedAt = new Date().toISOString();

        ServerStorage.write('doctors.json', doctors);

        return NextResponse.json({ success: true, message: 'Doctor verification status updated' }, { status: 200 });
    } catch (error) {
        console.error('Error updating doctor verification:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const doctors = ServerStorage.read('doctors.json');
        const updatedDoctors = doctors.filter(d => d._id !== id);

        ServerStorage.write('doctors.json', updatedDoctors);

        return NextResponse.json({ success: true, message: 'Doctor record deleted' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
