import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        // Custom energy colors
        energy: {
          cyan: "#00f5ff",
          purple: "#a855f7",
          green: "#00ff88",
          navy: "#0d0d2b",
          deep: "#1a0a2e",
          dark: "#000000",
          card: "rgba(255,255,255,0.04)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        "neon-cyan": "0 0 20px rgba(0,245,255,0.4), 0 0 40px rgba(0,245,255,0.2)",
        "neon-purple": "0 0 20px rgba(168,85,247,0.4), 0 0 40px rgba(168,85,247,0.2)",
        "neon-green": "0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.2)",
        "glow-card": "0 8px 32px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.05)",
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
        "pulse-neon": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(0,245,255,0.4)" },
          "50%": { boxShadow: "0 0 24px rgba(0,245,255,0.9), 0 0 48px rgba(0,245,255,0.4)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
      },
      backgroundImage: {
        "galaxy": "radial-gradient(ellipse at top, #1a0a2e 0%, #0d0d2b 40%, #000000 80%)",
        "galaxy-radial": "radial-gradient(ellipse at center, #0d0d2b 0%, #000000 70%)",
        "glow-cyan": "radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)",
        "glow-purple": "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
        "gradient-energy": "linear-gradient(135deg, #00f5ff, #a855f7)",
        "gradient-green": "linear-gradient(135deg, #00ff88, #00f5ff)",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
