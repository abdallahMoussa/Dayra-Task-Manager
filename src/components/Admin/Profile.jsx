import React, { useContext, useEffect } from "react";
import DarkmodeButton from "../UI/DarkmodeButton";
import LangButton from "../UI/LangButton";
import { ThemeContext } from "../../context/ThemeContext";
import profileImg from "../../assets/imgs/dayra-logo.png";
import "firebase/database";
import AuthContext from "../../context/AuthContext";
import LogOut from "../UI/LogOut";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { langDir } = useContext(ThemeContext);

  return (
    <div className="flex w-full items-center justify-center pt-8 ">
      <div className="relative w-full  group  mx-auto mt-6 mb-6 break-words bg-slate-200 border shadow-md dark:bg-gray-800 dark:border-gray-700 rounded-xl">
        <div className="pb-2">
          <div className="flex flex-wrap justify-center">
            <div className="flex justify-center w-full">
              <div className="relative">
                <img
                  src={user.photo ?? profileImg}
                  className={` dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-4 -mt-[50%] w-20   sm:max-w-[120px] dark:bg-slate-500 bg-slate-100 ${
                    user.photo ? "" : " py-2 px-1"
                  }`}
                />
              </div>
            </div>
          </div>
          <div className="mt-2  text-center">
            <h3 className="mb-1 sm:block hidden text-xl font-bold leading-normal text-gray-700 dark:text-gray-300">
              {user.name?.replace(/\b\w/g, (char) => char.toUpperCase())}
            </h3>

            <div className="w-full text-center mt-5">
              <div className="flex justify-center  pb-0 ">
                <div
                  dir={langDir}
                  className="flex flex-col items-center sm:flex-row space-x-2"
                >
                  <LogOut className="ml-3" />
                  <LangButton className="scale-110 sm:scale-100 sm:mt-0 mt-1 " />
                  <DarkmodeButton className="w-[36px] sm:w-auto sm:scale-[.8] scale-[1]   overflow-hidden" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
