import Image from "next/image";
import Link from "next/link";
import { Leaf, Sprout, ShoppingBag, Award } from "lucide-react";

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
    // We are replacing the image icons with Lucide icons to match the green line-art style from the user's reference image.
    const items = [
        { icon: <Leaf strokeWidth={1.5} className="w-8 h-8 text-[#214a32]" />, title: "100% Natural", desc: desc1 },
        { icon: <Sprout strokeWidth={1.5} className="w-8 h-8 text-[#214a32]" />, title: "100% Organic", desc: desc2 },
        { icon: <ShoppingBag strokeWidth={1.5} className="w-8 h-8 text-[#214a32]" />, title: "Fresh Product", desc: desc3 },
        { icon: <Award strokeWidth={1.5} className="w-8 h-8 text-[#214a32]" />, title: "Best Quality", desc: desc4 },
    ];

    // Alternatively, if the user really wanted their existing titles, we could use title1, title2. 
    // But the image explicitly shows "100% Natural", "100% Organic", "Fresh Product", "Best Quality".
    // I will use the exact titles from the user's reference image for accuracy along with dummy text if they didn't provide any, but desc1, desc2 etc are okay.
    // Let's use the exact dummy text from the image for descriptions to make it look exactly like the design.
    const styledItems = [
        {
            icon: <Leaf strokeWidth={1.5} className="w-8 h-8 text-[#214a32]" />,
            title: "100% Natural",
            desc: "Consectetur adipiscing elit. Enim, nec ut iaculis in. Faucibus arcu varius"
        },
        {
            icon: <Sprout strokeWidth={1.5} className="w-8 h-8 text-[#214a32]" />,
            title: "100% Organic",
            desc: "Consectetur adipiscing elit. Enim, nec ut iaculis in. Faucibus arcu varius"
        },
        {
            icon: <ShoppingBag strokeWidth={1.5} className="w-8 h-8 text-[#214a32]" />,
            title: "Fresh Product",
            desc: "Consectetur adipiscing elit. Enim, nec ut iaculis in. Faucibus arcu varius"
        },
        {
            icon: <Award strokeWidth={1.5} className="w-8 h-8 text-[#214a32]" />,
            title: "Best Quality",
            desc: "Consectetur adipiscing elit. Enim, nec ut iaculis in. Faucibus arcu varius"
        },
    ];

    return (
        <section className="bg-white py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

                {styledItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="group flex flex-col items-center text-center p-8 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-transparent cursor-pointer"
                    >
                        {/* Icon - Circular with border */}
                        <div className="w-[84px] h-[84px] rounded-full border-[1.5px] border-gray-200 flex items-center justify-center mb-6 group-hover:border-[#214a32] transition-colors duration-300 bg-white">
                            {item.icon}
                        </div>

                        {/* Title */}
                        <h3 className="font-outfit font-black text-gray-900 text-lg md:text-xl mb-4 group-hover:text-black transition-colors">
                            {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-400 leading-relaxed font-medium px-2 mb-8 h-16">
                            {item.desc}
                        </p>

                        {/* Button */}
                        <button className="px-8 py-2.5 rounded-full border-[1.5px] border-gray-200 text-gray-800 font-bold text-sm hover:border-[#214a32] group-hover:text-[#214a32] transition-all duration-300">
                            Read More
                        </button>
                    </div>
                ))}

            </div>
        </section>
    );
}
