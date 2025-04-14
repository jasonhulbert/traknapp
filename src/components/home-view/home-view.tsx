'use client';

import { TrkLink } from '@/lib/ui/link/link';
import { TrkLayoutView } from '@/lib/ui/layout/layout-view/layout-view';
import { FC } from 'react';

export const HomeView: FC = () => {
    return (
        <TrkLayoutView variant="inset">
            <div className="flex flex-col gap-y-4 p-4">
                <ul>
                    <li>
                        <TrkLink href={`/plans`}>Plans</TrkLink>
                    </li>
                    <li>
                        <TrkLink href={`/logs`}>Logs</TrkLink>
                    </li>
                </ul>
            </div>
        </TrkLayoutView>
    );
};
