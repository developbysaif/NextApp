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
    ChevronDown,
    Award,
    Zap,
    Newspaper,
    Ticket,
    User
} from 'lucide-react';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        { name: 'Order Fulfillment', icon: ShoppingBag, path: '/admin/orders' },
        { name: 'Inventory', icon: Package, path: '/admin/products' },
        { name: 'Health Menu', icon: BookOpen, path: '/admin/blogs' },
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
        { name: 'Clinician Registry', icon: ShieldCheck, path: '/admin/doctors' },
        { name: 'User Directory', icon: Users, path: '/admin/users' },
        { name: 'Revenue Wall', icon: DollarSign, path: '/admin/revenue' },
        { name: 'Disease Database', icon: ShieldCheck, path: '/admin/diseases' },
        { name: 'Exercises', icon: Dumbbell, path: '/admin/exercises' },
        { name: 'Ecosystem Report', icon: BarChart3, path: '/admin/reports' },
        { name: 'Appointments', icon: Clock, path: '/admin/appointments' },
        { name: 'System Calendar', icon: Calendar, path: '/admin/calendar' },
        { name: 'Discount Manager', icon: Ticket, path: '/admin/discounts' },
        { name: 'News Archive', icon: Newspaper, path: '/admin/news' },
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
                    ${isSidebarOpen ? 'w-[250px] translate-x-0' : 'w-20 translate-x-0'}
                    lg:relative flex flex-col pt-4 border-r border-[#D1D9CA]/30
                `}
            >
                {/* Logo Area */}
                <div className={`px-6 pb-6 pt-2 flex items-center gap-3 ${!isSidebarOpen ? 'justify-center' : ''}`}>
                    {isSidebarOpen && (
                        <img src="/desk-top.png" alt="IlajBilGhiza Logo" className="h-10 object-contain ml-2 mt-4" />
                    )}
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-4 mt-2 overflow-y-auto w-full no-scrollbar flex flex-col gap-[2px] pb-10">
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
                                                <span className="text-[12px] tracking-wide flex-1 text-left font-bold">{item.name}</span>
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
                                                    ml-8 flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[11px] font-bold transition-all
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
                                key={item.name}
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
                                {isSidebarOpen && <span className="text-[12px] font-bold tracking-wide">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Profile Removed */}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto no-scrollbar relative bg-white/50 flex flex-col h-screen">
                {/* Admin Header */}
                <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-[100]">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="text-gray-900 lg:hidden">
                            <Menu size={24} />
                        </button>
                    </div>

                    <div className="lg:hidden flex-1 flex justify-center">
                        <img src="/desk-top.png" alt="IlajBilGhiza Logo" className="h-8 object-contain" />
                    </div>

                    <div className="flex justify-end items-center gap-4 relative">
                        {/* Logout Button */}
                        <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                        
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
                                            <p className="text-[13px] font-bold text-gray-800">{currentUser?.name || 'Administrator'}</p>
                                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-0.5">Master Admin</p>
                                        </div>
                                        <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#f0f9f4] hover:text-[#214a32] transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                            <LayoutDashboard size={16} className="text-[#214a32]" /> Dashboard
                                        </Link>
                                        <Link href="/admin/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-[#f0f9f4] hover:text-[#214a32] transition-colors" onClick={() => setIsDropdownOpen(false)}>
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

                <div className="p-4 lg:p-8 flex-1 overflow-y-auto">
                    {children}
                </div>

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

// Fixed missing Clock icon
function Clock(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
