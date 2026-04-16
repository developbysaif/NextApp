"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    MessageSquare,
    Utensils,
    TrendingUp,
    LogOut,
    Menu,
    User,
    ChevronLeft,
    Globe,
    Moon,
    Sun,
    Sparkles,
    Hexagon,
    Bell,
    Activity,
    Settings,
    Dumbbell,
    ClipboardList
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if(!isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    useEffect(() => {
        setIsLoaded(true);
        const handleResize = () => {
            if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Profile', icon: User, path: '/dashboard/profile' },
        { name: 'Disease Info', icon: Activity, path: '/dashboard/disease' },
        { name: 'Diet Plan', icon: Utensils, path: '/dashboard/diet-plan' },
        { name: 'Exercises', icon: Dumbbell, path: '/dashboard/exercises' },
        { name: 'Manage Diet', icon: ClipboardList, path: '/dashboard/diet-plan/manage' },
        { name: 'Consultation', icon: MessageSquare, path: '/dashboard/consultation' },
        { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
    ];

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="h-screen bg-[#FDFBF7] flex font-sans font-medium text-gray-500 overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isLoaded && !isSidebarOpen && typeof window !== 'undefined' && window.innerWidth < 1024 && (
                <div
                    className="fixed inset-0 bg-black/5 z-[150] backdrop-blur-[2px]"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    bg-white flex flex-col py-0 transition-all duration-300 z-[200]
                    fixed top-0 left-0 h-full border-r border-gray-100 shadow-[2px_0_15px_rgba(0,0,0,0.01)]
                    ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Logo Area */}
                <div className="px-6 pb-2 pt-2 mb-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        {isSidebarOpen && (
                            <img src="/desk-top.png" alt="IlajBilGhiza Logo" className="h-[4.5rem] object-contain ml-2 mt-0" />
                        )}
                    </Link>
                    {isLoaded && isSidebarOpen && typeof window !== 'undefined' && window.innerWidth < 1024 && (
                        <button onClick={() => setIsSidebarOpen(false)} className="text-gray-300 hover:text-[#214a32]">
                            <ChevronLeft size={20} />
                        </button>
                    )}
                </div>

                <nav className="flex-1 flex flex-col gap-1 px-3">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`
                                    flex items-center gap-4 px-4 py-2.5 rounded-2xl transition-all duration-200
                                    ${isActive 
                                        ? 'bg-[#214a32] text-white shadow-lg shadow-emerald-900/20 font-bold' 
                                        : 'text-gray-400 hover:bg-gray-50 hover:text-[#214a32]'}
                                `}
                            >
                                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                {isSidebarOpen && <span className="text-[13px] tracking-tight font-bold">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom section removed */}
            </aside>

            {/* Main Content */}
            <main
                className={`
                    flex-1 transition-all duration-300 h-full flex flex-col overflow-hidden
                    ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
                `}
            >
                {/* Header (Desktop & Mobile) */}
                <header className="bg-white border-b border-gray-100 px-6 py-2 flex items-center justify-between sticky top-0 z-[100] shrink-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="text-gray-900 lg:hidden">
                            <Menu size={24} />
                        </button>
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-gray-900 hidden lg:flex hover:bg-gray-100 p-2 rounded-xl transition-colors">
                            <Menu size={20} />
                        </button>
                    </div>
                    
                    <div className="lg:hidden flex-1 flex justify-center">
                        <img src="/desk-top.png" alt="IlajBilGhiza Logo" className="h-6 object-contain" />
                    </div>

                    <div className="flex justify-end items-center gap-4 relative">
                        {/* AI Assistance Button */}
                        <button className="hidden md:flex items-center justify-center gap-2 bg-[#208b82] text-white px-4 py-2 rounded-xl text-[13px] font-bold shadow-sm transition-all hover:bg-[#1a756d]">
                            <span>AI Assistance</span>
                            <Sparkles size={14} className="ml-0.5" />
                        </button>
                        
                        {/* Interactive Icons */}
                        <div className="hidden sm:flex items-center gap-2 mr-1">
                            <Link href="/dashboard/profile" className="w-10 h-10 flex items-center justify-center text-[#374151] rounded-full border border-gray-200 transition-all hover:border-gray-300 hover:bg-gray-50 bg-white shadow-sm font-semibold">
                                <Hexagon size={18} strokeWidth={2} />
                            </Link>
                            <button onClick={toggleDarkMode} className="w-10 h-10 flex items-center justify-center text-[#374151] rounded-full border border-gray-200 transition-all hover:border-gray-300 hover:bg-gray-50 bg-white shadow-sm font-semibold">
                                {isDarkMode ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center text-[#374151] rounded-full border border-gray-200 transition-all hover:border-gray-300 hover:bg-gray-50 bg-white shadow-sm relative font-semibold">
                                <Bell size={18} strokeWidth={2} />
                                <span className="absolute top-[8px] right-[10px] w-2.5 h-2.5 bg-[#ff5a1f] border border-white rounded-full"></span>
                            </button>
                        </div>
                        
                        {/* Profile Dropdown */}
                        <div className="relative flex items-center pl-1">
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-10 h-10 rounded-full bg-indigo-50 border border-transparent flex items-center justify-center font-bold shadow-sm overflow-visible hover:border-[#a4d9bc] hover:shadow-md transition-all relative"
                            >
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" className="w-full h-full object-cover rounded-full" />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#10b981] border-2 border-white rounded-full z-10"></div>
                            </button>

                            {isDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 py-2 z-50 overflow-hidden">
                                        <div className="px-4 py-3 border-b border-gray-50 mb-1 bg-[#fdfdfc]">
                                            <p className="text-[13px] font-bold text-gray-800">{user?.name || 'Hello, User'}</p>
                                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-0.5">Patient Profile</p>
                                        </div>
                                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#f0f9f4] hover:text-[#214a32] transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <LayoutDashboard size={16} className="text-[#214a32]" /> Dashboard
                                        </Link>
                                        <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#f0f9f4] hover:text-[#214a32] transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <User size={16} className="text-[#214a32]" /> Edit Profile
                                        </Link>
                                        <Link href="/" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#f0f9f4] hover:text-[#214a32] transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <Globe size={16} className="text-[#214a32]" /> Website
                                        </Link>
                                        <div className="border-t border-gray-50 my-1"></div>
                                        <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
                {isDarkMode && <DarkModeStyles />}
            </main>
        </div>
    );
}

function DarkModeStyles() {
    return (
        <style dangerouslySetInnerHTML={{__html: `
            .dark { color-scheme: dark; }
            .dark body, .dark main { background-color: #121212 !important; color: #e5e5e5 !important; }
            .dark aside, .dark header, .dark .bg-white, .dark .bg-\\[\\#FDFBF7\\] { background-color: #1e1e1e !important; }
            .dark .bg-gray-50, .dark .bg-\\[\\#f0f9f4\\], .dark .bg-indigo-50 { background-color: #2a2a2a !important; }
            .dark .border-gray-50, .dark .border-gray-100, .dark .border-gray-200, .dark .border-\\[\\#D1D9CA\\]\\/30 { border-color: #3f3f46 !important; }
            .dark .text-gray-900, .dark .text-gray-800, .dark .text-\\[\\#214a32\\], .dark .text-gray-700 { color: #f3f4f6 !important; }
            .dark .text-gray-600, .dark .text-gray-500 { color: #d1d5db !important; }
            .dark .text-gray-400 { color: #9ca3af !important; }
            .dark .bg-\\[\\#214a32\\] { background-color: #065f46 !important; color: white !important; }
            .dark input, .dark textarea, .dark select { background-color: #2a2a2a !important; color: white !important; border-color: #3f3f46 !important; }
            .dark .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0,0,0,0.5) !important; }
            .dark a:hover { color: #ffffff !important; }
        `}} />
    );
}
