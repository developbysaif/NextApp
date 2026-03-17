"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const user = await login(formData.email, formData.password);
            if (user.role === 'admin') {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 pb-20 pt-10">
            <div className="max-w-md w-full">
                {/* Logo & Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#22aa4f] rounded-2xl text-white shadow-xl shadow-[#21492f]/20 mb-6 animate-float">
                        <Leaf size={32} fill="currentColor" />
                    </div>
                    <h1 className="text-3xl font-black text-[#21492f] uppercase tracking-tight mb-2">
                        Welcome Back<span className="text-[#22aa4f]">!</span>
                    </h1>
                    <p className="text-[#21492f] font-medium italic underline underline-offset-4 decoration-[#22aa4f]/30">
                        Sign in to access your organic profile
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#21492f]/10 soft-glass">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-[#a6763f] text-[#21492f] p-4 rounded-2xl text-sm font-bold border border-[#a6763f]">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-[#21492f]/60 ml-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21492f]/40 group-focus-within:text-[#22aa4f] transition-colors" size={20} />
                                <input
                                    type="email"
                                    required
                                    placeholder="hello@organic.com"
                                    className="w-full bg-[#21492f]/5 border-transparent rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#22aa4f]/20 focus:border-[#22aa4f] transition-all outline-none"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-[#21492f]/60 ml-2">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21492f]/40 group-focus-within:text-[#22aa4f] transition-colors" size={20} />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-[#21492f]/5 border-transparent rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#22aa4f]/20 focus:border-[#22aa4f] transition-all outline-none"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#22aa4f] text-white rounded-2xl py-4 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#21492f] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#21492f]/10 mt-4 group"
                        >
                            Sign In
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[#21492f] font-bold text-sm">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-[#22aa4f] hover:text-[#21492f] underline underline-offset-4">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="text-center text-[10px] text-[#21492f]/60 font-black uppercase tracking-widest mt-12">
                    Secure & Private • Local Storage Only
                </p>
            </div>
        </div>
    );
}
