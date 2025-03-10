import './globals.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { fontSans } from '@/lib/fonts/fonts';
import { RootLayoutProviders } from './providers';
import { TrkNavBar } from '@/lib/ui/nav-bar/nav-bar';

export const metadata: Metadata = {
    title: 'Trakn App',
    description: ''
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <html lang="en">
            <body className={`${fontSans.className} antialiased`}>
                <RootLayoutProviders>
                    <TrkNavBar
                        slots={{
                            middle: (
                                <span className="flex items-center justify-center align-middle h-8 px-1 font-black text-2xl tracking-tighter leading-8 text-white transform -skew-x-15">
                                    TRAKN
                                </span>
                            )
                        }}
                    />
                    {children}
                </RootLayoutProviders>
            </body>
        </html>
    );
}
