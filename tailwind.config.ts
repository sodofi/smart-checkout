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
        // Celo brand colors - bold and high contrast
        'celo-yellow': '#FCFF52',
        'celo-green': '#4E632A', 
        'celo-purple': '#1A0329',
        'celo-tan-light': '#FBF6F1',
        'celo-tan': '#E6E3D5',
        'celo-brown': '#635949',
        // Accent colors for small punches of energy
        'celo-pink': '#F2A9E7',
        'celo-orange': '#F29E5F', 
        'celo-lime': '#B2EBA1',
        'celo-blue': '#8AC0F9',
        // Base colors
        'celo-black': '#000000',
        'celo-white': '#FFFFFF',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'gt-alpina': ['GT Alpina', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontWeight: {
        'inter-heavy': '750',
      },
      letterSpacing: {
        'tight-xl': '-0.02em',
        'tight-2xl': '-0.03em',
      },
    },
  },
  plugins: [],
};

export default config;
