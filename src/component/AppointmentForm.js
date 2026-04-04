
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { User, Mail, Phone, MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! Your appointment request has been sent.");
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="bg-[#f2f6e9] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Left Side: Image */}
        <motion.div 
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="w-full lg:w-1/2 overflow-hidden rounded-[3rem] shadow-2xl relative aspect-[4/5]"
        >
          {/* Note: In a real app, use the actual image path. For now, referencing a generic or generated image */}
          <Image 
            src="/appointment_hero.png" 
            alt="Healthy Lifestyle" 
            fill 
            className="object-cover" 
            priority
            onError={(e) => {
              // Fallback to a placeholder if the generated image isn't there
              e.target.src = "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1000&auto=format&fit=crop";
            }}
          />
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="w-full lg:w-1/2 bg-white p-8 md:p-14 rounded-[3rem] shadow-xl border border-gray-100"
        >
          <div className="mb-10">
            <h2 className="text-4xl font-black text-[#21492f] uppercase tracking-tighter mb-2">Appointment</h2>
            <p className="text-[#6bb300] font-bold text-sm tracking-widest uppercase">You Can React Us Anytime</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Input */}
            <div className="relative border-b-2 border-gray-100 focus-within:border-[#6bb300] transition-colors pb-2 group">
              <div className="flex items-center gap-4">
                <User className="text-gray-400 group-focus-within:text-[#6bb300] transition-colors" size={20} />
                <input 
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-transparent outline-none py-2 font-bold text-gray-700 placeholder:text-gray-300 placeholder:font-normal"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="relative border-b-2 border-gray-100 focus-within:border-[#6bb300] transition-colors pb-2 group">
              <div className="flex items-center gap-4">
                <Mail className="text-gray-400 group-focus-within:text-[#6bb300] transition-colors" size={20} />
                <input 
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email Address"
                  className="w-full bg-transparent outline-none py-2 font-bold text-gray-700 placeholder:text-gray-300 placeholder:font-normal"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="relative border-b-2 border-gray-100 focus-within:border-[#6bb300] transition-colors pb-2 group">
              <div className="flex items-center gap-4">
                <Phone className="text-gray-400 group-focus-within:text-[#6bb300] transition-colors" size={20} />
                <input 
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full bg-transparent outline-none py-2 font-bold text-gray-700 placeholder:text-gray-300 placeholder:font-normal"
                />
              </div>
            </div>

            {/* Message Input */}
            <div className="relative border-b-2 border-gray-100 focus-within:border-[#6bb300] transition-colors pb-2 group">
              <div className="flex items-start gap-4">
                <MessageSquare className="text-gray-400 group-focus-within:text-[#6bb300] transition-colors mt-2" size={20} />
                <textarea 
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write Message"
                  rows={4}
                  className="w-full bg-transparent outline-none py-2 font-bold text-gray-700 placeholder:text-gray-300 placeholder:font-normal resize-none"
                />
              </div>
            </div>

            {/* Button Container */}
            <div className="pt-6">
                <div className="h-2 w-full bg-[#f2f6e9] rounded-full mb-8 overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-[#6bb300]"
                    />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-[#6bb300] hover:bg-[#5a9600] text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Send Message
                </button>
            </div>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
