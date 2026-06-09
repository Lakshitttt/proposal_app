import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dusty: "#D9A0A7",
        muted: "#E7B8C4",
        mauve: "#C7A6C9",
        beige: "#F4E7D3",
        paper: "#EADCC8",
        cream: "#FFF8F0",
        wine: "#8B3A4A",
        burgundy: "#7D3948",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        caveat: ["var(--font-caveat)", "cursive"],
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "drift": "drift 20s linear infinite",
        "grain": "grain 0.5s steps(1) infinite",
        "breathe": "breathe 6s ease-in-out infinite",
        "fade-in": "fadeIn 1.2s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "sparkle": "sparkle 2s ease-in-out infinite",
        "heart-burst": "heartBurst 0.6s ease-out forwards",
        "confetti-fall": "confettiFall 3s ease-in forwards",
        "petal-fall": "petalFall 6s ease-in forwards",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        drift: {
          "0%": { transform: "translateX(-10px) translateY(0px)" },
          "33%": { transform: "translateX(10px) translateY(-15px)" },
          "66%": { transform: "translateX(-5px) translateY(10px)" },
          "100%": { transform: "translateX(-10px) translateY(0px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(2%, 3%)" },
          "30%": { transform: "translate(-3%, 2%)" },
          "40%": { transform: "translate(3%, -2%)" },
          "50%": { transform: "translate(-1%, 4%)" },
          "60%": { transform: "translate(1%, -4%)" },
          "70%": { transform: "translate(4%, 1%)" },
          "80%": { transform: "translate(-4%, -1%)" },
          "90%": { transform: "translate(2%, 2%)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.08)", opacity: "0.9" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        heartBurst: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.4)" },
          "100%": { transform: "scale(1.2)" },
        },
        confettiFall: {
          "0%": { transform: "translateY(-20px) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
        petalFall: {
          "0%": { transform: "translateY(-50px) rotate(0deg) translateX(0px)", opacity: "0.8" },
          "50%": { transform: "translateY(50vh) rotate(180deg) translateX(30px)", opacity: "0.6" },
          "100%": { transform: "translateY(110vh) rotate(360deg) translateX(-20px)", opacity: "0" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
