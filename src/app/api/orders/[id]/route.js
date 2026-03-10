import { NextResponse } from 'next/server';
import { ServerStorage } from '@/lib/server-storage';

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const { status } = await request.json();

        const orders = ServerStorage.getOrders();
        const orderIndex = orders.findIndex(o => o._id === id);

        if (orderIndex === -1) {
            return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
        }

        orders[orderIndex].status = status;
        orders[orderIndex].updatedAt = new Date().toISOString();

        ServerStorage.saveOrders(orders);

        return NextResponse.json({ success: true, message: 'Order status updated' }, { status: 200 });
    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
