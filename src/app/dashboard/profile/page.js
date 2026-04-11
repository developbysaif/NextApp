"use client"

import React, { useState, useEffect } from 'react';
import {
    User,
    Shield,
    Bell,
    Globe,
    ChevronDown,
    ChevronRight,
    Camera,
    Lock,
    Smartphone,
    Mail,
    Edit2,
    Trash2,
    ArrowLeft,
    CheckCircle2,
    Search,
    Monitor,
    Cpu,
    Zap,
    Grid,
    Settings,
    Clock,
    Eye,
    EyeOff,
    X,
    CheckCircle
} from 'lucide-react';

export default function UserSettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [securityView, setSecurityView] = useState('list'); // 'list' or 'change-password'
    const [expandedMenu, setExpandedMenu] = useState('Account Settings');
    const [showPassword, setShowPassword] = useState(false);

    // Notifications/Toast State
    const [toast, setToast] = useState(null);

    // Security Data State
    const [securityData, setSecurityData] = useState({
        phone: "+92 312 3456789",
        email: "saif@example.com",
        is2FAEnabled: true,
        isGoogleAuthEnabled: false
    });

    const [editMode, setEditMode] = useState(null); // 'phone' or 'email'
    const [editValue, setEditValue] = useState('');

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleUpdate = (type) => {
        setSecurityData(prev => ({ ...prev, [type]: editValue }));
        setEditMode(null);
        showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`);
    };

    const toggleSecurity = (key) => {
        setSecurityData(prev => ({ ...prev, [key]: !prev[key] }));
        showToast(`${key === 'is2FAEnabled' ? '2FA' : 'Google Auth'} ${!securityData[key] ? 'enabled' : 'disabled'}`);
    };

    const sidebarMenu = [
        {
            group: 'Account Settings',
            icon: User,
            items: [
                { id: 'profile', label: 'Profile', dot: true },
                { id: 'security', label: 'Security', dot: true },
                { id: 'notifications', label: 'Notifications', dot: true },
                { id: 'integrations', label: 'Integrations', dot: true },
            ]
        },
        {
            group: 'Website Settings',
            icon: Globe,
            items: [
                { id: 'organization', label: 'Organization', dot: true },
                { id: 'localization', label: 'Localization', dot: true },
                { id: 'prefixes', label: 'Prefixes', dot: true },
                { id: 'seo-setup', label: 'SEO Setup', dot: true },
                { id: 'language', label: 'Language', dot: true },
                { id: 'maintenance', label: 'Maintenance Mode', dot: true },
                { id: 'login-register', label: 'Login & Register', dot: true },
                { id: 'preferences', label: 'Preferences', dot: true },
            ]
        },
        {
            group: 'Clinic Settings',
            icon: Settings,
            items: [
                { id: 'clinic-appointment', label: 'Appointment', dot: true },
                { id: 'working-hours', label: 'Working Hours', dot: true },
                { id: 'cancel-reason', label: 'Cancellation Reason', dot: true },
            ]
        },
        { group: 'App Settings', icon: Grid },
        { group: 'System Settings', icon: Monitor },
        { group: 'Finance & Accounts', icon: () => <Zap size={18} /> },
        { group: 'Other Settings', icon: Monitor },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-800 pb-20 relative">

            {/* Toast Notification */}
            {toast && (
                <div className="fixed top-24 right-10 z-[500] animate-in slide-in-from-right-10 duration-300">
                    <div className="bg-[#214a32] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20">
                        <CheckCircle2 size={20} className="text-[#a4d9bc]" />
                        <span className="text-sm font-bold tracking-tight">{toast}</span>
                    </div>
                </div>
            )}

            {/* Page Title */}
            <div className="mb-6 px-4 md:px-0">
                <h1 className="text-2xl font-bold text-[#1e293b]">Settings</h1>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">

                {/* Left Sidebar Navigation */}
                <div className="w-full xl:w-72 flex-shrink-0 px-4 md:px-0">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-4">
                        <nav className="space-y-1">
                            {sidebarMenu.map((menu) => (
                                <div key={menu.group} className="px-3">
                                    <button
                                        onClick={() => setExpandedMenu(expandedMenu === menu.group ? null : menu.group)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${expandedMenu === menu.group ? 'text-[#214a32] bg-[#f0f9f4]/50' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {typeof menu.icon === 'function' ? menu.icon() : <menu.icon size={18} className={expandedMenu === menu.group ? 'text-[#214a32]' : 'text-gray-400'} />}
                                            <span className="text-[14px] font-semibold">{menu.group}</span>
                                        </div>
                                        {menu.items ? <ChevronDown size={14} className={`transition-transform duration-300 ${expandedMenu === menu.group ? 'rotate-180' : ''}`} /> : <ChevronRight size={14} className="text-gray-300" />}
                                    </button>
                                    {menu.items && expandedMenu === menu.group && (
                                        <div className="mt-1 ml-4 pl-4 border-l border-gray-100 space-y-1">
                                            {menu.items.map((item) => (
                                                <button key={item.id} onClick={() => { setActiveTab(item.id); setSecurityView('list'); }} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${activeTab === item.id ? 'text-[#214a32] font-bold' : 'text-gray-500 hover:text-gray-900'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${activeTab === item.id ? 'bg-[#214a32]' : 'bg-gray-300'}`}></span>
                                                    {item.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 px-4 md:px-0">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm min-h-[600px] flex flex-col overflow-hidden">

                        {/* 1. Profile Tab Placeholder */}
                        {activeTab === 'profile' && (
                            <div className="p-8 md:p-10 animate-in fade-in duration-300">
                                <h2 className="text-lg font-bold text-[#1e293b] mb-10 pb-4 border-b border-gray-50">Basic Information</h2>
                                <div className="max-w-4xl space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                        <InputField label="First Name" required defaultValue="Saif" />
                                        <InputField label="Last Name" required defaultValue="Ali" />
                                        <InputField label="Email" required defaultValue={securityData.email} type="email" readOnly />
                                        <InputField label="Phone Number" required defaultValue={securityData.phone} readOnly />
                                    </div>
                                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
                                        <button className="px-8 py-2.5 bg-[#214a32] text-white rounded-lg text-sm font-bold shadow-sm" onClick={() => showToast("Profile changes saved!")}>Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. Security Tab with Full Functionality */}
                        {activeTab === 'security' && (
                            <div className="p-8 md:p-10 animate-in fade-in duration-300">
                                <div className="flex flex-col lg:flex-row gap-12">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-[#1e293b] mb-10">Security</h2>
                                        <div className="divide-y divide-gray-100 border-t border-gray-50">

                                            {/* Password Item */}
                                            <div className="py-6 flex items-center justify-between">
                                                <div className="pr-10">
                                                    <h4 className="text-[16px] font-bold text-[#1e293b]">Password</h4>
                                                    <p className="text-[14px] text-gray-400 mt-1">Set a unique password to secure the account</p>
                                                </div>
                                                <button onClick={() => setSecurityView('change-password')} className="p-2 text-gray-400 hover:text-[#214a32] hover:bg-[#f0f9f4] rounded-lg transition-all border border-gray-100">
                                                    <Edit2 size={16} />
                                                </button>
                                            </div>

                                            {/* 2FA Toggle */}
                                            <div className="py-6 flex items-center justify-between">
                                                <div className="pr-10">
                                                    <h4 className="text-[16px] font-bold text-[#1e293b]">Two Factor Authentication</h4>
                                                    <p className="text-[14px] text-gray-400 mt-1">Use your mobile phone to receive security PIN.</p>
                                                </div>
                                                <Switch checked={securityData.is2FAEnabled} onChange={() => toggleSecurity('is2FAEnabled')} />
                                            </div>

                                            {/* Google Auth Toggle */}
                                            <div className="py-6 flex items-center justify-between">
                                                <div className="pr-10">
                                                    <h4 className="text-[16px] font-bold text-[#1e293b]">Google Authentication</h4>
                                                    <p className="text-[14px] text-gray-400 mt-1">Connect to Google</p>
                                                </div>
                                                <Switch checked={securityData.isGoogleAuthEnabled} onChange={() => toggleSecurity('isGoogleAuthEnabled')} />
                                            </div>

                                            {/* Phone Number */}
                                            <div className="py-6 flex items-center justify-between">
                                                <div className="pr-10">
                                                    <h4 className="text-[16px] font-bold text-[#1e293b]">Phone Number</h4>
                                                    <p className="text-[14px] text-[#214a32] font-semibold mt-1">{securityData.phone}</p>
                                                    <p className="text-[12px] text-gray-400">Phone Number associated with the account</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => { setEditMode('phone'); setEditValue(securityData.phone); }} className="p-2 text-gray-400 hover:text-[#214a32] hover:bg-[#f0f9f4] rounded-lg border border-gray-100"><Edit2 size={16} /></button>
                                                    <button onClick={() => showToast("Phone removal restricted for main recovery factor.")} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-gray-100"><Trash2 size={16} /></button>
                                                </div>
                                            </div>

                                            {/* Email Address */}
                                            <div className="py-6 flex items-center justify-between">
                                                <div className="pr-10">
                                                    <h4 className="text-[16px] font-bold text-[#1e293b]">Email Address</h4>
                                                    <p className="text-[14px] text-[#214a32] font-semibold mt-1">{securityData.email}</p>
                                                    <p className="text-[12px] text-gray-400">Email Address associated with the account</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => { setEditMode('email'); setEditValue(securityData.email); }} className="p-2 text-gray-400 hover:text-[#214a32] hover:bg-[#f0f9f4] rounded-lg border border-gray-100"><Edit2 size={16} /></button>
                                                    <button onClick={() => showToast("Primary email cannot be deleted.")} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-gray-100"><Trash2 size={16} /></button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Sidebar Stats */}
                                    <div className="w-full lg:w-80 space-y-6">
                                        <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-6">
                                            <h4 className="text-[14px] font-bold text-[#1e293b] mb-4 flex items-center gap-2"><Clock size={16} className="text-[#a4d9bc]" /> Recent Activities</h4>
                                            <div className="space-y-4">
                                                <ActivityItem icon={Shield} color="emerald" text="Password changed successfully" time="2 hours ago" />
                                                <ActivityItem icon={Smartphone} color="blue" text="New login from iPhone 14" time="5 hours ago" />
                                                <ActivityItem icon={Mail} color="amber" text="Email verification pending" time="Yesterday" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal for Change Password */}
                                {securityView === 'change-password' && (
                                    <div className="fixed inset-0 z-[600] bg-black/50 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
                                        <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl animate-in zoom-in-95 duration-300 border border-[#a4d9bc]/20">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="w-12 h-12 bg-[#f0f9f4] rounded-2xl flex items-center justify-center text-[#214a32] mb-0"><Lock size={20} /></div>
                                                <button onClick={() => setSecurityView('list')} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-400 transition-colors"><X size={20} /></button>
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#1e293b] mb-2 tracking-tight">Security Protocol</h3>
                                            <p className="text-sm text-gray-400 mb-8 font-medium">Update your account credentials to maintain high security standards.</p>

                                            <div className="space-y-6">
                                                <InputField label="Confirm Old Password" type="password" placeholder="••••••••" />
                                                <div className="h-px bg-gray-50 my-2"></div>
                                                <InputField label="New Secure Password" type="password" placeholder="Min 8 characters" />
                                                <InputField label="Verify New Password" type="password" placeholder="••••••••" />
                                                <button onClick={() => { setSecurityView('list'); showToast("Password updated successfully!"); }} className="w-full py-4 mt-6 bg-[#214a32] text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-[#214a32]/20 hover:bg-[#1a3a28] transition-all active:scale-95">Update Credentials</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Modal for Edit Phone/Email */}
                                {editMode && (
                                    <div className="fixed inset-0 z-[600] bg-black/50 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
                                        <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl animate-in zoom-in-95 duration-300 border border-[#a4d9bc]/20">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="w-12 h-12 bg-[#f0f9f4] rounded-2xl flex items-center justify-center text-[#214a32]"><Edit2 size={20} /></div>
                                                <button onClick={() => setEditMode(null)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-400 transition-colors"><X size={20} /></button>
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#1e293b] mb-2 tracking-tight">Update {editMode === 'phone' ? 'Phone Number' : 'Email Address'}</h3>
                                            <p className="text-sm text-gray-400 mb-8 font-medium">Please enter the new {editMode} below. A verification code will be sent.</p>

                                            <div className="space-y-6">
                                                <InputField
                                                    label={`New ${editMode}`}
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    placeholder={editMode === 'phone' ? '+92 XXX XXXXXXX' : 'name@example.com'}
                                                />
                                                <button onClick={() => handleUpdate(editMode)} className="w-full py-4 mt-6 bg-[#214a32] text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-[#214a32]/20 hover:bg-[#1a3a28] transition-all active:scale-95">Verify & Save</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        )}

                        {/* Website Settings Tabs */}
                        {['organization', 'localization', 'prefixes', 'seo-setup', 'language', 'maintenance', 'login-register', 'preferences'].includes(activeTab) && (
                            <div className="p-8 md:p-10 animate-in fade-in duration-300">
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                                    <div>
                                        <h2 className="text-xl font-bold text-[#1e293b] capitalize">{activeTab.replace('-', ' & ')}</h2>
                                        <p className="text-sm text-gray-400 mt-1 font-medium">Configure your platform's {activeTab.replace('-', ' ')} settings.</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-5 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold border border-gray-100">Reset</button>
                                        <button className="px-5 py-2 bg-[#214a32] text-white rounded-xl text-xs font-bold" onClick={() => showToast("Settings updated!")}>Save Changes</button>
                                    </div>
                                </div>
                                
                                <div className="max-w-4xl space-y-8">
                                    {activeTab === 'organization' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <InputField label="Organization Name" defaultValue="IlajBilGhiza" />
                                            <InputField label="Contact Person" defaultValue="Saif Ali" />
                                            <InputField label="Official Email" defaultValue="info@ilajbilghiza.com" />
                                            <InputField label="Phone Number" defaultValue="+92 312 3456789" />
                                            <div className="md:col-span-2">
                                                <div className="space-y-2">
                                                    <label className="text-[13px] font-bold text-[#475569] ml-1">Company Description</label>
                                                    <textarea className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-[14px] font-bold text-[#214a32] focus:ring-4 focus:ring-[#a4d9bc]/10 focus:border-[#a4d9bc] focus:outline-none transition-all resize-none h-32" placeholder="Tell us about your organization..."></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'seo-setup' && (
                                        <div className="space-y-6">
                                            <InputField label="Meta Title" defaultValue="IlajBilGhiza - Organic Healing & Nutrition" />
                                            <div className="space-y-2">
                                                <label className="text-[13px] font-bold text-[#475569] ml-1">Meta Keywords</label>
                                                <input className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-[14px] font-bold text-[#214a32] focus:ring-4 focus:ring-[#a4d9bc]/10 focus:border-[#a4d9bc] focus:outline-none transition-all" defaultValue="organic, health, medicine, nutrition, pakistan" />
                                            </div>
                                        </div>
                                    )}
                                    {/* Placeholder for other tabs */}
                                    {!['organization', 'seo-setup'].includes(activeTab) && (
                                        <div className="bg-[#f0f9f4]/30 border-2 border-dashed border-[#a4d9bc]/30 rounded-3xl p-20 flex flex-col items-center justify-center text-center">
                                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#214a32] mb-4"><Monitor size={24} /></div>
                                            <h3 className="text-lg font-bold text-[#214a32] capitalize">{activeTab.replace('-', ' ')} Setup</h3>
                                            <p className="text-sm text-gray-400 mt-2 max-w-xs font-medium">The {activeTab} configuration panel is ready for deployment. Functional logic can be attached here.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* Clinic Settings Tabs Implementation */}
                        {['clinic-appointment', 'working-hours', 'cancel-reason'].includes(activeTab) && (
                            <div className="p-8 md:p-10 animate-in fade-in duration-300">
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                                    <h2 className="text-xl font-bold text-[#1e293b] capitalize">{activeTab.replace('clinic-', '').replace('-', ' ')}</h2>
                                    <div className="flex gap-2">
                                        <button className="px-5 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold border border-gray-100">Cancel</button>
                                        <button className="px-5 py-2 bg-[#214a32] text-white rounded-xl text-xs font-bold shadow-lg" onClick={() => showToast("Clinic settings updated!")}>Save Changes</button>
                                    </div>
                                </div>

                                <div className="max-w-5xl space-y-12">
                                    {activeTab === 'clinic-appointment' && (
                                        <div className="space-y-10">
                                            {/* Reminders Toggle Section */}
                                            <div className="space-y-6">
                                                <h3 className="text-md font-bold text-[#1e293b]">Appointment Reminders</h3>
                                                <div className="space-y-4">
                                                    <ReminderToggle label="Automatically notify clients about upcoming appointments." defaultChecked />
                                                    <ReminderToggle label="Reminders for weekend appointments go out on Friday." />
                                                    <ReminderToggle label="Appointments auto-cancel if clients reply 'No' or 'Cancel' to reminders." defaultChecked />
                                                </div>
                                            </div>

                                            {/* Automatic Reminders Table-like grid */}
                                            <div className="space-y-6">
                                                <h3 className="text-md font-bold text-[#1e293b]">Automatic Reminders</h3>
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_2fr_1fr_auto] items-center gap-4">
                                                        <span className="text-[13px] font-bold text-gray-500">Reminder</span>
                                                        <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-bold text-[#214a32] focus:outline-none"><option>Email</option><option>SMS</option></select>
                                                        <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-bold text-[#214a32] focus:outline-none"><option>Appointment Reminder</option></select>
                                                        <div className="flex items-center gap-2">
                                                            <input type="text" defaultValue="01" className="w-[60px] bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-bold text-[#214a32] focus:outline-none" />
                                                            <span className="text-[12px] font-bold text-gray-400">Days Before</span>
                                                        </div>
                                                        <div className="flex gap-2">
                                                             <button className="p-2.5 bg-gray-50 text-gray-400 rounded-xl border border-gray-100"><Edit2 size={14}/></button>
                                                             <button className="p-2.5 bg-[#214a32] text-white rounded-xl"><Plus size={14}/></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Manual Reminders */}
                                            <div className="space-y-6 border-t border-gray-50 pt-10">
                                                <h3 className="text-md font-bold text-[#1e293b]">Manual Reminders</h3>
                                                <div className="grid md:grid-cols-2 gap-8">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">SMS Reminder Template</label>
                                                        <div className="flex gap-2">
                                                            <select className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-[#214a32] focus:outline-none"><option>Select</option></select>
                                                            <button className="p-3 bg-gray-50 text-gray-400 rounded-xl border border-gray-100"><Edit2 size={16}/></button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Reminder Template</label>
                                                        <div className="flex gap-2">
                                                            <select className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-[#214a32] focus:outline-none"><option>Select</option></select>
                                                            <button className="p-3 bg-gray-50 text-gray-400 rounded-xl border border-gray-100"><Edit2 size={16}/></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'working-hours' && (
                                        <div className="space-y-12">
                                            <div className="grid md:grid-cols-[200px_1fr] items-center gap-8">
                                                <label className="text-sm font-bold text-[#1e293b]">Expected Productive Time <span className="text-red-500">*</span></label>
                                                <div className="relative max-w-sm">
                                                    <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-[#214a32] focus:outline-none pr-24" placeholder="08" />
                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-l pl-4 border-gray-200">Hours / Day</span>
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                <h3 className="text-md font-bold text-[#1e293b]">Working Days</h3>
                                                <div className="space-y-4">
                                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                                        <div key={day} className="flex flex-col md:flex-row md:items-center justify-between p-1 bg-white hover:bg-gray-50/50 rounded-2xl transition-colors group">
                                                            <div className="flex items-center gap-4 w-48">
                                                                <Switch defaultChecked={!['Saturday', 'Sunday'].includes(day)} />
                                                                <span className={`text-sm font-bold ${['Saturday', 'Sunday'].includes(day) ? 'text-gray-400' : 'text-[#214a32]'}`}>{day}</span>
                                                            </div>
                                                            <div className="flex items-center gap-4 mt-4 md:mt-0">
                                                                <div className="flex items-center gap-2">
                                                                    <TimeInput defaultValue="09:30 AM" />
                                                                    <span className="text-[11px] font-bold text-gray-300">to</span>
                                                                    <TimeInput defaultValue="09:30 AM" />
                                                                </div>
                                                                <button className="p-2 text-gray-300 hover:text-[#214a32] opacity-0 group-hover:opacity-100 transition-opacity"><Edit2 size={14}/></button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'cancel-reason' && (
                                        <div className="bg-[#f0f9f4]/30 border-2 border-dashed border-[#a4d9bc]/30 rounded-3xl p-16 flex flex-col items-center justify-center text-center">
                                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#214a32] mb-4"><Zap size={24} /></div>
                                            <h3 className="text-lg font-bold text-[#214a32]">Cancellation Engine</h3>
                                            <p className="text-sm text-gray-400 mt-2 max-w-xs font-medium">Define automated reasons for appointment cancellations and manage client notifications.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="p-8 border-t border-gray-50 mt-auto">
                            <p className="text-[13px] text-gray-400 font-medium text-center tracking-tight">2026 Admin Portal • Profile Orchestrator v2.0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-components
function InputField({ label, required, ...props }) {
    return (
        <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#475569] ml-1">{label} {required && <span className="text-red-500">*</span>}</label>
            <input className={`w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-[14px] font-bold text-[#214a32] focus:ring-4 focus:ring-[#a4d9bc]/10 focus:border-[#a4d9bc] focus:outline-none transition-all ${props.readOnly ? 'opacity-60 cursor-not-allowed' : ''}`} {...props} />
        </div>
    );
}

function Switch({ checked, onChange }) {
    return (
        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
            <div className="w-12 h-6.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-[#214a32]"></div>
        </label>
    );
}

function ActivityItem({ icon: Icon, color, text, time }) {
    return (
        <div className="flex gap-4 group">
            <div className={`w-10 h-10 rounded-xl bg-${color}-50 text-${color}-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon size={18} />
            </div>
            <div>
                <p className="text-[12px] font-bold text-gray-700 leading-tight">{text}</p>
                <p className="text-[10px] text-gray-400 font-medium mt-1">{time}</p>
            </div>
        </div>
    );
}

function ReminderToggle({ label, defaultChecked }) {
    return (
        <label className="flex items-center justify-between p-1 cursor-pointer group">
            <span className="text-sm font-semibold text-gray-600 group-hover:text-[#214a32] transition-colors">{label}</span>
            <Switch defaultChecked={defaultChecked} />
        </label>
    );
}

function TimeInput({ defaultValue }) {
    return (
        <div className="relative">
            <input type="text" defaultValue={defaultValue} className="w-[120px] bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-[12px] font-bold text-[#214a32] focus:outline-none pr-8" />
            <Clock size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
        </div>
    );
}

function Plus({ size, className }) {
    return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
}

