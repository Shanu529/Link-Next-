

import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({

    baseURL: "http://localhost:4000/api",
    withCredentials: true
})

export const completeOnbording = async (userinfoData)=>{
    const response = await axiosInstance.post("/auth/onboarding", userinfoData);
    return response.data
}


export const loginFunction = async (loginData)=>{
    const response = await axiosInstance.post("/auth/login", userinfoData);
    return response.data
}
