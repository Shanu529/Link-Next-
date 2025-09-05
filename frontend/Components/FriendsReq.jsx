// FriendsCard.jsx

export default function FriendsReqCard({
  user,
  isPending,
  isRequestSent,
  sendRequestMutation,
}) {
  return (
    <div key={user._id} className="border p-2 m-2">
      <img src={user.profilePic} alt="" className="w-14" />
      <p>{user.fullName}</p>
      <p>{user.learningLanguage}</p>
      <p>{user.nativeLanguage}</p>
      <p>{user.bio ? user.bio : "No about me found"}</p>

      <button
        disabled={isPending || isRequestSent}
        onClick={() => sendRequestMutation(user._id)}
      >
        {isRequestSent
          ? "Request Sent"
          : isPending
          ? "Sending..."
          : "Send Friend Request"}
      </button>
    </div>
  );
}
