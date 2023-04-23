import { useEffect, useState, useRef, useContext } from 'react';
import { SiteContext } from '@/contexts';
import Link from 'next/link';
import { Name } from './Name';
import { NavLinks } from './NavLinks';
import gsap from 'gsap';

export const Nav = () => {
    const [context] = useContext(SiteContext);
    const nameRef = useRef();
    const navLinksRef = useRef();

    const handleNavAnimations = (fadeOutDelay, fadeInDelay) => {
        animOut(fadeOutDelay);
        animIn(fadeInDelay);
    };

    const animIn = (delay = 1800) => {
        const animInTL = gsap.timeline();

        setTimeout(() => {
            animInTL
                .fromTo(nameRef.current, 0.4, { autoAlpha: 0, xPercent: -50, skewX: 16 }, { autoAlpha: 0.9, xPercent: 0, skewX: 0, ease: 'power3.out' }, 0)
                .fromTo(navLinksRef.current, 0.4, { autoAlpha: 0, xPercent: 50, skewX: -16 }, { autoAlpha: 1, xPercent: 0, skewX: 0, ease: 'power3.out' }, 0);
        }, delay);
    };

    const animOut = (delay = 200) => {
        const animOutTL = gsap.timeline();

        setTimeout(() => {
            animOutTL
                .to(nameRef.current, 0.4, { autoAlpha: 0, xPercent: -50, skewX: 16, ease: 'power3.out' }, 0)
                .to(navLinksRef.current, 0.4, { autoAlpha: 0, xPercent: 50, skewX: -16, ease: 'power3.out' }, 0);
        }, delay);
    };

    useEffect(() => {
        animIn(0);
    }, []);

    useEffect(() => {
        if (context.animatingBetweenPages) handleNavAnimations();
    }, [context.animatingBetweenPages]);

    return (
        <nav>
            <Link href="/">
                <Name ref={nameRef} onClick={handleNavAnimations} />
            </Link>
            <NavLinks ref={navLinksRef} />
        </nav>
    );
};
