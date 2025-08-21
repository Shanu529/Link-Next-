import React, { useState } from "react";
import { Link } from "react-router-dom";


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import axios from "axios";
function SignupPage() {
  const [fullName, setfullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

   const queryClient = useQueryClient();

  const { mutate, isError, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/signup", {
        fullName,
        email: Email,
        password: Password,
        
      });
      response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const handlerForm = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="bg-[url('/image/Login.png')]  bg-right bg-cover h-screen w-screen  justify-center  flex md:flex-row flex-col md:justify-between items-center px-[10%] text-white  ">
      <div className=" text-white w-full ">
        <p className=" text-[1.5rem] md:text-[2rem] lg:text-[3rem]">
          This is the login page.
        </p>
        <p className="text-[1rem]">Please enter your credentials to log in.</p>
        <br />
        <hr className="border-2 border-purple-950 " />
      </div>
      <div className="w-full py-5 md:p-[10%] ">
        <div className="w-[100%] ">
          <form
            onSubmit={handlerForm}
            className="flex flex-col gap-5 border border-1 py-[15%] px-[10%] border-white p-3 rounded-md w-full h-full"
          >
            <div>
              <h2 className=" text-[1rem] md:text-[1.7rem] ">Login</h2>
              <p className=" text-[0.8rem] md:text-[1rem]">
                Glad you’re back.!
              </p>
            </div>

            <input
              onChange={(e) => setfullName(e.target.value)}
              value={fullName}
              type="text"
              className="bg-transparent border text-[0.9rem] border-1 border-white rounded-md px-5 py-1 md:py-2 w-full"
              placeholder="Enter your Username"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              type="text"
              className="bg-transparent border   border-1 border-white rounded-md px-5 py-1 md:py-2 w-full text-[0.9rem]"
              placeholder="Enter your Email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              type="password"
              className="bg-transparent border  border-1 border-white rounded-md px-5 py-1 md:py-2 w-full"
              placeholder="Enter your Password"
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-500 w-full py-1 md:py-2 rounded-md"
            >
              {isPending? "Signup....":"Create Account"} 
            </button>
            <div>
              <p>
                already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
