"use client"

import React, { useState } from 'react';
import { Settings, Lock, Bell, Eye, EyeOff, Shield, Palette, Trash2, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserSettings() {
    const [showPassword, setShowPassword] = useState(false);
    const [notifications, setNotifications] = useState({
        diet: true,
        progress: true,
        marketing: false
    });

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <div>
                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Account Settings</h1>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Manage your security and preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10">
                {/* Navigation Sidebar */}
                <div className="space-y-2">
                    {[
                        { name: 'Security', icon: Lock, active: true },
                        { name: 'Notifications', icon: Bell },
                        { name: 'Appearance', icon: Palette },
                        { name: 'Data & Privacy', icon: Shield },
                    ].map((item, idx) => (
                        <button 
                            key={idx}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                                item.active ? 'bg-[#214a32] text-white shadow-lg' : 'text-gray-400 hover:bg-white hover:text-[#214a32] border border-transparent hover:border-gray-100'
                            }`}
                        >
                            <item.icon size={18} /> {item.name}
                        </button>
                    ))}
                </div>

                {/* Settings Panels */}
                <div className="space-y-8">
                    {/* Password Section */}
                    <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                                <Lock size={20} />
                            </div>
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Change Password</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Password</label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#214a32]" 
                                    />
                                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#214a32]" 
                                />
                            </div>
                            <button className="w-full bg-[#214a32] text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-[#214a32]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                                <Save size={18} /> Update Password
                            </button>
                        </div>
                    </div>

                    {/* Notification Toggles */}
                    <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                                <Bell size={20} />
                            </div>
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">System Notifications</h3>
                        </div>

                        <div className="space-y-6">
                            {[
                                { id: 'diet', label: 'Meal Reminders', desc: 'Get notified 30 mins before every meal.', checked: notifications.diet },
                                { id: 'progress', label: 'Weekly Reports', desc: 'Progress summary of your health metrics.', checked: notifications.progress },
                                { id: 'marketing', label: 'Offer & Updates', desc: 'New health tips and platform features.', checked: notifications.marketing },
                            ].map((toggle) => (
                                <div key={toggle.id} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                                    <div>
                                        <p className="text-sm font-black text-gray-800">{toggle.label}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{toggle.desc}</p>
                                    </div>
                                    <button 
                                        onClick={() => setNotifications({...notifications, [toggle.id]: !toggle.checked})}
                                        className={`w-14 h-8 rounded-full relative transition-colors ${toggle.checked ? 'bg-[#214a32]' : 'bg-gray-200'}`}
                                    >
                                        <motion.div 
                                            animate={{ x: toggle.checked ? 28 : 4 }}
                                            className="absolute top-1 size-6 bg-white rounded-full shadow-md" 
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-rose-50 p-10 rounded-[3rem] border border-rose-100 space-y-6">
                        <div className="flex items-center gap-3 text-rose-600">
                            <Trash2 size={24} />
                            <h3 className="text-lg font-black uppercase tracking-tight">Danger Zone</h3>
                        </div>
                        <p className="text-xs font-bold text-rose-800 opacity-60 uppercase tracking-widest leading-relaxed">Deactivating your account will permanently delete all your health history, diet plans, and progress tracking data. This action is irreversible.</p>
                        <button className="px-8 py-4 bg-white text-rose-600 border border-rose-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                            Deactivate Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
