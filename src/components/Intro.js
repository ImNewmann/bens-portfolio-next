import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { Name } from './Name';

export default function Intro({ handleIntroFinished }) {
    const nameRef = useRef();

    const introAnimation = () => {
        const lettersStaggerOut = gsap.timeline();
        const nonInitials = [].slice.call(nameRef.current.childNodes, 1, -1);

        lettersStaggerOut
            .fromTo(nameRef.current, 3, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'power3.out' })
            .staggerTo(nonInitials, 0.4, { autoAlpha: 0, fontSize: 0, ease: 'power3.out' }, 0.02, 2)
            .eventCallback('onComplete', () => {
                fadeOut();
                setTimeout(() => handleIntroFinished(), 1000);
            });
    };

    const fadeOut = () => {
        gsap.to(nameRef.current, 1, { autoAlpha: 0, ease: 'power3.out' }, 5);
    };

    useEffect(() => {
        introAnimation();
    }, []);

    return <Name className="intro" ref={nameRef} />;
}
