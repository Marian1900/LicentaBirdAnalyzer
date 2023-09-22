import axios, { AxiosError } from 'axios';

const AxiosAPI = axios.create();

AxiosAPI.interceptors.response.use(response => {
    return response.data;
}, (error: AxiosError) => {
    throw error.request._response || error;

})

export default AxiosAPI;