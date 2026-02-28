"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Package,
    LogOut,
    Menu,
    X,
    ShieldCheck,
    Bell
} from 'lucide-react';
import Footer from '@/component/Footer';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Simple admin check
        const user = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (!user || user.role !== 'admin') {
            if (pathname !== '/admin/login' && pathname !== '/admin/signup') {
                router.push('/admin/login');
            }
        } else {
            setIsAdmin(true);
        }
    }, [pathname]);

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
        { name: 'Overview', icon: LayoutDashboard, path: '/admin' },
        { name: 'Doctors', icon: ShieldCheck, path: '/admin/doctors' },
        { name: 'Blogs', icon: Package, path: '/admin/blogs' },
        { name: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
        { name: 'Products', icon: Package, path: '/admin/products' },
        { name: 'Users', icon: Users, path: '/admin/users' },
    ];

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        router.push('/admin/login');
    };

    if (pathname === '/admin/login' || pathname === '/admin/signup') return children;

    return (
        <div className="min-h-screen bg-gray-50 flex items-start">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[150] md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Admin Sidebar */}
            <aside
                className={`
                    bg-[#1A1C1E] text-white flex flex-col transition-all duration-300 z-[40]
                    fixed top-0 left-0 h-full
                    ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72 md:translate-x-0 md:w-20'}
                `}
            >

                <div className="p-6 flex items-center justify-between border-b border-gray-800">
                    <div className={`flex items-center gap-3 ${!isSidebarOpen && 'md:hidden'}`}>
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <ShieldCheck size={20} className="text-white" />
                        </div>
                        <span className="font-black text-lg tracking-tighter uppercase font-outfit">Admin Panel</span>
                    </div>

                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`p-2 hover:bg-gray-800 rounded-xl transition-colors text-gray-400 hover:text-white ${!isSidebarOpen && 'hidden md:block md:mx-auto'}`}
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
                                        ? 'bg-green-600 text-white shadow-xl shadow-green-900/20'
                                        : 'text-gray-500 hover:bg-gray-800 hover:text-white'}
                                    ${!isSidebarOpen && 'md:justify-center md:px-2'}
                                `}
                            >
                                <item.icon size={22} className={`${isActive ? 'text-white' : 'group-hover:text-green-400'} shrink-0`} />
                                <span className={`font-bold text-xs uppercase tracking-[0.2em] whitespace-nowrap ${!isSidebarOpen ? 'md:hidden' : ''}`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-800 pb-24">
                    <button
                        onClick={handleLogout}
                        className={`
                            w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all group
                            ${!isSidebarOpen && 'md:justify-center md:px-2'}
                        `}
                    >
                        <LogOut size={22} className="shrink-0" />
                        <span className={`font-bold text-xs uppercase tracking-[0.2em] whitespace-nowrap ${!isSidebarOpen ? 'md:hidden' : ''}`}>
                            Logout
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 w-full min-h-screen transition-all duration-300 ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}>
                {/* Mobile Menu Toggle (Visible only on mobile) */}
                <div className="md:hidden p-4 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 -ml-2 hover:bg-gray-50 rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-lg font-black font-outfit uppercase tracking-tight text-gray-900">
                            {menuItems.find(i => i.path === pathname)?.name || 'Admin'}
                        </h2>
                    </div>
                </div>

                <div className="p-4 md:p-10">
                    {children}
                </div>
                <div className="p-4 md:p-10">

                </div>
            </main>
        </div >
    );
}
