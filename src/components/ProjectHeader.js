import { Title } from './Title';
import { ProjectBackground } from './ProjectBackground';

export const ProjectHeader = ({ image, title }) => {
    return (
        <section className="project__header">
            <ProjectBackground backgroundURL={image} />
            <Title showBase text={title} />
            <div className="height-block"></div>
        </section>
    );
};
