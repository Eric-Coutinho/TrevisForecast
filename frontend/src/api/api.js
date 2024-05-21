import axios from "axios";

export const BackAPI = axios.create({
    baseURL:"http://localhost:8080/api/"
});