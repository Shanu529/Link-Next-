import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthUser from "../../Hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/axios";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import LoadingComponents from "../../Components/LoadingComponents";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

function CallPage() {
  const { id: callId } = useParams();
  // console.log("here is id",callId);

  const [call, setcall] = useState();
  const [client, setclient] = useState();
  const [isconnecting, setisconnecting] = useState();

  const { authUser, isLoading } = useAuthUser();

  const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData.token || !authUser) return;
      try {
        //create user
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const videoCallInstance = videoClient.call("default", callId);
        await videoCallInstance.join({ create: true });

        console.log("video call conected2");
        setcall(videoCallInstance);
        setclient(videoClient);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setisconnecting(false);
      }
    };
    initCall();
  }, [authUser, tokenData, callId]);
  if (isLoading || isconnecting) return <LoadingComponents />;

  return (
    <div>
      {client && call ? (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <CallContent />
          </StreamCall>
        </StreamVideo>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p>Could not initialize call. Please refresh or try again later.</p>
        </div>
      )}
    </div>
  );
}

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
