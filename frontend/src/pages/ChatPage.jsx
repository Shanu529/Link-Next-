import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Await, useParams } from "react-router-dom";
import useAuthUser from "../../Hooks/useAuthUser";
import { getStreamToken } from "../lib/axios";

import { StreamChat, textIsEmpty } from "stream-chat";
import toast from "react-hot-toast";
import ChatLoading from "../../Components/ChatLoading";

import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useCreateChatClient,
} from "stream-chat-react";
import CallButton from "../../Components/CallButton";

function ChatPage() {
  const { id: targetUserId } = useParams();

  const [chatClient, setchatClient] = useState(null);
  const [channel, setchannel] = useState(null);
  const [loading, setloading] = useState(true);

  const { authUser } = useAuthUser();

  const STREAM_API_KAY = import.meta.env.VITE_STREAM_API_KEY;
  const { data: tokenData } = useQuery({
    queryKey: ["streanToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // only run the query if authUser is available
  });

  // console.log("tokenData", tokenData, "targetUserId ", targetUserId);

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;
      try {
        const client = StreamChat.getInstance(STREAM_API_KAY);
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );
        // create channel id
        const channelId = [authUser._id, targetUserId].sort().join("-");

        // create Current Channel
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setchatClient(client);
        setchannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setloading(false);
      }
    };
    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I've started a video call. Join me here:${callUrl}`,
      });
      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoading />;

  return (
    <div className="h-full">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <CallButton handleVideoCall={handleVideoCall} />
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput focus />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}

export default ChatPage;
