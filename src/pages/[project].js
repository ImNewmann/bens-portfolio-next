import { useEffect, useContext } from 'react';
import projectData from '@/data/projectData';
import observe from '@/utilities/observer';
import { SiteContext } from '@/contexts';
import { ProjectHeader } from '@/components/ProjectHeader';
import { ProjectDescription } from '@/components/ProjectDescription';
import { ProjectFooter } from '@/components/ProjectFooter';

export default function Post({ postData, nextPostData }) {
    const [context, setContext] = useContext(SiteContext);

    const fadeIn = (el) => {
        el.classList.add('enter');
    };

    useEffect(() => {
        setContext((prevContext) => {
            return {
                ...prevContext,
                animatingBetweenPages: false,
                theme: 'dark-theme',
            };
        });

        observe('.fade-in', fadeIn, 0.3);
    }, []);

    return (
        <main className="project">
            <ProjectHeader image={postData.projectImage} title={postData.projectTitle} />
            <section className="project__content">
                <ProjectDescription year={postData.year} role={postData.role} technology={postData.technology} description={postData.description} link={postData.link} />
                <div className="project__content-logo-container">
                    {postData.logo.map((image, index) => (
                        <div className="image image--logo fade-in" key={index}>
                            <img src={image.default.src} />
                        </div>
                    ))}
                </div>
                {postData.imagesDesktop.map((image, index) => (
                    <div className="image image--desktop fade-in" key={index}>
                        <img src={image.default.src} />
                    </div>
                ))}

                <div className="project__content-mobile-container">
                    {postData.imagesMobile.map((image, index) => (
                        <div className="image image--mobile fade-in" key={index}>
                            <img src={image.default.src} />
                        </div>
                    ))}
                </div>
            </section>
            <ProjectFooter image={nextPostData.projectImage} title={nextPostData.projectTitle} nextProjectLink={nextPostData.projectSlug} />
        </main>
    );
}

export async function getStaticPaths() {
    const paths = projectData.map((project) => {
        return {
            params: {
                project: project.projectSlug,
            },
        };
    });

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = projectData.filter((project) => project.projectSlug === params.project)[0];
    const postDataIndex = projectData.indexOf(postData);
    const nextPostIndex = postDataIndex === projectData.length - 1 ? 0 : postDataIndex + 1;
    const nextPostData = projectData[nextPostIndex];

    return {
        props: {
            postData: JSON.parse(JSON.stringify(postData)),
            nextPostData: JSON.parse(JSON.stringify(nextPostData)),
            key: postData.projectSlug,
        },
    };
}
