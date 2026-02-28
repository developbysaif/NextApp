import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Leaf } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#21492f] text-white overflow-hidden font-[Poppins]">
            {/* Footer Content */}
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 grid grid-cols-1 md:grid-cols-12 gap-16">

                {/* Column 1: Brand */}
                <div className="md:col-span-5">
                    <Link href="/" className="inline-flex items-center gap-2.5 mb-8 group">
                        <div className="size-12 bg-[#22aa4f] rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12">
                            <Leaf className="text-white" size={24} fill="currentColor" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-white">IlajbilGhiza</h2>
                    </Link>

                    <p className="text-[#f8faf9]/60 text-xl font-bold mb-4 leading-tight italic">
                        Ghiza Se Ilaj, Zindagi Behtar
                    </p>

                    <p className="text-[#f8faf9]/40 text-sm mb-10 leading-relaxed max-w-md">
                        Pakistan ka pehla AI-powered organic nutrition platform jo qudrati foods ke zariye bimariyon ke ilaj aur sehatmand Pakistani lifestyle ko farogh deta hai.
                    </p>

                    <div className="flex space-x-4">
                        {[
                            { i: Facebook, h: "#" },
                            { i: Twitter, h: "#" },
                            { i: Instagram, h: "#" },
                            { i: Linkedin, h: "#" }
                        ].map((social, i) => (
                            <Link key={i} href={social.h} className="size-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#22aa4f] hover:text-white transition-all border border-white/5">
                                <social.i size={20} />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Column 2: Navigation */}
                <div className="md:col-span-3">
                    <h3 className="text-[#22aa4f] font-black uppercase tracking-[0.2em] text-[10px] mb-10">Quick Navigation</h3>
                    <ul className="space-y-4">
                        {[
                            { l: "Organic Foods", h: "/products" },
                            { l: "AI Diet Plans", h: "/diet-plan" },
                            { l: "Doctor Portal", h: "/doctors" },
                            { l: "Health Blogs", h: "/blogs" },
                            { l: "Contact Us", h: "/Contact" }
                        ].map((link, i) => (
                            <li key={i}>
                                <Link href={link.h} className="text-[#f8faf9]/60 hover:text-white font-bold transition-all flex items-center gap-2 group">
                                    <span className="w-0 h-0.5 bg-[#22aa4f] transition-all group-hover:w-4" />
                                    {link.l}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Contact */}
                <div className="md:col-span-4">
                    <h3 className="text-[#22aa4f] font-black uppercase tracking-[0.2em] text-[10px] mb-10">Contact Support</h3>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                <MapPin size={18} className="text-[#22aa4f]" />
                            </div>
                            <div>
                                <p className="text-[#f8faf9]/40 text-[10px] uppercase font-black tracking-widest mb-1">Office Location</p>
                                <p className="text-[#f8faf9]/80 font-bold text-sm">Main Boulevard, Gulberg, Lahore, Pakistan</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                <Phone size={18} className="text-[#22aa4f]" />
                            </div>
                            <div>
                                <p className="text-[#f8faf9]/40 text-[10px] uppercase font-black tracking-widest mb-1">Direct Line</p>
                                <p className="text-[#f8faf9]/80 font-bold text-sm">+92 Support 24/7</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                <Mail size={18} className="text-[#22aa4f]" />
                            </div>
                            <div>
                                <p className="text-[#f8faf9]/40 text-[10px] uppercase font-black tracking-widest mb-1">Email Support</p>
                                <p className="text-[#f8faf9]/80 font-bold text-sm">info@ilajbilghiza.com</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="max-w-7xl mx-auto px-6 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[#f8faf9]/30 text-xs font-black uppercase tracking-widest">
                <div>
                    COPYRIGHTS © {new Date().getFullYear()} <span className="text-[#f8faf9]/50">ILAJBILGHIZA</span> | ALL RIGHTS RESERVED.
                </div>
                <div className="flex gap-8">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
