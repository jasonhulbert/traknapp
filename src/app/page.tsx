import Link from 'next/link';

export default function Home() {
    return (
        <>
            <ul>
                <li>
                    <Link href={`/plans`}>Plans</Link>
                </li>
            </ul>
        </>
    );
}
