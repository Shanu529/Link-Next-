// import { useMutation, useQuery } from "@tanstack/react-query";
// import React from "react";
// import { acceptFriendRequest } from "../../../backend/src/controller/userController";
// import { getFriendRequest } from "../lib/axios";
// import FriendRequest from "../../../backend/src/models/FriendRequest";

// function NotificationPage() {
//   const { data: friendRequest, isLoading } = useQuery({
//     queryKey: ["friendRequests"],
//     queryFn: getFriendRequest,
//   });

//   const { mutate, isPending } = useMutation({
//     mutationFn: acceptFriendRequest,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["friendRequests"]);
//       queryClient.invalidateQueries(["friends"]);
//     },
//   });

//   const incommingRequest = friendRequest?.incomingReqs || [];
//   const acceptRequest = friendRequest?.acceptReqs || [];
//   return (
//     <div>
//       <div className="space-y-3">
//         {incommingRequest.map((request) => (
//           <div
//             key={request._id}
//             className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
//           >
//             <div className="card-body p-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="avatar w-14 h-14 rounded-full bg-base-300">
//                     <img
//                       src={request.sender.profilePic}
//                       alt={request.sender.fullName}
//                     />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold">{request.sender.fullName}</h3>
//                     <div className="flex flex-wrap gap-1.5 mt-1">
//                       <span className="badge badge-secondary badge-sm">
//                         Native: {request.sender.nativeLanguage}
//                       </span>
//                       <span className="badge badge-outline badge-sm">
//                         Learning: {request.sender.learningLanguage}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   className="btn btn-primary btn-sm"
//                   onClick={() => acceptRequestMutation(request._id)}
//                   disabled={isPending}
//                 >
//                   Accept
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default NotificationPage;
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { acceptFriendRequest } from "../lib/axios";
import { getFriendRequest } from "../lib/axios";
import FriendRequestShowingNone from "../../Components/FriendRequestShowingNone";

function NotificationPage() {
  const queryClient = useQueryClient();  // ✅ define queryClient

  const { data: friendRequest, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequest,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incommingRequest = friendRequest?.incomingReqs || [];

  return (
    <div>
      <div className="space-y-3">
        {incommingRequest.map((request) => (
          <div key={request._id} className="card bg-black text-white shadow-sm">
            <div className="card-body p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={request.sender.profilePic}
                  alt={request.sender.fullName}
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{request.sender.fullName}</h3>
                  <p className="text-sm opacity-70">
                    Native: {request.sender.nativeLanguage} | Learning:{" "}
                    {request.sender.learningLanguage}
                  </p>
                </div>
              </div>

              <button
                className="bg-blue-500 text-sm"
                onClick={() => acceptRequestMutation(request._id)} // works now
                disabled={isPending}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>

      {incommingRequest.length === 0 && acceptFriendRequest.length === 0 &&(
        <FriendRequestShowingNone />
      )}
    </div>
  );
}

export default NotificationPage;
