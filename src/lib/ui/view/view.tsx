import { PropsWithChildren } from 'react';

export default function TrkView({ children }: Readonly<PropsWithChildren>) {
    return <div className="p-4 max-w-screen-sm mx-auto">{children}</div>;
}
