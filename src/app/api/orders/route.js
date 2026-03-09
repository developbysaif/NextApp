import { NextResponse } from 'next/server';
import { ServerStorage } from '@/lib/server-storage';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const orders = ServerStorage.getOrders();
        return NextResponse.json({ success: true, orders: orders }, { status: 200 });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const orders = ServerStorage.getOrders();

        const newOrder = {
            ...body,
            _id: Date.now().toString(),
            orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
            status: 'Pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        orders.push(newOrder);
        ServerStorage.saveOrders(orders);

        return NextResponse.json({ success: true, message: 'Order created successfully', data: newOrder }, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
