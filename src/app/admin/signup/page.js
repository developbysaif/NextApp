"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2, Phone } from "lucide-react";

export default function AdminSignupPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!formData.name.trim()) return setError("Please enter your full name.");
        if (!formData.email.trim()) return setError("Please enter a valid email.");
        if (formData.password.length < 6) return setError("Password must be at least 6 characters.");
        if (formData.password !== formData.confirmPassword) return setError("Passwords do not match.");

        setLoading(true);

        // Check if admin already exists with same email
        const existingAdmins = JSON.parse(localStorage.getItem("adminAccounts") || "[]");
        const duplicate = existingAdmins.find((a) => a.email === formData.email.toLowerCase().trim());
        if (duplicate) {
            setLoading(false);
            return setError("An account with this email already exists.");
        }

        // Build admin user object
        const newAdmin = {
            id: Date.now().toString(),
            name: formData.name.trim(),
            email: formData.email.toLowerCase().trim(),
            phone: formData.phone.trim(),
            password: formData.password, // In production: hash this!
            role: "admin",
            createdAt: new Date().toISOString(),
        };

        // Save to localStorage
        existingAdmins.push(newAdmin);
        localStorage.setItem("adminAccounts", JSON.stringify(existingAdmins));

        // Auto-login: set as currentUser
        const sessionUser = { ...newAdmin };
        delete sessionUser.password; // don't store password in session
        localStorage.setItem("currentUser", JSON.stringify(sessionUser));

        setLoading(false);
        setSuccess(true);

        // Redirect after 1.5s
        setTimeout(() => router.push("/admin"), 1500);
    };

    const inputCls = "w-full bg-[#214a32]/5 border-transparent rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#214a32]/20 transition-all outline-none placeholder:text-gray-400";

    if (success) {
        return (
            <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center p-6 font-inter">
                <div className="text-center">
                    <div className="w-20 h-20 bg-[#214a32] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-200">
                        <CheckCircle2 size={40} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-black text-[#214a32] mb-2">Account Created!</h2>
                    <p className="text-gray-500 font-medium text-sm">Redirecting to admin panel...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center p-6 pb-20 pt-10 font-inter">
            <div className="max-w-md w-full">

                {/* Logo & Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#214a32] rounded-2xl text-white shadow-xl shadow-[#214a32]/20 mb-6">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-[#214a32] uppercase tracking-tight mb-2 font-outfit">
                        Admin Setup<span className="text-[#214a32]">.</span>
                    </h1>
                    <p className="text-gray-500 font-medium text-sm">
                        Register a new administrator account
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#214a32]/10">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Error */}
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 flex items-start gap-2">
                                <span className="mt-0.5">⚠️</span> {error}
                            </div>
                        )}

                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#214a32]/60 ml-2">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#214a32]/40 group-focus-within:text-[#214a32] transition-colors" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Muhammad Ahmed"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={inputCls}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#214a32]/60 ml-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#214a32]/40 group-focus-within:text-[#214a32] transition-colors" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="admin@ilajbilghiza.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={inputCls}
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#214a32]/60 ml-2">Phone (Optional)</label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#214a32]/40 group-focus-within:text-[#214a32] transition-colors" size={18} />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="+92 300 1234567"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={inputCls}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#214a32]/60 ml-2">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#214a32]/40 group-focus-within:text-[#214a32] transition-colors" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    placeholder="Min 6 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={inputCls + " pr-12"}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#214a32] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {/* Password strength bar */}
                            {formData.password && (
                                <div className="flex gap-1 px-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className={`h-1 flex-1 rounded-full transition-all ${formData.password.length >= i * 3
                                                    ? i <= 1 ? 'bg-red-400'
                                                        : i <= 2 ? 'bg-amber-400'
                                                            : i <= 3 ? 'bg-blue-400'
                                                                : 'bg-[#214a32]'
                                                    : 'bg-gray-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#214a32]/60 ml-2">Confirm Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#214a32]/40 group-focus-within:text-[#214a32] transition-colors" size={18} />
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    name="confirmPassword"
                                    required
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={inputCls + ` pr-12 ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'ring-2 ring-red-300 bg-red-50' : ''}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#214a32] transition-colors"
                                >
                                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                <p className="text-[10px] text-[#214a32] font-black ml-2 flex items-center gap-1">
                                    <CheckCircle2 size={11} /> Passwords match
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#214a32] text-white rounded-2xl py-4 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#214a32] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#214a32]/20 mt-4 group disabled:opacity-60"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Creating...
                                </span>
                            ) : (
                                <>
                                    Create Admin Account
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[#214a32] font-bold text-sm">
                            Already have an account?{" "}
                            <Link href="/admin/login" className="text-[#214a32] hover:text-[#214a32] underline underline-offset-4">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="text-center text-[10px] text-[#214a32]/50 font-black uppercase tracking-widest mt-8">
                    ⚠️ Data saved locally on this device
                </p>
            </div>
        </div>
    );
}
