import { FC, JSX, ReactNode, ReactPortal, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
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
    backdrop?: boolean;
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
    backdrop = true,
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
            backdrop: 'fixed inset-0 bg-black/40',
            window: 'flex flex-col content-baseline relative mx-auto rounded-lg overflow-hidden shadow-xl',
            header: 'shrink justify-self-start flex flex-nowrap gap-x-2 items-center justify-between h-16 p-4 bg-gray-100',
            headerTitle: '',
            headerUtils: 'flex flex-nowrap items-center gap-x-2',
            headerCloseBtn: '',
            body: 'flex-1 p-4 overflow-y-auto bg-white',
            footer: 'shrink justify-self-end min-h-fit p-4 bg-gray-100'
        }),
        []
    );

    const modClassNames = useMemo<TrkDialogModClassNames>(
        () => ({
            window: {
                'border border-gray-300 shadow-md': variant === TrkDialogVariants.Default,
                'w-[calc(100%-(--spacing(10)))] max-w-[calc(var(--breakpoint-sm)-(--spacing(10)))] max-h-[calc(100vh-(--spacing(30)))]':
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
        <div className={finalClassNames.dialog} ref={dialogRef}>
            {backdrop && <div className={finalClassNames.backdrop} onClick={() => onClose(id)}></div>}
            <div className={finalClassNames.window}>
                <div className={finalClassNames.header}>
                    {title && (
                        <TrkTitle size="xl" weight={700} classNames={{ title: finalClassNames.headerTitle }}>
                            {title}
                        </TrkTitle>
                    )}

                    <div className={finalClassNames.headerUtils}>
                        {slots?.headerUtils}

                        <TrkButton
                            classNames={{ button: finalClassNames.headerCloseBtn }}
                            size="sm"
                            variant="ghost"
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
        </div>,
        document.body
    );
};
