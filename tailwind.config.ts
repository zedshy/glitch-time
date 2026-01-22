import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(0 0% 14.9%)",
        input: "hsl(0 0% 14.9%)",
        ring: "hsl(180 100% 50%)",
        background: "hsl(0 0% 0%)",
        foreground: "hsl(0 0% 100%)",
        primary: {
          DEFAULT: "hsl(180 100% 50%)",
          foreground: "hsl(0 0% 0%)",
        },
        secondary: {
          DEFAULT: "hsl(300 100% 50%)",
          foreground: "hsl(0 0% 100%)",
        },
        accent: {
          DEFAULT: "hsl(180 100% 50%)",
          foreground: "hsl(0 0% 0%)",
        },
        destructive: {
          DEFAULT: "hsl(0 62.8% 30.6%)",
          foreground: "hsl(0 0% 100%)",
        },
        muted: {
          DEFAULT: "hsl(0 0% 14.9%)",
          foreground: "hsl(0 0% 63.9%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 3.9%)",
          foreground: "hsl(0 0% 100%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 3.9%)",
          foreground: "hsl(0 0% 100%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 5px hsl(180 100% 50%), 0 0 10px hsl(180 100% 50%), 0 0 15px hsl(180 100% 50%)" 
          },
          "50%": { 
            boxShadow: "0 0 10px hsl(180 100% 50%), 0 0 20px hsl(180 100% 50%), 0 0 30px hsl(180 100% 50%)" 
          },
        },
        "glow-pulse-magenta": {
          "0%, 100%": { 
            boxShadow: "0 0 5px hsl(300 100% 50%), 0 0 10px hsl(300 100% 50%), 0 0 15px hsl(300 100% 50%)" 
          },
          "50%": { 
            boxShadow: "0 0 10px hsl(300 100% 50%), 0 0 20px hsl(300 100% 50%), 0 0 30px hsl(300 100% 50%)" 
          },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "glitch": {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "glow-pulse-magenta": "glow-pulse-magenta 2s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "glitch": "glitch 0.3s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

