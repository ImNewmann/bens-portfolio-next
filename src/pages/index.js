import Head from 'next/head';
import gsap from 'gsap';
import { useRef, useState, useContext, useCallback, useEffect } from 'react';
import projectData from '@/data/projectData';
import { useRouter } from 'next/router';
import { SiteContext } from '@/contexts';
import { ProjectBackground } from '@/components/ProjectBackground';
import { Title } from '@/components/Title';
import { ProjectThumbnail } from '@/components/ProjectThumbnail';
import { ProjectCounter } from '@/components/ProjectCounter';
import getIndex from '@/utilities/getIndex';

export default function Home() {
    const [context, setContext] = useContext(SiteContext);
    const router = useRouter();
    const [state, setState] = useState({
        currentIndex: 0,
        projectImages: projectData.map((i) => i.projectImage),
        projectTitles: projectData.map((i) => i.projectTitle),
        projectUrls: projectData.map((i) => i.projectSlug),
        currentProjectThumbnail: projectData[0].projectImage[0],
        currentProjectTitle: projectData[0].projectTitle,
        currentProjectUrl: projectData[0].projectSlug,
        prevProjectTitle: projectData[projectData.length - 1].projectTitle,
        nextProjectTitle: projectData[1].projectTitle,
        hoverActive: false,
        backgroundImages: {
            image1: projectData[0].projectImage,
            image1Active: true,
            image2: projectData[1].projectImage,
            image2Active: false,
        },
        next: false,
        prev: false,
        touchStartVal: 0,
        animElems: {},
    });

    const projectsViewRef = useRef();
    const backgroundImage1Ref = useRef();
    const backgroundImage2Ref = useRef();
    const prevTitleRef = useRef();
    const currentTitleRef = useRef();
    const nextTitleRef = useRef();
    const currentProjectThumbnailRef = useRef();
    const counterRef = useRef();
    const heightBlockRef = useRef();

    const getAnimatableElements = () => {
        const currentTitleBase = currentTitleRef.current.children[0];
        const currentTitleOutline = currentTitleRef.current.children[1];
        const currentProjectThumbnail = currentProjectThumbnailRef.current;
        const prevTitle = prevTitleRef.current.children[0];
        const nextTitle = nextTitleRef.current.children[0];
        const projectsView = projectsViewRef.current;
        const heightBlock = heightBlockRef.current;
        const counter = counterRef.current;
        const backgrounds = {
            wrapper: {
                bg1: backgroundImage1Ref.current,
                bg2: backgroundImage2Ref.current,
            },
            clear: {
                bg1: backgroundImage1Ref.current.childNodes[0],
                bg2: backgroundImage2Ref.current.childNodes[0],
            },
            blur: {
                bg1: backgroundImage1Ref.current.childNodes[1],
                bg2: backgroundImage1Ref.current.childNodes[1],
            },
        };

        return {
            currentTitleBase,
            currentTitleOutline,
            currentProjectThumbnail,
            prevTitle,
            nextTitle,
            backgrounds,
            projectsView,
            counter,
            heightBlock,
        };
    };

    const animateBackground = (components) => {
        const backgroundImage1 = components.backgrounds.wrapper.bg1;
        const backgroundImage2 = components.backgrounds.wrapper.bg2;
        const startingPointBG = state.backgroundImages.image1Active ? backgroundImage2 : backgroundImage1;
        const endingPointBG = state.backgroundImages.image1Active ? backgroundImage1 : backgroundImage2;

        const tl = gsap.timeline();
        tl.to(startingPointBG, 1, { autoAlpha: 0 }, 0.7);
        tl.to(endingPointBG, 1, { autoAlpha: 0.7 }, 0.7);
    };

    const animateProjectTitles = (components, direction) => {
        const tl = gsap.timeline();
        const duration = 0.4;
        const animVals = {
            autoAlpha: 0,
            y: `${direction === 'down' ? '50vh' : '-50vh'}`,
            ease: 'power3.out',
        };

        tl.from(components.currentTitleBase, duration, animVals, 0)
            .from(components.currentTitleOutline, duration, animVals, 0)
            .from(components.prevTitle, duration, animVals, 0)
            .from(components.nextTitle, duration, animVals, 0);
    };

    const animateProjectThumbnail = (components) => {
        const featuredImageTL = gsap.timeline();

        featuredImageTL
            .set(components.projectsView, { pointerEvents: 'none' })
            .to(
                components.currentProjectThumbnail,
                0.5,
                {
                    autoAlpha: 0.01,
                    xPercent: 15,
                    skewX: -7,
                    ease: 'power3.out',
                },
                0
            )
            .to(
                components.currentProjectThumbnail,
                0.6,
                {
                    autoAlpha: 1,
                    xPercent: 0,
                    skewX: 0,
                    ease: 'power3.out',
                },
                0.7
            )
            .set(components.projectsView, { pointerEvents: 'all' }, 1.4);
    };

    const animateBetweenProjects = (components) => {
        if (!state.next && !state.prev) return;
        const direction = state.next ? 'down' : 'up';

        animateBackground(components);
        animateProjectTitles(components, direction);
        animateProjectThumbnail(components, direction);
    };

    const updateProjectsViewState = () => {
        if (!state.next && !state.prev) return;

        setState((prevState) => {
            const backgroundActive = prevState.backgroundImages.image1Active ? 'image2' : 'image1';
            const activeBG = prevState.projectImages[getIndex(prevState.currentIndex, projectData)];

            return {
                ...prevState,
                currentProjectUrl: prevState.projectUrls[prevState.currentIndex],
                currentProjectTitle: prevState.projectTitles[prevState.currentIndex],
                prevProjectTitle: prevState.currentIndex === 0 ? prevState.projectTitles[prevState.projectTitles.length - 1] : prevState.projectTitles[prevState.currentIndex - 1],
                nextProjectTitle: prevState.currentIndex === prevState.projectTitles.length - 1 ? prevState.projectTitles[0] : prevState.projectTitles[prevState.currentIndex + 1],
                backgroundImages: {
                    ...prevState.backgroundImages,
                    [backgroundActive]: activeBG,
                    image1Active: !prevState.backgroundImages.image1Active,
                    image2Active: !prevState.backgroundImages.image2Active,
                },
            };
        });
        setTimeout(() => {
            setState((prevState) => {
                return {
                    ...prevState,
                    currentProjectThumbnail: prevState.projectImages[prevState.currentIndex][0],
                };
            });
        }, 600);
        setTimeout(() => {
            setState((prevState) => {
                return {
                    ...prevState,
                    next: false,
                    prev: false,
                };
            });
        }, 1000);
    };

    const handleScroll = (e) => {
        setState((prevState) => {
            if (prevState.next || prevState.prev) return prevState;

            const next = e.deltaY ? e.deltaY > 0 : e.changedTouches ? e.changedTouches[0].clientY < prevState.touchStartVal : false;
            const prev = e.deltaY ? e.deltaY < 0 : e.changedTouches ? e.changedTouches[0].clientY > prevState.touchStartVal : false;
            const currentIndex = next ? getIndex(prevState.currentIndex + 1, projectData) : prev ? getIndex(prevState.currentIndex - 1, projectData) : prevState.currentIndex;

            return {
                ...prevState,
                currentIndex,
                next,
                prev,
            };
        });
    };

    const handleHover = (components, onHover) => {
        if (context.isTouchDevice) return;

        const backgroundImage = state.backgroundImages.image1Active ? components.backgrounds.blur.bg1 : components.backgrounds.blur.bg2;
        const hoverTL = gsap.timeline();
        const hoverOver = !state.hoverActive && onHover;
        const hoverLeave = state.hoverActive && !onHover;

        if (!hoverOver && !hoverLeave) return;

        setState((prevState) => {
            return {
                ...prevState,
                hoverActive: hoverOver,
            };
        });

        hoverTL
            .to(components.currentTitleBase, 0.4, { scale: hoverOver ? 1.1 : 1, ease: 'power3.out' }, 0)
            .to(components.currentTitleOutline, 0.4, { scale: hoverOver ? 1.1 : 1, ease: 'power3.out' }, 0)
            .to(components.currentProjectThumbnail, 0.8, { scale: hoverOver ? 1.1 : 1, ease: 'power3.out' }, 0)
            .to(
                components.prevTitle,
                0.4,
                {
                    yPercent: hoverOver ? -50 : 0,
                    autoAlpha: hoverOver ? 0 : 0.3,
                    ease: 'power3.out',
                },
                0
            )
            .to(
                components.nextTitle,
                0.4,
                {
                    yPercent: hoverOver ? 50 : 0,
                    autoAlpha: hoverOver ? 0 : 0.3,
                    ease: 'power3.out',
                },
                0
            );
        // .to(backgroundImage, 0.4, { filter: `grayscale(${hoverOver ? 0.8 : 0})` }, 0); removed for now as was causing flickering
    };

    const scroll = useCallback(() => {
        window.addEventListener('wheel', handleScroll, true);
        window.addEventListener('touchstart', (e) => {
            setState((prevState) => {
                return {
                    ...prevState,
                    touchStartVal: e.changedTouches[0].clientY,
                };
            });
        });
        window.addEventListener('touchmove', handleScroll, true);
    }, []);

    const removeScroll = useCallback(() => {
        window.removeEventListener('wheel', handleScroll, true);
        window.removeEventListener('touchmove', handleScroll, true);
    }, []);

    const animatePageIn = (components) => {
        const backgroundImageWrapper = state.backgroundImages.image1Active ? components.backgrounds.wrapper.bg1 : components.backgrounds.wrapper.bg2;
        const animateTL = gsap.timeline();

        const delay = 0.2;

        animateTL
            .fromTo(
                components.currentProjectThumbnail,
                0.4,
                {
                    autoAlpha: 0.001,
                    yPercent: -50,
                    xPercent: `${context.touchDevice ? 15 : 20}`,
                    skewX: -7,
                },
                {
                    autoAlpha: 1,
                    yPercent: -50,
                    xPercent: 0,
                    skewX: 0,
                    ease: 'power3.out',
                },
                0.1 + delay
            )
            .fromTo(
                components.currentTitleBase,
                0.4,
                { autoAlpha: 0.001, yPercent: -50, scaleX: 1.2 },
                {
                    autoAlpha: 1,
                    yPercent: -50,
                    scaleX: 1,
                    xPercent: 0,
                    ease: 'power3.out',
                },
                0.3 + delay
            )
            .fromTo(
                components.currentTitleOutline,
                0.4,
                { autoAlpha: 0.001, yPercent: -50, scaleX: 1.2 },
                {
                    autoAlpha: 1,
                    yPercent: -50,
                    scaleX: 1,
                    xPercent: 0,
                    ease: 'power3.out',
                },
                0.3 + delay
            )
            .fromTo(
                components.prevTitle,
                0.4,
                { autoAlpha: 0.001, yPercent: -100, skewX: -20, skewY: -20 },
                {
                    autoAlpha: 0.3,
                    yPercent: 0,
                    skewX: 0,
                    skewY: 0,
                    ease: 'power3.out',
                },
                0.3 + delay
            )
            .fromTo(
                components.nextTitle,
                0.4,
                { autoAlpha: 0.001, yPercent: 100, skewX: -20, skewY: 20 },
                {
                    autoAlpha: 0.3,
                    yPercent: 0,
                    skewX: 0,
                    skewY: 0,
                    ease: 'power3.out',
                },
                0.3 + delay
            )
            .fromTo(components.counter, 0.4, { autoAlpha: 0.001, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, ease: 'power3.out' }, 0.7 + delay)
            .fromTo(backgroundImageWrapper, 1, { autoAlpha: 0 }, { autoAlpha: 0.7 }, 0.7 + delay);
        setTimeout(() => {
            components.projectsView.style.pointerEvents = 'all';
            scroll();
        }, 2500);
    };

    const handlePageExit = (e, nextUrl) => {
        e.preventDefault();
        const components = state.animElems;
        const backgroundImageWrapper = state.backgroundImages.image1Active ? components.backgrounds.wrapper.bg1 : components.backgrounds.wrapper.bg2;
        const backgroundImageClear = state.backgroundImages.image1Active ? components.backgrounds.clear.bg1 : components.backgrounds.clear.bg2;
        const animateTL = gsap.timeline();

        components.prevTitle.style.display = 'none';
        components.nextTitle.style.display = 'none';
        components.projectsView.style.pointerEvents = 'none';

        removeScroll();

        setContext((prevContext) => {
            return {
                ...prevContext,
                animatingBetweenPages: true,
            };
        });

        animateTL
            .to(components.currentTitleBase, 0.4, { scale: 1, ease: 'power3.out' }, 0.2)
            .to(components.currentTitleOutline, 0.4, { scale: 1, ease: 'power3.out' }, 0.2)
            .to(components.currentProjectThumbnail, 0.6, { autoAlpha: 0, skewX: -7, xPercent: 20, ease: 'power3.out' }, 0.2)
            .to(components.currentTitleBase, 0.8, { autoAlpha: 0, scale: 1, ease: 'power3.out' }, 0.2)
            .to(backgroundImageWrapper, 1.2, { autoAlpha: 0.9, ease: 'power3.out' }, 0.2) // BG SCALE
            .to(backgroundImageClear, 1.8, { scale: 1, autoAlpha: 1, ease: 'power3.out' }, 0.2) //BLUR OUT
            .to(components.counter, 0.4, { autoAlpha: 0, ease: 'power3.out' }, 0.2)
            .to(components.currentTitleBase, 1.6, { autoAlpha: 1, ease: 'power3.out' }, 1.4) // TITLE FILL
            .to(components.heightBlock, 0.6, { transform: 'translateY(1px)', ease: 'power3.out' }, 1.8) // HEIGHT
            .eventCallback('onComplete', () => router.push(`/${nextUrl}`));
    };

    useEffect(() => {
        const animatableElements = getAnimatableElements();
        animatePageIn(animatableElements);

        setState({
            ...state,
            animElems: animatableElements,
        });

        setContext((prevContext) => {
            return {
                ...prevContext,
                animatingBetweenPages: false,
                theme: 'dark-theme',
            };
        });
    }, []);

    useEffect(() => {
        updateProjectsViewState();
    }, [state.currentIndex]);

    useEffect(() => {
        animateBetweenProjects(state.animElems);
    }, [state.currentProjectTitle]);

    return (
        <>
            <Head>
                <title>Ben Newman // Front End Developer</title>
            </Head>
            <main ref={projectsViewRef} className="projects-list">
                <ProjectBackground ref={backgroundImage1Ref} backgroundURL={state.backgroundImages.image1} />
                <ProjectBackground ref={backgroundImage2Ref} backgroundURL={state.backgroundImages.image2} />
                <Title ref={prevTitleRef} text={state.prevProjectTitle} className="title--prev" />
                <a
                    href={`/${state.currentProjectUrl}`}
                    className="projects-list__link link"
                    onClick={(e) => handlePageExit(e, state.currentProjectUrl)}
                    onMouseOver={() => handleHover(state.animElems, true)}
                    onMouseLeave={() => handleHover(state.animElems, false)}
                >
                    <Title ref={currentTitleRef} showBase text={state.currentProjectTitle} />
                    <ProjectThumbnail ref={currentProjectThumbnailRef} image={state.currentProjectThumbnail} alt={state.currentProjectTitle} />
                </a>
                <ProjectCounter ref={counterRef} currentNum={0 + (state.currentIndex + 1)} maximumNum={projectData.length.toString()} />
                <Title ref={nextTitleRef} text={state.nextProjectTitle} className="title--next" />
                <div ref={heightBlockRef} className="height-block"></div>
            </main>
        </>
    );
}
