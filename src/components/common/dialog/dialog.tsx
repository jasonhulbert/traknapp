import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { FC, JSX, ReactNode, useEffect, useMemo, useState } from 'react';
import { useTrkDialog } from './dialog-provider';
import { resolveFinalClassNames } from '../util/class-names';
import { TrkTitle } from '../title/title';
import { PropConst } from '../../../types/prop-const';

export type TrkDialogProps = {
    id: string;
    title: string;
    children: ReactNode;
    slots?: Partial<TrkDialogSlots>;
    variant?: PropConst<typeof TrkDialogVariants>;
    classNames?: Partial<TrkDialogClassNames>;
    onClose?: (value: boolean) => void;
};

export type TrkDialogSlots = {
    body: JSX.Element;
    footer: JSX.Element;
    headerUtils: JSX.Element;
};

export type TrkDialogClassNames = {
    dialog: string;
    backdrop: string;
    container: string;
    panel: string;
    header: string;
    headerTitle: string;
    headerUtils: string;
    body: string;
    footer: string;
};

export type TrkDialogModClassNames = {
    [Key in keyof Partial<TrkDialogClassNames>]: Record<string, boolean>;
};

export const TrkDialogVariants = {
    Default: 'default',
    Glass: 'glass'
} as const;

export const TrkDialog: FC<TrkDialogProps> = ({
    variant = TrkDialogVariants.Default,
    id,
    children,
    slots,
    title,
    classNames,
    onClose = () => {}
}): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const { dialogState } = useTrkDialog();

    const baseClassNames = useMemo<TrkDialogClassNames>(
        () => ({
            dialog: 'relative z-[999]',
            backdrop: 'fixed inset-0 bg-background/40',
            container: 'fixed inset-0 flex w-screen h-screen items-center justify-center',
            panel: "flex flex-col content-baseline relative w-[calc(100%-theme('spacing.8'))] h-auto max-w-[calc(theme('screens.sm')-theme('spacing.8'))] max-h-[calc(100vh-theme('spacing.8'))] mx-auto overflow-hidden border rounded-lg shadow-lg",
            header: 'flex-shrink justify-self-start flex flex-nowrap gap-x-2 items-center justify-between min-h-fit p-4',
            headerTitle: 'text-xl leading-tight font-semibold',
            headerUtils: 'flex flex-nowrap items-center gap-x-2',
            body: 'flex-1 p-4 overflow-y-auto',
            footer: 'flex-shrink justify-self-end min-h-fit p-4'
        }),
        []
    );

    const modClassNames = useMemo<TrkDialogModClassNames>(
        () => ({
            panel: {
                'bg-background border-neutral-200': variant === TrkDialogVariants.Default,
                'bg-neutral-100 bg-opacity-60 backdrop-blur-md border-neutral-200': variant === TrkDialogVariants.Glass
            }
        }),
        [variant]
    );

    const finalClassNames = useMemo<TrkDialogClassNames>(
        () =>
            resolveFinalClassNames<TrkDialogClassNames>(
                baseClassNames,
                modClassNames,
                classNames
            ) as TrkDialogClassNames,
        [baseClassNames, modClassNames, classNames]
    );

    useEffect(() => {
        setIsOpen(dialogState[id] || false);
    }, [id, setIsOpen, dialogState]);

    return (
        <Dialog open={isOpen} onClose={onClose} className={finalClassNames.dialog}>
            <DialogBackdrop className={finalClassNames.backdrop} />

            <div className={finalClassNames.container}>
                <DialogPanel className={finalClassNames.panel}>
                    <div className={finalClassNames.header}>
                        {title && (
                            <DialogTitle className={finalClassNames.headerTitle}>
                                <TrkTitle size="xl">{title}</TrkTitle>
                            </DialogTitle>
                        )}

                        {slots?.headerUtils && <div className={finalClassNames.headerUtils}>{slots?.headerUtils}</div>}
                    </div>

                    <div className={finalClassNames.body}>{children}</div>

                    {slots?.footer && <div className={finalClassNames.footer}>{slots.footer}</div>}
                </DialogPanel>
            </div>
        </Dialog>
    );
};
