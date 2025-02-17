import { FC } from 'react';

export type TrkViewProps = {
    children: React.ReactNode;
};

export const TrkView: FC<TrkViewProps> = ({ children }) => {
    return (
        <div className="z-30 fixed top-14 right-0 bottom-0 left-0 h-[calc(100vh-theme('spacing.16'))] overflow-y-auto overflow-x-hidden">
            {children}
        </div>
    );
};
