import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { loginFunction } from "../lib/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const QueryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginFunction,
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: "authUser" });
    },

    onError: (error) => {
      // This will catch the throw from loginFunction
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed!");
      }
    },
  });

  const loginHandller = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  console.log(error);

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
            onSubmit={loginHandller}
            className="flex flex-col gap-5 border border-1 py-[15%] px-[10%] border-white p-3 rounded-md w-full h-full"
          >
            <div>
              <h2 className=" text-[1rem] md:text-[1.7rem] ">Login</h2>
              <p className=" text-[0.8rem] md:text-[1rem]">
                Glad you’re back.!
              </p>
            </div>

            <input
              onChange={(e) =>
                setloginData({ ...loginData, email: e.target.value })
              }
              value={loginData.email}
              type="email"
              className="bg-transparent border   border-1 border-white rounded-md px-5 py-1 md:py-2 w-full text-[0.9rem]"
              placeholder="Enter your Email"
            />
            <input
              onChange={(e) =>
                setloginData({ ...loginData, password: e.target.value })
              }
              value={loginData.password}
              type="password"
              className="bg-transparent border  border-1 border-white rounded-md px-5 py-1 md:py-2 w-full"
              placeholder="Enter your Password"
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-500 w-full py-1 md:py-2 rounded-md"
            >
              {isPending ? "Login...." : "Sign in"}
            </button>
            <div>
              <p>
                Don't have an account?{" "}
                <Link to="/signupPage" className="text-blue-600">
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
