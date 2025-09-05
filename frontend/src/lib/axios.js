

import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({

    baseURL: "http://localhost:4000/api",
    withCredentials: true
})

export const completeOnbording = async (userinfoData) => {
    const response = await axiosInstance.post("/auth/onboarding", userinfoData);
    return response.data
}


export const loginFunction = async (loginData) => {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data
}

export const logout = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data
}

export const getUserFriends = async () => {
    const response = await axiosInstance.get("/users/friends");
    return response.data
}

export const getRecommendedUser = async () => {
    const response = await axiosInstance.get("/users");
    return response.data
}

export const getOutgoingFriendReqs = async ()=>{
    const response = await axiosInstance.get("/users/outgoing-friend-requests");
    return response.data
}

export const sendFriendRequest = async (userId)=>{
    const response = await axiosInstance.post(`users/friend-request/${userId}`);
    return response.data
}

export const getFriendRequest = async ()=>{
    const response = await axiosInstance.get("/users/friend-request");
    return response.data
}

export const acceptFriendRequest = async (requestId)=>{
    const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
    return response.data
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}
