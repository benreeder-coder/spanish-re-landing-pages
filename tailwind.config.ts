import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxe: {
          black: "#0A0A0A",
          gold: "#D4AF37",
          cream: "#F5F5DC",
          gray: "#E8E8E8",
          darkGold: "#B8960C",
        },
        brutal: {
          neon: "#39FF14",
          orange: "#FF4500",
        },
        blueprint: {
          deep: "#003366",
          cyan: "#00BFFF",
          light: "#F0F4F8",
          mid: "#1A5276",
        },
        med: {
          terracotta: "#D4735A",
          olive: "#6B7F5F",
          cream: "#F5E6D3",
          navy: "#1F3A5F",
          sand: "#E8D5C0",
        },
        glass: {
          darkBg: "#0A1F1F",
          tealDeep: "#0D4D4D",
          teal: "#1A7A7A",
          amber: "#D4935C",
          amberLight: "#E8B080",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        spaceMono: ["var(--font-space-mono)", "monospace"],
        robotoMono: ["var(--font-roboto-mono)", "monospace"],
        cormorant: ["var(--font-cormorant)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        dmSans: ["var(--font-dm-sans)", "sans-serif"],
        openSans: ["var(--font-open-sans)", "sans-serif"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 147, 92, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 147, 92, 0.8)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
