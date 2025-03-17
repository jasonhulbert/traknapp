import { useParams, useSearchParams } from 'next/navigation';
import React, { createContext, FC, JSX, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

export type TrkNavBarProviderProps = PropsWithChildren;

export type TrkNavBarContextProps = {
    title?: JSX.Element | string;
    breadcrumbs?: JSX.Element[];
    actions?: JSX.Element;
    setTitle: (title: string | undefined) => void;
    setBreadcrumbs: (breadcrumbs: JSX.Element[] | undefined) => void;
    setActions: (actions: JSX.Element | undefined) => void;
    resetNavbar: () => void;
};

const TrkNavBarContext = createContext<TrkNavBarContextProps | undefined>(undefined);

export const TrkNavBarProvider: FC<TrkNavBarProviderProps> = ({ children }) => {
    const [title, setTitle] = useState<JSX.Element | string | undefined>(undefined);
    const [breadcrumbs, setBreadcrumbs] = useState<JSX.Element[] | undefined>(undefined);
    const [actions, setActions] = useState<JSX.Element | undefined>(undefined);
    const params = useParams();
    const searchParams = useSearchParams();

    const resetNavbar = useCallback(() => {
        setTitle(undefined);
        setBreadcrumbs(undefined);
        setActions(undefined);
    }, [setTitle, setBreadcrumbs, setActions]);

    useEffect(() => {
        resetNavbar();
    }, [params, searchParams, resetNavbar]);

    useEffect(() => {
        if (title || breadcrumbs || actions) {
            return;
        }

        resetNavbar();
    }, [title, breadcrumbs, actions, resetNavbar]);

    return (
        <TrkNavBarContext.Provider
            value={{ title, breadcrumbs, actions, resetNavbar, setTitle, setBreadcrumbs, setActions }}
        >
            {children}
        </TrkNavBarContext.Provider>
    );
};

export const useNavBar = (): TrkNavBarContextProps => {
    const context = useContext(TrkNavBarContext);

    if (!context) {
        throw new Error('useNavBar must be used within a NavBarProvider');
    }

    return context;
};
