import React, { useState } from 'react'
import useAuthUser from '../../Hooks/useAuthUser'
import { QueryClient, useMutation, useQuery} from '@tanstack/react-query'
import { completeOnbording } from '../lib/axios'
import toast from 'react-hot-toast'
function OnBordingPage() {

  const [FormData, setFormData] = useState({
    fullName: useAuthUser?.fullName || "",
    bio: useAuthUser?.bio || "",
    nativeLanguage: useAuthUser?.nativeLanguage || "",
    learningLanguage: useAuthUser?.learningLanguage || "",
    location: useAuthUser?.location || "",
    profilePic:useAuthUser?.profilePic || "",

  })

  const {mutate, isPending} = useMutation({
    mutationFn:completeOnbording,
    onSuccess:()=>{
      toast.success("profile Onbording Successfully"),
      QueryClient.invalidateQueries({queryKey:["authUser"]})
    }
  });

  const handlerFormData = async(e) =>{
    e.preventDefault();
    mutate(FormData)
  }
  return (
    <div>OnBordingPageh</div>
  )
}

export default OnBordingPage