import gsap from 'gsap';
import { useRef, useEffect, useState, useContext } from 'react';
import { SiteContext } from '@/contexts';
import { ArrowLink } from '@/components/ArrowLink';
import { useRouter } from 'next/router';

export default function About() {
    const [context, setContext] = useContext(SiteContext);
    const router = useRouter();
    const about = useRef();
    const aboutBG = useRef();
    const aboutText = useRef();
    const backLink = useRef();
    const link = useRef();

    const animIn = () => {
        const aboutTL = gsap.timeline();
        const speed = 1;
        const delay = 0;
        aboutTL
            .to(about.current, 0.6 * speed, { scaleY: 1, ease: 'power3.out' }, 0 + delay)
            .to(aboutBG.current, 1 * speed, { autoAlpha: 1 }, 0.4 + delay)
            .from(aboutText.current, 0.6, { xPercent: 10, scaleX: 1.2, autoAlpha: 0, ease: 'power3.out' }, 0.8 + delay)
            .from(link.current, 0.6, { autoAlpha: 0, xPercent: -10, ease: 'power3.out' }, 1 + delay)
            .fromTo(backLink.current, 0.4, { autoAlpha: 0, xPercent: 50 }, { autoAlpha: 1, xPercent: 0, ease: 'power3.out' }, 1, 2);
    };

    const animOut = () => {
        const aboutTL = gsap.timeline();

        aboutTL
            .to(link.current, 0.6, { autoAlpha: 0, xPercent: 10, ease: 'power3.out' }, 0.4)
            .to(aboutText.current, 0.6, { xPercent: 10, autoAlpha: 0, ease: 'power3.out' }, 0.6)
            .to(aboutBG.current, 1, { autoAlpha: 0, ease: 'power3.out' }, 0.8)
            .to(about.current, 0.6, { scaleY: 0, ease: 'power3.out' }, 1.2)
            .to(backLink.current, 0.4, { xPercent: -10, ease: 'power3.out' }, 0)
            .to(backLink.current, 0.7, { autoAlpha: 0, xPercent: 50, ease: 'power3.out' }, 0.2)
            .eventCallback('onComplete', () => {
                router.back();
            });
    };

    useEffect(() => {
        setContext({
            ...context,
            theme: 'light-theme',
        });

        animIn();
    }, []);

    return (
        <main>
            <section className="about" ref={about}>
                <div className="about__bg" ref={aboutBG} />
                <div className="about__desc">
                    <div className="about__desc-text">
                        <p ref={aboutText}>Hello. My name is Ben Newman. I'm a Web developer based in London, UK. I'm currently available for work opportunities.</p>
                        <div ref={link}>
                            <a href="mailto:newman1602@gmail.com" className="link">
                                Let's talk
                            </a>
                        </div>
                    </div>
                </div>

                <ArrowLink ref={backLink} onClick={animOut}>
                    GO BACK
                </ArrowLink>
            </section>
        </main>
    );
}
