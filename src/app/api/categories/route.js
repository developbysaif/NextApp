import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const categories = [
        { id: 1, name: 'Fruits', slug: 'fruit', icon: 'Leaf' },
        { id: 2, name: 'Vegetables', slug: 'vegetable', icon: 'Leaf' },
        { id: 3, name: 'Meat', slug: 'meat', icon: 'Wind' },
        { id: 4, name: 'Dairy', slug: 'dairy', icon: 'Sun' },
        { id: 5, name: 'Herbs', slug: 'herbs', icon: 'Wind' },
        { id: 6, name: 'Organic Seeds', slug: 'organic-seeds', icon: 'Leaf' },
        { id: 7, name: 'Herbal Oils', slug: 'herbal-oils', icon: 'Droplets' },
        { id: 8, name: 'Supplements', slug: 'supplements', icon: 'Activity' },
        { id: 9, name: 'Beauty Care', slug: 'beauty-care', icon: 'Sparkles' },
        { id: 10, name: 'Spices', slug: 'spices', icon: 'Flame' },
        { id: 11, name: 'Superfoods', slug: 'superfoods', icon: 'Zap' },
        { id: 12, name: 'Health Drinks', slug: 'health-drinks', icon: 'Coffee' }
    ];

    return NextResponse.json({ success: true, data: categories }, { status: 200 });
}
