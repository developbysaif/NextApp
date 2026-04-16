import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
        await connectDB();
        const data = await req.json();
        const { userId, ...updateFields } = data;

        if (!userId) {
            return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
