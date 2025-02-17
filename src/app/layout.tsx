import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { fontSans } from '@/lib/fonts/fonts';
import { Providers } from './providers';
import './globals.css';
import Image from 'next/image';
import { TrkNavBar } from '@/lib/ui/nav-bar/nav-bar';
import { TrkView } from '@/lib/ui/view/view';

export const metadata: Metadata = {
    title: 'Trakn App',
    description: ''
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <html lang="en">
            <body className={`${fontSans.className} antialiased`}>
                <Providers>
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
                    <TrkView>{children}</TrkView>
                </Providers>
            </body>
        </html>
    );
}
