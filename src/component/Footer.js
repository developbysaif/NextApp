import Link from "next/link";
import { 
    Facebook, 
    Instagram, 
    Linkedin, 
    Mail, 
    MapPin, 
    Phone, 
    Leaf, 
    CheckCircle2, 
    Brain, 
    Stethoscope, 
    Send,
    ArrowRight
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#2d6141] text-white pt-20 pb-10 font-[Outfit]">
            <div className="max-w-7xl mx-auto px-6">
                {/* 1. TOP SECTION (Brand + Trust) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pb-16 border-b border-white/5">
                    <div className="space-y-6">
                        <Link href="/" className="inline-flex items-center group">
                            <img 
                                src="/desk-top.png" 
                                alt="IlajBilGhiza Logo" 
                                className="h-16 md:h-20 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md font-medium">
                            AI-powered nutrition platform helping you treat diseases naturally through qudrati foods and personalized clinical guidance.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 lg:justify-end">
                        {[
                            { label: 'AI Powered', icon: Brain, color: 'text-blue-400' },
                            { label: 'Doctor Approved', icon: Stethoscope, color: 'text-emerald-400' },
                            { label: 'Organic Based', icon: Leaf, color: 'text-[#6bb300]' }
                        ].map((badge, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl group hover:border-[#a4d9bc]/30 transition-all">
                                <badge.icon className={`w-5 h-5 ${badge.color}`} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{badge.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. QUICK LINKS + CONTACT */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 py-16">
                    {/* Columns 1-3: Quick Links */}
                    <div className="lg:col-span-2">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a4d9bc] mb-8">🥗 Services</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'AI Diet Plans', path: '/diet-plan' },
                                { name: 'Disease Treatment', path: '/diseases' },
                                { name: 'Nutrition Guide', path: '/nutritionist-insights' },
                                { name: 'Health Tracking', path: '/dashboard/progress' }
                            ].map(item => (
                                <li key={item.name}>
                                    <Link href={item.path} className="text-sm font-bold text-gray-400 hover:text-white transition-colors">{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a4d9bc] mb-8">📚 Resources</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Health Blogs', path: '/blogs' },
                                { name: 'Diet Tips', path: '/blogs' },
                                { name: 'FAQs', path: '/faqs' },
                                { name: 'Support', path: '/Contact' }
                            ].map(item => (
                                <li key={item.name}>
                                    <Link href={item.path} className="text-sm font-bold text-gray-400 hover:text-white transition-colors">{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a4d9bc] mb-8">👨‍⚕️ Medical</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Find Doctor', path: '/doctors' },
                                { name: 'Consultation', path: '/book-appointment' },
                                { name: 'Symptoms Checker', path: '/health-ai' },
                                { name: 'Disease Library', path: '/diseases' }
                            ].map(item => (
                                <li key={item.name}>
                                    <Link href={item.path} className="text-sm font-bold text-gray-400 hover:text-white transition-colors">{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div className="lg:col-span-3">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8">Get Free Diet Tips 🔥</h4>
                        <p className="text-xs text-gray-400 font-bold mb-6">Join 50,000+ Pakistanis getting natural health tips.</p>
                        <div className="relative group">
                            <input 
                                type="email" 
                                placeholder="Your Email Address" 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#a4d9bc] transition-all"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 size-10 bg-[#a4d9bc] text-[#214a32] rounded-xl flex items-center justify-center hover:bg-white transition-all">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Column 5: Contact */}
                    <div className="lg:col-span-3 space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a4d9bc] mb-8">Contact Us</h4>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <MapPin size={18} className="text-[#a4d9bc]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#a4d9bc] opacity-50 mb-1">Lahore, Pakistan</p>
                                    <p className="text-xs font-bold text-white">Gulberg III, Main Boulevard</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <Phone size={18} className="text-[#a4d9bc]" />
                                </div>
                                <a href="tel:+923000000000" className="block">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#a4d9bc] opacity-50 mb-1">Clickable Support</p>
                                    <p className="text-xs font-bold text-white">+92 (Support Range)</p>
                                </a>
                            </div>
                            <div className="flex gap-4">
                                <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <Mail size={18} className="text-[#a4d9bc]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#a4d9bc] opacity-50 mb-1">Email Support</p>
                                    <p className="text-xs font-bold text-white">info@ilajbilghiza.com</p>
                                </div>
                            </div>
                            <div className="bg-white/10 border border-white/20 p-4 rounded-2xl">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#a4d9bc] text-center">Available 24/7 Support ✅</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. SOCIAL MEDIA & SOCIAL LABELS */}
                <div className="flex flex-wrap justify-center gap-6 py-10 border-t border-white/5">
                    {[
                        { icon: Facebook, label: 'Facebook', color: 'hover:text-[#1877F2]' },
                        { icon: Instagram, label: 'Instagram', color: 'hover:text-[#E4405F]' },
                        { icon: Linkedin, label: 'LinkedIn', color: 'hover:text-[#0A66C2]' }
                    ].map((social, i) => (
                        <Link 
                            key={i} 
                            href="#" 
                            className={`flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 transition-all group ${social.color} hover:bg-white/10`}
                        >
                            <social.icon size={18} className="transition-transform group-hover:scale-110" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{social.label}</span>
                        </Link>
                    ))}
                </div>

                {/* 4. BOTTOM BAR (Legal + Branding) */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-10 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                    <p>© 2026 ILAJBILGHIZA. ALL RIGHTS RESERVED.</p>
                    
                    <div className="flex flex-wrap justify-center gap-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/disclaimer" className="hover:text-[#a4d9bc] transition-colors border-l border-white/10 pl-8 text-white/80">Disclaimer</Link>
                    </div>
                </div>

                {/* Medical Disclaimer Popup Info */}
                <div className="mt-10 p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                    <p className="text-[9px] text-center font-bold text-white/40 uppercase tracking-widest leading-relaxed">
                        Disclaimer: IlajBilGhiza provides nutritional and wellness information for educational purposes. 
                        It is not a substitute for professional medical advice, diagnosis, or treatment. 
                        Always consult with your physician before making medical decisions.
                    </p>
                </div>
            </div>
        </footer>
    );
}
