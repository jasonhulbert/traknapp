import { Barlow } from 'next/font/google';

export const fontSans = Barlow({
    variable: '--font-barlow-sans',
    subsets: ['latin', 'latin-ext'],
    style: ['normal', 'italic'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});
