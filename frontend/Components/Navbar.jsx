import React from "react";
import useAuthUser from "../Hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../src/lib/axios";
import { MdMessage } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
function Navbar() {
  const { authUser } = useAuthUser();

  const queryClient = useQueryClient();
  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return (
    <>
      <div>
        <nav className="bg-black text-white px-4 py-5 flex justify-between items-center">
          <h2 className="">logo</h2>
          <div className="flex gap-5 list-none capitalize items-center">
            <li  className="text-[1.8rem]"><IoIosNotifications /></li>
            <li className="text-[1.8rem]"><MdMessage /></li>
            <div className="w-9 rounded-full items-start">
              {/* <p className="text-[0.5rem]">
                {authUser?.fullName}
              </p> */}
              <img src={authUser?.profilePic} alt="" />
            </div>
            <button onClick={logoutMutation} className="text-[1.8rem]"><IoIosLogOut /></button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
