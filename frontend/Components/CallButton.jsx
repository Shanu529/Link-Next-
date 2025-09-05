import React from "react";

function CallButton({handleVideoCall}) {
  return (
    <div>
      <button
        onClick={handleVideoCall}
        className="text-black bg-blue-800 px-5 py-2 text-[0.8rem] inline"
      >
        Video Call
      </button>
    </div>
  );
}

export default CallButton;
