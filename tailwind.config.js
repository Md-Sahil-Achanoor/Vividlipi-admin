/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        card: "0 .75rem 1.5rem rgba(18, 38, 63, .03)",
      },
      colors: {
        "table-background-gray": "rgba(var(--table-background-gray), 1)",
        custom: {
          primary: {
            light: "#0e9dd181",
            main: "#059ed4",
          },
        },
        opacityPrimary: {
          400: "#ffffffcc",
        },
        primary: {
          main: "#059ed4",
          light: "#EEF2FF",
        },
        bg: {
          body: "var(--bg-body)",
          gray: "#F5F5F5",
          danger: "#EF4444",
          transparent: "#1212120D",
          yuleTree: "#CCEEA8",
          secondary: "#FAFAFA",
        },
        bgClr: {
          bgPositive: "#22C55E",
          accentLight: "#EEF2FF",
          warningLight: "#FEFEE8",
          positiveLight: "#F0FDF4",
          negativeLight: "#FEF2F2",
          blue200: "#BCCDFF",
          orange100: "#FFF2C5",
        },
        tertiary: "#F3F4F6",
        content: {
          primary: "#171717",
          secondary: "#404040",
          tertiary: "#525252",
          positive: "#16A34A",
        },
        borderClr: {
          gray: "#E5E5E5",
          gray300: "#D4D4D4",
          positive: "#BBF7D0",
          negative: "#FECACA",
          warning: "#FFFA88",
        },
        textClr: {
          contentAccent: "#1B31F5",
          muted: "#A3A3A3",
          contentNegative: "#B91C1C",
          contentWarning: "#996806",
        },
        // danger : {}
      },
      boxShadow: {
        header: "0 0.75rem 1.5rem rgba(18, 38, 63, 0.03)",
      },
      fontSize: {
        xsm: "15px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
