import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const data = await request.formData();
        const file = data.get('file');

        if (!file) {
            return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save to public/uploads
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

        // Ensure directory exists
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const filePath = path.join(uploadsDir, filename);

        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({
            success: true,
            message: 'File uploaded successfully',
            url: `/uploads/${filename}`,
            name: filename
        });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ success: false, message: 'Upload failed', error: error.message }, { status: 500 });
    }
}
