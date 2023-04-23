import { useState, useEffect, useContext, memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { SiteContext } from '@/contexts';
import gsap from 'gsap';

export default function Cursor() {
    const router = useRouter();
    const [context] = useContext(SiteContext);
    const [state, setState] = useState({
        onLink: false,
        isActive: false,
        isMoving: false,
        posX: 0,
        posY: 0,
        mouseX: 0,
        mouseY: 0,
        cssLeft: 0,
        cssTop: 0,
    });

    const animateCursor = () => {
        gsap.to(
            {},
            {
                duration: 0.01,
                repeat: -1,
                onRepeat: () => {
                    setState((prevState) => {
                        return {
                            ...prevState,
                            posX: (prevState.posX += (prevState.mouseX - prevState.posX) / 9),
                            posY: (prevState.posY += (prevState.mouseY - prevState.posY) / 9),
                            cssLeft: prevState.posX,
                            cssTop: prevState.posY,
                        };
                    });
                },
            }
        );
    };

    let timeout = null;
    const handleOnMove = useCallback((e) => {
        setState((prevState) => {
            return {
                ...prevState,
                isActive: true,
                isMoving: true,
                mouseX: e.pageX,
                mouseY: e.pageY,
            };
        });

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setState((prevState) => {
                return {
                    ...prevState,
                    isMoving: false,
                };
            });
        }, 200);
    }, []);

    const handleOnLink = useCallback((onLink) => {
        setState((prevState) => {
            return {
                ...prevState,
                onLink,
            };
        });
    }, []);

    const handleLinkAnimations = () => {
        const links = document.querySelectorAll('.link');
        links.forEach((link) => {
            link.removeEventListener('mouseenter', () => handleOnLink(true));
            link.removeEventListener('mouseleave', () => handleOnLink(false));
            link.addEventListener('mouseenter', () => handleOnLink(true));
            link.addEventListener('mouseleave', () => handleOnLink(false));
        });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleOnMove);
        animateCursor();

        return () => {
            window.removeEventListener('mousemove', handleOnMove);
        };
    }, []);

    useEffect(() => {
        handleLinkAnimations();
    }, [context.introFinished, router.asPath]);

    return (
        <div className={`cursor ${state.isActive ? 'cursor--show' : ''} ${state.isMoving ? 'cursor--moving' : ''} ${state.onLink ? 'cursor--link' : ''}`}>
            <div className="cursor__inner" style={{ left: state.mouseX + 'px', top: state.mouseY + 'px' }}></div>
            <div className="cursor__outer" style={{ left: state.cssLeft + 'px', top: state.cssTop + 'px' }}></div>
        </div>
    );
}
