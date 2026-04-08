"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Lock, Save, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function ChangePasswordPage() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null); // Clear errors on typing
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validations
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (formData.newPassword.length < 8) {
            setError("New password must be at least 8 characters long.");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        setIsSaving(true);
        // Simulate API call to change password
        setTimeout(() => {
            setIsSaving(false);
            setSaveSuccess(true);
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setSaveSuccess(false), 4000);
        }, 1500);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-12">
            {/* Header section */}
            <div className="flex items-center gap-4 mb-8">
                <Link 
                    href="/dashboard/profile" 
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-[#214a32] hover:bg-[#a4d9bc] hover:shadow-lg transition-all"
                >
                    <ChevronLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-[#214a32] tracking-tight">Change Password</h1>
                    <p className="text-gray-400 text-sm mt-1 font-medium">Update your account access credentials securely.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-50">
                <div className="flex items-center gap-4 mb-8 p-4 bg-[#f0f9f4] rounded-2xl border border-[#a4d9bc]/30 text-[#214a32]">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#214a32] shadow-sm shrink-0">
                        <Lock size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold">Strong Password Recommended</h3>
                        <p className="text-[13px] opacity-80 mt-0.5">Use a mix of letters, numbers, and symbols to ensure maximum security for your account.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center gap-3">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    {saveSuccess && (
                        <div className="p-4 bg-[#f0f9f4] text-[#214a32] rounded-xl text-sm font-bold flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-emerald-500" />
                            Password changed successfully! You can now use your new password next time you log in.
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Current Password
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword.current ? "text" : "password"} 
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                className="w-full bg-[#FDFBF7] border border-gray-200 text-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:border-[#a4d9bc] focus:ring-2 focus:ring-[#a4d9bc]/20 transition-all font-medium pr-12"
                                placeholder="Enter current password"
                            />
                            <button 
                                type="button"
                                onClick={() => togglePasswordVisibility('current')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#214a32] transition-colors"
                            >
                                {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-50"></div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            New Password
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword.new ? "text" : "password"} 
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className="w-full bg-[#FDFBF7] border border-gray-200 text-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:border-[#a4d9bc] focus:ring-2 focus:ring-[#a4d9bc]/20 transition-all font-medium pr-12"
                                placeholder="Enter new password"
                            />
                            <button 
                                type="button"
                                onClick={() => togglePasswordVisibility('new')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#214a32] transition-colors"
                            >
                                {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword.confirm ? "text" : "password"} 
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full bg-[#FDFBF7] border border-gray-200 text-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:border-[#a4d9bc] focus:ring-2 focus:ring-[#a4d9bc]/20 transition-all font-medium pr-12"
                                placeholder="Re-enter new password"
                            />
                            <button 
                                type="button"
                                onClick={() => togglePasswordVisibility('confirm')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#214a32] transition-colors"
                            >
                                {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button 
                            type="submit"
                            disabled={isSaving}
                            className="w-full flex items-center justify-center gap-2 bg-[#214a32] hover:bg-[#1a3a27] text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <Save size={20} />
                            )}
                            <span>{isSaving ? 'Updating Password...' : 'Update Password'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
