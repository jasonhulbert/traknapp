'use client';

import { FC, JSX } from 'react';

export type TrkNavBarProps = {
    slots?: TrkNavBarSlots;
};

export type TrkNavBarSlots = {
    start?: JSX.Element;
    middle?: JSX.Element;
    end?: JSX.Element;
};

export const TrkNavBar: FC<TrkNavBarProps> = ({ slots }) => {
    return (
        <div className="z-40 fixed top-0 left-0 grid grid-cols-[25%_1fr_25%] items-center w-full h-14 px-4 bg-background">
            <div className="mr-auto">{slots?.start}</div>
            <div className="flex flex-1 justify-center items-center">{slots?.middle}</div>
            <div className="ml-auto">{slots?.end}</div>
        </div>
    );
};
