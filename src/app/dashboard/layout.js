"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Calendar,
    MessageSquare,
    Utensils,
    ShoppingCart,
    ClipboardList,
    Notebook,
    TrendingUp,
    Dumbbell,
    LogOut,
    Menu,
    X,
    Heart,
    Store,
    User,
    ChevronLeft,
    Globe
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        { name: 'Calendar', icon: Calendar, path: '/dashboard/calendar' },
        { name: 'Messages', icon: MessageSquare, path: '/dashboard/messages' },
        { name: 'Healthy Menu', icon: Utensils, path: '/dashboard/menu' },
        { name: 'Grocery List', icon: ShoppingCart, path: '/dashboard/grocery' }, 
        { name: 'Food Diary', icon: Notebook, path: '/dashboard/diary' },
        { name: 'Progress', icon: TrendingUp, path: '/dashboard/progress' },
        { name: 'Exercises', icon: Dumbbell, path: '/dashboard/exercises' },
        { name: 'Health Insights', icon: Heart, path: '/dashboard/insights' },
    ];

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex font-sans font-medium text-gray-500 overflow-x-hidden">
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
                    bg-white flex flex-col py-8 transition-all duration-300 z-[200]
                    fixed top-0 left-0 h-full border-r border-gray-100 shadow-[2px_0_15px_rgba(0,0,0,0.01)]
                    ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Logo Area */}
                <div className="px-6 mb-12 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex flex-col gap-0.5">
                            <div className="w-5 h-2 bg-[#a4d9bc] rounded-t-full group-hover:scale-110 transition-transform shadow-sm"></div>
                            <div className="w-5 h-2 bg-[#214a32] rounded-b-full group-hover:scale-110 transition-transform shadow-sm"></div>
                        </div>
                        {isSidebarOpen && (
                            <img src="/Logo.png" alt="IlajBilGhiza Logo" className="h-10 object-contain ml-2" />
                        )}
                    </Link>
                    {isLoaded && isSidebarOpen && typeof window !== 'undefined' && window.innerWidth < 1024 && (
                        <button onClick={() => setIsSidebarOpen(false)} className="text-gray-300 hover:text-[#214a32]">
                            <ChevronLeft size={20} />
                        </button>
                    )}
                </div>

                <nav className="flex-1 flex flex-col gap-1.5 px-3">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`
                                    flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200
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

                <div className="px-3 mt-auto pt-6 border-t border-gray-50">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3 w-full rounded-2xl text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="text-sm font-bold">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={`
                    flex-1 transition-all duration-300 min-h-screen
                    ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
                `}
            >
                {/* Header (Desktop & Mobile) */}
                <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-[100]">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="text-gray-900 lg:hidden">
                            <Menu size={24} />
                        </button>
                    </div>
                    
                    <div className="lg:hidden flex-1 flex justify-center">
                        <img src="/Logo.png" alt="IlajBilGhiza Logo" className="h-8 object-contain" />
                    </div>

                    <div className="flex justify-end relative">
                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-10 h-10 rounded-full bg-[#f0f9f4] text-[#214a32] flex items-center justify-center font-bold shadow-sm overflow-hidden border-2 border-transparent hover:border-[#a4d9bc] transition-all"
                            >
                                <User size={20} />
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

                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
