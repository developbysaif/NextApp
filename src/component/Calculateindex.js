"use client";
import { useState } from "react";
import Image from "next/image";

export default function BMICalculatorExact() {
  const [unit, setUnit] = useState("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (!height || !weight) return;

    let result = 0;
    if (unit === "metric") {
      const h = height / 100;
      result = weight / (h * h);
    } else {
      result = (weight / (height * height)) * 703;
    }
    setBmi(result.toFixed(1));
  };

  return (
    <section className="w-full h-screen flex overflow-hidden">

      {/* LEFT IMAGE */}
      <div className="relative w-1/2 h-full">
        <Image
          src="https://images.unsplash.com/photo-1571019623124-ce9d52f677c3?w=800" // replace with your image
          alt="health"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay fade (slight like screenshot) */}
        <div className="absolute inset-0 bg-white/20"></div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition">
            <span className="text-black text-xl ml-1">▶</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 h-full flex items-center justify-center bg-gradient-to-br from-[#1c2b1a] via-[#142312] to-[#0d1a0d]">
        <div className="w-[420px]">

          {/* Heading */}
          <h1 className="text-white text-[42px] leading-[52px] font-semibold mb-8">
            Calculate Body <br /> Mass Index
          </h1>

          {/* Toggle */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setUnit("metric")}
              className={`px-5 py-1 rounded-md text-sm font-semibold tracking-wide ${
                unit === "metric"
                  ? "bg-lime-400 text-black"
                  : "bg-[#2a3b2a] text-gray-300"
              }`}
            >
              METRIC
            </button>

            <button
              onClick={() => setUnit("imperial")}
              className={`px-5 py-1 rounded-md text-sm font-semibold tracking-wide ${
                unit === "imperial"
                  ? "bg-lime-400 text-black"
                  : "bg-[#2a3b2a] text-gray-300"
              }`}
            >
              IMPERIAL
            </button>
          </div>

          {/* Inputs */}
          <div className="space-y-5 mb-8">
            <div className="flex items-center justify-between border border-[#3a4a3a] rounded-full px-6 py-4 text-gray-300">
              <input
                type="number"
                placeholder="CM"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="bg-transparent outline-none w-full placeholder-gray-500"
              />
              <span className="text-sm">Height</span>
            </div>

            <div className="flex items-center justify-between border border-[#3a4a3a] rounded-full px-6 py-4 text-gray-300">
              <input
                type="number"
                placeholder="KG"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="bg-transparent outline-none w-full placeholder-gray-500"
              />
              <span className="text-sm">Weight</span>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={calculateBMI}
            className="flex items-center justify-between w-[200px] bg-lime-500 hover:bg-lime-600 text-black font-semibold px-6 py-3 rounded-xl transition"
          >
            Calculate
            <span className="bg-white w-8 h-8 flex items-center justify-center rounded-md ml-3">
              →
            </span>
          </button>

          {/* Result */}
          {bmi && (
            <p className="text-white mt-6 text-lg">
              Your BMI: <span className="font-bold">{bmi}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
