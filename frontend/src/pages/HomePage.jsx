import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getOutgoingFriendReqs,
  getRecommendedUser,
  getUserFriends,
  sendFriendRequest,
} from "../lib/axios";
import FriendsCard from "../../Components/FriendsCard";
import NoFriendsFound from "../../Components/NoFriendsFound";
import FriendsReqCard from "../../Components/FriendsReq";

function HomePage() {
  const queryClient = useQueryClient();

  //make state for outgoing request with empth obj
  const [outgoingRequestIds, setoutgoingRequestIds] = useState(new Set());

  // making tenstack query function
  const { data: friends, isPending: loadingFriend } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUser, isPending: loadingUser } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUser,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    console.log("outgoingFriendReqs", outgoingFriendReqs);

    const outGoingIds = new Set();

    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        console.log("here is req id", req.recipient._id);
        outGoingIds.add(req.recipient._id);
      });

      setoutgoingRequestIds(outGoingIds);
    }
  }, [outgoingFriendReqs]);

  //   return (
  //     <>
  //       {" "}
  //       <div>
  //         <div className="flex justify-between">
  //           <h1 className="text-[1rem]">your Friends</h1>
  //           <Link to="/notifications">Friends Request</Link>
  //         </div>
  //         {loadingFriend ? (
  //           <div className="flex justify-center items-center text-[1rem]">
  //             Loading...
  //           </div>
  //         ) : !friends || friends.length === 0 ? (
  //           <NoFriendsFound />
  //         ) : (
  //           friends.map((friend) => {
  //             <FriendsCard key={friend._id} friend={friend} />;
  //           })
  //         )}
  //       </div>

  //       <div>
  //         <h1 className="text-[1rem]">Recommended Users</h1>
  //         <p>
  //           here is recommended user list you can send friend request to them

  //         </p>

  //         {loadingUser ? (
  //           <div className="flex justify-center items-center text-[1rem]">
  //             Loading...
  //           </div>
  //         ) : !recommendedUser || recommendedUser.length === 0 ? (
  //            <div className="flex justify-center items-center text-[1rem]">
  //             No Recommended User Found
  //       </div>
  //         ):(
  //           <div>
  //             {recommendedUser.map((user)=>{
  //             const isRequestSebnt = outgoingRequestIds.has(user._id)
  //             return(
  //               <div key={user._id} className="border p-2 m-2">
  //               <p>{user.fullName}</p>
  //               <p>{user.learningLanguage}</p>
  //               <p>{user.nativeLanguage}</p>
  //               <button disabled={isPending || isRequestSebnt} onClick={()=>{sendRequestMutation(user._id)}}>
  //                 {isRequestSebnt ? "Request Sent" : isPending ? "Sending..." : "Send Friend Request"}
  //               </button>
  //             </div>

  //             )
  //             }))}
  //           </div>
  //         )}

  //     </>
  //   );
  // }

  // export default HomePage;

  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1 className="text-[1rem]">your Friends</h1>
          <Link to="/notifications">Friends Request</Link>
        </div>
        {loadingFriend ? (
          <div className="flex justify-center items-center text-[1rem]">
            Loading...
          </div>
        ) : !friends || friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          friends.map((friend) => {
            return <FriendsCard key={friend._id} friend={friend} />;
          })
        )}
      </div>

      {/* <div>
        <h1 className="text-[1rem]">Recommended Users</h1>
        <p>here is recommended user list you can send friend request to them</p>

        {loadingUser ? (
          <div className="flex justify-center items-center text-[1rem]">
            Loading...
          </div>
        ) : !recommendedUser || recommendedUser.length === 0 ? (
          <div className="flex justify-center items-center text-[1rem]">
            No Recommended User Found
          </div>
        ) : (
          <div>
            {recommendedUser.map((user) => {
              // const isRequestSent = outgoingRequestIds.has(user._id);
              const isRequestSent = outgoingRequestIds.has(user._id);
              return (
                <FriendsReqCard
                  key={user._id}
                  user={user}
                  isPending={isPending}
                  isRequestSent={isRequestSent}
                  sendRequestMutation={sendRequestMutation}
                />
              );
            })}
          </div>
        )}
      </div> */}
      <section>
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Meet New Learners
              </h2>
              <p className="opacity-70">
                Discover perfect language exchange partners based on your
                profile
              </p>
            </div>
          </div>
        </div>

        {loadingUser ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : !recommendedUser || recommendedUser.length === 0 ? (
          <div className="card bg-base-200 p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">
              No recommendations available
            </h3>
            <p className="text-base-content opacity-70">
              Check back later for new language partners!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedUser.map((user) => {
              const hasRequestBeenSent = outgoingRequestIds.has(user._id);

              return (
                <div
                  key={user._id}
                  className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="card-body p-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar size-16 rounded-full">
                        <img src={user.profilePic} alt={user.fullName} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg">
                          {user.fullName}
                        </h3>
                        {user.location && (
                          <div className="flex items-center text-xs opacity-70 mt-1">
                            {user.location}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Languages with flags */}

                    {user.bio && (
                      <p className="text-sm opacity-70">{user.bio}</p>
                    )}

                    {/* Action button */}
                    <button
                      className={`btn w-full mt-2 ${
                        hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                      } `}
                      onClick={() => sendRequestMutation(user._id)}
                      disabled={hasRequestBeenSent || isPending}
                    >
                      {hasRequestBeenSent ? (
                        <>Request Sent</>
                      ) : (
                        <>Send Friend Request</>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default HomePage;
