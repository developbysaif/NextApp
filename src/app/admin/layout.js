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
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>;
    }

    if (pathname === '/admin/login' || pathname === '/admin/signup') return children;

    return (
        <div className="min-h-screen bg-[#F8F7F4] flex overflow-hidden font-inter">
            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-100 transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 translate-x-0'}
                    lg:relative
                `}
            >
                <div className="flex flex-col h-full bg-white">
                    {/* Logo Area */}
                    <div className="p-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-200">
                            <ShieldCheck size={24} className="text-white" />
                        </div>
                        {isSidebarOpen && (
                            <span className="font-black text-xl tracking-tight text-[#21492f] uppercase font-outfit">
                                IlajBilGhiza
                            </span>
                        )}
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
                        <div className="space-y-1">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`
                                            flex items-center gap-4 px-4 py-3 rounded-xl transition-all group
                                            ${isActive
                                                ? 'bg-green-600 text-white shadow-xl shadow-green-100 scale-105'
                                                : 'text-gray-400 hover:text-green-600 hover:bg-green-50'}
                                            ${!isSidebarOpen ? 'justify-center' : ''}
                                        `}
                                    >
                                        <item.icon size={22} className={`${isActive ? 'text-white' : 'group-hover:text-green-600'} shrink-0`} />
                                        {isSidebarOpen && <span className="font-semibold text-sm tracking-tight">{item.name}</span>}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="pt-8 space-y-1 border-t border-gray-50 mt-8">
                            {bottomItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`
                                        flex items-center gap-4 px-4 py-3 rounded-xl transition-all group text-gray-400 hover:text-green-600 hover:bg-green-50
                                        ${!isSidebarOpen ? 'justify-center' : ''}
                                    `}
                                >
                                    <item.icon size={22} className="group-hover:text-green-600 shrink-0" />
                                    {isSidebarOpen && <span className="font-semibold text-sm tracking-tight">{item.name}</span>}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-50">
                        <button
                            onClick={handleLogout}
                            className={`
                                w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all group
                                ${!isSidebarOpen ? 'justify-center' : ''}
                            `}
                        >
                            <LogOut size={22} className="shrink-0" />
                            {isSidebarOpen && <span className="font-semibold text-sm tracking-tight">Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-6 flex-1 max-w-2xl">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50"
                        >
                            <Menu size={20} />
                        </button>

                        <div className="relative group flex-1 hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-600 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search stock, order, etc"
                                className="w-full bg-[#F8F7F4] border-transparent rounded-xl pl-12 pr-4 py-2.5 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2.5 relative text-gray-400 hover:bg-gray-50 rounded-xl transition-colors">
                            <MessageSquare size={20} />
                        </button>
                        <button className="p-2.5 relative text-gray-400 hover:bg-gray-50 rounded-xl transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>

                        <div className="h-10 w-px bg-gray-100 mx-2"></div>

                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-[#21492f] leading-none">{currentUser?.name || 'Admin User'}</p>
                                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-1">Administrator</p>
                            </div>
                            <div className="w-10 h-10 bg-green-50 rounded-xl overflow-hidden flex items-center justify-center border border-green-100">
                                {currentUser?.image ? (
                                    <img src={currentUser.image} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <UserCircle size={28} className="text-green-600" />
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8 lg:p-10 no-scrollbar">
                    <div className="max-w-[1600px] mx-auto">
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
