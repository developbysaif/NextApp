"use client";
import { usePathname } from 'next/navigation';
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    // Check if the current path is part of the admin/dashboard panel or an auth page
    const isAuthPage = pathname === '/login' || pathname === '/signup';
    const isPanel = pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard') || isAuthPage;

    return (
        <>
            {/* Show Navbar globally unless it's a panel, BUT user might want Navbar in panel? 
          Usually admin panels have their own headers. 
          The previous layouts had 'pt-[var(--header-height)]' causing a gap if Navbar is missing.
          If I hide Navbar, I must ensure AdminLayout handles the top spacing or has its own header.
          AdminLayout HAS a sidebar with pt-[header-height]. 
          If I remove Navbar, I should remove that padding in AdminLayout.
          For now, I will assume the user wants the standard 'Website' Navbar GONE in Admin/Dashboard. 
          I will later update AdminLayout to remove the padding if needed.
       */}
            {!isPanel && <Navbar />}
            {children}
            {/* Show Footer globally unless it's a panel. In panels, we will inject Footer manually inside the main content area. */}
            {!isPanel && <Footer />}
        </>
    );
}
