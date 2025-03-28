import { createContext, JSX, ReactNode, useCallback, useContext, useState } from 'react';

export type TrkTabsContextValue = {
    active: string;
    setActive: (tabId: string) => void;
    onTabChange: (tabId: string) => void;
};

export const TrkTabsContext = createContext<TrkTabsContextValue>({
    active: '',
    setActive: () => {},
    onTabChange: () => {}
});

export type TrkTabsProviderProps = {
    children: ReactNode;
    activeTab?: string;
    onTabChange?: (tabId: string) => void;
};

export const TrkTabsProvider: React.FC<TrkTabsProviderProps> = ({ children, activeTab, onTabChange }): JSX.Element => {
    const [active, setActive] = useState<string>(activeTab ?? '');

    const handleTabChange = useCallback(
        (tabId: string) => {
            setActive(tabId);

            onTabChange?.(tabId);
        },
        [setActive, onTabChange]
    );

    return (
        <TrkTabsContext.Provider value={{ active, setActive, onTabChange: handleTabChange }}>
            {children}
        </TrkTabsContext.Provider>
    );
};

export const useTrkTabs = (): TrkTabsContextValue => useContext(TrkTabsContext);
