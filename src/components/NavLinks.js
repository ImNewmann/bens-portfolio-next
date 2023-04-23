import { useRouter } from 'next/router';
import { forwardRef } from 'react';
import Link from 'next/link';

export const NavLinks = forwardRef(({}, ref) => {
    const router = useRouter();

    return (
        <div className="nav-links" ref={ref}>
            <ul>
                <li className={`nav-links__item link ${router.asPath === '/about' ? 'active' : ''}`}>
                    <Link href="/about">About Me</Link>
                </li>
                <li className="nav-links__item link">
                    <a href="mailto:newman1602@gmail.com">Contact</a>
                </li>
            </ul>
        </div>
    );
});
