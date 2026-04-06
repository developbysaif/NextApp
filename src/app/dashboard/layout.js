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
    User
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Restructured icons to match the image precisely
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

    // Other items that might maintain routing but aren't strictly main icons in the shot
    const extraItems = [
        { name: 'Meal Plan', icon: ClipboardList, path: '/dashboard/meal-plan' },
        { name: 'Shop', icon: Store, path: '/Store' },
        { name: 'Profile', icon: User, path: '/dashboard/profile' },
    ];

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-start font-sans font-medium text-gray-500">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-[150] md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Desktop (Slim) & Mobile (Full) */}
            <aside
                className={`
                    bg-white flex flex-col items-center py-6 transition-all duration-300 z-[200]
                    fixed top-0 left-0 h-full border-r border-gray-100 shadow-[2px_0_10px_rgba(0,0,0,0.02)]
                    ${isSidebarOpen ? 'translate-x-0 w-64 md:w-20' : '-translate-x-full w-64 md:translate-x-0 md:w-20'}
                `}
            >
                {/* Logo Area */}
                <Link href="/" className="mb-10 w-10 h-10 flex flex-col gap-0.5 items-center justify-center">
                    <div className="w-5 h-2.5 bg-[#FFD166] rounded-t-full"></div>
                    <div className="w-5 h-2.5 bg-[#B4E567] rounded-b-full"></div>
                </Link>

                <nav className="flex-1 flex flex-col gap-4 w-full items-center px-4 md:px-0">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path || (pathname === '/dashboard/exercises' && item.path === '/dashboard/grocery'); // Adjust logic as needed, using exact matches
                        const realActive = pathname === item.path; 

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                title={item.name}
                                className={`
                                    flex items-center justify-center transition-all group w-full md:w-12 md:h-12 rounded-[1rem]
                                    ${realActive 
                                        ? 'bg-[#B4E567]/40 text-[#506e1b]' 
                                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}
                                    ${isSidebarOpen && 'justify-start px-6 md:justify-center md:px-0'}
                                `}
                                onClick={() => { if (window.innerWidth < 768) setIsSidebarOpen(false) }}
                            >
                                <item.icon size={20} strokeWidth={realActive ? 2.5 : 2} />
                                {isSidebarOpen && <span className="ml-4 md:hidden text-sm font-semibold">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto w-full flex flex-col items-center px-4 md:px-0 pt-4 border-t border-gray-50">
                     <button
                        onClick={handleLogout}
                        title="Logout"
                        className={`
                            w-full md:w-10 md:h-10 flex items-center justify-center text-gray-400 hover:text-[#FF9F43] transition-colors rounded-xl hover:bg-orange-50
                             ${isSidebarOpen && 'justify-start px-6 md:justify-center md:px-0 py-3'}
                        `}
                    >
                        <LogOut size={20} strokeWidth={2} className="-ml-1" />
                        {isSidebarOpen && <span className="ml-4 md:hidden text-sm font-semibold">Logout</span>}
                    </button>
                    {user && isSidebarOpen && (
                        <div className="md:hidden mt-4 pt-4 border-t border-gray-100 w-full px-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold uppercase">
                                {user.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 truncate">
                                <p className="text-xs font-semibold text-gray-800 truncate">{user.name}</p>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 w-full min-h-screen transition-all duration-300 md:ml-20 overflow-x-hidden">
                <div className="md:hidden p-4 bg-white flex items-center justify-between sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-3">
                        <button
                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={22} />
                        </button>
                        <h2 className="text-base font-bold text-gray-900">
                            {menuItems.find(i => i.path === pathname)?.name || 'Dashboard'}
                        </h2>
                    </div>
                </div>

                <div className="w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
