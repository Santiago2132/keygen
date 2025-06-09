import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "1rem",
          large: "1.125rem",
        },
        radius: {
          small: "8px",
          medium: "12px",
          large: "16px",
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              50: "#eef6ff",
              100: "#d9eaff",
              200: "#bcdaff",
              300: "#8ec2ff",
              400: "#599eff",
              500: "#3178ff",
              600: "#1a5af8",
              700: "#1546e5",
              800: "#173aba",
              900: "#193693",
              DEFAULT: "#3178ff",
              foreground: "#ffffff"
            },
            secondary: {
              50: "#f4f1ff",
              100: "#ebe5ff",
              200: "#d9ceff",
              300: "#bea6ff",
              400: "#a27aff",
              500: "#8a4eff",
              600: "#7a2ff7",
              700: "#6a1ee0",
              800: "#591db6",
              900: "#4b1c92",
              DEFAULT: "#8a4eff",
              foreground: "#ffffff"
            }
          }
        },
        dark: {
          colors: {
            primary: {
              50: "#173aba",
              100: "#1546e5",
              200: "#1a5af8",
              300: "#3178ff",
              400: "#599eff",
              500: "#8ec2ff",
              600: "#bcdaff",
              700: "#d9eaff",
              800: "#eef6ff",
              900: "#f8fbff",
              DEFAULT: "#3178ff",
              foreground: "#ffffff"
            },
            secondary: {
              50: "#4b1c92",
              100: "#591db6",
              200: "#6a1ee0",
              300: "#7a2ff7",
              400: "#8a4eff",
              500: "#a27aff",
              600: "#bea6ff",
              700: "#d9ceff",
              800: "#ebe5ff",
              900: "#f4f1ff",
              DEFAULT: "#8a4eff",
              foreground: "#ffffff"
            }
          }
        }
      }
    })
  ]
}
