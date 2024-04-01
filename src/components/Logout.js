import React from "react";
import { useNavigate } from "react-router-dom";
import USERIMAGE from "../Images/profile.jpg";
const Logout = ({ handleLogout }) => {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-36 mx-auto h-full  sm:py-0 sm:h-screen lg:py-0">
        <div className="w-[210px] bg-white shadow dark:border md:mt-0 sm:h-72 sm:w-[350px] xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4  md:space-y-6 sm:p-8">
            <div className="flex justify-center items-center">
              <img src={USERIMAGE} alt="useImage" className="sm:w-28 w-16" />
            </div>
            <h1 className="text-sm font-bold leading-tight tracking-tight text-gray-900 sm:text-lg dark:text-white">
              You are logged in!
            </h1>

            <button
              onClick={handleLogoutClick}
              className="w-full border text-white bg-rose-500 focus:outline-none font-medium rounded-lg text-[11px] sm:text-sm px-5 py-2.5 text-center"
            >
              <i class="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Logout;
