import { Inter, Inter_Tight } from 'next/font/google';

export const fontSans = Inter({
    variable: '--font-inter-sans',
    subsets: ['latin', 'latin-ext'],
    style: ['normal', 'italic'],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const fontSansTight = Inter_Tight({
    variable: '--font-inter-tight-sans',
    subsets: ['latin', 'latin-ext'],
    style: ['normal', 'italic'],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});
