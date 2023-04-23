import { forwardRef, memo } from 'react';

export const ProjectBackground = memo(
    forwardRef(({ backgroundURL }, ref) => {
        return (
            <div ref={ref} className="project-background">
                <div className="project-background__item" style={{ backgroundImage: `url(${backgroundURL ? backgroundURL[0].default.src : ''})` }}></div>
                <div className="project-background__item blur" style={{ backgroundImage: `url(${backgroundURL ? backgroundURL[1].default.src : ''})` }}></div>
            </div>
        );
    })
);
