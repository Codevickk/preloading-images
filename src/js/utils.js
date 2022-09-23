export const preloadImage = (image) => {
    return new Promise((resolve, reject) => {
        image.src = image.getAttribute('data-src');
        image.onload = resolve;
    });
}