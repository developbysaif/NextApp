"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, User, Apple, Globe, Stethoscope, Leaf } from "lucide-react";
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
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-1 sm:p-2">
            <div className="w-full max-w-4xl bg-white rounded-[1.5rem] shadow-2xl flex overflow-hidden max-h-[92vh] border border-gray-200">
                
                {/* Left Side - Form */}
                <div className="w-full lg:w-1/2 p-5 sm:p-6 lg:p-8 flex flex-col justify-center overflow-y-auto">
                    {/* Logo */}
                    <Link href="/" className="flex items-center mb-4 w-fit shadow-2xl rounded-lg">
                        <Image src="/desk-top.png" alt="ilagbilghiza" width={140} height={40} className="w-auto h-7 object-contain" priority />
                    </Link>

                    <h1 className="text-xl font-black text-gray-900 mb-0.5">Create account</h1>
                    <p className="text-gray-400 text-[10px] mb-4">
                        Join for expert nutrition and organic care.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-2">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                                {error}
                            </div>
                        )}
                        
                        <div className="space-y-1">
                            <label className="text-[10px] font-semibold text-gray-700">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    value={formData.name}
                                    className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#21492f] focus:border-[#21492f] outline-none transition-all text-gray-800"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-semibold text-gray-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input
                                    type="email"
                                    required
                                    placeholder="hello@organic.com"
                                    value={formData.email}
                                    className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#21492f] focus:border-[#21492f] outline-none transition-all text-gray-800"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 py-1">
                            <label className="text-[10px] font-semibold text-gray-700 text-center block">Select Your Path</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'customer' })}
                                    className={`p-2 rounded-lg border transition-all flex items-center justify-center gap-1.5 ${formData.role === 'customer'
                                        ? 'border-[#21492f] bg-[#21492f]/5 ring-1 ring-[#21492f]'
                                        : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                >
                                    <User size={12} className={formData.role === 'customer' ? 'text-[#21492f]' : 'text-gray-400'} />
                                    <span className={`text-[9px] font-bold uppercase tracking-wider ${formData.role === 'customer' ? 'text-[#21492f]' : 'text-gray-500'}`}>
                                        Organic Lover
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'doctor' })}
                                    className={`p-2 rounded-lg border transition-all flex items-center justify-center gap-1.5 ${formData.role === 'doctor'
                                        ? 'border-[#21492f] bg-[#21492f]/5 ring-1 ring-[#21492f]'
                                        : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                >
                                    <Stethoscope size={12} className={formData.role === 'doctor' ? 'text-[#21492f]' : 'text-gray-400'} />
                                    <span className={`text-[9px] font-bold uppercase tracking-wider ${formData.role === 'doctor' ? 'text-[#21492f]' : 'text-gray-500'}`}>
                                        Medical Expert
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-semibold text-gray-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-[#21492f] focus:border-[#21492f] outline-none transition-all text-gray-800"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#21492f] text-white rounded-lg py-2 text-sm font-bold hover:bg-[#183522] transition-colors mt-0.5 shadow-md"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Google and Apple */}
                    <div className="mt-3 flex items-center before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
                        <span className="mx-3 text-[9px] font-medium text-gray-300 uppercase tracking-widest">OR</span>
                    </div>

                    <div className="mt-3 flex flex-col sm:flex-row gap-1.5">
                        <button type="button" className="flex-1 flex items-center justify-center gap-1.5 py-1.5 border border-gray-300 rounded-lg text-[9px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24">
                                <path fill="currentColor" fillRule="evenodd" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" clipRule="evenodd" color="#4285F4"/>
                                <path fill="currentColor" fillRule="evenodd" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" clipRule="evenodd" color="#34A853"/>
                                <path fill="currentColor" fillRule="evenodd" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" clipRule="evenodd" color="#FBBC05"/>
                                <path fill="currentColor" fillRule="evenodd" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" clipRule="evenodd" color="#EA4335"/>
                            </svg>
                            Google
                        </button>
                        <button type="button" className="flex-1 flex items-center justify-center gap-1.5 py-1.5 border border-gray-300 rounded-lg text-[9px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                            <Apple size={14} className="text-black" />
                            Apple
                        </button>
                    </div>

                    <p className="mt-4 text-center text-[10px] text-gray-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#21492f] font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Right Side - Content */}
                <div className="hidden lg:flex lg:w-1/2 bg-[#21492f] p-8 flex-col justify-center relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-soft-light">
                    {/* Gradient Overlay for subtle texturing */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#183522]/40 to-[#21492f]/40 pointer-events-none"></div>

                    {/* Top Right Logo */}
                    <div className="absolute top-8 right-8 z-20 flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                        <Image src="/desk-top.png" alt="ilagbilghiza" width={120} height={36} className="w-auto h-9 object-contain" priority />
                    </div>

                    <div className="relative z-10 w-full max-w-lg mx-auto">
                        <h2 className="text-[2rem] font-black text-white leading-[1.2] mb-6 tracking-tight">
                            Revolutionize Health with Smarter Care
                        </h2>
                        
                        <div className="mt-6 mb-12 relative text-white">
                            <div className="text-6xl font-serif text-[#4caf50] absolute -top-8 -left-3 opacity-60">"</div>
                            <p className="text-white/90 text-sm leading-relaxed relative z-10 font-normal italic">
                                ilagbilghiza has completely transformed our care delivery. It's reliable, efficient, and ensures our patients' wellness is always top-notch.
                            </p>

                            
                            <div className="mt-8 flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border-2 border-[#4caf50]">
                                    <img src="https://i.pravatar.cc/150?img=11" alt="Sana Ali" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-semibold text-sm">Design and Develop by Saif</span>
                                    <span className="text-white/60 text-xs text-center lg:text-left">Mentor: Talha Mughal</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logos section - as requested: right side per logo add karu ilagbilghiza ka */}
                    <div className="absolute bottom-8 left-16 right-16 pt-6 border-t border-white/10 z-10">
                        <p className="text-[10px] font-bold text-white/50 tracking-[0.15em] uppercase mb-4 text-center lg:text-left">
                            Mentor
                        </p>
                        <div className="flex items-center justify-center gap-4 text-white/80 w-full bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl group hover:bg-white/10 transition-all duration-300">
                             <span className="text-white font-black text-2xl tracking-tighter italic drop-shadow-lg scale-100 group-hover:scale-105 transition-transform duration-300">Talha Mughal</span>
                        </div>
                    </div>
                </div>
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
