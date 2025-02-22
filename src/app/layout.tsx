import './globals.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import Image from 'next/image';
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
                                <Image
                                    src="/brand/logo_dark_color.svg"
                                    alt="TRAKN"
                                    width={100}
                                    height={30}
                                    className="h-6 w-auto"
                                />
                            )
                        }}
                    />
                    {children}
                </RootLayoutProviders>
            </body>
        </html>
    );
}
