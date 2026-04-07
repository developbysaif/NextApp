
"use client";
import React from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, User, PhoneCall, Send } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfa] font-sans">
      
      {/* Premium Image Hero Section */}
      <section className="relative h-[55vh] md:h-[65vh] flex items-start pt-[10vh] justify-center overflow-hidden">
        {/* Background Image Header */}
        <div 
          className="absolute inset-0 z-0 scale-105"
          style={{
            backgroundImage: "url('/hero_exotic_fruit_bowl.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Subtle dark gradient for depth and text legibility, removed white blur */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#21492f]/80 via-[#21492f]/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 w-full max-w-7xl mx-auto flex flex-col items-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 bg-[#6bb300] px-6 py-2.5 rounded-full border border-white/40 mb-6 font-bold text-[10px] uppercase tracking-[0.25em] text-white shadow-xl"
           >
             <PhoneCall size={14} className="text-white" /> 24/7 Availability
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4"
           >
             Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6bb300] to-[#b4e567]">Us</span>
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-white/80 font-black uppercase tracking-[0.4em] text-xs max-w-md mx-auto"
           >
             Nourishing Your Connection with true holistic support
           </motion.p>
        </div>
        
        {/* Image is fully visible now without white blur transition */}
      </section>

      {/* Main Content: Form & Info */}
      <section className="max-w-7xl mx-auto px-6 py-24 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-8 bg-white p-8 md:p-14 rounded-[3.5rem] shadow-2xl border border-gray-100">
            <h2 className="text-3xl font-black text-[#21492f] uppercase tracking-tight mb-10">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-[#f4f5ee] border-none rounded-2xl px-8 py-5 font-bold text-[#21492f] outline-none placeholder:text-gray-400" 
                />
                <input 
                  type="text" 
                  placeholder="Phone Number" 
                  className="w-full bg-[#f4f5ee] border-none rounded-2xl px-8 py-5 font-bold text-[#21492f] outline-none placeholder:text-gray-400" 
                />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-[#f4f5ee] border-none rounded-2xl px-8 py-5 font-bold text-[#21492f] outline-none placeholder:text-gray-400" 
              />
              <input 
                type="text" 
                placeholder="Subject" 
                className="w-full bg-[#f4f5ee] border-none rounded-2xl px-8 py-5 font-bold text-[#21492f] outline-none placeholder:text-gray-400" 
              />
              <textarea 
                placeholder="Your Message" 
                rows={6}
                className="w-full bg-[#f4f5ee] border-none rounded-3xl px-8 py-6 font-bold text-[#21492f] outline-none placeholder:text-gray-400 resize-none" 
              />
              <button 
                className="inline-flex items-center gap-3 bg-[#6bb300] hover:bg-[#5a9600] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-green-900/20 group"
              >
                Submit Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Right Column: Contact Info Card */}
          <div className="lg:col-span-4">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50 space-y-10">
              
              {/* Address */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-[#6bb300] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-black text-[#21492f] uppercase tracking-tight text-lg">Address</h3>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed mt-2">1247/Plot No. 39, 15th Phase, Colony, Kukatpally, Hyderabad</p>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-[#6bb300] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-black text-[#21492f] uppercase tracking-tight text-lg">Call Us</h3>
                  <p className="text-gray-500 font-black text-sm mt-2">+1 123 456 7890</p>
                  <p className="text-gray-500 font-black text-sm">+0 987-654-3210</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-[#6bb300] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-black text-[#21492f] uppercase tracking-tight text-lg">Send a mail</h3>
                  <p className="text-gray-500 font-black text-sm mt-2">info@example.com</p>
                  <p className="text-gray-500 font-black text-sm">ClinicMaster@example.com</p>
                </div>
              </div>

              {/* Opening Time */}
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 bg-[#6bb300] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg group-hover:rotate-6 transition-transform">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-black text-[#21492f] uppercase tracking-tight text-lg">Opening Time</h3>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed mt-2">Mon-Thu: 8:00am-5:00pm</p>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed">Fri: 8:00am-1:00pm</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="bg-[#f4f5ee] py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {[
            { id: '01', title: 'Medical Service', desc: 'It is a long established fact that a reader will be distracted by the readable content of a page.' },
            { id: '02', title: '24/7 Medicines', desc: 'It is a long established fact that a reader will be distracted by the readable content of a page.', active: true },
            { id: '03', title: 'Best Doctor', desc: 'It is a long established fact that a reader will be distracted by the readable content of a page.' },
          ].map((card, idx) => (
            <div 
              key={idx} 
              className={`relative overflow-hidden rounded-[3rem] p-12 transition-all duration-500 ${card.active ? 'bg-[#6bb300] text-white shadow-2xl scale-105 z-10' : 'bg-white text-[#21492f] shadow-xl hover:-translate-y-2'}`}
            >
              <span className={`absolute top-10 right-10 text-8xl font-black opacity-10 ${card.active ? 'text-white' : 'text-gray-200'}`}>{card.id}</span>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-6">{card.title}</h3>
              <p className={`font-medium mb-10 leading-relaxed ${card.active ? 'text-white/80' : 'text-gray-500'}`}>
                {card.desc}
              </p>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${card.active ? 'bg-white text-[#6bb300]' : 'bg-[#6bb300] text-white'}`}>
                <ArrowRight size={24} />
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Google Maps Section */}
      <section className="h-[500px] w-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8272226622837!2d78.3888!3d17.4834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI5JzAwLjAiTiA3OMKwMjMnMTkuNyJF!5e0!3m2!1sen!2sin!4v1625470000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </section>

    </div>
  );
}
