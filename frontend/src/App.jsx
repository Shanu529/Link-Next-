import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { axiosInstance } from "./lib/axios";

import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import OnBordingPage from "./pages/OnBordingPage.jsx";
import Chatpage from "./pages/ChatPage.jsx";

import Login from "./pages/Login";
import LoadingComponents from "../Components/LoadingComponents.jsx";
import useAuthUser from "../Hooks/useAuthUser.js";

function App() {
  const [count, setCount] = useState(0);
  const { isLoading, authUser } = useAuthUser();

  console.log("here is authUser", authUser);
  // console.log("here is onbording value",authUser.onBording);
  console.log("here is onbording value", authUser?.onBording);

  // if (isLoading) {
  //   return <div> {<LoadingComponents />} </div>; // Or show spinner
  // }
  return (
    <>
      {/* <button onClick={() => toast.success(" you are Successfully visit!")}>
        click me
      </button> */}
      <Routes>
        <Route
          path="/"
          element={
            authUser && authUser.onBording ? (
              <HomePage />
            ) : (
              <Navigate to={!authUser ? "/SignupPage " : "/onbording"} replace />
            )
          }
        />
        <Route
          path="/SignupPage"
          element={!authUser ? <SignupPage /> : <Navigate to="/" replace />}
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
          element={authUser ? <Chatpage /> : <Navigate to="/login" />}
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
