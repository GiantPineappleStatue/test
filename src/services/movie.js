import axios from '../axios';
import RawAxios from 'axios';
export const getAllVotes = async () => {
    try {
        const { data } = await axios.get('/vote/getAllVotes');
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const getAllPlans = async () => {
    try {
        const { data } = await axios.get('/plan/getAllPlans');
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const moviePayment = async (reqData) => {
    try {
        const { data } = await axios.post('/plan/payment', reqData);
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const getPoolOptions = async () => {
    try {
        const { data } = await RawAxios.get(
            'https://api.pollsapi.com/v1/get/poll/616e6f73444e64001083a760',
            {
                headers: {
                    'api-key': 'TQG2GG4ZP84DDFGSXPRTRY0KWAQ6'
                }
            }
        );
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const castVote = async (reqData) => {
    try {
        const { data } = await RawAxios.post('https://api.pollsapi.com/v1/create/vote', reqData, {
            headers: {
                'api-key': 'TQG2GG4ZP84DDFGSXPRTRY0KWAQ6',
                'Content-Type': 'application/json'
            }
        });
        return data;
    } catch (error) {
        return error.response.data;
    }
};

export const getAllVotesFromPoll = async () => {
    try {
        const { data } = await RawAxios.get(
            'https://api.pollsapi.com/v1/get/votes/616e6f73444e64001083a760?limit=10000&offset=0',
            {
                headers: {
                    'api-key': 'TQG2GG4ZP84DDFGSXPRTRY0KWAQ6'
                }
            }
        );
        return data;
    } catch (error) {
        return error.response.data;
    }
};
