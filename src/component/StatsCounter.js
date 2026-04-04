"use client";
import React, { useState, useEffect, useRef } from 'react';

const stats = [
  { value: 5, suffix: "K", label: "HAPPY PATIENTS" },
  { value: 76, suffix: "", label: "SPECIALISTS" },
  { value: 18, suffix: "", label: "SPECIALITIES" },
  { value: 24, suffix: "", label: "WINNING AWARDS" },
];

function useCountUp(end, duration = 2000, startCounting) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const increment = end / (duration / 16);
    let raf;

    const step = () => {
      start += increment;
      if (start >= end) {
        setCount(end);
        return;
      }
      setCount(Math.floor(start));
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, startCounting]);

  return count;
}

function CounterItem({ value, suffix, label }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 2000, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center group">
      <span
        className="text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] font-black leading-none text-[#6bb300] tracking-tighter select-none transition-transform duration-500 group-hover:scale-110"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {count}{suffix}
      </span>
      <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.35em] text-[#6bb300]/70 mt-2 md:mt-4">
        {label}
      </span>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-[#f0f3e3] py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
        {stats.map((stat, i) => (
          <CounterItem key={i} {...stat} />
        ))}
      </div>
    </section>
  );
}
