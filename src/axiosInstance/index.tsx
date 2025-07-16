import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://second-brain-be-production-ac47.up.railway.app"
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


