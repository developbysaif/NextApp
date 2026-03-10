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
    Mail,
    MapPin,
    Plus,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { getCartCount } = useCart()
    const { user } = useAuth()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (searchQuery.trim()) {
                router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
                setOpen(false) // Close mobile menu if open
            }
        }
    }

    // Handle scroll for sticky effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
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
        { label: "Dermatologist", href: "/blogs/specialty/Dermatologist", description: "Skin care and dermatological treatments." },
        { label: "Pediatrician", href: "/blogs/specialty/Pediatrician", description: "Children's health and wellness." },
    ]



    const pageItems = [
        { label: "About IlajbilGhiza", href: "/about", description: "Learn about our philosophy and mission." },
        { label: "FAQs", href: "/faqs", description: "Find answers to common questions." },
        { label: "Privacy Policy", href: "/privacy", description: "How we protect your data." },
        { label: "Terms of Service", href: "/terms", description: "Rules of using our platform." },
    ]

    return (
        <header className="w-full z-[100] transition-all duration-300 sticky top-0 bg-white">
            {/* ───────── MIDDLE BAR (Logo, Search, Icons) ───────── */}
            <div className={cn(
                "w-full transition-all duration-500 border-b border-stone-50",
                isScrolled ? "py-2 shadow-sm" : "py-4"
            )}>
                <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between gap-12">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group shrink-0">
                        <div className="relative h-14 w-44 hover:scale-105 transition-all duration-300">
                            <Image src="/desk-top.png" alt="Logo" fill className="object-contain" priority />
                        </div>
                    </Link>

                    {/* Centered Search */}
                    <div className="hidden md:flex flex-1 max-w-2xl relative">
                        <input
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="w-full bg-stone-50 rounded-lg border border-stone-200 px-5 py-2.5 pr-12 focus:outline-none focus:border-[#22aa4f] transition-all text-sm font-medium"
                        />
                        <button onClick={handleSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-6">
                        <Link href={user ? (user.role === 'admin' ? "/admin" : "/dashboard") : "/login"} className="text-gray-600 hover:text-[#22aa4f] transition-colors">
                            <User className="w-6 h-6" />
                        </Link>
                        <Link href="/cart" className="text-gray-600 hover:text-[#22aa4f] transition-colors relative">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute -top-2 -right-2 bg-[#22aa4f] text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center">
                                {getCartCount()}
                            </span>
                        </Link>
                        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-600">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ───────── DESKTOP NAV (Bottom Row) ───────── */}
            <div className="bg-white hidden md:block border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-6">
                    <nav className="flex items-center gap-10 py-3">
                        <Link href="/products" className="text-xs font-bold text-gray-700 hover:text-[#22aa4f] transition-colors uppercase tracking-tight">Shop All</Link>

                        <div className="group relative">
                            <button className="text-xs font-bold text-gray-700 hover:text-[#22aa4f] transition-colors uppercase tracking-tight flex items-center gap-1">
                                Categories <ChevronRight className="w-3 h-3 rotate-90" />
                            </button>
                            <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-xl rounded-lg border border-stone-100 p-4 w-48 z-50">
                                {specialtyItems.map(item => (
                                    <Link key={item.href} href={item.href} className="block py-2 text-xs font-bold text-gray-600 hover:text-[#22aa4f]">{item.label}</Link>
                                ))}
                            </div>
                        </div>

                        <Link href="/offers" className="text-xs font-bold text-gray-700 hover:text-[#22aa4f] transition-colors uppercase tracking-tight">Offers</Link>

                        <div className="group relative">
                            <button className="text-xs font-bold text-gray-700 hover:text-[#22aa4f] transition-colors uppercase tracking-tight flex items-center gap-1">
                                Blog <ChevronRight className="w-3 h-3 rotate-90" />
                            </button>
                        </div>

                        <Link href="/about" className="text-xs font-bold text-gray-700 hover:text-[#22aa4f] transition-colors uppercase tracking-tight">About Us</Link>
                        <Link href="/contact" className="text-xs font-bold text-gray-700 hover:text-[#22aa4f] transition-colors uppercase tracking-tight">Support</Link>
                        <Link href="/more" className="text-xs font-bold text-gray-700 hover:text-[#22aa4f] transition-colors uppercase tracking-tight">More</Link>
                    </nav>
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
                        <span className="text-lg font-black tracking-tight text-[#21492f]">Ilajbil<span className="text-[#22aa4f]">Ghiza</span></span>
                        <X className="w-6 h-6 text-stone-400" onClick={() => setOpen(false)} />
                    </div>
                    <nav className="flex-1 space-y-4">
                        <Link href="/" className="block font-bold text-stone-600" onClick={() => setOpen(false)}>Home</Link>
                        <Link href="/products" className="block font-bold text-stone-600" onClick={() => setOpen(false)}>Organic foods</Link>
                        <Link href="/diseases" className="block font-bold text-stone-600" onClick={() => setOpen(false)}>Diseases &amp; Treatment</Link>

                        <div className="pt-2 border-t border-stone-100">
                            <p className="text-[10px] font-bold text-stone-300 uppercase mb-3">Our Doctors</p>
                            {specialtyItems.map(item => (
                                <Link key={item.href} href={item.href} className="block text-sm font-bold text-stone-500 mb-3" onClick={() => setOpen(false)}>{item.label}</Link>
                            ))}
                        </div>
                        <div className="pt-2 border-t border-stone-100">
                            <p className="text-[10px] font-bold text-stone-300 uppercase mb-3">Company</p>
                            <Link href="/about" className="block text-sm font-bold text-stone-500 mb-3" onClick={() => setOpen(false)}>About Us</Link>
                            <Link href="/contact" className="block text-sm font-bold text-[#22aa4f] mb-3" onClick={() => setOpen(false)}>Contact Us</Link>
                            <Link href="/faqs" className="block text-sm font-bold text-stone-500 mb-3" onClick={() => setOpen(false)}>FAQs</Link>
                        </div>
                    </nav>
                    <div className="pt-6 border-t border-stone-100">
                        <Link href="/login" className="block w-full py-3 bg-[#21492f] text-white text-center rounded-xl font-bold text-sm">Sign in</Link>
                    </div>
                </div>
            </aside>
        </header >
    )
}
