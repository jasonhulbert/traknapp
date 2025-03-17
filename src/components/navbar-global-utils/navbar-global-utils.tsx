'use client';

import { TrkButton } from '@/lib/ui/button/button';
import { useSupabase } from '@/providers/supabase/supabase-provider';
import { Unlock, User } from 'lucide-react';
import { FC, JSX } from 'react';

export const NavbarGlobalUtils: FC = (): JSX.Element => {
    const { client, session } = useSupabase();

    return (
        <div className="flex flex-nowrap items-center gap-x-2">
            {client && session && (
                <>
                    <TrkButton size="sm" theme="default" variant="ghost">
                        <User size={16} />
                        <span className="hidden md:block">Account</span>
                    </TrkButton>
                    <TrkButton size="sm" theme="danger" variant="ghost" onClick={() => client?.auth.signOut()}>
                        <Unlock size={16} />
                        <span className="hidden md:block">Sign Out</span>
                    </TrkButton>
                </>
            )}
        </div>
    );
};
