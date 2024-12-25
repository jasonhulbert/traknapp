'use client';

import Image from 'next/image';

export default function TrkNavbar() {
    return (
        <div className="z-40 sticky top-0 left-0 w-full p-4 bg-background bg-opacity-80 backdrop-blur-md">
            <div className="flex justify-center">
                <Image src="/brand/logo_dark_color.svg" alt="TRAKN" width={120} height={36} className="h-8 w-auto" />
            </div>
        </div>
    );
}
