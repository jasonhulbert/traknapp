import Link from 'next/link';

export default function Home() {
    return (
        <>
            <h1>Welcome</h1>
            <ul>
                <li>
                    <Link href={`/plan`}>Plan</Link>
                </li>
            </ul>
        </>
    );
}
