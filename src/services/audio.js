import axios from '../axios';
/** Api For get Audios  */
export const getAudios = async (category, page, limit = 35) => {
    const { data } = await axios.get(
        `audio/getApprovedAudios?sort=${category}&page=${page}&limit=${limit}`
    );
    return data;
};
/** Get Audio */
export const getAudio = async (id, headers = null) => {
    let url = `audio/getAlbum?id=${id}`;
    // if (user) url = url + `&user=${user}`;
    const { data } = await axios.get(url,{headers:headers});
    return data;
};
/** Profile Audios */
export const getProfileAudios = async (profileData) => {
    const { data } = await axios.post('audio/getMyAlbums', profileData);
    return data;
};
/** Admin Audios */

export const getAdminAudios = async (page = 1, limit = 5) => {
    const { data } = await axios.get(`audio/getAllAlbums?page=${page}&limit=${limit}`);
    return data;
};
/** Approve Admin Audios */
export const approveAdminAudios = async (audioData) => {
    const { data } = await axios.post('admin/album-approval', audioData);
    return data;
};
/** Delete Album */
export const deleteAlbum = async (id) => {
    const { data } = await axios.delete(`audio/deleteAlbum/${id}`);
    return data;
};
/** Upload Audio Track */
export const uploadAudioTrack = async (trackData) => await axios.post('audio/saveTrack', trackData);
/** Upload Audio */
export const uploadAudio = async (audioData, progressCallback) =>
    await axios.request({
        method: 'post',
        url: 'audio/saveAlbum',
        data: audioData,
        onUploadProgress: progressCallback
    });
/** Edit Audio */
export const editAudio = async (editData) => await axios.post('/audio/updateAlbum', editData);
