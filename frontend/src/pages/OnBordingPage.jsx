import React, { useState } from "react";
import useAuthUser from "../../Hooks/useAuthUser";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { completeOnbording } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function OnBordingPage() {
  const [FormData, setFormData] = useState({
    fullName: useAuthUser?.fullName || "",
    bio: useAuthUser?.bio || "",
    nativeLanguage: useAuthUser?.nativeLanguage || "",
    learningLanguage: useAuthUser?.learningLanguage || "",
    location: useAuthUser?.location || "",
    profilePic: useAuthUser?.profilePic || "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: completeOnbording,
    onSuccess: () => {
      toast.success("profile Onbording Successfully"),
        QueryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });

  const handlerFormData = async (e) => {
    e.preventDefault();
    mutate(FormData);
  };

  const avtarHander = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvtar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormData({ ...FormData, profilePic: randomAvtar });
    toast.success("Random profile image generated");
  };
  return (
    <div className=" bg-[url('/image/Onbording.avif')] gap-5 bg-right bg-cover  h-screen w-screen p-14  justify-center  flex md:flex-row flex-col md:justify-between items-center  text-white  ">
      <div className="backdrop-blur-lg   bg-cover text-white w-full border border-1 border-gray-700 h-full p-[5%] justify-center flex flex-col">
        <p className=" text-[1.5rem] md:text-[2rem] lg:text-[3rem]">
          This is the On Bording page.
        </p>
        <p className="text-[1rem]">
          Please enter your credentials details to create your Profile.
        </p>
        <br />
        <hr className="border-2 border-purple-950  w-[50%]" />
      </div>
      <div className="w-full h-full ">
        <div className="w-[100%] h-full ">
          <form
            onSubmit={handlerFormData}
            className="flex flex-col gap-3 backdrop-blur-lg  border border-1 px-[10%] py-[5%] border-gray-700  rounded-md w-full h-full"
          >
            <div className="flex justify-center rounded-full">
              <div className=" flex  w-[100px] h-[100px]">
                {FormData.profilePic ? (
                  <img
                    src={FormData.profilePic}
                    alt=""
                    className="rounded-full"
                  />
                ) : (
                  <img
                    src="/image/contact-icon.avif"
                    alt=""
                    className="rounded-full"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-center items-center flex-col">
              <h2 className=" text-[1rem] md:text-[1.7rem] text-center">
                Create Profile
              </h2>
              <button
                onClick={avtarHander}
                className=" text-center p-1 bg-red-400 rounded-md"
              >
                <p className="text-[0.6rem] font-thin ">Generate image</p>
              </button>
            </div>

            <label htmlFor="">Full Name</label>
            <input
              type="text"
              name="full name"
              value={FormData.fullName}
              onChange={(e) =>
                setFormData({ ...FormData, fullName: e.target.value })
              }
              className="bg-transparent border text-[0.9rem] border-1 border-gray-700 rounded-md px-5 py-1 md:py-2 w-full"
              placeholder="Enter your Username"
            />
            <label htmlFor="">Bio</label>
            <textarea
              name="bio"
              value={FormData.bio}
              onChange={(e) =>
                setFormData({ ...FormData, bio: e.target.value })
              }
              rows={8}
              cols={40}
              className="bg-transparent border !h24 border-1 border-gray-700 rounded-md px-5 py-1 md:py-2 w-full text-[0.9rem]"
              placeholder="Enter anything"
            />
            <select
              value={FormData.nativeLanguage}
              onChange={(e) =>
                setFormData({ ...FormData, nativeLanguage: e.target.value })
              }
              className="bg-transparent border text-[0.9rem] border-gray-700 rounded-md px-5 py-2 w-full"
            >
              <option value="">Select a language</option>
              <option value="en">English</option>
              <option value="inmm">inmm</option>
            </select>

            <select
              value={FormData.learningLanguage}
              onChange={(e) =>
                setFormData({ ...FormData, learningLanguage: e.target.value })
              }
              className="bg-transparent border text-[0.9rem] border-gray-700 rounded-md px-5 py-2 w-full"
            >
              <option value="">Select a language</option>
              <option value="es">Spanish</option>
              <option value="inmm">inmm</option>
            </select>

            <label htmlFor="">Location / City</label>
            <input
              name="location"
              value={FormData.location}
              onChange={(e) =>
                setFormData({ ...FormData, location: e.target.value })
              }
              type="text"
              className="bg-transparent border border-1 border-gray-700 rounded-md px-5 py-1 md:py-2 w-full text-[0.9rem]"
              placeholder="Your Location"
            />

            <button
              type="submit"
              className="bg-blue-800 p-2 rounded-md hover:bg-blue-600"
              disabled={isPending}
            >
              {!isPending ? "Submit" : "Onbording..."}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OnBordingPage;
