import { FC, ReactNode } from 'react';

export const TrkCard: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col rounded-lg overflow-hidden border border-neutral-100 bg-gradient-to-br from-background from-0% via-neutral-50 via-70% to-neutral-50 to-100%">
            {children}
        </div>
    );
};
