import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiChevronDown, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import logo from "../../../assets/Images/male.png";
import Dropdown from "../../../components/elements/common/Dropdown";
import { authAction } from "../../../feature/auth/authSlice";
// import { useGetProfileQuery } from "../../../feature/common/commonQuery";
import {
  // OperatorResponse,
  ResponseUser,
} from "../../../types";

const includeType = ["operator", "ad-partner", "event-manager"];

const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  // const { selectedOperator } = useAppSelector((state) => state.operator);
  // const { reRenderBulk } = useAppSelector((state) => state.common);
  const { user, type } = useAppSelector((state) => state.auth);
  // console.log(`\n\n type:`, type);
  const navigate = useNavigate();

  const data = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoading = false;

  const handleLogout = () => {
    localStorage.clear();
    dispatch(authAction.logoutSuccess());
    navigate("/account/login");
  };

  const handleProfile = () => {
    if (!includeType.includes(type)) return;
    navigate(`/${type}/profile`);
  };

  const displayName = () => {
    switch (type) {
      case "admin":
        const values = data?.profile as ResponseUser;
        return values?.role || "N/A";
      case "operator":
        const values1 = data?.profile as any;
        return values1?.ShortName || "N/A";
      case "ad-partner":
        const values2 = data?.profile as any;
        return values2?.Name || "N/A";
      case "event-manager":
        const values3 = data?.profile as any;
        return values3?.ShortName || "N/A";
      default:
        return "N/A";
    }
  };

  return (
    <React.Fragment>
      <Dropdown
        buttonClass="p-0"
        extraClass="min-w-[150px] right-2 top-[130%]"
        renderProps={() => (
          <>
            <div className="w-max flex justify-center items-center">
              {data?.profile?.profilepic && includeType?.includes(type) ? (
                <div className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
                  <img
                    src={data?.profile?.profilepic || logo}
                    alt="Profile Picture"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg border-2 border-gray-300 flex justify-center items-center">
                  <AiOutlineUser className="text-xl" />
                </div>
              )}
              <span className="hidden xl:inline-block ml-2 mr-1 uppercase">
                {includeType.includes(type)
                  ? isLoading
                    ? "Loading..."
                    : displayName()
                  : user?.role?.toLocaleUpperCase()}
                {/* {user?.role} */}
              </span>
              <BiChevronDown className="text-xl" />
            </div>
          </>
        )}
      >
        <div className="p-[2px]">
          <ul
            className={`text-sm text-gray-700 max-h-[200px] flex flex-col gap-2`}
          >
            <li
              className="px-4 py-2 hover:bg-gray-10 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-1 "
              onClick={handleProfile}
            >
              <AiOutlineUser />
              <span>{"Profile"}</span>
            </li>

            <li
              className="px-4 py-2 hover:bg-gray-10 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-1 "
              onClick={handleLogout}
            >
              <BiLogOut className="rotate-180" />
              <span>{"Logout"}</span>
            </li>
          </ul>
        </div>
        {/* <span className="dropdown-item cursor_pointers">
          <i className="bx bx-user font-size-16 align-middle mr-1" />
          <span>{"Profile"}</span>
        </span>
        <div className="dropdown-divider" />
        <span  className="dropdown-item cursor_pointers">
          <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger" />
          <span>{"Logout"}</span>
        </span> */}
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileMenu;
