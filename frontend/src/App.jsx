import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Routes, Route, Navigate } from "react-router";

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import Login from "./pages/Login";

import CallPage from "./pages/CallPage";
import NotificationPage from "./pages/NotificationPage";
import ChatPage from "./pages/ChatPage";
import OnBordingPage from "./pages/OnBordingPage";

import toast, { Toaster } from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { axiosInstance } from "./lib/axios";

function App() {
  const [count, setCount] = useState(0);

  const {data:authData, error, isEnabled,} = useQuery({ queryKey: ["todo"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/user/me");
      return res.data;
    },
    retry: false,
  });
  const authUser = authData?.user;

  console.log(authUser);

  return (
    <>
      <button onClick={() => toast.success("Successfully toasted!")}>
        click me
      </button>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/notification"
          element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/call"
          element={authUser ? <CallPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/onbording"
          element={authUser ? <OnBordingPage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
