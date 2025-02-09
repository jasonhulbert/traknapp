'use client';

import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from 'react';

export type TrkDialogProviderProps = {
    children: ReactNode;
};

export type TrkDialogState = {
    [dialogId: string]: boolean;
};

export type TrkDialogContextProps = {
    dialogState: TrkDialogState;
    setDialogState: Dispatch<SetStateAction<TrkDialogState>>;
    openDialog: (dialogId: string, dialogData: Record<string, unknown>) => void;
    closeDialog: (dialogId: string) => void;
};

export const TrkDialogContext = createContext<TrkDialogContextProps>({
    dialogState: {},
    setDialogState: () => {},
    openDialog: () => {},
    closeDialog: () => {}
});

export const TrkDialogProvider: FC<TrkDialogProviderProps> = ({ children }) => {
    const [dialogState, setDialogState] = useState<TrkDialogState>({});

    const openDialog = (dialogId: string) => {
        setDialogState((prevState: TrkDialogState) => ({
            ...prevState,
            [dialogId]: true
        }));
    };

    const closeDialog = (dialogId: string) => {
        setDialogState((prevState: TrkDialogState) => ({
            ...prevState,
            [dialogId]: false
        }));
    };

    return (
        <TrkDialogContext.Provider value={{ dialogState, setDialogState, openDialog, closeDialog }}>
            {children}
        </TrkDialogContext.Provider>
    );
};

export const useTrkDialog = (): TrkDialogContextProps => useContext(TrkDialogContext);
