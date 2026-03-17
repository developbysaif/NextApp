"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Simulate slight delay for UX
        setTimeout(() => {
            const admins = JSON.parse(localStorage.getItem("adminAccounts") || "[]");
            const match = admins.find(
                (a) =>
                    a.email === formData.email.toLowerCase().trim() &&
                    a.password === formData.password
            );

            if (!match) {
                setLoading(false);
                return setError("Invalid email or password. Please try again.");
            }

            // Set session
            const sessionUser = {
                id: match.id,
                name: match.name,
                email: match.email,
                phone: match.phone,
                role: "admin",
            };
            localStorage.setItem("currentUser", JSON.stringify(sessionUser));
            setLoading(false);
            router.push("/admin");
        }, 600);
    };

    return (
        <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center p-6 pb-20 pt-10 font-inter">
            <div className="max-w-md w-full">

                {/* Logo & Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#21492f] rounded-2xl text-white shadow-xl shadow-[#21492f]/20 mb-6">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-[#21492f] uppercase tracking-tight mb-2 font-outfit">
                        Admin Portal<span className="text-[#22aa4f]">.</span>
                    </h1>
                    <p className="text-gray-500 font-medium text-sm">
                        Sign in to access the administrator dashboard
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#21492f]/10">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Error */}
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 flex items-start gap-2">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#21492f]/60 ml-2">Admin Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21492f]/40 group-focus-within:text-[#22aa4f] transition-colors" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="admin@ilajbilghiza.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-[#21492f]/5 border-transparent rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#22aa4f]/20 transition-all outline-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#21492f]/60 ml-2">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#21492f]/40 group-focus-within:text-[#22aa4f] transition-colors" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-[#21492f]/5 border-transparent rounded-2xl pl-12 pr-12 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#22aa4f]/20 transition-all outline-none placeholder:text-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#22aa4f] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#21492f] text-white rounded-2xl py-4 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#22aa4f] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#21492f]/20 mt-4 group disabled:opacity-60"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                <>
                                    Secure Login
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center flex flex-col gap-3">
                        <p className="text-sm text-gray-500 font-medium">
                            No account yet?{" "}
                            <Link href="/admin/signup" className="text-[#22aa4f] font-black hover:text-[#21492f] underline underline-offset-4">
                                Create Admin Account
                            </Link>
                        </p>
                        <Link href="/" className="text-sm text-gray-400 hover:text-[#21492f] font-bold transition-colors">
                            ← Back to Website
                        </Link>
                    </div>
                </div>

                <p className="text-center text-[10px] text-[#21492f]/50 font-black uppercase tracking-widest mt-8">
                    Authorized Personnel Only • IlajBilGhiza
                </p>
            </div>
        </div>
    );
}
