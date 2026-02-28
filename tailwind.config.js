/** @type {import('tailwindcss').Config} */
const colors = {
  c1: '#8c8c4f', // Olive
  c2: '#21492f', // Dark Green
  c3: '#22aa4f', // Bright Green
  c4: '#a6763f', // Brown
};

const mapColor = () => ({
  50: '#ffffff', // Lightest shade -> White for better contrast/backgrounds if needed
  100: colors.c1,
  200: colors.c1,
  300: colors.c1,
  400: colors.c4,
  500: colors.c3,
  600: colors.c2,
  700: colors.c2,
  800: colors.c2,
  900: colors.c2,
  950: colors.c2,
});

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff', // CHANGED: Reverted to real white
      black: colors.c2,

      // The 4 Colors
      olive: colors.c1,
      darkgreen: colors.c2,
      green: {
        ...mapColor(),
        DEFAULT: colors.c3,
        500: colors.c3,
        600: colors.c3,
      },
      brown: colors.c4,

      // Semantic - Background is now WHITE
      background: '#ffffff', // CHANGED
      foreground: colors.c2,
      primary: colors.c3,
      secondary: colors.c4,
      destructive: colors.c4,
      muted: '#fcfcfc', // Very light gray/white
      accent: colors.c4,

      // Mapped
      slate: mapColor(),
      gray: mapColor(),
      zinc: mapColor(),
      neutral: mapColor(),
      stone: mapColor(),
      red: mapColor(),
      orange: mapColor(),
      amber: mapColor(),
      yellow: mapColor(),
      lime: mapColor(),
      emerald: mapColor(),
      teal: mapColor(),
      cyan: mapColor(),
      sky: mapColor(),
      blue: mapColor(),
      indigo: mapColor(),
      violet: mapColor(),
      purple: mapColor(),
      fuchsia: mapColor(),
      pink: mapColor(),
      rose: mapColor(),
    },
    extend: {},
  },
  plugins: [],
};
