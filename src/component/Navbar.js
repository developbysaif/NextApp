"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Search,
    ShoppingCart,
    User,
    Phone,
    Menu,
    X,
    Leaf,
    Heart,
    Facebook,
    Instagram,
    Youtube,
    Linkedin,
    Twitter,
    Mail,
    MapPin,
    Plus,
    ChevronRight,
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { getCartCount } = useCart()
    const { wishlist } = useWishlist()
    const { user, logout } = useAuth()
    const router = useRouter()

    const handleCartClick = (e) => {
        if (!user) {
            e.preventDefault();
            alert("you can signup first to get order");
            router.push('/signup');
        }
    }

    const handleWishlistClick = (e) => {
        if (!user) {
            e.preventDefault();
            alert("you can signup first to get order");
            router.push('/signup');
        }
    }

    const handleLogout = () => {
        logout();
        router.push('/');
        setOpen(false);
    }

    // Handle scroll for sticky effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY || window.pageYOffset
            setIsScrolled(scrollPosition > 90)
        }
        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [open])

    const specialtyItems = [
        { label: "Cardiologist", href: "/cardiologist-insights", description: "Heart health and cardiovascular advice." },
        { label: "Nutritionist", href: "/nutritionist-insights", description: "Dietary guidance and healthy eating." },
        { label: "Dermatologist", href: "/dermatologist-insights", description: "Skin care and dermatological treatments." },
        { label: "Pediatrician", href: "/pediatrician-insights", description: "Children's health and wellness." },
    ]



    const pageItems = [
        { label: "About IlajbilGhiza", href: "/about", description: "Learn about our philosophy and mission." },
        { label: "FAQs", href: "/faqs", description: "Find answers to common questions." },
        { label: "Privacy Policy", href: "/privacy", description: "How we protect your data." },
        { label: "Terms of Service", href: "/terms", description: "Rules of using our platform." },
    ]

    return (
        <header className="w-full z-[100] sticky top-0 bg-white">
            {/* ───────── TOP BAR ───────── */}
            <div className={cn(
                "bg-[#214a32] text-white overflow-hidden transition-[max-height,opacity] duration-300 ease-out hidden md:block border-b border-white/10",
                isScrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100 py-2"
            )}>
                <div className="max-w-[1400px] mx-auto flex justify-between px-4 text-[11px] font-bold">
                    <div className="flex gap-6">
                        <span className="flex items-center gap-2 hover:text-[#214a32] transition-colors cursor-pointer">
                            <Mail className="w-3.5 h-3.5" />info@ilajbilghiza.com
                        </span>
                        <span className="flex items-center gap-2 hover:text-[#214a32] transition-colors cursor-pointer">
                            <MapPin className="w-3.5 h-3.5" /> Organic health center lahore near dawley
                        </span>
                        <span className="flex items-center gap-1.5 text-white">
                            <Phone className="w-3.5 h-3.5" /> +92 3238418438
                        </span>
                    </div>

                    <div className="flex gap-4 items-center justify-start">
                        <div className="flex gap-3 mr-4 border-r border-white/10 pr-4">
                            <Link href="#" className="hover:text-[#214a32] transition-colors"><Facebook size={14} /></Link>
                            <Link href="#" className="hover:text-[#214a32] transition-colors"><Instagram size={14} /></Link>
                            <Link href="#" className="hover:text-[#214a32] transition-colors"><Twitter size={14} /></Link>
                            <Link href="#" className="hover:text-[#214a32] transition-colors"><Linkedin size={14} /></Link>
                            <Link href="#" className="hover:text-[#214a32] transition-colors"><Youtube size={14} /></Link>
                            {/* TikTok SVG */}
                            <Link href="#" className="hover:text-[#214a32] transition-colors">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" /></svg>
                            </Link>
                            {/* Pinterest SVG */}
                            <Link href="#" className="hover:text-[#214a32] transition-colors">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.46 19.38c-.1-1-.19-2.22.04-3.18l1.45-6.14s-.37-.73-.37-1.8c0-1.7 1-2.97 2.2-2.97 1.05 0 1.55.78 1.55 1.72 0 1.05-.67 2.62-1 4.07-.3 1.24.62 2.25 1.84 2.25 2.2 0 3.9-2.33 3.9-5.7 0-2.98-2.14-5.06-5.2-5.06-3.54 0-5.63 2.65-5.63 5.41 0 1.07.41 2.21.93 2.84.1.13.12.24.09.37l-.35 1.43c-.06.24-.19.29-.44.17-1.63-.76-2.65-3.14-2.65-5.05 0-4.11 3-7.89 8.6-7.89 4.52 0 8.03 3.22 8.03 7.53 0 4.49-2.83 8.11-6.76 8.11-1.32 0-2.56-.69-2.98-1.5l-.81 3.1c-.29 1.13-1.08 2.54-1.61 3.4A10 10 0 1 0 12 2z" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ───────── MIDDLE BAR ───────── */}
            <div className={cn(
                "w-full bg-white border-b border-stone-100 transition-shadow duration-300 ease-out",
                isScrolled ? "shadow-md" : ""
            )}>
                <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between gap-3 md:gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group shrink-0">
                        <div className="relative h-14 w-40 md:h-20 md:w-56 hover:scale-105 transition-all duration-300">
                            <Image
                                src="/desk-top.png"
                                alt="Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <NavigationMenu className="w-full max-w-none justify-center">
                            <NavigationMenuList className="flex gap-0 py-1">
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-bold text-stone-600 text-sm hover:text-[#214a32] hover:bg-stone-50 px-2")}>
                                        <Link href="/">Home</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-bold text-stone-600 text-sm hover:text-[#214a32] hover:bg-stone-50 px-2")}>
                                        <Link href="/products">Shop</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-bold text-stone-600 text-sm hover:text-[#214a32] hover:bg-stone-50 px-2")}>
                                        <Link href="/about">About Us</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-bold text-stone-600 text-sm hover:text-[#214a32] hover:bg-stone-50 px-2")}>
                                        <Link href="/diseases">Diseases &amp; Treatment</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-bold text-stone-600 text-sm hover:text-[#214a32] hover:bg-stone-50 px-2")}>
                                        <Link href="/diet-plan">Diet Plans</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-bold text-stone-600 text-sm hover:text-[#214a32] hover:bg-stone-50 px-2")}>
                                        <Link href="/exercises">Exercise</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-bold text-stone-600 text-sm hover:text-[#214a32] hover:bg-stone-50 px-2")}>
                                        <Link href="/specialties">Daily Organic Foods</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-bold text-stone-600 text-sm hover:text-[#214a32] hover:bg-stone-50 px-2")}>
                                        <Link href="/Contact">Contact Us</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-1 md:gap-1.5">
                        {user && (
                            <Link href={user.role === 'admin' ? "/admin" : "/dashboard"} className="size-8 md:size-10 flex items-center justify-center rounded-lg md:rounded-xl bg-gradient-to-r from-[#214a32] via-[#1a7a36] to-[#214a32] text-white border border-transparent shadow-sm group">
                                <span className=" text-[10px] md:text-xs font-black">{user.name?.charAt(0)}</span>
                            </Link>
                        )}
                        <Link href="/wishlist" onClick={handleWishlistClick} className="size-8 md:size-10 flex items-center justify-center rounded-lg md:rounded-xl bg-stone-50 text-stone-600 border border-stone-100 relative group">
                            <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span className="absolute -top-1 -right-1 bg-[#214a32] text-white text-[8px] md:text-[9px] font-black rounded-full min-w-3.5 md:min-w-4 h-3.5 md:h-4 flex items-center justify-center border-2 border-white">
                                {wishlist.length}
                            </span>
                        </Link>
                        <Link href="/cart" onClick={handleCartClick} className="size-8 md:size-10 flex items-center justify-center rounded-lg md:rounded-xl bg-stone-50 text-stone-600 border border-stone-100 relative group">
                            <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span className="absolute -top-1 -right-1 bg-[#214a32] text-white text-[8px] md:text-[9px] font-black rounded-full min-w-3.5 md:min-w-4 h-3.5 md:h-4 flex items-center justify-center border-2 border-white">
                                {getCartCount()}
                            </span>
                        </Link>
                        <button onClick={() => setOpen(!open)} className="md:hidden size-8 md:size-10 flex items-center justify-center rounded-lg md:rounded-xl bg-stone-50 text-stone-600 border border-stone-100 transition-all">
                            {open ? <X className="w-4 h-4 md:w-5 md:h-5" /> : <Menu className="w-4 h-4 md:w-5 md:h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ───────── MOBILE SIDEBAR ───────── */}
            <div className={cn(
                "fixed inset-0 z-[60] bg-stone-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
                open ? "opacity-100" : "opacity-0 pointer-events-none"
            )} onClick={() => setOpen(false)} />

            <aside className={cn(
                "fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-[70] shadow-2xl transition-transform duration-500 md:hidden",
                open ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full p-6">
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-lg font-black tracking-tight text-[#214a32]">Ilajbil<span className="text-[#214a32]">Ghiza</span></span>
                        <X className="w-6 h-6 text-stone-400" onClick={() => setOpen(false)} />
                    </div>
                    <nav className="flex-1 space-y-4">
                        <Link href="/" className="block font-bold text-stone-600" onClick={() => setOpen(false)}>Home</Link>
                        <Link href="/products" className="block font-bold text-stone-600" onClick={() => setOpen(false)}>Organic foods</Link>
                        <Link href="/specialties" className="block font-bold text-stone-600" onClick={() => setOpen(false)}>Daily Organic Foods</Link>
                        <Link href="/diseases" className="block font-bold text-stone-600" onClick={() => setOpen(false)}>Diseases &amp; Treatment</Link>
                        <Link href="/exercises" className="block font-bold text-stone-600" onClick={() => setOpen(false)}>Exercise</Link>

                        <div className="pt-2 border-t border-stone-100">
                            <p className="text-[10px] font-bold text-stone-300 uppercase mb-3">About Us</p>
                            {specialtyItems.map(item => (
                                <Link key={item.href} href={item.href} className="block text-sm font-bold text-stone-500 mb-3" onClick={() => setOpen(false)}>{item.label}</Link>
                            ))}
                        </div>
                        <div className="pt-2 border-t border-stone-100">
                            <p className="text-[10px] font-bold text-stone-300 uppercase mb-3">Company</p>
                            <Link href="/about" className="block text-sm font-bold text-stone-500 mb-3" onClick={() => setOpen(false)}>About Us</Link>
                            <Link href="/Contact" className="block text-sm font-bold text-[#214a32] mb-3" onClick={() => setOpen(false)}>Contact Us</Link>
                            <Link href="/faqs" className="block text-sm font-bold text-stone-500 mb-3" onClick={() => setOpen(false)}>FAQs</Link>
                        </div>
                    </nav>
                    <div className="pt-6 border-t border-stone-100 space-y-3">
                        {user ? (
                            <>
                                <div className="p-4 bg-stone-50 rounded-xl mb-2">
                                    <p className="text-[10px] font-bold text-stone-400 uppercase">Logged in as</p>
                                    <p className="text-sm font-black text-[#214a32]">{user.name}</p>
                                </div>
                                <button onClick={handleLogout} className="w-full py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold text-sm">Sign out</button>
                            </>
                        ) : (
                            <Link href="/login" className="block w-full py-3 bg-[#214a32] text-white text-center rounded-xl font-bold text-sm" onClick={() => setOpen(false)}>Sign in</Link>
                        )}
                    </div>
                </div>
            </aside>
        </header >
    )
}
