import gsap from 'gsap';
import { useRef, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { ProjectBackground } from './ProjectBackground';
import { Title } from './Title';
import { ArrowLink } from './ArrowLink';
import { SiteContext } from '@/contexts';

export const ProjectFooter = ({ image, title, nextProjectLink }) => {
    const [context, setContext] = useContext(SiteContext);
    const [animatableElements, setAnimatableElements] = useState();
    const [animationActive, setAnimationActive] = useState(false);
    const router = useRouter();
    const nextProjectBG = useRef();
    const nextProjectTitle = useRef();
    const heightBlock = useRef();
    const nextLink = useRef();

    const getAnimatableElements = () => {
        const body = document.querySelector('body');

        return {
            body,
            nextProjectTitle: nextProjectTitle.current.childNodes[0],
            nextProjectBG: nextProjectBG.current,
            nextProjectBGScale: nextProjectBG.current.childNodes[0],
            nextProjectBGBlur: nextProjectBG.current.childNodes[1],
            nextLink: nextLink.current,
            heightBlock: heightBlock.current,
        };
    };

    const handleNextHover = (onHover) => {
        if (animationActive) return;
        const components = animatableElements;

        const tl = gsap.timeline();
        tl.to(
            components.nextProjectBGScale,
            0.8,
            {
                rotation: onHover ? 7 : 0,
                scale: onHover ? 2.2 : 2,
                autoAlpha: onHover ? 1 : 0,
                ease: 'power3.out',
            },
            0
        ).to(components.nextProjectTitle, 1, { autoAlpha: onHover ? 1 : 0, ease: 'power3.out' }, 0);
    };

    const animateOut = () => {
        const components = animatableElements;
        const tl = gsap.timeline();

        setContext((prevContext) => {
            return {
                ...prevContext,
                animatingBetweenPages: true,
            };
        });

        window.scroll(0, document.body.scrollHeight);
        setAnimationActive(true);

        tl.to(components.nextLink, 0.4, { xPercent: -10, ease: 'power3.out' }, 0)
            .to(components.nextLink, 0.7, { autoAlpha: 0, xPercent: 50, ease: 'power3.out' }, 0.2)
            .set(components.body, { overflow: 'hidden' }, 0.2)
            .to(components.nextProjectBGScale, 1.6, { scale: 1, autoAlpha: 1, rotation: 0, ease: 'power3.out' }, 0.2)
            .to(components.nextProjectBG, 1.6, { autoAlpha: 0.9, ease: 'power3.out' }, 0.2)
            .to(components.nextProjectTitle, 1, { autoAlpha: 1, ease: 'power3.out' }, 1.4)
            .to(components.heightBlock, 0.6, { y: 1, ease: 'power3.out' }, 1.8)
            .set(components.nextProjectBGBlur, { visibility: 'hidden' }, 1.8)
            .eventCallback('onComplete', () => {
                setAnimationActive(false);
                components.body.style.overflow = 'inherit';
                router.push(`/${nextProjectLink}`);
            });
    };

    useEffect(() => {
        const animatableElements = getAnimatableElements();
        setAnimatableElements(animatableElements);
    }, []);
    return (
        <section className="project__footer">
            <ProjectBackground ref={nextProjectBG} backgroundURL={image} />
            <Title ref={nextProjectTitle} showBase text={title} />
            <ArrowLink ref={nextLink} onClick={animateOut} handleHover={handleNextHover}>
                VIEW PROJECT
            </ArrowLink>
            <div ref={heightBlock} className="height-block"></div>
        </section>
    );
};
