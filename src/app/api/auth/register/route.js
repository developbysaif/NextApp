import { NextResponse } from 'next/server';
import { ServerStorage } from '@/lib/server-storage';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password, name, role = 'customer' } = body;

        const users = ServerStorage.getUsers();
        if (users.find(u => u.email === email)) {
            return NextResponse.json({ success: false, message: 'Email already registered' }, { status: 400 });
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // In a real app, hash this!
            role,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        ServerStorage.saveUsers(users);

        const { password: _, ...userWithoutPassword } = newUser;
        return NextResponse.json({
            success: true,
            message: 'Registration successful',
            data: { user: userWithoutPassword }
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
