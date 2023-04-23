import { forwardRef, memo } from 'react';

export const ProjectCounter = memo(
    forwardRef(({ currentNum, maximumNum }, ref) => {
        return (
            <div ref={ref} className="counter">
                <span className="counter--min">{currentNum}</span>
                <span className="counter--max">/ {maximumNum}</span>
            </div>
        );
    })
);
