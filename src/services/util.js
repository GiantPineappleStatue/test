import axios from '../axios';

/** Login Api */
export const login = async (userData) => {
    try {
        const { data } = await axios.post('auth/login', userData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};
export const resetPassword = async (resetEmail) =>
    await axios.post('auth/forgot-password', resetEmail);

export const changePassword = async (passwordData, headers) => {
    const { data } = await axios.post('auth/reset-password', passwordData, { headers });
    return data;
};
/** Forget Password */
export const forgetPassword = async (forgetData) => {
    const { data } = await axios.post('auth/forgot-password', forgetData);
    return data;
};
/** Sign Up  */
export const signUp = async (signUpData) => {
    try {
        const { data } = await axios.post('auth/register', signUpData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};
/** Admin Get All Users */
export const getAllUsers = async () => {
    const { data } = await axios.get('admin/getAllUsers');
    return data;
};
/** Admin Logs  */
export const getAllLogs = async () => {
    const { data } = await axios.get('admin/getAllLogs');
    return data;
};
/** Admin Get Ads */
export const getAllAds = async (page = 1, limit = 5) => {
    const { data } = await axios.get(`ad/getAllAds?page=${page}&limit=${limit}`);
    return data;
};
/** Admin Approve Ads */
export const approveAdminAds = async (adsData) => {
    const { data } = await axios.post('admin/ad-approval', adsData);
    return data;
};
/** Profile User */
export const getProfile = async (profileData) => {
    const { data } = await axios.post('auth/getUser', profileData);
    return data;
};
/** Update profile */
export const updateProfile = async (profileData) => {
    const { data } = await axios.post('auth/updateuser', profileData);
    return data;
};
/** get Comments */
export const getComments = async (data) => {
    return await axios.post('video/getComments', data);
};
/** check is Follow */
export const isFollow = async (ids) => {
    const { data } = await axios.post('follow/is-following', ids);
    return data;
};
/** Check is Subscribed */
export const isSubscribe = async (reqData) => {
    try {
        const { data } = await axios.post('subscribe/isSubscribe', reqData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

// Subscribe Route
export const subscribe = async (reqData) => {
    try {
        const { data } = await axios.post('subscribe/subscribe', reqData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};
export const removeSubscribe = async (reqData) => {
    try {
        const { data } = await axios.post('subscribe/remove', reqData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};
export const getMySubscriptions = async (page = 1, limit = 5) => {
    const { data } = await axios.get(`subscribe/getMySubscriptions?page=${page}&limit=${limit}`);
    return data;
};

/** Add  Follow */
export const removeFollow = async (followData) => {
    const { data } = await axios.post('follow/remove-follow', followData);
    return data;
};
/** Add Follow */
export const addFollow = async (followData) => {
    const { data } = await axios.post('follow/add-follow', followData);
    return data;
};
/** Update Watch Time */
export const updateWatchTime = async (watchData) => {
    return await axios.put('video/updateWatchTime', watchData);
};
/** Submit Comments */
export const saveComment = async (commentData) => {
    const { data } = await axios.post('video/addComment', commentData);
    return data;
};
/** Add Rating */
export const addRating = async (ratingData) => {
    const { data } = await axios.post('video/addRating', ratingData);
    return data;
};
/** Report  */
export const report = async (reportData) => {
    const { data } = await axios.post('report/add', reportData);
    return data;
};
/** Report  */
export const getReports = async () => {
    const { data } = await axios.get('report/get');
    return data;
};

/** IPFS File Storage */
export const ipfsAdd = async (reqData) => {
    const { data } = await axios.post('ipfs/add', reqData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return data;
};

/** IPFS Token */
export const getToken = async () => await axios.get('ipfs/getToken');

/** Account verification Api */
export const verifyAccount = async (reqData) => await axios.post('auth/verify', reqData);

/** Filter Content Api */
export const filterMedia = async (query) => await axios.get(`/common/filterMedia?${query}`);

/** Content View Api */
export const mediaView = async (data) => await axios.post(`/video/videoViewStat`, data);

/** Payment Transaction  */
export const paymentAdd = async (reqData) => {
    try {
        const { data } = await axios.post('/payment/transaction', reqData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};
/** Payment Transaction  */
export const paymentSubscribe = async (reqData) => {
    try {
        const { data } = await axios.post('/payment/subscribe', reqData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};
/** User Wallet */

export const wallet = async () => {
    try {
        const { data } = await axios.get('/user/wallet');
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const paymentHistory = async (page = 1, limit = 5) =>
    await axios.get(`/payment/getHistory?page=${page}&limit=${limit}`);

export const createFundingPaymentHistory = async (reqBody) => {
    try {
        const { data } = await axios.post('/payment/createCroudFundingHistory', reqBody);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const changeFeaturedIndex = async (reqData) => {
    try {
        const { data } = await axios.post('video/featuredIndexChange', reqData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const paymentStripe = async (reqBody) => {
    try {
        const { data } = await axios.post('/payment/stripe', reqBody);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const paymentStripeForDownload = async (reqBody) => {
    try {
        const { data } = await axios.post('/payment/stripe/download', reqBody);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const getHistory = async (page = 1, limit = 5) => {
    try {
        const { data } = await axios.get(`/video/getMediaHistory?page=${page}&limit=${limit}`);
        return data;
    } catch (error) {
        return error.response.data;
    }
};
export const createPlaylist = async (reqData) => {
    try {
        const { data } = await axios.post('/playlist/createPlaylist', reqData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const addMediaToPlaylist = async (listId, reqData) => {
    try {
        const { data } = await axios.put(`/playlist/addMediaToplaylist/${listId}`, reqData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const removeMediaFromPlaylist = async (listId, reqData) => {
    try {
        const { data } = await axios.put(`/playlist/removeMediaFromPlaylist/${listId}`, reqData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const removePlaylist = async (id) => {
    try {
        const { data } = await axios.delete(`/playlist/deletePlaylist/${id}`);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const getMyPlaylists = async (type = null) => {
    try {
        let url = `/playlist/getMyPlaylists`;
        if (type) url = url + `?type=${type}`;
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.log('===============');
        console.log(error);
        return error.response.data;
    }
};

export const getPlaylist = async (id) => {
    try {
        const { data } = await axios.get(`/playlist/getPlaylist/${id}`);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const getAllPlaylists = async (type, page = 1, limit = 10) => {
    try {
        const { data } = await axios.get(
            `/playlist/getAllPlaylists?type=${type}&page=${page}&limit=${limit}`
        );
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const logoutFromServer = async () => {
    try {
        await axios.post('/auth/logout', {});
    } catch (error) {
        console.log(error);
    }
};

export const reportBug = async (reqBody) => {
    try {
        const { data } = await axios.post('/bug/createBugReport', reqBody);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const getAllBugs = async (page = 1, limit = 5) => {
    try {
        const { data } = await axios.get(`/bug/getAllBugs?page=${page}&limit=${limit}`);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const getAllWaitlist = async (page = 1, limit = 5) => {
    try {
        const { data } = await axios.get(`/waitlist/getAllWaitlist?page=${page}&limit=${limit}`);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const createWaitlist = async (reqData) => {
    try {
        const { data } = await axios.post('/waitlist/createWaitlist', reqData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const getAllPaymentHistory = async (page = 1, limit = 10, paymentFor = 'croudfunding') => {
    try {
        const { data } = await axios.get(
            `/payment/getAllHistory?page=${page}&limit=${limit}&paymentFor=${paymentFor}`
        );
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const createInviteCode = async () => {
    try {
        const { data } = await axios.post('/referral/createCode', {});
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const getAllCodes = async () => {
    try {
        const { data } = await axios.get('/referral/getAllCodes');
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const changeTierHandler = async (reqBody) => {
    try {
        const { data } = await axios.post('/auth/changeTier', reqBody);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const getOneUser = async () => {
    try {
        const { data } = await axios.get('/auth/getOneUser');
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const getAllUsersMail = async () => {
    try {
        const { data } = await axios.get('/auth/getAllUserMails');
        return data;
    } catch (error) {
        return error.response;
    }
};
