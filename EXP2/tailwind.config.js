/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', 'class'],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			success: {
  				DEFAULT: 'var(--color-success)',
  				foreground: 'var(--color-success-foreground)'
  			},
  			warning: {
  				DEFAULT: 'var(--color-warning)',
  				foreground: 'var(--color-warning-foreground)'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			error: {
  				DEFAULT: 'var(--color-error)',
  				foreground: 'var(--color-error-foreground)'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			sm: 'calc(var(--radius) - 4px)',
  			md: 'calc(var(--radius) - 2px)',
  			lg: 'var(--radius)',
  			xl: 'var(--radius-xl)'
  		},
  		fontFamily: {
  			heading: [
  				'Outfit',
  				'sans-serif'
  			],
  			body: [
  				'Source Sans 3',
  				'sans-serif'
  			],
  			caption: [
  				'Inter',
  				'sans-serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'monospace'
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'72': '18rem',
  			'96': '24rem',
  			'144': '36rem'
  		},
  		maxWidth: {
  			prose: '70ch'
  		},
  		transitionTimingFunction: {
  			smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  			spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  		},
  		transitionDuration: {
  			'150': '150ms',
  			'250': '250ms'
  		},
  		zIndex: {
  			'1': '1',
  			'50': '50',
  			'100': '100',
  			'200': '200',
  			'300': '300',
  			'400': '400',
  			'1000': '1000',
  			'1100': '1100',
  			'1200': '1200',
  			'1300': '1300'
  		}
  	}
  },
  plugins: [
    require('tailwindcss-animate')
  ]
}