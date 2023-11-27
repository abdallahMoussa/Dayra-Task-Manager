import { Switch } from "@headlessui/react";
import React, { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import dark from "../../assets/imgs/dark.png";
import light from "../../assets/imgs/light.png";
import AuthContext from "../../context/AuthContext";

const DarkmodeButton = ({ className }) => {
  let { toggleDarkmode, darkmode, trans } = useContext(ThemeContext);
  let { auth } = useContext(AuthContext);
  return (
    <>
      <div
        title={trans("change mode", "تغير الوضع")}
        dir="ltr"
        className={`en scale-[.8] ${className}`}
      >
        <Switch
          checked={darkmode}
          onChange={toggleDarkmode}
          className={`${
            auth ? "py-1.5 " : "py-2 "
          } relative inline-flex items-center mt-[2px] px-2 rounded-full transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus:outline-none ${
            darkmode
              ? `bg-slate-600 text-slate-400 `
              : `bg-teal-400 text-blue-200 `
          }`}
        >
          <img
            className={`transform transition-transform ${
              darkmode ? `scale-[1.7] duration-300` : `scale-0 duration-500`
            } w-6 `}
            src={dark}
            alt="Moon icon"
            width="256"
            height="256"
          ></img>

          <img
            className={`ml-3.5 transform transition-transform ${
              darkmode ? `scale-0 duration-500` : `scale-100 duration-300`
            } w-6 opacity-60`}
            src={dark}
            alt="Moon icon"
            width="256"
            height="256"
          ></img>

          <span
            className={`absolute p-1 top-0.5 left-0.5 w-8 h-8 bg-white rounded-full flex items-center justify-center transition duration-500 transform ${
              darkmode && `translate-x-[2.625rem] scale-[.6] opacity-70`
            }`}
          >
            <img
              className={`flex-none transition duration-500 transform  w-6 ${
                darkmode ? `opacity-0 scale-0` : `opacity-100 scale-100`
              }`}
              src={light}
              alt="Sun icon"
              loading="lazy"
              width="110"
              height="110"
            />

            <img
              className={`flex-none -ml-6 transition duration-500 transform ${
                darkmode ? `opacity-100 scale-100` : `opacity-0 scale-0`
              } `}
              src={light}
              alt="Sun icon"
              loading="lazy"
              width="110"
              height="110"
            />
          </span>
        </Switch>
      </div>
    </>
  );
};

export default DarkmodeButton;
