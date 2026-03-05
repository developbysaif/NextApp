import { NextResponse } from 'next/server';
import { ServerStorage } from '@/lib/server-storage';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        const users = ServerStorage.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
        }

        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json({
            success: true,
            message: 'Login successful',
            data: { user: userWithoutPassword }
        }, { status: 200 });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
