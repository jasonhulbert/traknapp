import { FC, JSX, ReactNode, ReactPortal, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion as Motion } from 'motion/react';
import { useTrkDialog } from './dialog-provider';
import { resolveFinalClassNames } from '../util/selectors';
import { TrkTitle } from '../title/title';
import { PropConst } from '../prop-const';
import { getFocusableElements } from '../util/focus';
import { X } from 'lucide-react';
import { TrkButton } from '../button/button';

export type TrkDialogProps = {
    id: string;
    title: string;
    children: ReactNode;
    slots?: Partial<TrkDialogSlots>;
    variant?: PropConst<typeof TrkDialogVariants>;
    size?: PropConst<typeof TrkDialogSize>;
    classNames?: Partial<TrkDialogClassNames>;
    onClose?: (id: string) => void;
};

export type TrkDialogSlots = {
    body: JSX.Element;
    footer: JSX.Element;
    headerUtils: JSX.Element;
};

export type TrkDialogClassNames = {
    dialog: string;
    backdrop: string;
    window: string;
    header: string;
    headerTitle: string;
    headerUtils: string;
    headerCloseBtn: string;
    body: string;
    footer: string;
};

export type TrkDialogModClassNames = {
    [Key in keyof Partial<TrkDialogClassNames>]: Record<string, boolean>;
};

export const TrkDialogVariants = {
    Default: 'default'
} as const;

export const TrkDialogSize = {
    Default: 'default',
    Full: 'full'
} as const;

export const TrkDialog: FC<TrkDialogProps> = ({
    variant = TrkDialogVariants.Default,
    size = TrkDialogSize.Default,
    id,
    children,
    slots,
    title,
    classNames,
    onClose = () => {}
}): ReactPortal | undefined => {
    const { dialogState } = useTrkDialog();
    const dialogRef = useRef<HTMLDivElement>(null);
    const lastFocusedElement = useRef<HTMLElement | null>(null);
    const isOpen = useMemo<boolean>(() => dialogState[id] ?? false, [dialogState, id]);

    const baseClassNames = useMemo<TrkDialogClassNames>(
        () => ({
            dialog: 'z-[999] fixed inset-0 flex w-screen h-screen items-center justify-center',
            backdrop: 'fixed inset-0 bg-background/80',
            window: 'flex flex-col content-baseline relative mx-auto overflow-hidden border rounded-lg shadow-lg',
            header: 'flex-shrink justify-self-start flex flex-nowrap gap-x-2 items-center justify-between h-16 p-4 border-b border-neutral-100',
            headerTitle: '',
            headerUtils: 'flex flex-nowrap items-center gap-x-2',
            headerCloseBtn: '',
            body: 'flex-1 p-4 overflow-y-auto bg-background/80',
            footer: 'flex-shrink justify-self-end min-h-fit p-4 border-t border-neutral-100'
        }),
        []
    );

    const modClassNames = useMemo<TrkDialogModClassNames>(
        () => ({
            window: {
                'bg-neutral-100/80 border-neutral-100 shadow-md': variant === TrkDialogVariants.Default,
                "w-[calc(100%-theme('spacing.8'))] h-auto max-w-[calc(theme('screens.sm')-theme('spacing.8'))] max-h-[calc(100vh-theme('spacing.8'))]":
                    size === TrkDialogSize.Default,
                'w-full h-full': size === TrkDialogSize.Full
            }
        }),
        [variant, size]
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
        if (isOpen) {
            lastFocusedElement.current = document.activeElement as HTMLElement;
            document.body.style.overflow = 'hidden';

            const firstFocusable = getFocusableElements(dialogRef.current)?.[0] as HTMLElement;

            firstFocusable?.focus();
        }

        return () => {
            document.body.style.overflow = '';

            if (lastFocusedElement.current && document.body.contains(lastFocusedElement.current)) {
                lastFocusedElement.current?.focus();
            }
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose(id);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [id, isOpen, onClose]);

    if (!isOpen) {
        return;
    }

    return createPortal(
        <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className={finalClassNames.dialog} ref={dialogRef}>
                <div className={finalClassNames.backdrop} onClick={() => onClose(id)}></div>
                <div className={finalClassNames.window}>
                    <div className={finalClassNames.header}>
                        {title && (
                            <TrkTitle classNames={{ title: finalClassNames.headerTitle }} size="lg">
                                {title}
                            </TrkTitle>
                        )}

                        <div className={finalClassNames.headerUtils}>
                            {slots?.headerUtils}

                            <TrkButton
                                classNames={{ button: finalClassNames.headerCloseBtn }}
                                size="sm"
                                variant="ghost"
                                radiusSize="full"
                                iconOnly={true}
                                onClick={() => onClose(id)}
                            >
                                <X size={24} />
                            </TrkButton>
                        </div>
                    </div>
                    <div className={finalClassNames.body}>{children}</div>
                    {slots?.footer && <div className={finalClassNames.footer}>{slots.footer}</div>}
                </div>
            </div>
        </Motion.div>,
        document.body
    );
};
