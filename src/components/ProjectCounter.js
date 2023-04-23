import { forwardRef, memo } from 'react';

export const ProjectCounter = memo(
    forwardRef(({ currentNum, maximumNum }, ref) => {
        return (
            <div ref={ref} className="counter">
                <span className="counter__min">{currentNum}</span>
                <span className="counter__line">/</span>
                <span className="counter__max">{maximumNum}</span>
            </div>
        );
    })
);
