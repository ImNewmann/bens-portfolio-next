import { forwardRef, memo } from 'react';

export const Title = memo(
    forwardRef(({ className, text, showBase }, ref) => {
        return (
            <div ref={ref} className={`title ${className ?? ''}`}>
                {showBase && <h1 className="title__base" dangerouslySetInnerHTML={{ __html: `${text}` }}></h1>}
                <h1 className="title__outline" dangerouslySetInnerHTML={{ __html: `${text}` }}></h1>
            </div>
        );
    })
);
