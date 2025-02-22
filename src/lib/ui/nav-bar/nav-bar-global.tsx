import { FC, JSX } from 'react';

export type TrkNavBarGlobalProps = {
    slots?: Partial<TrkNavBarGlobalSlots>;
};

export type TrkNavBarGlobalSlots = {
    start: JSX.Element;
    middle: JSX.Element;
    end: JSX.Element;
};

export const TrkNavBarGlobal: FC<TrkNavBarGlobalProps> = ({ slots }) => {
    return (
        <div className="grid grid-cols-[25%_1fr_25%] items-center w-full h-16 p-4 border-b border-neutral-100">
            <div className="mr-auto">{slots?.start}</div>
            <div className="flex flex-1 justify-center items-center">{slots?.middle}</div>
            <div className="ml-auto">{slots?.end}</div>
        </div>
    );
};
