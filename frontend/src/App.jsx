// import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// import { Routes, Route, Navigate } from "react-router-dom";

// import toast, { Toaster } from "react-hot-toast";

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// import { axiosInstance } from "./lib/axios";

// import HomePage from "./pages/HomePage.jsx";
// import SignupPage from "./pages/SignupPage.jsx";
// import NotificationPage from "./pages/NotificationPage.jsx";
// import CallPage from "./pages/CallPage.jsx";
// import OnBordingPage from "./pages/OnBordingPage.jsx";
// import Chatpage from "./pages/ChatPage.jsx";

// import Login from "./pages/Login";
// import LoadingComponents from "../Components/LoadingComponents.jsx";
// import useAuthUser from "../Hooks/useAuthUser.js";

// function App() {
//   const [count, setCount] = useState(0);
//   const { isLoading, authUser } = useAuthUser();

//   console.log("here is authUser", authUser);
//   // console.log("here is onbording value",authUser.onBording);
//   console.log("here is onbording value", authUser?.onBording);

//   // if (isLoading) {
//   //   return <div> {<LoadingComponents />} </div>; // Or show spinner
//   // }
//   return (
//     <>
//       {/* <button onClick={() => toast.success(" you are Successfully visit!")}>
//         click me
//       </button> */}
//       <Routes>
//       <Route
//   path="/"
//   element={
//     authUser ? (
//       authUser.onBording ? (
//         <HomePage />
//       ) : (
//         <Navigate to="/onbording" replace />
//       )
//     ) : (
//       <Navigate to="/signupPage" replace />
//     )
//   }
// />

//         <Route
//           path="/SignupPage"
//           element={!authUser ? <SignupPage /> : <Navigate to="/" replace />}
//         />
//         <Route
//           path="/login"
//           element={!authUser ? <Login /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/notification"
//           element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/call"
//           element={authUser ? <CallPage /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/chat"
//           element={authUser ? <Chatpage /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/onbording"
//           element={authUser ? <OnBordingPage /> : <Navigate to="/login" />}
//         />
//       </Routes>

//       <Toaster />
//     </>
//   );
// }

// export default App;


// import { Routes, Route, Navigate } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// import HomePage from "./pages/HomePage.jsx";
// import SignupPage from "./pages/SignupPage.jsx";
// import LoginPage from "./pages/Login.jsx";
// import NotificationPage from "./pages/NotificationPage.jsx";
// import CallPage from "./pages/CallPage.jsx";
// import ChatPage from "./pages/ChatPage.jsx";
// import OnboardingPage from "./pages/OnBordingPage.jsx";

// import LoadingComponents from "../Components/LoadingComponents.jsx";
// import useAuthUser from "../Hooks/useAuthUser.js";
// import Layout from "../Components/Layout.jsx";

// function App() {
//   const { isLoading, authUser } = useAuthUser();

//   const isAuthenticated = Boolean(authUser);
//   const isOnboarded = authUser?.onBording; // ✅ rename in backend if possible: `isOnboarded`

//   if (isLoading) return <LoadingComponents />;

//   return (
//     <>
//       <Routes>
//         {/* Root (home) */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated && isOnboarded ? (
//               // <HomePage />
//               <Layout />
//             ) : (
//               <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
//             )
//           }

          
//         />

//         {/* Signup */}
//         <Route
//           path="/signup"
//           element={
//             !isAuthenticated ? (
//               <SignupPage />
//             ) : (
//               <Navigate to={isOnboarded ? "/" : "/onboarding"} />
//             )
//           }
//         />

//         {/* Login */}
//         <Route
//           path="/login"
//           element={
//             !isAuthenticated ? (
//               <LoginPage />
//             ) : (
//               <Navigate to={isOnboarded ? "/" : "/onboarding"} />
//             )
//           }
//         />

//         {/* Notifications */}
//         <Route
//           path="/notifications"
//           element={
//             isAuthenticated && isOnboarded ? (
//               <NotificationPage />
//             ) : (
//               <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
//             )
//           }
//         />

//         {/* Call - dynamic id */}
//         <Route
//           path="/call"
//           element={
//             isAuthenticated && isOnboarded ? (
//               <CallPage />
//             ) : (
//               <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
//             )
//           }
//         />

//         {/* Chat - dynamic id */}
//         <Route
//           path="/chat"
//           element={
//             isAuthenticated && isOnboarded ? (
//               <ChatPage />
//             ) : (
//               <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
//             )
//           }
//         />

//         {/* Onboarding */}
//         <Route
//           path="/onboarding"
//           element={
//             isAuthenticated ? (
//               !isOnboarded ? (
//                 <OnboardingPage />
//               ) : (
//                 <Navigate to="/" />
//               )
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//       </Routes>

//       <Toaster />
//     </>
//   );
// }

// export default App;


import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/Login.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnBordingPage.jsx";

import LoadingComponents from "../Components/LoadingComponents.jsx";
import useAuthUser from "../Hooks/useAuthUser.js";
import Layout from "../Components/Layout.jsx";

function App() {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.onBording; // ✅ rename in backend if possible: `isOnboarded`

  if (isLoading) return <LoadingComponents />;

  return (
    <>
      <Routes>
        {/* ✅ Root + Protected Layout */}
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        >
          {/* Layout children */}
          <Route index element={<HomePage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="call" element={<CallPage />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>

        {/* ✅ Auth routes */}
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />

        {/* ✅ Onboarding */}
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
