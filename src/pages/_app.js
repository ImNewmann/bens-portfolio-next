import '@/styles/main.scss';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SiteContext } from '@/contexts';
import Cursor from '@/components/Cursor';
import { Nav } from '@/components/Nav';
import Intro from '@/components/Intro';
import isTouchDevice from '@/utilities/isTouchDevice';

export default function App({ Component, pageProps }) {
    const [context, setContext] = useState({
        introFinished: false,
        isTouchDevice: false,
        theme: 'dark-theme',
    });

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
                            <Component {...pageProps} />
                        </div>
                    )}
                    <Cursor />
                </div>
            </SiteContext.Provider>
        </>
    );
}
