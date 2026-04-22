
"use client";
import React from 'react';
import Image from 'next/image';
import { Apple, GraduationCap, Dumbbell, ClipboardList, Baby, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: "NUTRITION STRATEGIES",
    desc: "Morbi porta dolor quis sem ultricies max imus Nunc accumsan",
    icon: <Apple size={24} />,
    side: 'left'
  },
  {
    title: "REGULAR CONSULTINGS",
    desc: "Morbi porta dolor quis sem ultricies max imus Nunc accumsan",
    icon: <GraduationCap size={24} />,
    side: 'left'
  },
  {
    title: "HEALTHY TRAININGS",
    desc: "Morbi porta dolor quis sem ultricies max imus Nunc accumsan",
    icon: <Dumbbell size={24} />,
    side: 'left'
  },
  {
    title: "NUTRITION PLANS",
    desc: "Morbi porta dolor quis sem ultricies max imus Nunc accumsan",
    icon: <ClipboardList size={24} />,
    side: 'right'
  },
  {
    title: "CHILD NUTRITION",
    desc: "Morbi porta dolor quis sem ultricies max imus Nunc accumsan",
    icon: <Baby size={24} />,
    side: 'right'
  },
  {
    title: "SPORTS NUTRITIONIST",
    desc: "Morbi porta dolor quis sem ultricies max imus Nunc accumsan",
    icon: <Trophy size={24} />,
    side: 'right'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24 px-6 relative overflow-hidden">
      
      {/* Badge & Title */}
      <div className="text-center mb-16 relative z-10">
        <span className="bg-[#f4f5ee] text-[#214a32] font-black uppercase tracking-[0.4em] text-[10px] px-4 py-1.5 rounded-full border border-[#f4f5ee] shadow-sm mb-4 inline-block">
          Our Benefits
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#214a32] uppercase tracking-tighter">
          Why People Choose Us
        </h2>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-0 relative z-10">
        
        {/* Left Side Features */}
        <div className="flex-1 space-y-16">
          {features.filter(f => f.side === 'left').map((feature, idx) => (
            <motion.div 
               key={idx} 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: idx * 0.1 }}
               viewport={{ once: true }}
               className="flex items-center lg:items-start text-center lg:text-right flex-col lg:flex-row gap-6 group"
            >
              <div className="flex-1 order-2 lg:order-1">
                <h3 className="text-lg md:text-xl font-black text-[#214a32] uppercase tracking-tight mb-2 group-hover:text-[#214a32] transition-colors">{feature.title}</h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-sm ml-auto">{feature.desc}</p>
              </div>
              <div className="w-16 h-16 bg-[#ff9900] rounded-full flex items-center justify-center text-white shrink-0 shadow-[0_15px_30px_rgba(255,153,0,0.3)] order-1 lg:order-2 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center Image: Salad Bowl */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
           viewport={{ once: true }}
           className="flex-1 relative aspect-square max-w-[500px] w-full"
        >
          <Image 
            src="/salad_bowl.png" 
            alt="Fresh Salad" 
            fill 
            className="object-contain drop-shadow-[50px_50px_100px_rgba(34,170,79,0.1)]"
            onError={(e) => {
               // Fallback if image not yet at path
               e.target.src = "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop";
            }}
          />
        </motion.div>

        {/* Right Side Features */}
        <div className="flex-1 space-y-16">
          {features.filter(f => f.side === 'right').map((feature, idx) => (
            <motion.div 
               key={idx} 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: idx * 0.1 }}
               viewport={{ once: true }}
               className="flex items-center lg:items-start text-center lg:text-left flex-col lg:flex-row gap-6 group"
            >
              <div className="w-16 h-16 bg-[#ff9900] rounded-full flex items-center justify-center text-white shrink-0 shadow-[0_15px_30px_rgba(255,153,0,0.3)] group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-black text-[#214a32] uppercase tracking-tight mb-2 group-hover:text-[#214a32] transition-colors">{feature.title}</h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
