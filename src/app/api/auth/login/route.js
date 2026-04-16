import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
        }

        return NextResponse.json({ 
            success: true, 
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                age: user.age,
                weight: user.weight,
                height: user.height,
                gender: user.gender,
                disease: user.disease,
                symptoms: user.symptoms
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
