import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  safelist: [
    'bg-mind-slpeum_bg',
    'bg-mind-bulkuea_bg',
    'bg-mind-apbak_bg',
    'bg-mind-boolan_bg',
    'bg-mind-honran_bg',
    'bg-mind-bunno_bg',
    'bg-mind-woowool_bg',
    'bg-mind-zzazeung_bg',
    'bg-mind-huhuea_bg',
    'bg-mind-yoerowooum_bg',
    'bg-mind-moogiryeok_bg',
    'custom-toast'
  ],
  theme: {
    extend: {
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        slide: 'slide 20s linear infinite'
      },
      colors: {
        // primaryPurple: '#8573C9',
        //이거 일단은 주석처리했습니다

        error: '#fe5558',
        success: '#00bd78',
        white: '#ffffff',
        black: '#000000',

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          1: '#EBE2FF',
          2: '#C1B8E5',
          3: '#A092D7',
          4: '#8573C9'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },

        label: {
          disable: '#DFDFED',
          assistive: '#C7C8C9',
          alternative: '#85858B',
          neutral: '#47484C',
          strong: '#000000',
          normal: '#171719'
        },
        interaction: {
          inactive: '#F4F4F5',
          disabled: '#DBDCDF'
        },
        line: {
          normal: '#E0E0E2',
          alternative: '#F4F4F5'
        },
        status: {
          positive: '#0DFBA8',
          error: '#FF5558'
        },
        backgroundSet: {
          normal: '#FFFFFF',
          card: '#F7F7F8',
          offwhite: '#EEEEF0'
        },
        mind: {
          honran: '#CAADC6', //혼란
          honran_bg: '#FCF2FB',
          moogiryeok: '#E7DDF2', //무기력
          moogiryeok_bg: '#F3EEFA',
          slpeum: '#CCD5DD', //슬픔
          slpeum_bg: '#EAF3FA',
          woowool: '#ACBCE5', //우울
          woowool_bg: '#E4EAFA',
          yoerowooum: '#81A2B8', //외로움
          yoerowooum_bg: '#EDF2F7',
          boolan: '#AFC1B8', //불안
          boolan_bg: '#EBF5F0',
          huhuea: '#D4DFCD', //후회
          huhuea_bg: '#D4DFCD',
          zzazeung: '#EAF9E0', //짜증
          zzazeung_bg: '#FEF5BF',
          bunno: '#E3BFA2', //분노
          bunno_bg: '#FACFC7',
          bulkuea: '#F0ECAE', //불쾌
          bulkuea_bg: 'FBFAE2',
          apbak: '#EBB6C8', //압박

          apbak_bg: '#FFF1F6'
        }
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        ibmSans: ['var(--font-ibmSans)']
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [animate]
};

export default config;
