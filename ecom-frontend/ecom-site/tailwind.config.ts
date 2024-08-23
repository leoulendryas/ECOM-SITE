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
        primary: "#196bde",        
        secondary: "#d7d9de",      
          black: "#000000",        
          gray: "#8c8c91",       
          gray2: "#D9D9D9",  
          darkGray: "#161617",     
          whiter: "#FAF9F7", 
          lightGray: "#E8E8ED",   
        background: {
          DEFAULT: "#FFFFFF",     
        },        
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        lato: ['var(--font-lato)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
