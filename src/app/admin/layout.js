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
    BarChart3,
    BookOpen,
    DollarSign,
    Calendar,
    Leaf,
    Globe,
    Dumbbell,
    ChevronDown
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

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) {
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
        { name: 'Universal Portal', icon: Globe, path: '/admin/portal' },
        { name: 'Ecommerce', icon: ShoppingBag, path: '/admin/orders' },
        { name: 'Inventory', icon: Package, path: '/admin/products' },
        { name: 'Healthy Menu (Blogs)', icon: BookOpen, path: '/admin/blogs' },
        { 
            name: 'Meal & Diet', 
            icon: Calendar, 
            path: '/admin/meal-plan',
            isParent: true,
            children: [
                { name: 'Meal Plan', path: '/admin/meal-plan' },
                { name: 'Grocery List', path: '/admin/grocery' }
            ]
        },
        { name: 'Clinicians', icon: ShieldCheck, path: '/admin/doctors' },
        { name: 'User Directory', icon: Users, path: '/admin/users' },
        { name: 'Revenue Wall', icon: DollarSign, path: '/admin/revenue' },
        { name: 'Disease Database', icon: ShieldCheck, path: '/admin/diseases' },
        { name: 'Exercises', icon: Dumbbell, path: '/admin/exercises' },
        { name: 'Analytics', icon: BarChart3, path: '/admin/reports' },
    ];

    const [openSubMenus, setOpenSubMenus] = useState(['Meal & Diet']);

    const toggleSubMenu = (name) => {
        setOpenSubMenus(prev => 
            prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
        );
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        router.push('/login');
    };

    if (!isAdmin && pathname !== '/admin/login' && pathname !== '/admin/signup') {
        return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B4E567]"></div>
        </div>;
    }

    if (pathname === '/admin/login' || pathname === '/admin/signup') return children;

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex overflow-hidden font-sans text-gray-800">
            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 bg-[#FDFBF7] transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'w-[240px] translate-x-0' : 'w-20 translate-x-0'}
                    lg:relative flex flex-col pt-4
                `}
            >
                {/* Logo Area */}
                <div className={`px-6 pb-6 flex items-center gap-3 ${!isSidebarOpen ? 'justify-center' : ''}`}>
                    <div className="relative w-7 h-7 flex-shrink-0 flex flex-col overflow-hidden">
                        <div className="w-full h-1/2 bg-[#FFD166] rounded-t-full"></div>
                        <div className="w-full h-1/2 bg-[#B4E567] rounded-b-full"></div>
                    </div>
                    {isSidebarOpen && (
                        <span className="font-bold text-lg tracking-tight text-gray-900">
                            Nutrigo
                        </span>
                    )}
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-4 mt-2 overflow-y-auto w-full no-scrollbar flex flex-col gap-[2px] pb-4">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path || (item.children && item.children.some(c => c.path === pathname));
                        const isSubMenuOpen = openSubMenus.includes(item.name);

                        if (item.isParent) {
                            return (
                                <div key={item.name} className="flex flex-col gap-[2px]">
                                    <button
                                        onClick={() => toggleSubMenu(item.name)}
                                        className={`
                                            flex items-center gap-3 px-3 py-3 rounded-[1.5rem] transition-all group w-full font-medium
                                            ${isActive ? 'bg-[#B4E567] text-gray-900' : 'text-gray-500 hover:text-gray-900'}
                                            ${!isSidebarOpen ? 'justify-center px-0' : ''}
                                        `}
                                    >
                                        <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                        {isSidebarOpen && (
                                            <>
                                                <span className="text-[13px] tracking-wide flex-1 text-left">{item.name}</span>
                                                <ChevronDown size={14} className={`transition-transform ${isSubMenuOpen ? 'rotate-180' : ''}`} />
                                            </>
                                        )}
                                    </button>
                                    {isSidebarOpen && isSubMenuOpen && item.children.map(child => {
                                        const isChildActive = pathname === child.path;
                                        return (
                                            <Link
                                                key={child.path}
                                                href={child.path}
                                                className={`
                                                    ml-8 flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[12px] font-bold transition-all
                                                    ${isChildActive ? 'bg-[#B4E567] text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-900'}
                                                `}
                                            >
                                                {child.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`
                                    flex items-center gap-3 px-3 py-3 rounded-[1.5rem] transition-all group w-full font-medium
                                    ${isActive
                                        ? 'bg-[#B4E567] text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900'}
                                    ${!isSidebarOpen ? 'justify-center px-0' : ''}
                                `}
                            >
                                <item.icon size={18} className={`${isActive ? 'text-gray-900' : 'group-hover:text-gray-900'} shrink-0`} strokeWidth={isActive ? 2.5 : 2} />
                                {isSidebarOpen && <span className="text-[13px] tracking-wide">{item.name}</span>}
                            </Link>
                        );
                    })}

                    {/* Promo Widget (Nutrigo style) */}
                    {isSidebarOpen && (
                        <div className="mt-8 mb-4 bg-[#FFD166] rounded-[1.5rem] p-5 text-gray-900 shadow-sm mx-2 relative overflow-hidden group">
                            <div className="absolute top-1 right-2 p-1 transform rotate-12 group-hover:scale-110 transition-transform">
                                {/* Carrot/Leaf Illustration */}
                                <div className="text-4xl">🥕</div>
                            </div>
                            <p className="text-[11px] text-gray-800 mb-4 mt-16 relative z-10 font-medium pb-2 leading-snug">Start your health journey with a <strong>FREE 1-month</strong> access to Nutrigo!</p>
                            <button className="bg-[#B4E567] text-gray-900 text-[11px] font-bold px-4 py-2.5 rounded-[1rem] transition-all relative z-10 shadow-sm w-[110px] text-center hover:bg-[#a6d85a]">
                                Claim Now!
                            </button>
                        </div>
                    )}
                </nav>

                {/* Logout Button */}
                <div className="p-4 w-full">
                    <button
                        onClick={handleLogout}
                        className={`
                            w-full flex items-center gap-3 px-3 py-3 rounded-[1.5rem] text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium border border-gray-100/50 bg-white shadow-sm
                            ${!isSidebarOpen ? 'justify-center px-0' : ''}
                        `}
                    >
                        <LogOut size={18} className="shrink-0" strokeWidth={2} />
                        {isSidebarOpen && <span className="text-[13px] text-left flex-1">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#FDFBF7]">
                {/* Mobile Top Header (Only visible on mobile) */}
                <div className="lg:hidden h-[72px] bg-[#FDFBF7] flex items-center justify-between px-6 sticky top-0 z-40">
                     <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-gray-500 hover:text-gray-900 bg-white rounded-xl shadow-sm"
                    >
                        <Menu size={20} />
                    </button>
                    <div className="font-bold text-gray-900">NUTRIGO</div>
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto no-scrollbar relative w-full lg:pt-0 pb-10">
                    {children}
                </main>
            </div>

            {/* Mobile Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[45]"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
