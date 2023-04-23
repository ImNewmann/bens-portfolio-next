/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // async headers() {
    //     return [
    //         {
    //             // This works, and returns appropriate Response headers:
    //             source: '/(.*).jpg',
    //             headers: [
    //                 {
    //                     key: 'Cache-Control',
    //                     value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
    //                 },
    //             ],
    //         },
    //         {
    //             // This doesn't work for 'Cache-Control' key (works for others though):
    //             source: '/_next/image(.*)',
    //             headers: [
    //                 {
    //                     key: 'Cache-Control',
    //                     // Instead of this value:
    //                     value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
    //                     // Cache-Control response header is `public, max-age=60` in production
    //                     // and `public, max-age=0, must-revalidate` in development
    //                 },
    //             ],
    //         },
    //     ];
    // },
};

module.exports = nextConfig;
