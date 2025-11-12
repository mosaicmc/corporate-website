/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Map Tailwind tokens to CSS variables for dynamic theming
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Brand Colors (static)
        ocean: '#28367f',
        sky: '#60c7cc',
        sand: '#f3ede7',
        sun: '#fcb73d',
        earth: '#f37a60',
        leaf: '#b4d785',
        care: '#F16B83',

        // Legacy text helpers (consider phasing out in favor of `foreground`/`muted-foreground`)
        'text-primary': '#2c3e50',
        'text-secondary': '#6c757d',

        // Dark palette helpers (optional; tokens above should handle most scenarios)
        'dark-bg': '#0f172a',
        'dark-surface': '#1e293b',
        'dark-card': '#334155',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        // Enhanced entrance animations with staggered timing
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-down': 'fadeInDown 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-left': 'fadeInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-right': 'fadeInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'rotate-in': 'rotateIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        
        // Staggered animations with delays
        'fade-in-delay-100': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
        'fade-in-delay-200': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
        'fade-in-delay-300': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
        'fade-in-delay-400': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both',
        'fade-in-up-delay-100': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
        'fade-in-up-delay-200': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
        'fade-in-up-delay-300': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
        
        // Sophisticated continuous animations
        'bounce-gentle': 'bounceGentle 2.5s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 2s',
        'float-slow': 'floatSlow 12s ease-in-out infinite',
        'float-reverse': 'floatReverse 10s ease-in-out infinite',
        
        // Enhanced interactive animations
        'glow': 'glow 3s ease-in-out infinite alternate',
        'glow-gentle': 'glowGentle 4s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-gentle': 'pulseGentle 6s ease-in-out infinite',
        'pulse-color': 'pulseColor 3s ease-in-out infinite',
        
        // Background animations
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spinReverse 15s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'shimmer-slow': 'shimmerSlow 4s linear infinite',
        'blob': 'blob 12s infinite',
        'blob-delayed': 'blob 12s infinite 4s',
        'blob-reverse': 'blobReverse 14s infinite 2s',
        
        // Modern micro-interactions
        'button-press': 'buttonPress 0.15s ease-out',
        'shake': 'shake 0.6s ease-in-out',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'typing': 'typing 2s steps(20) infinite',
      },
      keyframes: {
        // Enhanced entrance animations
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        rotateIn: {
          '0%': { opacity: '0', transform: 'rotate(-10deg) scale(0.9)' },
          '100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' },
        },
        
        // Sophisticated floating animations
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-8px) rotate(0.5deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
          '75%': { transform: 'translateY(-5px) rotate(-0.5deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(0.3deg)' },
          '66%': { transform: 'translateY(-12px) rotate(-0.3deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(-10px) rotate(0deg)' },
          '50%': { transform: 'translateY(0px) rotate(0.5deg)' },
        },
        
        // Enhanced glow effects
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(40, 54, 127, 0.4), 0 0 40px rgba(40, 54, 127, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(40, 54, 127, 0.6), 0 0 60px rgba(40, 54, 127, 0.3)' },
        },
        glowGentle: {
          '0%': { boxShadow: '0 0 15px rgba(96, 199, 204, 0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(96, 199, 204, 0.5)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        pulseColor: {
          '0%, 100%': { backgroundColor: 'rgba(40, 54, 127, 0.1)' },
          '50%': { backgroundColor: 'rgba(96, 199, 204, 0.2)' },
        },
        
        // Enhanced shimmer effects
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        shimmerSlow: {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        
        // Sophisticated background animations
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
          '25%': { transform: 'translate(15px, -20px) scale(1.03) rotate(2deg)' },
          '50%': { transform: 'translate(-10px, 10px) scale(0.97) rotate(-1deg)' },
          '75%': { transform: 'translate(8px, -15px) scale(1.02) rotate(1deg)' },
          '100%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
        },
        blobReverse: {
          '0%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
          '25%': { transform: 'translate(-15px, 20px) scale(1.02) rotate(-2deg)' },
          '50%': { transform: 'translate(10px, -10px) scale(0.98) rotate(1deg)' },
          '75%': { transform: 'translate(-8px, 15px) scale(1.01) rotate(-1deg)' },
          '100%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        
        // Micro-interactions
        buttonPress: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },
        typing: {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '100%': { width: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
    },
  },
  plugins: [],
};