import imageCompression from 'browser-image-compression';

export default async function imgCompress(file) {
    var options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    };
    return await imageCompression(file, options);
}
