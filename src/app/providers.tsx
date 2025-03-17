'use client';

import { ReactNode } from 'react';
import { TrkDialogProvider } from '@/lib/ui/dialog';
import { TrkNavBarProvider } from '@/lib/ui/nav-bar/nav-bar-provider';
import { SupabaseProvider } from '@/providers/supabase/supabase-provider';
import { TrkTabsProvider } from '@/lib/ui/tabs/tabs-provider';

export function RootLayoutProviders({ children }: { children: ReactNode }) {
    return (
        <SupabaseProvider>
            <TrkNavBarProvider>
                <TrkTabsProvider>
                    <TrkDialogProvider>{children}</TrkDialogProvider>
                </TrkTabsProvider>
            </TrkNavBarProvider>
        </SupabaseProvider>
    );
}
