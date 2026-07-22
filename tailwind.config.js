/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#009eff",
          dark: "#002f6c",
          hover: "#005a96",
          light: "#e8f4fc",
          accent: "#f58220",
          "accent-hover": "#d96f14"
        },
        region: {
          default: "#9ec5fe",
          hover: "#0072bc",
          border: "#003b8e",
          bg: "#002f6c"
        },
        province: {
          default1: "#28a745",
          default2: "#208838",
          border: "#ffffff"
        }
      },
      fontFamily: {
        title: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"]
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 47, 108, 0.12)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 10px 25px -3px rgba(0, 114, 188, 0.18)"
      }
    }
  },
  plugins: []
};
