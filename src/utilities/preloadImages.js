export const preloadImages = (path) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = path.default.src;
        img.onload = () => resolve({ path, status: 'ok' });
    });
};
