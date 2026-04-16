"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
    LayoutDashboard, 
    Users, 
    Activity, 
    ClipboardList,
    Stethoscope,
    Menu,
    LogOut,
    Search,
    ChevronDown 
} from 'lucide-react';

export default function DoctorLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Assume user object might look different later, just a simple verify
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (currentUser && currentUser.role === 'doctor') {
            setUser(currentUser);
        } else {
            router.push('/login');
        }
    }, [router]);

    const menuItems = [
        { name: 'Dashboard Overview', icon: LayoutDashboard, path: '/doctor' },
        { name: 'Patients', icon: Users, path: '/doctor/patients' },
        { name: 'Diseases & Symptoms', icon: Activity, path: '/doctor/diseases' },
        { name: 'Diet Plans', icon: ClipboardList, path: '/doctor/diet-plans' },
        { name: 'Assign Diet', icon: Stethoscope, path: '/doctor/assign-diet' },
    ];

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        router.push('/');
    };

    if (!user && pathname !== '/doctor/login') {
        return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#125B50]"></div>
        </div>;
    }

    return (
        <div className="h-screen bg-[#FDFBF7] flex overflow-hidden font-sans-serif text-gray-800">
            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 bg-[#FDFBF7] transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'w-[260px] translate-x-0' : 'w-20 translate-x-0'}
                    lg:relative flex flex-col pt-0 border-r border-gray-100 shadow-[2px_0_10px_rgba(0,0,0,0.02)]
                `}
            >
                {/* Logo Area */}
                <div className={`px-6 pb-4 pt-6 flex items-center gap-2 ${!isSidebarOpen ? 'justify-center px-0' : ''}`}>
                    {isSidebarOpen ? (
                        <>
                            <div className="bg-[#125B50] p-2 rounded-xl text-white shadow-md">
                                <Stethoscope size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-[#125B50] text-lg leading-none tracking-tight">DocPortal.</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Clinical Suite</span>
                            </div>
                        </>
                    ) : (
                        <div className="bg-[#125B50] p-2 rounded-xl text-white shadow-md">
                            <Stethoscope size={20} />
                        </div>
                    )}
                </div>

                <div className="px-6 mb-6 mt-2">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-4 overflow-y-auto w-full no-scrollbar flex flex-col gap-1.5 pb-4">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`
                                    flex items-center gap-3 px-3 py-3.5 rounded-[1.2rem] transition-all group w-full font-medium
                                    ${isActive ? 'bg-[#125B50] text-white shadow-md shadow-[#125B50]/20' : 'text-gray-500 hover:text-[#125B50] hover:bg-[#eaf1ef]'}
                                    ${!isSidebarOpen ? 'justify-center px-0' : ''}
                                `}
                                title={!isSidebarOpen ? item.name : ''}
                            >
                                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={!isActive && 'group-hover:scale-110 transition-transform'} />
                                {isSidebarOpen && (
                                    <span className="text-[13px] tracking-wide font-bold">{item.name}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer / Profile Focus */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className={`p-4 rounded-[1.5rem] bg-white border border-gray-100 shadow-sm flex items-center ${isSidebarOpen ? 'gap-3 justify-between' : 'justify-center px-0'}`}>
                        {isSidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="text-[12px] font-black text-gray-900 truncate">Dr. {user?.name?.split(' ')[0] || 'Clinician'}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">Dietetics</p>
                            </div>
                        )}
                        <button onClick={handleLogout} className="p-2 text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors">
                            <LogOut size={16} strokeWidth={2.5}/>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {!isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(true)}
                />
            )}

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-hidden flex flex-col relative bg-[#FDFBF7]">
                {/* Doctor Header */}
                <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-[100] shrink-0">
                    <div className="flex items-center gap-4 flex-1">
                         <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-[#125B50] hover:bg-[#eaf1ef] p-2.5 rounded-xl transition-colors shrink-0">
                            <Menu size={20} />
                        </button>
                        
                        {/* Desktop Search */}
                        <div className="hidden lg:block relative max-w-sm w-full">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 shrink-0" />
                            <input 
                                type="text"
                                placeholder="Search patients or plans..."
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-[1.2rem] py-2.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#125B50]/10 focus:border-[#125B50] focus:bg-white text-gray-700 transition-all placeholder-gray-400"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-4 relative">
                         {/* Notification Bell */}
                         <button className="hidden sm:flex relative p-2.5 text-gray-400 hover:text-[#125B50] hover:bg-gray-50 rounded-xl transition-all">
                             <span className="absolute top-2 right-2.5 size-2 bg-rose-500 rounded-full border-2 border-white"></span>
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                         </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-8 md:p-10 mx-auto w-full max-w-7xl animate-in fade-in duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}
