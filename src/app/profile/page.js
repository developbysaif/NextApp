"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Mail, LogOut, Package, ShieldCheck, Edit2, Leaf } from "lucide-react";
import Link from 'next/link'

export default function ProfilePage() {
    const { user, logout, loading, updateProfile } = useAuth();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
        if (user) {
            setName(user.name);
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfdfa]">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updateProfile({ name });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-[#fcfdfa] py-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header Card */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-10 blur-3xl opacity-50"></div>

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-32 h-32 bg-green-100 rounded-3xl flex items-center justify-center text-green-600 relative group">
                            <User size={64} />
                            <div className="absolute inset-0 bg-green-600 rounded-3xl opacity-0 group-hover:opacity-10 dark:opacity-0 transition-opacity flex items-center justify-center">
                                <Edit2 size={24} className="text-white" />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                                {isEditing ? (
                                    <form onSubmit={handleUpdate} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="bg-gray-50 border-2 border-green-200 rounded-xl px-4 py-1 text-2xl font-black outline-none focus:border-green-600"
                                            autoFocus
                                        />
                                        <button type="submit" className="bg-green-600 text-white p-2 rounded-xl">Save</button>
                                    </form>
                                ) : (
                                    <>
                                        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight">{user.name}</h1>
                                        <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-green-600 transition-colors">
                                            <Edit2 size={20} />
                                        </button>
                                    </>
                                )}
                            </div>
                            <p className="flex items-center justify-center md:justify-start gap-2 text-gray-500 font-bold mb-6">
                                <Mail size={18} className="text-green-600" />
                                {user.email}
                            </p>

                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <span className="bg-green-50 text-green-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-green-100 flex items-center gap-2">
                                    <ShieldCheck size={14} /> Verified Member
                                </span>
                                <span className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-yellow-100 flex items-center gap-2">
                                    <Leaf size={14} /> Eco Contributor
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all p-4 rounded-2xl flex items-center gap-2 font-black uppercase tracking-widest text-xs"
                        >
                            <LogOut size={20} />
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                                <Package className="text-green-600" size={24} />
                                My Orders
                            </h2>
                            <Link href="/orders" className="text-xs font-black text-green-600 uppercase hover:underline">View All</Link>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-2xl p-6 text-center border-2 border-dashed border-gray-200">
                                <p className="text-gray-400 font-bold text-sm mb-4">You haven't placed any orders yet.</p>
                                <Link href="/products" className="inline-block bg-green-600 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gray-900 transition-all">
                                    Start Shopping
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Quick Settings */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-8">Account Settings</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer group border border-transparent hover:border-green-100">
                                <div className="font-bold text-gray-700">Shipping Addresses</div>
                                <ArrowRight size={18} className="text-gray-300 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer group border border-transparent hover:border-green-100">
                                <div className="font-bold text-gray-700">Payment Methods</div>
                                <ArrowRight size={18} className="text-gray-300 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer group border border-transparent hover:border-green-100 text-red-600">
                                <div className="font-bold">Delete Account</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArrowRight({ size, className }) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    );
}
