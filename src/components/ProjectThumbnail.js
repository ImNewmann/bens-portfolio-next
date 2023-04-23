import { forwardRef, memo } from 'react';

export const ProjectThumbnail = memo(
    forwardRef(({ image, alt }, ref) => {
        return (
            <div ref={ref} className="project-thumbnail">
                {image && <img src={image.default.src} alt={alt} className="project-thumbnail__image" />}
            </div>
        );
    })
);
