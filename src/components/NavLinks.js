import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NavLinks({ shouldAnimIn, shouldAnimOut }) {
    const router = useRouter();
    const navLinksRef = useRef();

    const animIn = () => {
        gsap.fromTo(navLinksRef.current, 0.4, { autoAlpha: 0, xPercent: 50, skewX: -16 }, { autoAlpha: 1, xPercent: 0, skewX: 0, ease: 'power3.out' });
    };
    const animOut = () => {
        gsap.to(navLinksRef.current, 0.4, { autoAlpha: 0, xPercent: 50, skewX: -16, ease: 'power3.out' }, 0);
    };

    useEffect(() => {
        if (shouldAnimIn) animIn();
        if (shouldAnimOut) animOut();
    }, [shouldAnimIn, shouldAnimOut]);

    return (
        <div className="nav-links" ref={navLinksRef}>
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
}
