import { FC, JSX } from 'react';
import Image from 'next/image';

export const NavbarGlobalBrand: FC = (): JSX.Element => {
    return (
        <div className="block h-4 w-auto">
            <Image
                src="/brand/trakn_light_frameless.svg"
                alt="Trakn"
                width={112}
                height={26}
                className="w-full h-full"
            />
        </div>
    );
};
