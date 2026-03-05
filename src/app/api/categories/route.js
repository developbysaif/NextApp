import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const categories = [
        { id: 1, name: 'Fruits', slug: 'fruit', icon: 'Leaf' },
        { id: 2, name: 'Vegetables', slug: 'vegetable', icon: 'Leaf' },
        { id: 3, name: 'Meat', slug: 'meat', icon: 'Wind' },
        { id: 4, name: 'Dairy', slug: 'dairy', icon: 'Sun' },
        { id: 5, name: 'Herbs', slug: 'herbs', icon: 'Wind' }
    ];

    return NextResponse.json({ success: true, data: categories }, { status: 200 });
}
