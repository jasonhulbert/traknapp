'use client';

import { TrkButton } from '@/lib/ui/button/button';
import { useSupabase } from '@/providers/supabase/supabase-provider';
import { Unlock, User } from 'lucide-react';
import { FC, JSX } from 'react';

export const NavbarGlobalUtils: FC = (): JSX.Element => {
    const { session, signOut } = useSupabase();

    return (
        <div className="flex flex-nowrap items-center gap-x-2">
            {session && (
                <>
                    <TrkButton size="sm" theme="default" variant="ghost" radiusSize="full" iconOnly={true}>
                        <User size={20} />
                    </TrkButton>
                    <TrkButton
                        size="sm"
                        theme="danger"
                        variant="ghost"
                        radiusSize="full"
                        iconOnly={true}
                        onClick={() => signOut()}
                    >
                        <Unlock size={20} />
                    </TrkButton>
                </>
            )}
        </div>
    );
};
