import axios from 'axios';

export const VisualCrossingAPI = axios.create({
    baseURL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
})