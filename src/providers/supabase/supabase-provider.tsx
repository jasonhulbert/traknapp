'use client';

import React, {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import type { AuthSession } from '@supabase/supabase-js';
import { createClient } from '../../util/supabase/client';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/app/routes';

export type SuperbaseProviderProps = {
    children: React.ReactNode;
};

export type SupabaseContextProps = {
    client: SupabaseClient | null;
    session: AuthSession | null;
    setClient: Dispatch<SetStateAction<SupabaseClient | null>>;
    setSession: Dispatch<SetStateAction<AuthSession | null>>;
    signOut: () => Promise<void>;
};

export const SupabaseContext = createContext<SupabaseContextProps>({
    client: null,
    session: null,
    setClient: () => {},
    setSession: () => {},
    signOut: async () => {}
});

export const SupabaseProvider: FC<SuperbaseProviderProps> = ({ children }) => {
    const [client, setClient] = useState<SupabaseClient | null>(createClient());
    const [session, setSession] = useState<AuthSession | null>(null);
    const router = useRouter();

    const signOut = useCallback(
        async (redirect = AppRoutes.Signin()) => {
            if (client) {
                await client.auth.signOut();

                setSession(null);

                router.push(redirect);
            }
        },
        [client, setSession, router]
    );

    useEffect(() => {
        const auth = client?.auth;

        const getSession = async () => {
            const s = await auth?.getSession();

            if (s) {
                setSession(s.data.session);
            } else {
                setSession(null);
            }
        };

        const authListener = auth?.onAuthStateChange((e, s) => {
            if (s) {
                setSession(s);
            } else {
                setSession(null);
            }
        });

        getSession().catch(console.error);

        return () => {
            authListener?.data.subscription.unsubscribe();
        };
    }, [client, setSession]);

    return (
        <SupabaseContext.Provider value={{ client, setClient, session, setSession, signOut }}>
            {children}
        </SupabaseContext.Provider>
    );
};

export const useSupabase = () => {
    return useContext(SupabaseContext);
};
