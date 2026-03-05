import { NextResponse } from 'next/server';
import { ServerStorage } from '@/lib/server-storage';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const blogs = ServerStorage.read('blogs.json');
        return NextResponse.json({ success: true, data: blogs }, { status: 200 });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const blogs = ServerStorage.read('blogs.json');

        const newBlog = {
            ...body,
            _id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };

        blogs.push(newBlog);
        ServerStorage.write('blogs.json', blogs);

        return NextResponse.json({ success: true, message: 'Blog created successfully', data: newBlog }, { status: 201 });
    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
