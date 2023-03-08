import axios from '../axios';
/**  Home Page Data */
export const getHomePageDate = async () => {
    const { data } = await axios.get('common/getHomeData');
    return data;
};
export const getMediaBySearch = async (val, category) => {
    const { data } = await axios.get(`/common/getMedia?search=${val}&type=${category}`);
    return data;
};
export const getFeaturedVideos = async (page = 1, limit = 10) => {
    const { data } = await axios.get(`video/getFeaturedVideos?page=${page}&limit=${limit}`);
    return data;
};
export const getAdminFeaturedVideos = async (page = 1, limit = 10) => {
    const { data } = await axios.get(`video/getAdminFeaturedVideos?page=${page}&limit=${limit}`);
    return data;
};

export const updateFeaturedVideo = async (id, featured) => {
    const { data } = await axios.post('video/updateFeaturedVideo', { id, featured });
    return data;
};
/**  Video Page Data */
export const getVideos = async (category, page, limit = 30) => {
    const { data } = await axios.get(
        `video/getApprovedVideos?sort=${category}&page=${page}&limit=${limit}`
    );
    return data;
};
/** Get Single Video  */
export const getVideo = async (videoId,headers=null) => {
    let url = `video/getVideoDetails?videoId=${videoId}`;
    // if (user) url = url + `&user=${user}`;
    const data = await axios.get(url,{headers:headers});
    return data;
};
/** Profile Videos */
export const getProfileVideos = async (profileData) => {
    const { data } = await axios.post('video/getMyVideos', profileData);
    return data;
};
/** Admin Videos */
export const getAdminVideos = async (page = 1, limit = 5) => {
    const { data } = await axios.get(`video/getVideos?page=${page}&limit=${limit}`);
    return data;
};
/** Admin Video Approval */
export const approveAdminVideos = async (videoData) => {
    const { data } = await axios.post('admin/video-approval', videoData);
    return data;
};
/** Video Upload */
export const uploadVideoInfo = async (videoData, progressCallback) =>
    await axios.request({
        method: 'post',
        url: 'video/saveVideoData',
        data: videoData,
        onUploadProgress: progressCallback
    });
// Video Update
export const editVideo = async (editData) => await axios.post('/video/updateVideo', editData);

// Video Delete Api

export const deleteVideo = async (id) => await axios.delete(`/video/deleteVideo/${id}`);
