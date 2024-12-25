import { FC, JSX, ReactNode } from 'react';

export const TrkButton: FC<{ iconOnly?: boolean; onClick?: () => void; children: ReactNode }> = ({
    iconOnly,
    onClick,
    children
}): JSX.Element => {
    return (
        <button
            className={`appearance-none flex items-center justify-center align-middle gap-x-2 font-semibold text-base flex-nowrap h-10 leading-none rounded-lg text-neutral-500 bg-neutral-400 bg-opacity-10 shadow transition-all duration-200 hover:bg-opacity-20 ${iconOnly ? 'w-10 p-2' : 'w-auto py-2 px-4'}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
