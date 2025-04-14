import { FC, JSX, ReactNode, useMemo } from 'react';
import { PropConst } from '../prop-const';
import { resolveFinalClassNames } from '../util/selectors';

export type TrkCardProps = {
    children: ReactNode;
    classNames?: Partial<TrkCardClassNames>;
    variant?: PropConst<typeof TrkCardVariants>;
    slots?: TrkCardSlots;
};

export type TrkCardSlots = {
    headerStart?: JSX.Element;
    headerMiddle?: JSX.Element;
    headerEnd?: JSX.Element;
    footerStart?: JSX.Element;
    footerMiddle?: JSX.Element;
    footerEnd?: JSX.Element;
};

export type TrkCardClassNames = {
    card: string;
    header: string;
    body: string;
    footer: string;
};

export type TrkCardModClassNames = {
    card: Record<string, boolean>;
};

export const TrkCardVariants = {
    Default: 'default'
} as const;

export const TrkCard: FC<TrkCardProps> = ({ children, classNames, variant, slots }): JSX.Element => {
    variant = variant || TrkCardVariants.Default;

    const baseClassNames = useMemo<TrkCardClassNames>(
        () => ({
            card: 'flex flex-col p-2 rounded-lg overflow-hidden',
            header: 'flex items-center shrink justify-between flex-nowrap gap-x-2 w-full p-2',
            body: 'relative flex-1 w-full p-2',
            footer: 'flex items-center shrink justify-between flex-nowrap gap-x-2 w-full p-2'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkCardModClassNames>>(
        () => ({
            card: {
                'bg-white border border-gray-300': variant === TrkCardVariants.Default
            }
        }),
        [variant]
    );

    const finalClassNames = useMemo<TrkCardClassNames>(
        () => resolveFinalClassNames<TrkCardClassNames>(baseClassNames, modClassNames, classNames) as TrkCardClassNames,
        [baseClassNames, modClassNames, classNames]
    );

    return (
        <div className={finalClassNames.card}>
            {slots?.headerStart || slots?.headerMiddle || slots?.headerEnd ? (
                <div className={finalClassNames.header}>
                    <div className="shrink mr-auto">{slots?.headerStart}</div>
                    <div className="flex-1 justify-center">{slots?.headerMiddle}</div>
                    <div className="shrink ml-auto">{slots?.headerEnd}</div>
                </div>
            ) : null}

            <div className={finalClassNames.body}>{children}</div>

            {slots?.footerStart || slots?.footerMiddle || slots?.footerEnd ? (
                <div className={finalClassNames.footer}>
                    <div className="shrink mr-auto">{slots?.footerStart}</div>
                    <div className="flex-1 justify-center">{slots?.footerMiddle}</div>
                    <div className="shrink ml-auto">{slots?.footerEnd}</div>
                </div>
            ) : null}
        </div>
    );
};
