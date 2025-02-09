'use client';

import { ReactNode } from 'react';
import { TrkDialogProvider } from '@/lib/ui/dialog';

export function Providers({ children }: { children: ReactNode }) {
    return <TrkDialogProvider>{children}</TrkDialogProvider>;
}
