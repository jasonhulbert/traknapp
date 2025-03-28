'use client';

import React, { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import type { AuthSession } from '@supabase/supabase-js';
import { supabaseClient } from './supabase-client';
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
};

export const SupabaseContext = createContext<SupabaseContextProps>({
    client: null,
    session: null,
    setClient: () => {},
    setSession: () => {}
});

export const SupabaseProvider: FC<SuperbaseProviderProps> = ({ children }) => {
    const router = useRouter();
    const [client, setClient] = useState<SupabaseClient | null>(supabaseClient);
    const [session, setSession] = useState<AuthSession | null>(null);

    const clientInstance = useRef(supabaseClient);

    useEffect(() => {
        setClient(clientInstance.current);
    }, [setClient, clientInstance]);

    useEffect(() => {
        const auth = clientInstance.current.auth;

        const getSession = async () => {
            const s = await auth.getSession();

            if (s) {
                setSession(s.data.session);
            } else {
                setSession(null);

                router.push(AppRoutes.Login());
            }
        };

        const authListener = auth.onAuthStateChange((e, s) => {
            if (s) {
                setSession(s);
            } else {
                setSession(null);

                router.push(AppRoutes.Login());
            }

            setSession(s ?? null);
        });

        getSession().catch(console.error);

        return () => {
            authListener.data.subscription.unsubscribe();
        };
    }, [clientInstance, setSession, router]);

    return (
        <SupabaseContext.Provider value={{ client, setClient, session, setSession }}>
            {children}
        </SupabaseContext.Provider>
    );
};

export const useSupabase = () => {
    return useContext(SupabaseContext);
};
