
import {nextui} from "@nextui-org/react";


/** @type {import('tailwindcss').Config} */
module.exports ={
  content: [
    
    './public/**/*.html',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()]
}

