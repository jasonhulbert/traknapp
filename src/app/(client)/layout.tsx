import { PropsWithChildren } from 'react';
import { Providers } from './providers';
import { TrkNavbar } from '@/lib/ui/layout/layout-navbar/layout-navbar';
import { NavbarGlobalBrand } from '@/components/navbar-global-brand/navbar-global-brand';
import { NavbarGlobalUtils } from '@/components/navbar-global-utils/navbar-global-utils';

export default function Layout({ children }: Readonly<PropsWithChildren>) {
    return (
        <Providers>
            <TrkNavbar
                slots={{
                    middle: <NavbarGlobalBrand />,
                    end: <NavbarGlobalUtils />
                }}
            />
            {children}
        </Providers>
    );
}
