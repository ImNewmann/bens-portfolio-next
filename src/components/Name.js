import gsap from 'gsap';
import { forwardRef, useContext, useEffect } from 'react';
import { SiteContext } from '@/contexts';

export const Name = forwardRef(({ className, onClick }, ref) => {
    const [context] = useContext(SiteContext);

    const mouseOver = () => {
        const nonInitials = [].slice.call(ref.current.childNodes, 1, -1);
        const tl = gsap.timeline();

        tl.staggerTo(
            nonInitials,
            0.4,
            {
                autoAlpha: 1,
                fontSize: `${context.isTouchDevice ? '6vw' : 30}`,
                ease: 'power3.out',
            },
            0.02
        );
    };

    const mouseLeave = () => {
        const nonInitials = [].slice.call(ref.current.childNodes, 1, -1);
        const tl = gsap.timeline();
        tl.staggerTo(nonInitials, 0.4, { autoAlpha: 0, fontSize: 0, ease: 'power3.out' }, 0.02);
    };

    return (
        <div ref={ref} className={`name link ${className ?? ''}`} onMouseOver={mouseOver} onMouseLeave={mouseLeave} onClick={onClick}>
            <span>B</span>
            <span>E</span>
            <span>N</span>
            <span>N</span>
            <span>E</span>
            <span>W</span>
            <span>M</span>
            <span>A</span>
            <span>N</span>
        </div>
    );
});
