import { Config } from 'tailwindcss';
import Color from 'color';

const colorConfig = {
    background: '#000000',
    foreground: '#ffffff',
    colors: {
        neutral: '#b2b2b2',
        primary: '#F9773E',
        success: '#359D66',
        warning: '#F1B746',
        danger: '#EE5B58'
    },
    weights: {
        50: ['#000', 0.95],
        100: ['#000', 0.85],
        200: ['#000', 0.7],
        300: ['#000', 0.65],
        400: ['#000', 0.35],
        500: ['#000', 0],
        600: ['#fff', 0.35],
        700: ['#fff', 0.65],
        800: ['#fff', 0.7],
        900: ['#fff', 0.85],
        950: ['#fff', 0.95]
    } as { [weight: number]: [string, number] }
};

const generateThemeColors = (colors: Record<string, string>, weights: { [weight: number]: [string, number] }) => {
    const palette: Record<string, Record<string, string>> = {};

    for (const [name, color] of Object.entries(colors)) {
        palette[name] = {};

        for (const [weight, mix] of Object.entries(weights)) {
            const modColor = Color(color).mix(Color(mix[0]), mix[1]);
            palette[name][weight] = modColor.hex();
        }
    }

    return palette;
};

export default {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/lib/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        borderRadius: {
            none: '0',
            sm: '0.25rem',
            DEFAULT: '0.375rem',
            md: '0.5rem',
            lg: '0.75rem',
            xl: '0.1rem',
            '2xl': '1.5rem',
            '3xl': '2rem',
            full: '9999px'
        },
        extend: {
            colors: {
                background: colorConfig.background,
                foreground: colorConfig.foreground,
                ...generateThemeColors(colorConfig.colors, colorConfig.weights)
            }
        }
    }
} satisfies Config;
