import { Config } from 'tailwindcss';
import Color from 'color';

const defaultOptions = {
    colors: {
        neutral: '#C0C0C0',
        primary: '#F9773E',
        success: '#359D66',
        warning: '#F1B746',
        danger: '#EE5B58'
    },
    weights: {
        50: ['#000', 0.95],
        100: ['#000', 0.9],
        200: ['#000', 0.75],
        300: ['#000', 0.5],
        400: ['#000', 0.25],
        500: ['#000', 0],
        600: ['#fff', 0.25],
        700: ['#fff', 0.5],
        800: ['#fff', 0.75],
        900: ['#fff', 0.9],
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
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                background: '#000000',
                foreground: '#ffffff',
                ...generateThemeColors(defaultOptions.colors, defaultOptions.weights)
            }
        }
    }
} satisfies Config;
