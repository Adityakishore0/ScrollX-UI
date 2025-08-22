import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-satoshi)", "var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
      animation: {
        "rockets-effect": "rockets-path var(--duration) ease-in-out infinite",
        "scroll-up": "scroll-up-smooth linear infinite",
        "scroll-down": "scroll-down-smooth linear infinite",
        tilt: "tilt 10s infinite linear",
        "glow-border": "glow-border 1.5s infinite alternate",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        typing: "typing 2s steps(10, end) infinite",
        shine: "shine 5s linear infinite",
        // Toast animations
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-in",
        "slide-out-left": "slide-out-left 0.3s ease-in",
        "canopy-horizontal": "canopy-x var(--duration) infinite linear",
        "canopy-vertical": "canopy-y var(--duration) linear infinite",
        "shake-smooth": "shake-smooth 0.5s ease-in-out",
      },
      keyframes: {
        "scroll-up-smooth": {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "scroll-down-smooth": {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0%)" },
        },
        tilt: {
          "0%, 50%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(1deg)" },
          "75%": { transform: "rotate(-1deg)" },
        },
        "glow-border": {
          "0%": {
            boxShadow:
              "0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary))",
          },
          "100%": {
            boxShadow:
              "0 0 20px hsl(var(--primary)), 0 0 30px hsl(var(--primary))",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        typing: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
        shine: {
          "0%": { backgroundPosition: "100%" },
          "100%": { backgroundPosition: "-100%" },
        },
        // Toast slide animations
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        "slide-out-left": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-100%)", opacity: "0" },
        },
        "canopy-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "canopy-y": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "shake-smooth": {
          "0%": { transform: "translateX(0)" },
          "10%": { transform: "translateX(-12px)" },
          "20%": { transform: "translateX(12px)" },
          "30%": { transform: "translateX(-10px)" },
          "40%": { transform: "translateX(10px)" },
          "50%": { transform: "translateX(-6px)" },
          "60%": { transform: "translateX(6px)" },
          "70%": { transform: "translateX(-3px)" },
          "80%": { transform: "translateX(3px)" },
          "90%": { transform: "translateX(-1px)" },
          "100%": { transform: "translateX(0)" },
        },
        "rockets-path": {
          "0%": {
            transform: "translate(0, 0) rotate(var(--angle))",
            opacity: "1",
          },
          "40%": {
            transform: "translate(var(--x), -300px) rotate(var(--angle))",
            opacity: "1",
          },
          "60%": {
            transform: "translate(var(--x), -350px) rotate(var(--angle))",
            opacity: "0.8",
          },

          "100%": {
            transform:
              "translate(var(--x), 0) rotate(calc(var(--angle) + 180deg))",
            opacity: "0",
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            ":not(pre) > code": {
              backgroundColor: "rgb(30, 30, 30)",
              color: "white",
              borderRadius: "0.25rem",
              padding: "0.2em 0.4em",
              fontWeight: "400",
            },
            ":not(pre) > code::before": {
              content: '""',
            },
            ":not(pre) > code::after": {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            ":not(pre) > code": {
              backgroundColor: "rgb(30, 30, 30)",
              color: "white",
            },
            ":not(pre) > code::before": {
              content: '""',
            },
            ":not(pre) > code::after": {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    typography,
    // Add toast-specific base styles with proper typing
    function ({ addBase }: PluginAPI) {
      addBase({
        ".toast-base": {
          "touch-action": "none",
          "user-select": "none",
          "-webkit-user-select": "none",
        },
      });
    },
  ],
};

export default config satisfies Config;
