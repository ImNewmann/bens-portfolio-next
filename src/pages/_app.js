import '@/styles/main.scss';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SiteContext } from '@/contexts';
import Cursor from '@/components/Cursor';
import { Nav } from '@/components/Nav';
import Intro from '@/components/Intro';
import isTouchDevice from '@/utilities/isTouchDevice';
import { preloadImages } from '@/utilities/preloadImages';
import projectData from '@/data/projectData';

export default function App({ Component, pageProps }) {
    const [context, setContext] = useState({
        introFinished: false,
        isTouchDevice: false,
        animatingBetweenPages: false,
        theme: 'dark-theme',
    });

    const [imagesPreloaded, setImagesPreloaded] = useState(false);

    const router = useRouter();
    const isAppEntryPoint = router.asPath === '/';

    const handleIntroFinished = () => {
        setContext((prevContext) => {
            return {
                ...prevContext,
                introFinished: true,
            };
        });
    };

    useEffect(() => {
        const projectImages = projectData.map((i) => i.projectImage);
        const aboutMeImg = require('../assets/images/portrait.png');
        const imagesToLoad = projectImages.concat(aboutMeImg).reduce((acc, val) => acc.concat(val), []);
        const initialImages = router.asPath === '/about' ? [aboutMeImg] : imagesToLoad.slice(0, 2);

        imagesToLoad.map(preloadImages); // load all images on site.
        Promise.all(initialImages.map(preloadImages)).then(() => setImagesPreloaded(true));

        setContext((prevContext) => {
            return {
                ...prevContext,
                isTouchDevice: isTouchDevice(),
            };
        });
    }, []);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta property="og:image" content="http://bnewman.co.uk/shareimage.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Ben Newman // Front End Developer</title>
            </Head>
            <SiteContext.Provider value={[context, setContext]}>
                <div className={context.theme}>
                    {isAppEntryPoint && !context.introFinished ? (
                        <Intro handleIntroFinished={handleIntroFinished} />
                    ) : (
                        <div>
                            <Nav />
                            {imagesPreloaded && <Component {...pageProps} />}
                        </div>
                    )}
                    <Cursor />
                </div>
            </SiteContext.Provider>
            <Analytics />
        </>
    );
}
