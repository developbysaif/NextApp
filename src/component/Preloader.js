"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 2500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
        >
          {/* Pulsing glow behind logo */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-60 h-60 rounded-full bg-[#f5c518]"
            style={{ filter: "blur(60px)" }}
          />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="relative z-10"
          >
            <Image
              src="/preloder.gif"
              alt="IlajbilGhiza"
              width={160}
              height={160}
              className="object-contain drop-shadow-lg"
              priority
            />
          </motion.div>

          {/* Progress bar */}
          <div className="relative z-10 mt-10 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="h-full rounded-full bg-gradient-to-r from-[#f5c518] to-[#22aa4f]"
            />
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative z-10 mt-6 text-[#21492f] font-black uppercase tracking-[0.35em] text-[10px]"
          >
            Organic Healing
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
