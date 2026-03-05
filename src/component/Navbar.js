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
        { label: "Cardiologist", href: "/blogs/specialty/Cardiologist", description: "Heart health and cardiovascular advice." },
        { label: "Nutritionist", href: "/blogs/specialty/Nutritionist", description: "Dietary guidance and healthy eating." },
        { label: "Dermatologist", href: "/blogs/specialty/Dermatologist", description: "Skin care and dermatological treatments." },
        { label: "Pediatrician", href: "/blogs/specialty/Pediatrician", description: "Children's health and wellness." },
    ]

    const diseaseItems = [
        { label: "Diabetes (Sugar)", href: "/diseases/diabetes", description: "Natural sugar management through specific organic foods." },
        { label: "Blood Pressure", href: "/diseases/blood-pressure", description: "Maintain healthy BP levels with potassium-rich diets." },
        { label: "Obesity (Weight)", href: "/diseases/obesity", description: "Sustainable weight loss using metabolism-boosting ghiza." },
        { label: "Digestive Issues", href: "/diseases/digestion", description: "Heal your gut with fiber and natural probiotics." },
        { label: "Joint Pain", href: "/diseases/joint-pain", description: "Anti-inflammatory foods for bone and joint health." },
        { label: "Weak Immunity", href: "/diseases/immunity", description: "Boost defense system with Vitamin C and natural herbs." },
    ]

    const pageItems = [
        { label: "About IlajbilGhiza", href: "/about", description: "Learn about our philosophy and mission." },
        { label: "FAQs", href: "/faqs", description: "Find answers to common questions." },
        { label: "Privacy Policy", href: "/privacy", description: "How we protect your data." },
        { label: "Terms of Service", href: "/terms", description: "Rules of using our platform." },
    ]

    return (
        <header className="w-full z-[100] transition-all duration-300 sticky top-0">
            {/* ───────── TOP BAR ───────── */}
            <div className="bg-[#21492f] text-white py-2 hidden md:block border-b border-white/10">
                <div className="max-w-5xl mx-auto flex justify-between px-4 text-[11px] font-bold">
                    <div className="flex gap-6">
                        <span className="flex items-center gap-2 hover:text-[#22aa4f] transition-colors cursor-pointer">
                            <Mail className="w-3.5 h-3.5" /> Ilajbilghiza@gmail.com
                        </span>
                        <span className="flex items-center gap-2 hover:text-[#22aa4f] transition-colors cursor-pointer">
                            <MapPin className="w-3.5 h-3.5" /> Organic health center lahore near dawley
                        </span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <span className="flex items-center gap-1.5 text-[#22aa4f]">
                            <Phone className="w-3.5 h-3.5" /> +92 3238418438
                        </span>
                    </div>
                </div>
            </div>

            {/* ───────── MIDDLE BAR ───────── */}
            <div className={cn(
                "w-full bg-white transition-all duration-500 border-b border-stone-100",
                isScrolled ? "py-2 shadow-sm" : "py-3"
            )}>
                <div className="max-w-5xl mx-auto px-4 flex items-center justify-between gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group shrink-0">
                        <div className="relative h-16 w-40 hover:scale-105 transition-all duration-300">
                            <Image src="/desk-top.png" alt="Logo" fill className="object-contain" priority />
                        </div>
                    </Link>

                    {/* Search */}
                    <div className="hidden md:flex flex-1 max-w-lg relative">
                        <input
                            placeholder="Find organic treatment..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="w-full bg-stone-50 rounded-xl border border-stone-200 px-5 py-2.5 pr-12 focus:outline-none focus:border-[#22aa4f] transition-all text-xs font-bold"
                        />
                        <button onClick={handleSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
                            <Search className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-2">
                        <Link href={user ? (user.role === 'admin' ? "/admin" : "/dashboard") : "/login"} className="size-10 flex items-center justify-center rounded-xl bg-stone-50 text-stone-600 border border-stone-100 group">
                            {user ? <span className="text-xs font-black">{user.name?.charAt(0)}</span> : <User className="w-4 h-4" />}
                        </Link>
                        <Link href="/cart" className="size-10 flex items-center justify-center rounded-xl bg-stone-50 text-stone-600 border border-stone-100 relative group">
                            <ShoppingCart className="w-4 h-4" />
                            <span className="absolute -top-1 -right-1 bg-[#21492f] text-white text-[9px] font-black rounded-full min-w-4 h-4 flex items-center justify-center border-2 border-white">
                                {getCartCount()}
                            </span>
                        </Link>
                        <button onClick={() => setOpen(!open)} className="md:hidden size-10 flex items-center justify-center rounded-xl bg-stone-50 text-stone-600 border border-stone-100 transition-all">
                            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ───────── DESKTOP NAV ───────── */}
            <div className="bg-white hidden md:block border-b border-stone-100">
                <div className="max-w-5xl mx-auto">
                    <NavigationMenu className="w-full max-w-none justify-start">
                        <NavigationMenuList className="flex gap-1 py-1">
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-bold text-stone-600 text-xs hover:text-[#22aa4f] hover:bg-stone-50")}>
                                    <Link href="/">Home</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-bold text-stone-600 text-xs hover:text-[#22aa4f] hover:bg-stone-50")}>
                                    <Link href="/products">Organic foods</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent font-bold text-stone-600 text-xs hover:text-[#22aa4f] data-[state=open]:text-[#22aa4f]">
                                    Diseases & treatment
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-2 p-3 bg-white">
                                        {diseaseItems.map((item) => (
                                            <li key={item.href}>
                                                <NavigationMenuLink asChild>
                                                    <Link href={item.href} className="block select-none space-y-1 rounded-lg p-2 leading-none transition-colors hover:bg-stone-50 hover:text-[#22aa4f]">
                                                        <div className="text-xs font-bold text-[#21492f]">{item.label}</div>
                                                        <p className="line-clamp-1 text-[10px] text-stone-400 font-medium">{item.description}</p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent font-bold text-stone-600 text-xs hover:text-[#22aa4f] data-[state=open]:text-[#22aa4f]">
                                    AI & diet
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[200px] gap-1 p-2 bg-white">
                                        <li><Link href="/diet-plan" className="block p-2 text-xs font-bold text-stone-600 hover:text-[#22aa4f]">AI diet planner</Link></li>
                                        <li><Link href="/special-diet" className="block p-2 text-xs font-bold text-stone-600 hover:text-[#22aa4f]">Special diet plans</Link></li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent font-bold text-stone-600 text-xs hover:text-[#22aa4f] data-[state=open]:text-[#22aa4f]">
                                    Our Doctors
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-2 p-3 bg-white">
                                        {specialtyItems.map((item) => (
                                            <li key={item.href}>
                                                <NavigationMenuLink asChild>
                                                    <Link href={item.href} className="block select-none space-y-1 rounded-lg p-2 leading-none transition-colors hover:bg-stone-50 hover:text-[#22aa4f]">
                                                        <div className="text-xs font-bold text-[#21492f]">{item.label}</div>
                                                        <p className="line-clamp-1 text-[10px] text-stone-400 font-medium">{item.description}</p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-bold text-stone-600 text-xs hover:text-[#22aa4f] hover:bg-stone-50")}>
                                    <Link href="/book-appointment">Book appointment</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent font-bold text-stone-600 text-xs hover:text-[#22aa4f] data-[state=open]:text-[#22aa4f]">
                                    About Us
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="flex items-center gap-3 p-3 bg-white w-max">
                                        {pageItems.map((item) => (
                                            <li key={item.href} className="whitespace-nowrap">
                                                <Link href={item.href} className="px-3 py-2 text-xs font-bold text-stone-600 hover:text-[#22aa4f] hover:bg-stone-50 rounded-lg transition-colors">{item.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-bold text-stone-600 text-xs hover:text-[#22aa4f] hover:bg-stone-50")}>
                                    <Link href="/Contact">Contact Us</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
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
                        <div className="pt-2 border-t border-stone-100">
                            <p className="text-[10px] font-bold text-stone-300 uppercase mb-3">Diseases</p>
                            {diseaseItems.slice(0, 4).map(item => (
                                <Link key={item.href} href={item.href} className="block text-sm font-bold text-stone-500 mb-3" onClick={() => setOpen(false)}>{item.label}</Link>
                            ))}
                        </div>
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
