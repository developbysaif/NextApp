"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, Mail, Lock, User, ArrowRight, Shield, Stethoscope } from "lucide-react";
import { useSearchParams } from "next/navigation";

function SignupContent() {
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "customer" });
    const [error, setError] = useState("");
    const { signup } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const roleParam = searchParams.get("role");
        if (roleParam && ["customer", "admin", "doctor"].includes(roleParam)) {
            setFormData(prev => ({ ...prev, role: roleParam }));
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const user = await signup(formData);
            if (user.role === 'admin') {
                router.push("/admin");
            } else if (user.role === 'doctor') {
                router.push("/doctor/dashboard");
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
                        Join Organic<span className="text-[#22aa4f]">Fresh</span>
                    </h1>
                    <p className="text-[#21492f] font-medium italic underline underline-offset-4 decoration-[#22aa4f]/30">
                        Start your journey to a natural healthy life
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
                            <label className="text-xs font-black uppercase tracking-widest text-[#21492f]/60 ml-2">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21492f]/40 group-focus-within:text-[#22aa4f] transition-colors" size={20} />
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    value={formData.name}
                                    className="w-full bg-[#21492f]/5 border-transparent rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#22aa4f]/20 focus:border-[#22aa4f] transition-all outline-none"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-[#21492f]/60 ml-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21492f]/40 group-focus-within:text-[#22aa4f] transition-colors" size={20} />
                                <input
                                    type="email"
                                    required
                                    placeholder="hello@organic.com"
                                    value={formData.email}
                                    className="w-full bg-[#21492f]/5 border-transparent rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#22aa4f]/20 focus:border-[#22aa4f] transition-all outline-none"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-black uppercase tracking-widest text-[#21492f]/60 ml-2 text-center block">Select Your Path</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'customer' })}
                                    className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${formData.role === 'customer'
                                        ? 'border-[#22aa4f] bg-[#22aa4f]/5 shadow-lg shadow-[#22aa4f]/10 scale-105'
                                        : 'border-[#21492f]/10 bg-white hover:border-[#22aa4f]/30'}`}
                                >
                                    <div className={`p-3 rounded-2xl ${formData.role === 'customer' ? 'bg-[#22aa4f] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        <User size={24} />
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${formData.role === 'customer' ? 'text-[#21492f]' : 'text-slate-400'}`}>
                                        Organic Lover
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'doctor' })}
                                    className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${formData.role === 'doctor'
                                        ? 'border-[#22aa4f] bg-[#22aa4f]/5 shadow-lg shadow-[#22aa4f]/10 scale-105'
                                        : 'border-[#21492f]/10 bg-white hover:border-[#22aa4f]/30'}`}
                                >
                                    <div className={`p-3 rounded-2xl ${formData.role === 'doctor' ? 'bg-[#22aa4f] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        <Stethoscope size={24} />
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${formData.role === 'doctor' ? 'text-[#21492f]' : 'text-slate-400'}`}>
                                        Medical Expert
                                    </span>
                                </button>
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
                            Create Account
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[#21492f] font-bold text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="text-[#22aa4f] hover:text-[#21492f] underline underline-offset-4">
                                Sign In
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

export default function SignupPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#22aa4f]"></div>
            </div>
        }>
            <SignupContent />
        </Suspense>
    );
}
