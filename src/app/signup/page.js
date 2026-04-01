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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl flex overflow-hidden min-h-[750px] border border-gray-200">
                
                {/* Left Side - Form */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center mb-10 w-fit">
                        <Image src="/desk-top.png" alt="ilagbilghiza" width={200} height={60} className="w-auto h-10 object-contain drop-shadow-sm" priority />
                    </Link>

                    <h1 className="text-3xl font-medium text-gray-900 mb-2">Create your account</h1>
                    <p className="text-gray-500 text-sm mb-8">
                        Join now to manage your health, nutrition and expert care all in one place.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                                {error}
                            </div>
                        )}
                        
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    value={formData.name}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#21492f] focus:border-[#21492f] outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    required
                                    placeholder="hello@organic.com"
                                    value={formData.email}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#21492f] focus:border-[#21492f] outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 py-2">
                            <label className="text-xs font-semibold text-gray-700 text-center block">Select Your Path</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'customer' })}
                                    className={`p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${formData.role === 'customer'
                                        ? 'border-[#21492f] bg-[#21492f]/5 shadow-sm ring-1 ring-[#21492f]'
                                        : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                >
                                    <User size={16} className={formData.role === 'customer' ? 'text-[#21492f]' : 'text-gray-400'} />
                                    <span className={`text-[11px] font-bold uppercase tracking-wider ${formData.role === 'customer' ? 'text-[#21492f]' : 'text-gray-500'}`}>
                                        Organic Lover
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'doctor' })}
                                    className={`p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${formData.role === 'doctor'
                                        ? 'border-[#21492f] bg-[#21492f]/5 shadow-sm ring-1 ring-[#21492f]'
                                        : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                >
                                    <Stethoscope size={16} className={formData.role === 'doctor' ? 'text-[#21492f]' : 'text-gray-400'} />
                                    <span className={`text-[11px] font-bold uppercase tracking-wider ${formData.role === 'doctor' ? 'text-[#21492f]' : 'text-gray-500'}`}>
                                        Medical Expert
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#21492f] focus:border-[#21492f] outline-none transition-all text-gray-800 placeholder:text-gray-400"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#21492f] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#183522] transition-colors mt-2"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Google and Apple */}
                    <div className="mt-8 flex items-center before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
                        <span className="mx-4 text-xs font-medium text-gray-400 uppercase tracking-widest">OR</span>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                                <path fill="currentColor" fillRule="evenodd" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" clipRule="evenodd" color="#4285F4"/>
                                <path fill="currentColor" fillRule="evenodd" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" clipRule="evenodd" color="#34A853"/>
                                <path fill="currentColor" fillRule="evenodd" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" clipRule="evenodd" color="#FBBC05"/>
                                <path fill="currentColor" fillRule="evenodd" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" clipRule="evenodd" color="#EA4335"/>
                            </svg>
                            Google
                        </button>
                        <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <Apple size={18} className="text-black" />
                            Apple
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#21492f] font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Right Side - Content */}
                <div className="hidden lg:flex lg:w-1/2 bg-[#21492f] p-16 flex-col justify-center relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-soft-light">
                    {/* Gradient Overlay for subtle texturing */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#183522]/40 to-[#21492f]/40 pointer-events-none"></div>

                    {/* Top Right Logo */}
                    <div className="absolute top-12 right-12 z-20 flex items-center bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/20 shadow-xl">
                        <Image src="/desk-top.png" alt="ilagbilghiza" width={200} height={60} className="w-auto h-12 object-contain drop-shadow-md" priority />
                    </div>

                    <div className="relative z-10 w-full max-w-lg mx-auto">
                        <h2 className="text-[2.75rem] font-medium text-white leading-[1.15] mb-8 tracking-tight">
                            Revolutionize Health with Smarter Care
                        </h2>
                        
                        <div className="mt-8 mb-20 relative text-white">
                            <div className="text-6xl font-serif text-[#4caf50] absolute -top-8 -left-3 opacity-60">"</div>
                            <p className="text-white/90 text-[1.1rem] leading-relaxed relative z-10 font-normal">
                                ilagbilghiza has completely transformed our care delivery. It's reliable, efficient, and ensures our patients' wellness is always top-notch.
                            </p>
                            
                            <div className="mt-8 flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border-2 border-[#4caf50]">
                                    <img src="https://i.pravatar.cc/150?img=11" alt="Sana Ali" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-semibold text-sm">Dr. Sana Ali</span>
                                    <span className="text-white/60 text-xs">Medical Expert at HealthCore</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logos section - as requested: right side per logo add karu ilagbilghiza ka */}
                    <div className="absolute bottom-12 left-16 right-16 pt-6 border-t border-white/10 z-10">
                        <p className="text-[10px] font-bold text-white/50 tracking-[0.15em] uppercase mb-4">
                            Trusted By TEAMS
                        </p>
                        <div className="flex items-center justify-between gap-4 text-white/80 w-full">
                            <div className="flex items-center gap-1.5 focus:outline-none">
                                <Leaf size={20} className="text-[#4caf50]"/> 
                                <span className="font-bold text-sm tracking-tight text-white">NatureCare</span>
                            </div>
                            <div className="flex items-center gap-1.5 focus:outline-none">
                                <Globe size={18} className="text-blue-300"/>
                                <span className="font-bold text-sm tracking-tight text-white">BioHealth</span>
                            </div>
                            <div className="flex items-center gap-1.5 focus:outline-none">
                                <Stethoscope size={20} className="text-rose-300"/>
                                <span className="font-bold text-sm tracking-tight text-white">MedAssist</span>
                            </div>
                            <div className="flex items-center justify-center px-4 py-2 rounded-lg bg-white/10 border border-white/20 h-10">
                                <Image src="/desk-top.png" alt="ilagbilghiza" width={120} height={30} className="w-auto h-full object-contain filter brightness-0 invert opacity-90" />
                            </div>
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
