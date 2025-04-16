
import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        // More elegant and refined color palette
        primary: {
          DEFAULT: "#6B4EFF",  // Soft, elegant purple
          light: "#8B75FF",    // Lighter variant
          dark: "#5A3EDB",     // Darker variant
        },
        accent: {
          DEFAULT: "#3BC4A3",  // Sophisticated teal
          light: "#5ED6B5",    // Lighter variant
          dark: "#2AA587",     // Darker variant
        },
        neutral: {
          50: "#F9FAFB",       // Very light gray
          100: "#F3F4F6",      // Light gray
          200: "#E5E7EB",      // Medium light gray
          300: "#D1D5DB",      // Medium gray
          400: "#9CA3AF",      // Gray
          500: "#6B7280",      // Dark gray
          600: "#4B5563",      // Darker gray
          700: "#374151",      // Very dark gray
          800: "#1F2937",      // Almost black
          900: "#111827",      // Deep dark gray
        },
      },
      fontFamily: {
        // Add more elegant font families
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--foreground)',
            a: {
              color: 'var(--primary)',
              '&:hover': {
                color: 'var(--primary-light)',
              },
            },
          },
        },
      },
      backgroundImage: {
        'gradient-elegant': 'linear-gradient(135deg, #6B4EFF 0%, #3BC4A3 100%)',
      },
      boxShadow: {
        'elegant': '0 10px 25px rgba(107, 78, 255, 0.15)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
} satisfies Config
