import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'white-alpha-10': 'rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'flip-horizontal': 'flip-horizontal 500ms ease-in-out',
        'flip-vertical': 'flip-vertical 500ms ease-in-out',
      }
    },
  },
  plugins: [],
}
export default config
