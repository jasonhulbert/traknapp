'use client';

import { TrkLink } from '@/lib/ui/link/link';
import { useNavBar } from '@/lib/ui/nav-bar/nav-bar-provider';
import { FC, useEffect } from 'react';

export const HomeView: FC = () => {
    const { setTitle } = useNavBar();

    useEffect(() => {
        setTitle('Home');
    }, [setTitle]);

    return (
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
    );
};
