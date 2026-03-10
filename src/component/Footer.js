import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Leaf } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#1b4329] text-white pt-16 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand & Description */}
                <div className="md:col-span-1">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <span className="text-2xl font-black tracking-tighter">Ilaj Bil <span className="text-[#2ea354]">Ghiza</span></span>
                    </Link>
                    <p className="text-[#f8faf9]/60 text-xs font-medium mb-8 leading-relaxed">
                        Pakistan's first organic store. <br />
                        A curation of nature's best. Brewed with care. <br />
                        Delivered for your health.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2ea354] transition-all">
                            <Facebook size={14} />
                        </Link>
                        <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2ea354] transition-all">
                            <Instagram size={14} />
                        </Link>
                        <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2ea354] transition-all">
                            <Twitter size={14} />
                        </Link>
                        <Link href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#2ea354] transition-all">
                            <Linkedin size={14} />
                        </Link>
                    </div>
                </div>

                {/* Helpful Links */}
                <div>
                    <h3 className="text-sm font-bold mb-6">Helpful Links</h3>
                    <ul className="space-y-3">
                        <li><Link href="/about" className="text-xs text-[#f8faf9]/60 hover:text-white transition-all">About Us</Link></li>
                        <li><Link href="/contact" className="text-xs text-[#f8faf9]/60 hover:text-white transition-all">Help Center</Link></li>
                        <li><Link href="/faqs" className="text-xs text-[#f8faf9]/60 hover:text-white transition-all">Career</Link></li>
                        <li><Link href="/privacy" className="text-xs text-[#f8faf9]/60 hover:text-white transition-all">Investor</Link></li>
                        <li><Link href="/terms" className="text-xs text-[#f8faf9]/60 hover:text-white transition-all">Terms</Link></li>
                    </ul>
                </div>

                {/* Categories - Placeholder to match 4 columns if needed, or more links */}
                <div className="hidden md:block">
                </div>

                {/* Newsletter Signup */}
                <div className="md:col-span-1">
                    <h3 className="text-sm font-bold mb-6">Newsletter Signup</h3>
                    <p className="text-xs text-white opacity-40 mb-2">Private Policy</p>
                    <p className="text-xs text-white opacity-40 mb-4">Terms & Services</p>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Newsletter Signup"
                            className="w-full bg-[#2ea354]/20 border border-white/10 rounded-full py-3 px-6 text-xs text-white placeholder:text-white/30 focus:outline-none"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2ea354] text-white text-[10px] font-bold px-4 py-2 rounded-full">
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/30 font-bold">
                <p>Copyright © 2024 | Ilaj Bil Ghiza | Term & Services</p>
                <div className="flex gap-6">
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms of Services</Link>
                </div>
            </div>
        </footer>
    );
}
