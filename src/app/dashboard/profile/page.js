"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
    User, Mail, Phone, MapPin, Calendar, Camera, 
    Save, Shield, CheckCircle2, Activity
} from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuth();
    
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '+92 300 0000000',
        dob: '1995-05-15',
        gender: 'Male',
        address: 'Karachi, Pakistan',
        bio: 'I am passionate about natural healing and maintaining a healthy lifestyle through diet.',
        bloodGroup: 'O+',
        height: '5\'10"',
        weight: '75 kg',
        avatar: ''
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setProfileData(prev => ({
                ...prev,
                name: storedUser.name || prev.name,
                email: storedUser.email || prev.email,
                avatar: storedUser.avatar || prev.avatar,
            }));
        } else if (user) {
            setProfileData(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: user.email || prev.email,
                avatar: user.avatar || prev.avatar,
            }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileData(prev => ({ ...prev, avatar: imageUrl }));
        }
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API/DB save
        setTimeout(() => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
            const updatedUser = { 
                ...currentUser, 
                name: profileData.name, 
                email: profileData.email, 
                avatar: profileData.avatar 
            };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            
            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
            
            // Dispatch event to update navbar avatar optionally
            window.dispatchEvent(new Event("storage"));
        }, 1200);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-12">
            {/* Header section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-[#214a32] tracking-tight">Profile Settings</h1>
                    <p className="text-gray-400 text-sm mt-1 font-medium">Manage your personal information and preferences.</p>
                </div>
                <div className="hidden sm:block">
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-[#214a32] hover:bg-[#1a3a27] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : saveSuccess ? (
                            <CheckCircle2 size={20} className="text-emerald-400" />
                        ) : (
                            <Save size={20} />
                        )}
                        <span>{isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Changes'}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Avatar & Quick Info */}
                <div className="space-y-6">
                    {/* Avatar Upload Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 flex flex-col items-center text-center">
                        <div className="relative group mb-6">
                            <div className="w-32 h-32 rounded-full border-4 border-[#FDFBF7] shadow-xl overflow-hidden bg-[#a4d9bc] flex items-center justify-center text-[#214a32] text-4xl font-black">
                                {profileData.avatar ? (
                                    <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'
                                )}
                            </div>
                            
                            <label className="absolute bottom-0 right-0 w-10 h-10 bg-[#214a32] text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-[#1a3a27] hover:scale-110 transition-all border-2 border-white">
                                <Camera size={18} />
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        
                        <h2 className="text-xl font-bold text-gray-800">{profileData.name || 'User Name'}</h2>
                        <p className="text-gray-400 text-sm font-medium mt-1 uppercase tracking-widest px-3 py-1 bg-gray-50 rounded-lg inline-block">Patient Account</p>
                    </div>

                    {/* Security Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Shield size={16} /> Security
                        </h3>
                        <div className="space-y-3">
                            <Link href="/dashboard/profile/change-password" className="block w-full text-left px-4 py-3 rounded-xl border border-gray-100 font-bold text-gray-600 hover:border-[#a4d9bc] hover:bg-[#f0f9f4] hover:text-[#214a32] transition-colors">
                                Change Password
                            </Link>
                            <Link href="/dashboard/profile/two-factor" className="block w-full text-left px-4 py-3 rounded-xl border border-gray-100 font-bold text-gray-600 hover:border-[#a4d9bc] hover:bg-[#f0f9f4] hover:text-[#214a32] transition-colors">
                                Two-Factor Authentication
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Column: Settings Forms */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Basic Info Form */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-50">
                        <h3 className="text-lg font-bold text-[#214a32] mb-6 border-b border-gray-50 pb-4">Personal Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <User size={14} /> Full Name
                                </label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#FDFBF7] border border-gray-200 text-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:border-[#a4d9bc] focus:ring-2 focus:ring-[#a4d9bc]/20 transition-all font-medium"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Mail size={14} /> Email Address
                                </label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#FDFBF7] border border-gray-200 text-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:border-[#a4d9bc] focus:ring-2 focus:ring-[#a4d9bc]/20 transition-all font-medium"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Phone size={14} /> Phone Number
                                </label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#FDFBF7] border border-gray-200 text-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:border-[#a4d9bc] focus:ring-2 focus:ring-[#a4d9bc]/20 transition-all font-medium"
                                    placeholder="+92 300 0000000"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Calendar size={14} /> Date of Birth
                                </label>
                                <input 
                                    type="date" 
                                    name="dob"
                                    value={profileData.dob}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#FDFBF7] border border-gray-200 text-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:border-[#a4d9bc] focus:ring-2 focus:ring-[#a4d9bc]/20 transition-all font-medium"
                                />
                            </div>
                            
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <MapPin size={14} /> Address
                                </label>
                                <input 
                                    type="text" 
                                    name="address"
                                    value={profileData.address}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#FDFBF7] border border-gray-200 text-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:border-[#a4d9bc] focus:ring-2 focus:ring-[#a4d9bc]/20 transition-all font-medium"
                                    placeholder="Your residential address"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    Bio / Health Goals
                                </label>
                                <textarea 
                                    name="bio"
                                    value={profileData.bio}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full bg-[#FDFBF7] border border-gray-200 text-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:border-[#a4d9bc] focus:ring-2 focus:ring-[#a4d9bc]/20 transition-all font-medium resize-none"
                                    placeholder="Tell us about yourself and your health goals..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Vitals & Medical Info */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-50">
                        <h3 className="text-lg font-bold text-[#214a32] mb-6 border-b border-gray-50 pb-4 flex items-center gap-2">
                            <Activity size={20} /> Vitals & Measurements
                        </h3>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-gray-100">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Gender</label>
                                <select 
                                    name="gender" 
                                    value={profileData.gender} 
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border-none text-gray-800 font-bold focus:ring-0 p-0 cursor-pointer"
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            
                            <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-gray-100">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Blood Group</label>
                                <select 
                                    name="bloodGroup" 
                                    value={profileData.bloodGroup} 
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border-none text-gray-800 font-bold focus:ring-0 p-0 cursor-pointer"
                                >
                                    <option>A+</option><option>A-</option>
                                    <option>B+</option><option>B-</option>
                                    <option>O+</option><option>O-</option>
                                    <option>AB+</option><option>AB-</option>
                                </select>
                            </div>

                            <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-gray-100">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Height</label>
                                <input 
                                    type="text" 
                                    name="height" 
                                    value={profileData.height} 
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border-none text-gray-800 font-bold focus:ring-0 p-0"
                                    placeholder="e.g. 5'10&quot;"
                                />
                            </div>

                            <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-gray-100">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Weight</label>
                                <input 
                                    type="text" 
                                    name="weight" 
                                    value={profileData.weight} 
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border-none text-gray-800 font-bold focus:ring-0 p-0"
                                    placeholder="e.g. 75 kg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Save Button */}
                    <div className="sm:hidden pt-4">
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full flex items-center justify-center gap-2 bg-[#214a32] hover:bg-[#1a3a27] text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : saveSuccess ? (
                                <CheckCircle2 size={20} className="text-emerald-400" />
                            ) : (
                                <Save size={20} />
                            )}
                            <span>{isSaving ? 'Saving Changes...' : saveSuccess ? 'Saved Successfully!' : 'Save All Changes'}</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
