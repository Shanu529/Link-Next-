import React from 'react'
import axios from "axios";
import { useQuery } from '@tanstack/react-query';

const useAuthUser = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const authUser = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            const res = await axios.get(backendUrl + "/auth/me", {
                withCredentials: true,
            });
            // const res = await axiosInstance.get("/users/me");
            console.log("here is log where");
            return res.data;
        },
    });
    return { isLoading: authUser.isLoading, authUser: authUser.data?.user }
    // const authUser = authData?.user;
}

export default useAuthUser