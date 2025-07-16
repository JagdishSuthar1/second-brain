import axios from "axios"
import envfile from "dotenv"
envfile.config()
export const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL
})

axiosInstance.interceptors.request.use(function(data) {
    const accessToken = sessionStorage.getItem("accessToken");
    if(accessToken) {
        data.headers.Authorization = `Bearer ${accessToken}`;
    }

    return data;
}, function(err) {
    return Promise.reject(err);
})


