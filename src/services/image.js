import axios from '../axios';
/** Api for get Images */
export const getImages = async (category, page) => {
    const { data } = await axios.get('image/getApprovedImages?sort=' + category + '&page=' + page);
    return data;
};
/** Get Image */
export const getImage = async (id) => {
    const { data } = await axios.get('image/getAlbum?id=' + id);
    return data;
};
export const getImagesList = async () => {
    const { data } = await axios.get('image/getApprovedImages?page=1');
    return data;
};
/** Profile Images */
export const getProfileImages = async (profileData) => {
    const { data } = await axios.post('image/getMyAlbums', profileData);
    return data;
};
/** Admin Images */
export const getAdminImages = async (page = 1, limit = 5) => {
    const { data } = await axios.get(`image/getAllAlbums?page=${page}&limit=${limit}`);
    return data;
};
// Delete Image Album
export const deleteImageAlbum = async (id) => {
    const { data } = await axios.delete(`image/deleteAlbum/${id}`);
    return data;
};
/** Approve Admin Images */
export const approveAdminImages = async (imageData) => {
    const { data } = await axios.post('admin/album-approval', imageData);
    return data;
};
/** Upload Image Track */
export const uploadImageTrack = async (imageTrack) =>
    await axios.post('image/saveImage', imageTrack);
/** Image Upload */
export const uploadImage = async (imageData, progressCallback) =>
    await axios.request({
        method: 'post',
        url: 'image/saveAlbum',
        data: imageData,
        onUploadProgress: progressCallback
    });
/** Edit Image */
export const editImage = async (editData) => await axios.post('/image/updateAlbum', editData);
