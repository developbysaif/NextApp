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
    ChevronLeft
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
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
            {!isSidebarOpen && window.innerWidth < 1024 && (
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
                            <div className="w-5 h-2 bg-[#FFD166] rounded-t-full group-hover:scale-110 transition-transform"></div>
                            <div className="w-5 h-2 bg-[#B4E567] rounded-b-full group-hover:scale-110 transition-transform"></div>
                        </div>
                        {isSidebarOpen && (
                            <span className="text-xl font-black text-gray-900 tracking-tighter uppercase italic">Nutrigo</span>
                        )}
                    </Link>
                    {isSidebarOpen && window.innerWidth < 1024 && (
                        <button onClick={() => setIsSidebarOpen(false)} className="text-gray-300 hover:text-gray-900">
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
                                    flex items-center gap-4 transition-all group py-3 px-4 rounded-2xl
                                    ${isActive 
                                        ? 'bg-[#B4E567] text-[#1a3a25] shadow-lg shadow-[#B4E567]/20' 
                                        : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}
                                `}
                                onClick={() => { if (window.innerWidth < 1024) setIsSidebarOpen(false) }}
                            >
                                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-[#1a3a25]' : 'group-hover:scale-110 transition-transform'} />
                                {isSidebarOpen && (
                                    <span className={`text-[13px] font-bold tracking-tight ${isActive ? 'text-[#1a3a25]' : 'text-gray-500'}`}>
                                        {item.name}
                                    </span>
                                )}
                                {isActive && !isSidebarOpen && (
                                    <div className="absolute left-0 w-1.5 h-6 bg-[#B4E567] rounded-r-full"></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto px-3 pt-6 border-t border-gray-50">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 py-3 px-4 text-gray-400 hover:text-[#FF9F43] transition-all rounded-2xl hover:bg-orange-50 group"
                    >
                        <LogOut size={20} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                        {isSidebarOpen && <span className="text-[13px] font-bold">Logout</span>}
                    </button>
                    
                    {user && isSidebarOpen && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-[2rem] flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#B4E567]/20 text-[#21492f] flex items-center justify-center text-sm font-black uppercase">
                                {user.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 truncate">
                                <p className="text-[11px] font-black text-gray-900 truncate leading-none mb-1">{user.name}</p>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Pro Member</p>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                {/* Mobile Header (Sticky) */}
                <div className="lg:hidden p-4 bg-white flex items-center justify-between sticky top-0 z-[100] border-b border-gray-100">
                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={22} />
                        </button>
                        <span className="text-sm font-black text-gray-900 uppercase tracking-widest italic tracking-tighter">Nutrigo</span>
                    </div>
                </div>

                <div className="max-w-[1600px] mx-auto min-h-screen">
                    {children}
                </div>
            </main>
        </div>
    );
}
