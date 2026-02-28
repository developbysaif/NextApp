"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    ShoppingBag,
    User,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Leaf
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

import Footer from '@/component/Footer';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
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
        { name: 'My Orders', icon: ShoppingBag, path: '/dashboard/orders' },
        { name: 'Profile', icon: User, path: '/dashboard/profile' },
    ];

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-[#F9FAF7] flex items-start">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[150] md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    bg-white border-r border-gray-100 flex flex-col transition-all duration-300 z-[40]
                    fixed top-0 left-0 h-full
                    ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72 md:translate-x-0 md:w-20'}
                `}
            >
                <div className="p-6 flex items-center justify-between">
                    <div className={`${!isSidebarOpen && 'md:hidden'}`}>
                        {isSidebarOpen && (
                            <Link href="/" className="flex items-center gap-2 group">
                                <Leaf className="size-6 text-green-600" />
                                <span className="font-black text-xl font-outfit text-gray-900 tracking-tight">
                                    DASHBOARD
                                </span>
                            </Link>
                        )}
                    </div>

                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`p-2 hover:bg-gray-50 rounded-xl transition-colors ${!isSidebarOpen && 'hidden md:block md:mx-auto'}`}
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                </div>

                <nav className="flex-1 px-4 space-y-2 mt-8 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`
                                    flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group
                                    ${isActive
                                        ? 'bg-[#2E7D32] text-white shadow-lg shadow-green-900/10'
                                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'}
                                    ${!isSidebarOpen && 'md:justify-center md:px-2'}
                                `}
                            >
                                <item.icon size={22} className={`${isActive ? 'text-white' : 'group-hover:text-[#2E7D32]'} shrink-0`} />
                                <span className={`font-bold text-sm uppercase tracking-widest whitespace-nowrap ${!isSidebarOpen ? 'md:hidden' : ''}`}>
                                    {item.name}
                                </span>
                                {isActive && isSidebarOpen && (
                                    <ChevronRight size={16} className="ml-auto md:block hidden" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto pb-24">
                    <button
                        onClick={handleLogout}
                        className={`
                            w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all group
                            ${!isSidebarOpen && 'md:justify-center md:px-2'}
                        `}
                    >
                        <LogOut size={22} className="shrink-0" />
                        <span className={`font-bold text-sm uppercase tracking-widest whitespace-nowrap ${!isSidebarOpen ? 'md:hidden' : ''}`}>
                            Logout
                        </span>
                    </button>

                    {isSidebarOpen && user && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-[1.5rem] flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#2E7D32] rounded-full flex items-center justify-center text-white font-black shrink-0">
                                {user.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-black uppercase truncate">{user.name}</p>
                                <p className="text-[10px] text-gray-400 truncate font-medium">{user.email}</p>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 w-full min-h-screen transition-all duration-300 ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}>
                <div className="md:hidden p-4 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 -ml-2 hover:bg-gray-50 rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-lg font-black font-outfit uppercase tracking-tight text-gray-900">
                            {menuItems.find(i => i.path === pathname)?.name || 'Dashboard'}
                        </h2>
                    </div>
                </div>
                <div className="p-4 md:p-8">
                    {children}
                </div>
                <div className="p-4 md:p-8">

                </div>
            </main>
        </div>
    );
}
