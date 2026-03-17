import Image from 'next/image';
import Link from 'next/link';

export default function CategoryCard({ title, subtitle, bg, image, href }) {
    // Elegant text color calculation
    const isLightBg = bg === '#ffffff' || bg === '#f8faf9' || bg === '#ffeb3b';
    const textColor = isLightBg ? 'text-[#21492f]' : 'text-white';
    const borderColor = isLightBg ? 'border-[#21492f]/20' : 'border-white/30';

    return (
        <div
            className={`rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-between p-4 sm:p-6 md:p-8 hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-green-900/10 border border-gray-100/50 overflow-hidden relative group`}
            style={{ backgroundColor: bg }}
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>

            <div className={`relative z-10 ${textColor}`}>
                <p className="text-[10px] uppercase tracking-[0.3em] font-black opacity-60 mb-2">{subtitle}</p>
                <h2 className="text-2xl font-black leading-[1.1] mb-6 tracking-tight">
                    {title.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                    ))}
                </h2>
                <Link
                    href={href}
                    className={`inline-block text-[10px] font-black uppercase tracking-widest border-b-2 ${borderColor} pb-1 hover:border-[#22aa4f] hover:text-[#22aa4f] transition-all`}
                >
                    Browse Now
                </Link>
            </div>

            <div className="relative w-28 h-28 flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </div>
        </div>
    );
}
