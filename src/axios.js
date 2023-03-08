import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://artbot-backend-api-9v7k9.ondigitalocean.app/api'
    // baseURL: 'http://localhost:8080/api'
});

instance.interceptors.request.use(
    function (config) {
        try {
            const state = JSON.parse(localStorage.getItem('persist:root'));
            const user = JSON.parse(state['auth']);
            let token = null;
            if (user.authToken) {
                token = user.authToken;
            }
            // token = JSON.parse(user.authToken);
            if (token) config.headers['Authorization'] = 'Bearer ' + token;
            config.headers['Content-Type'] = 'application/json';
        } catch (error) {}
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
instance.defaults.withCredentials = true;
export default instance;
