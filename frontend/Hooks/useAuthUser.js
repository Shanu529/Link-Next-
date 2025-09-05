import React from 'react'
import axios from "axios";
import { useQuery } from '@tanstack/react-query';

const useAuthUser = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const authUser = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {

            try {
                const res = await axios.get(backendUrl + "/auth/me", {
                    withCredentials: true,
                });
                // const res = await axiosInstance.get("/users/me");
                console.log("here is log");
                return res.data;
            } catch (error) {
                console.log("error in authUser: ", error);
                return null;

            }

        },
    });
    return { isLoading: authUser.isLoading, authUser: authUser.data?.user }
    // const authUser = authData?.user;
}

export default useAuthUser