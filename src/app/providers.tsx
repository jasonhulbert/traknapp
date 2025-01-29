'use client';

import { ReactNode } from 'react';
import { TrkDialogProvider } from '@/components/common/dialog';

export function Providers({ children }: { children: ReactNode }) {
    return <TrkDialogProvider>{children}</TrkDialogProvider>;
}
