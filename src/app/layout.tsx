import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { fontSans } from '@/lib/fonts/fonts';
import { Providers } from './providers';
import './globals.css';
import TrkNavbar from '@/components/ui/navbar/navbar';
import TrkView from '@/components/ui/view/view';

export const metadata: Metadata = {
    title: 'Trakn App',
    description: ''
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <html lang="en">
            <body className={`${fontSans.className} antialiased`}>
                <Providers>
                    <TrkNavbar />
                    <TrkView>{children}</TrkView>
                </Providers>
            </body>
        </html>
    );
}
