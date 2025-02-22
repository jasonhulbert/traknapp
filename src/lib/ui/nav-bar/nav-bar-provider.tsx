import React, { createContext, FC, JSX, PropsWithChildren, useContext, useState } from 'react';

export type TrkNavBarProviderProps = PropsWithChildren;

export type TrkNavBarContextProps = {
    title: JSX.Element | string;
    breadcrumbs: JSX.Element[];
    actions: JSX.Element;
    setTitle: (title: string) => void;
    setBreadcrumbs: (breadcrumbs: JSX.Element[]) => void;
    setActions: (actions: JSX.Element) => void;
};

const TrkNavBarContext = createContext<TrkNavBarContextProps | undefined>(undefined);

export const TrkNavBarProvider: FC<TrkNavBarProviderProps> = ({ children }) => {
    const [title, setTitle] = useState<JSX.Element | string>('');
    const [breadcrumbs, setBreadcrumbs] = useState<JSX.Element[]>([]);
    const [actions, setActions] = useState<JSX.Element>(<></>);

    return (
        <TrkNavBarContext.Provider value={{ title, breadcrumbs, actions, setTitle, setBreadcrumbs, setActions }}>
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
