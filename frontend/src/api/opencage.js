import axios from 'axios';

export const OpenCageAPI = axios.create({
    baseURL: 'https://api.opencagedata.com/geocode/v1/'
})