import axios from '../axios';

export const createProject = async (reqBody) => {
    try {
        const { data } = await axios.post('/project/createProject', reqBody);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateProject = async (id, reqBody) => {
    try {
        const { data } = await axios.post(`/project/updateProject/${id}`, reqBody);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const getAllProjects = async (page = 1, type) => {
    try {
        const { data } = await axios.get(
            `/project/getAllProjects?page=${page}&limit=10&type=${type}`
        );
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const getOneProject = async (id, type) => {
    try {
        const { data } = await axios.get(`/project/getOneProject/${id}?type=${type}`);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteProject = async (id) => {
    try {
        const { data } = await axios.delete(`/project/deleteProject/${id}`);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const paymentProjectStripe = async (reqData) => {
    try {
        const { data } = await axios.post('/payment/projectStripe', reqData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};
