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
        // Universal Portal, Inventory, Clinicians, User Directory, Revenue Wall, Disease Database, Analytics removed as per request
        // { name: 'Universal Portal', icon: Globe, path: '/admin/portal' },
        // { name: 'Ecommerce', icon: ShoppingBag, path: '/admin/orders' },
        // { name: 'Inventory', icon: Package, path: '/admin/products' },
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
        // { name: 'Clinicians', icon: ShieldCheck, path: '/admin/doctors' },
        // { name: 'User Directory', icon: Users, path: '/admin/users' },
        // { name: 'Revenue Wall', icon: DollarSign, path: '/admin/revenue' },
        // { name: 'Disease Database', icon: ShieldCheck, path: '/admin/diseases' },
        { name: 'Exercises', icon: Dumbbell, path: '/admin/exercises' },
        // { name: 'Analytics', icon: BarChart3, path: '/admin/reports' },
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a4d9bc]"></div>
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
                    {/* Circle logo removed as per request */}
                    {isSidebarOpen && (
                        <span className="font-black text-xl tracking-tight text-[#214a32] uppercase italic">
                            IlajBilGhiza
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
                                            ${isActive ? 'bg-[#a4d9bc] text-[#214a32]' : 'text-gray-500 hover:text-[#214a32]'}
                                            ${!isSidebarOpen ? 'justify-center px-0' : ''}
                                        `}
                                    >
                                        <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                        {isSidebarOpen && (
                                            <>
                                                <span className="text-[13px] tracking-wide flex-1 text-left font-bold">{item.name}</span>
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
                                                    ${isChildActive ? 'bg-[#a4d9bc] text-[#214a32] shadow-sm' : 'text-gray-400 hover:text-[#214a32]'}
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
                                        ? 'bg-[#a4d9bc] text-[#214a32] shadow-sm'
                                        : 'text-gray-500 hover:text-[#214a32]'}
                                    ${!isSidebarOpen ? 'justify-center px-0' : ''}
                                `}
                            >
                                <item.icon size={18} className={`${isActive ? 'text-[#214a32]' : 'group-hover:text-[#214a32]'} shrink-0`} strokeWidth={isActive ? 2.5 : 2} />
                                {isSidebarOpen && <span className="text-[13px] tracking-wide font-bold">{item.name}</span>}
                            </Link>
                        );
                    })}

                    {/* Promo Widget (Color Updated) */}
                    {isSidebarOpen && (
                        <div className="mt-8 mb-4 bg-[#989a69] rounded-[1.5rem] p-5 text-white shadow-sm mx-2 relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="text-xs font-black uppercase tracking-widest mb-1 opacity-80">System Stats</h4>
                                <p className="text-[11px] font-bold leading-tight">Everything is running optimally today.</p>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Bottom Profile */}
                <div className={`mt-auto p-4 border-t border-gray-100 flex items-center gap-3 ${!isSidebarOpen ? 'justify-center' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-[#a4d9bc] text-[#214a32] flex items-center justify-center font-bold shadow-sm">
                        {currentUser?.name?.charAt(0) || 'A'}
                    </div>
                    {isSidebarOpen && (
                        <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-gray-900 truncate">{currentUser?.name || 'Administrator'}</h4>
                            <p className="text-[10px] text-gray-400 font-medium">Main Admin Portal</p>
                        </div>
                    )}
                    {isSidebarOpen && (
                        <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                            <LogOut size={18} />
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto no-scrollbar relative p-4 lg:p-8 bg-white/50">
                {children}

                {/* Mobile Overlay */}
                {isMobile && isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </main>
        </div>
    );
}
