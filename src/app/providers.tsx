'use client';

import { ReactNode } from 'react';
import { TrkDialogProvider } from '@/lib/ui/dialog';
import { SupabaseProvider } from '@/providers/supabase/supabase-provider';
import { TrkTabsProvider } from '@/lib/ui/tabs/tabs-provider';

export function RootLayoutProviders({ children }: { children: ReactNode }) {
    return (
        <SupabaseProvider>
            <TrkTabsProvider>
                <TrkDialogProvider>{children}</TrkDialogProvider>
            </TrkTabsProvider>
        </SupabaseProvider>
    );
}
