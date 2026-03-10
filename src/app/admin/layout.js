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
    Bell,
    Search,
    MessageSquare,
    Settings,
    HelpCircle,
    Plug,
    TicketPercent,
    BarChart3,
    UserCircle,
    BookOpen
} from 'lucide-react';
import Image from 'next/image';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (!user || user.role !== 'admin') {
            if (pathname !== '/admin/login' && pathname !== '/admin/signup') {
                router.push('/admin/login');
            }
        } else {
            setIsAdmin(true);
            setCurrentUser(user);
        }
    }, [pathname]);

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
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { name: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
        { name: 'Products', icon: Package, path: '/admin/products' },
        { name: 'Blog Posts', icon: BookOpen, path: '/admin/blogs' },
        { name: 'Doctors', icon: ShieldCheck, path: '/admin/doctors' },
        { name: 'Customers', icon: Users, path: '/admin/users' },
        { name: 'Reports', icon: BarChart3, path: '/admin/reports' },
        { name: 'Discounts', icon: TicketPercent, path: '/admin/discounts' },
    ];

    const bottomItems = [
        { name: 'Integrations', icon: Plug, path: '/admin/integrations' },
        { name: 'Help', icon: HelpCircle, path: '/admin/help' },
        { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        router.push('/login');
    };

    if (!isAdmin && pathname !== '/admin/login' && pathname !== '/admin/signup') {
        return <div className="min-h-screen bg-[#F4F2EB] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#122A1A]"></div>
        </div>;
    }

    if (pathname === '/admin/login' || pathname === '/admin/signup') return children;

    return (
        <div className="min-h-screen bg-[#F4F2EB] flex overflow-hidden font-sans">
            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 bg-[#122A1A] border-r border-[#122A1A] transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'w-[260px] translate-x-0' : 'w-20 translate-x-0'}
                    lg:relative flex flex-col
                `}
            >
                {/* Logo Area */}
                <div className="p-6 md:p-8 flex items-center gap-3">
                    <div className="w-8 h-8 bg-black/20 rounded-lg flex items-center justify-center flex-shrink-0 text-[#9DAA9D]">
                        <LogOut size={16} /> {/* Placeholder for logo mark */}
                    </div>
                    {isSidebarOpen && (
                        <span className="font-bold text-[13px] tracking-[0.15em] text-[#A5C3A5] uppercase font-sans">
                            ILAJBILGHIZA
                        </span>
                    )}
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto w-full no-scrollbar">
                    <div className="space-y-[2px]">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`
                                        flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group w-full
                                        ${isActive
                                            ? 'bg-black/20 text-[#A5C3A5] shadow-inner border border-white/5'
                                            : 'text-[#6C8472] hover:text-[#A5C3A5] hover:bg-black/10'}
                                        ${!isSidebarOpen ? 'justify-center' : ''}
                                    `}
                                >
                                    <item.icon size={18} className={`${isActive ? 'text-[#A5C3A5]' : 'group-hover:text-[#A5C3A5]'} shrink-0`} strokeWidth={1.5} />
                                    {isSidebarOpen && <span className="font-medium text-[13px] tracking-wide">{item.name}</span>}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="pt-8 space-y-[2px] mt-8 w-full">
                        {bottomItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`
                                    flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group text-[#6C8472] hover:text-[#A5C3A5] hover:bg-black/10 w-full
                                    ${!isSidebarOpen ? 'justify-center' : ''}
                                `}
                            >
                                <item.icon size={18} className="group-hover:text-[#A5C3A5] shrink-0" strokeWidth={1.5} />
                                {isSidebarOpen && <span className="font-medium text-[13px] tracking-wide">{item.name}</span>}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Logout Button */}
                <div className="p-4 w-full">
                    <button
                        onClick={handleLogout}
                        className={`
                            w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-[#EADBB8]/70 hover:bg-black/20 hover:text-[#EADBB8] transition-all group
                            ${!isSidebarOpen ? 'justify-center' : ''}
                        `}
                    >
                        <LogOut size={16} className="shrink-0" strokeWidth={1.5} />
                        {isSidebarOpen && <span className="font-medium text-[13px] tracking-wide text-left flex-1">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F4F2EB]">
                {/* Top Header */}
                <header className="h-[72px] bg-transparent flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40">
                    <div className="flex items-center gap-4 flex-1">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-1.5 text-gray-400 hover:text-black transition-colors"
                        >
                            <Menu size={20} />
                        </button>

                        <div className="relative group w-full max-w-md hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search stock, order, etc"
                                className="w-[300px] bg-[#E9E4DB] border border-transparent rounded-full pl-10 pr-4 py-2 text-[13px] font-medium text-[#203626] focus:bg-white focus:border-[#D1D9CA] transition-all outline-none placeholder:text-gray-400 shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-4 items-center">
                            <button className="relative text-gray-500 hover:text-black transition-colors">
                                <MessageSquare size={18} strokeWidth={1.5} />
                            </button>
                            <button className="relative text-gray-500 hover:text-black transition-colors">
                                <Bell size={18} strokeWidth={1.5} />
                                <span className="absolute top-[2px] right-[2px] w-[5px] h-[5px] bg-[#E15B3A] rounded-full"></span>
                            </button>
                        </div>

                        <div className="h-6 w-[1px] bg-[#D1D9CA] mx-1"></div>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-[13px] font-bold text-[#142A1D] leading-none mb-0.5">{currentUser?.name || 'Saif Kaleem'}</p>
                                <p className="text-[9px] font-bold text-[#8D9F91] uppercase tracking-[0.1em]">Administrator</p>
                            </div>
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#D1D9CA] border border-white/50 shadow-sm flex items-center justify-center">
                                {currentUser?.image ? (
                                    <img src={currentUser.image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Admin" className="w-full h-full object-cover" />
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10 no-scrollbar">
                    <div className="w-full max-w-[1400px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Overlay */}
            {window.innerWidth < 1024 && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[45]"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
