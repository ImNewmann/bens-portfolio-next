import { useEffect, useState, useRef, memo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Name } from './Name';
import NavLinks from './NavLinks';

export const Nav = () => {
    const [state, setState] = useState({
        shouldAnimIn: false,
        shouldAnimOut: false,
    });

    const nameRef = useRef();
    const router = useRouter();

    const handleNavAnimations = (fadeOutDelay, fadeInDelay) => {
        animOut(fadeOutDelay);
        animIn(fadeInDelay);
    };

    const animIn = (delay) => {
        setTimeout(() => {
            setState({
                shouldAnimIn: true,
                shouldAnimOut: false,
            });
        }, delay);
    };

    const animOut = (delay) => {
        setTimeout(() => {
            setState({
                shouldAnimIn: false,
                shouldAnimOut: true,
            });
        }, delay);
    };

    useEffect(() => {
        animIn(0);
    }, []);

    useEffect(() => {
        router.events.on('routeChangeStart', () => handleNavAnimations(0, 1800));

        return () => {
            router.events.off('routeChangeStart', handleNavAnimations);
        };
    }, [router]);

    return (
        <nav>
            <Link href="/">
                <Name ref={nameRef} shouldAnimIn={state.shouldAnimIn} shouldAnimOut={state.shouldAnimOut} />
            </Link>
            <NavLinks shouldAnimIn={state.shouldAnimIn} shouldAnimOut={state.shouldAnimOut} />
        </nav>
    );
};
