/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
	  './pages/**/*.{js,jsx}',
	  './components/**/*.{js,jsx}',
	  './app/**/*.{js,jsx}',
	  './src/**/*.{js,jsx}',
	],
	theme: {
	  container: {
		center: true,
		padding: '2rem',
		screens: {
		  '2xl': '1400px',
		},
	  },
	  extend: {
		colors: {
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))',
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))',
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))',
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))',
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))',
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))',
		  },
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))',
		  },
		  'telegram-bg': 'var(--telegram-bg-color)',
		  'telegram-text': 'var(--telegram-text-color)',
		  'telegram-hint': 'var(--telegram-hint-color)',
		  'telegram-link': 'var(--telegram-link-color)',
		  'telegram-button-bg': 'var(--telegram-button-bg-color)',
		  'telegram-button-text': 'var(--telegram-button-text-color)',
		  'telegram-secondary-bg': 'var(--telegram-secondary-bg-color)',
		  'telegram-divider': 'var(--telegram-divider-color)',
		  'telegram-header-bg': 'var(--telegram-header-bg-color)',
		  'telegram-header-text': 'var(--telegram-header-text-color)',
		  'telegram-icon': 'var(--telegram-icon-color)',
		  'telegram-blue': '#0088cc',
		  'telegram-lightBlue': '#54a9eb',
		},
		spacing: {
		  'safe-top': 'env(safe-area-inset-top)',
		  'safe-bottom': 'env(safe-area-inset-bottom)',
		  'safe-left': 'env(safe-area-inset-left)',
		  'safe-right': 'env(safe-area-inset-right)',
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
		keyframes: {
		  'accordion-down': {
			from: { height: '0px' },
			to: { height: 'var(--radix-accordion-content-height)' },
		  },
		  'accordion-up': {
			from: { height: 'var(--radix-accordion-content-height)' },
			to: { height: '0px' },
		  },
		  'fade-in': {
			from: { opacity: '0' },
			to: { opacity: '1' },
		  },
		  'slide-up': {
			from: { transform: 'translateY(10px)', opacity: '0' },
			to: { transform: 'translateY(0)', opacity: '1' },
		  },
		},
		animation: {
		  'accordion-down': 'accordion-down 0.2s ease-out',
		  'accordion-up': 'accordion-up 0.2s ease-out',
		  'fade-in': 'fade-in 0.3s ease-out',
		  'slide-up': 'slide-up 0.3s ease-out',
		},
	  },
	},
	plugins: [require('tailwindcss-animate')],
  };
  