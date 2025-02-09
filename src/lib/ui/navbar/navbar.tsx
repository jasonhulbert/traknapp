'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft01Icon } from 'hugeicons-react';
import { TrkButton } from '../button/button';

export default function TrkNavbar() {
    const { back } = useRouter();

    return (
        <div className="z-40 sticky top-0 left-0 grid grid-cols-[25%_1fr_25%] w-full p-4 bg-background bg-opacity-80 backdrop-blur-md">
            <div className="mr-auto">
                <TrkButton size="sm" variant="ghost" theme="default" onClick={() => back()}>
                    <ArrowLeft01Icon className="w-6 h-6" width={24} height={24} />
                    Back
                </TrkButton>
            </div>
            <div className="flex flex-1 justify-center items-center">
                <Image src="/brand/logo_dark_color.svg" alt="TRAKN" width={120} height={36} className="h-8 w-auto" />
            </div>
            <div className="ml-auto">&nbsp;</div>
        </div>
    );
}
