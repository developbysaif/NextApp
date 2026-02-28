import Image from "next/image";

export default function InfoBoxSection({
    icon1,
    title1,
    desc1,
    icon2,
    title2,
    desc2,
    icon3,
    title3,
    desc3,
    icon4,
    title4,
    desc4,
}) {
    const items = [
        { icon: icon1, title: title1, desc: desc1 },
        { icon: icon2, title: title2, desc: desc2 },
        { icon: icon3, title: title3, desc: desc3 },
        { icon: icon4, title: title4, desc: desc4 },
    ];

    return (
        <section className="bg-white py-4 px-2 md:py-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">

                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="group flex flex-col items-center text-center p-3 rounded-xl transition-all duration-300 hover:bg-gray-50"
                    >
                        {/* Icon */}
                        <div className="mb-2 relative transition-transform duration-300 group-hover:scale-105">

                            <div className="absolute inset-0 bg-green-100 rounded-xl rotate-3 group-hover:rotate-6" />

                            <div className="relative bg-white p-2 rounded-xl shadow-sm border border-gray-100">

                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={36}
                                    height={36}
                                    className="w-8 h-8 md:w-9 md:h-9 object-contain"
                                />

                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1 group-hover:text-green-600 transition-colors">
                            {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs md:text-sm text-gray-500 leading-snug font-medium">
                            {item.desc}
                        </p>

                    </div>
                ))}

            </div>
        </section>
    );
}
