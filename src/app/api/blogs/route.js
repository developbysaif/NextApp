import { NextResponse } from 'next/server';
import { ServerStorage } from '@/lib/server-storage';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const blogs = ServerStorage.read('blogs.json');
        // Return published blogs sorted by newest
        const sorted = [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return NextResponse.json({ success: true, data: sorted }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const blogs = ServerStorage.read('blogs.json');

        // Auto-generate slug from title if not provided
        const slug = body.slug
            ? body.slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            : body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

        const newBlog = {
            ...body,
            slug,
            _id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            published: body.published ?? true,
        };

        blogs.push(newBlog);
        ServerStorage.write('blogs.json', blogs);

        return NextResponse.json({ success: true, message: 'Blog created successfully', data: newBlog }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        let blogs = ServerStorage.read('blogs.json');
        blogs = blogs.filter(b => b._id !== id);
        ServerStorage.write('blogs.json', blogs);
        return NextResponse.json({ success: true, message: 'Blog deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
