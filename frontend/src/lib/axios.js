

import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({

    baseURL: "http://localhost:4000/api",
    withCredentials: true
})

export const completeOnbording = async (userinfoData)=>{
    const response = await axiosInstance.post("/auth/onbording", userinfoData);
    return response.data
}
