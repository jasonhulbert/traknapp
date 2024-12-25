import { Barlow } from 'next/font/google';

export const fontSans = Barlow({
    variable: '--font-barlow-sans',
    subsets: ['latin'],
    style: ['normal', 'italic'],
    weight: ['200', '300', '400', '500', '600', '700', '800']
});
