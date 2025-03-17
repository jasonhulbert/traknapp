import './globals.css';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { fontSans, fontSansTight } from '@/lib/fonts/fonts';
import { RootLayoutProviders } from './providers';
import { TrkNavBar } from '@/lib/ui/nav-bar/nav-bar';
import { NavbarGlobalUtils } from '@/components/navbar-global-utils/navbar-global-utils';
import { NavbarGlobalBrand } from '@/components/navbar-global-brand/navbar-global-brand';

export const metadata: Metadata = {
    title: 'Trakn App',
    description: ''
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
    return (
        <html lang="en" className={`${fontSans.variable} ${fontSansTight.variable} antialiased`}>
            <body>
                <RootLayoutProviders>
                    <TrkNavBar
                        slots={{
                            middle: <NavbarGlobalBrand />,
                            end: <NavbarGlobalUtils />
                        }}
                    />
                    {children}
                </RootLayoutProviders>
            </body>
        </html>
    );
}
