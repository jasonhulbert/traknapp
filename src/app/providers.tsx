'use client';

import { ReactNode } from 'react';
import { TrkDialogProvider } from '@/lib/ui/dialog';
import { TrkNavBarProvider } from '@/lib/ui/nav-bar/nav-bar-provider';

export function RootLayoutProviders({ children }: { children: ReactNode }) {
    return (
        <TrkNavBarProvider>
            <TrkDialogProvider>{children}</TrkDialogProvider>
        </TrkNavBarProvider>
    );
}
