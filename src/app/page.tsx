import { TrkLink } from '@/lib/ui/link/link';

export default function Home() {
    return (
        <div className="flex flex-col gap-y-4 p-4">
            <ul>
                <li>
                    <TrkLink href={`/plans`}>Plans</TrkLink>
                </li>
                <li>
                    <TrkLink href={`/logs`}>Logs</TrkLink>
                </li>
            </ul>
        </div>
    );
}
