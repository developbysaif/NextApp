
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide preloader once page is loaded
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 2000); // Minimum 2s for visual impact
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
           exit={{ opacity: 0, y: -100 }}
           transition={{ duration: 0.8, ease: "easeInOut" }}
           className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
        >
           <div className="relative">
              {/* Preloader Image Container */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
                className="w-40 h-40 relative flex items-center justify-center"
              >
                  {/* The User provided image will go here */}
                  <img 
                    src="/preloader.png" // Placeholder for now, user will provide the image
                    alt="Loading..."
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback if image doesn't exist yet
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML += '<div class="w-16 h-16 border-4 border-[#6bb300] border-t-transparent rounded-full animate-spin"></div>';
                    }}
                  />
              </motion.div>

              {/* Progress bar */}
              <div className="mt-8 w-48 h-1 bg-[#f4f5ee] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-[#6bb300]"
                />
              </div>
           </div>
           
           <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="mt-6 text-[#21492f] font-black uppercase tracking-[0.4em] text-[10px]"
           >
             Nourishing Your Life
           </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
