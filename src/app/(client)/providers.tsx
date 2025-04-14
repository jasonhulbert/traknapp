import { ReactNode } from 'react';
import { SupabaseProvider } from '@/providers/supabase/supabase-provider';
import { TrkDialogProvider } from '@/lib/ui/dialog/dialog-provider';

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <SupabaseProvider>
            <TrkDialogProvider>{children}</TrkDialogProvider>
        </SupabaseProvider>
    );
};
