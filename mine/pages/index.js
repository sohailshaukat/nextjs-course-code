import Link from 'next/Link';

function HomePage() {
    return <div>
        <h1>The Home Page</h1>
        <ul>
            <li>
                <Link href="/portfolio">Portfolio</Link>
            </li>
            <li>
                <Link href="/clients">Portfolio</Link>
            </li>
        </ul>
    </div>
}

export default HomePage; 