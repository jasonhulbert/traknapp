import './globals.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { fontSans, fontSansTight } from '@/lib/fonts/fonts';

export const metadata: Metadata = {
    title: 'Trakn App',
    description: ''
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <html lang="en" className={`${fontSans.variable} ${fontSansTight.variable} antialiased`}>
            <body>{children}</body>
        </html>
    );
}
