import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="w-[10%] text-white bg-black list-none p-5">
        <h1>logo</h1>

        <li className="hover:bg-[rgb(80,80,80)] transition-all hover:duration-[] roude">
          <Link to="/notifications">Notifications</Link>
        </li>
      </div>
    </>
  );
}

export default Sidebar;
