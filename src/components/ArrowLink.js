import { forwardRef, useState, useContext } from 'react';
import { SiteContext } from '@/contexts';

export const ArrowLink = forwardRef(({ onClick, handleHover, children }, ref) => {
    const [isBeingHoveredOn, setIsBeingHoveredOn] = useState(false);
    const [context] = useContext(SiteContext);

    const handleArrowHover = (onHover) => {
        if (context.isTouchDevice) return;

        setIsBeingHoveredOn(onHover);
        if (handleHover) handleHover(onHover);
    };

    return (
        <div className="arrow-link link" ref={ref} onMouseOver={() => handleArrowHover(true)} onMouseLeave={() => handleArrowHover(false)} onClick={onClick}>
            <span className={`animated-arrow ${isBeingHoveredOn ? 'hover' : ''}`}>
                <span className="the-arrow -left">
                    <span className="shaft"></span>
                </span>
                <span className="main">
                    <span className="text">{children}</span>
                    <span className="the-arrow -right">
                        <span className="shaft"></span>
                    </span>
                </span>
            </span>
        </div>
    );
});
