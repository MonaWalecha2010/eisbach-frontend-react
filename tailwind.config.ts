import type { Config } from 'tailwindcss'
const { colors } = require('tailwindcss/defaultTheme')
const { fontFamily } = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],  
  theme: {
    fontSize: {
      xs: '0.775rem',
      //xs: '0.8125rem',
      sm: '0.875rem',
      md: '0.938rem',
      base: '1rem',
      lg: '1.0625rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {
      screens: {
        xs: '500px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xlg: '1536px',
        xxlg: '1980px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          '100': '#1F263E',
          '200': '#303750',
          '300': '#5945FF',
          '400': '#E7E7E7',
          '500': '#4833f9'
        }, 
        success: '#0AC947',    
        blue: {
          ...colors.blue,
          '900': '#1e3656',
          '800': '#595F75',
          '700': '#DFE5F9'
        },
        gray: {
          ...colors.gray,
          '100': '#9C9C9C',
          '200': '#656565',
          '300': '#CACACA',
          '400': '#F8F9FB',
          '500': '#808080',
          '600': '#F3F6FE',
          '700': '#7D8592',
          '800': '#6C757D',
          '900': '#707070',
          '101': '#ebe6e7',

        },
        black: {
          ...colors.black,
          '100': '#000000',
          '500': '#373737',
          '600': '#565656'
        },
        silver: {
          ...colors.silver,
          '100': '#D8E0F0',
          '200': '#E3E3E3',
          '300': '#E2E2E2',
          '400': '#EAEAEA',
          '500': '#E4E4E4',
          '600': '#979797',
          '700': '#EDEDED',
          '800': '#e0e7f4',
          '900': '#e3e6e7',
        },
        green: {
          ...colors.green,
          '100': '#026B24'
        },
        red: {
          ...colors.red,
          '100': '#D40400'
        },
        white_1: {
          ...colors.white,
          '300': '#F2F2F2',
          '400': '#F6F6F6',
          '500': '#F9F9F9',
        }

      },
      spacing: {
        '166': '10.375rem',
        '217':'13.563rem',
        '2.313': '2.313rem',
        '100-217': 'calc(100% - 13.563rem)',
        'full--70': 'calc(100% - 4.375rem)',        
        'full--50': 'calc(100% - 5rem)',
        'full--2.5': 'calc(100% - 2.5rem)',
        'full--3': 'calc(100% - 3rem)',
        'full--4': 'calc(100% - 4rem)',
      },
      fontFamily: {
        ...fontFamily,
        'sans': ['inter','helvetica','menlo'],        
      },
      boxShadow: {
        '2lg': '10px 20px 30px rgba(0, 0, 0, 0.09)',
        'colShadow2': '0px 1px 2px 0px rgba(184, 200, 224, 0.22)',
        'inputShadow': '0px 1px 2px 0px rgba(184, 200, 224, 0.22)',
        'modalShadow': '10px 10px 30px 50px rgba(0, 0, 0, 0.22)',
        'dropdownShadow': 'rgba(0, 0, 0, 0.16) 0px 24px 48px',
        'sidebarShadow': 'rgba(0, 0, 0, 0.16) 0px 24px 48px'
      },
      transitionDuration: {
        '400': '400ms',
      }
    },
  },  
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: false,
  },
}
export default config