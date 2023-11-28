import React, { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link, useLocation } from "react-router-dom";
import { lastSegment } from "../../services/http/connection";

const SideBarTab = ({ title, title_ar, icon, count, to = "" }) => {
  const [active, setActive] = useState(false);
  const { isArabic } = useContext(ThemeContext);

  const location = useLocation();

  const checkActive = () => {
    if (lastSegment() == to || lastSegment() == to.slice(1)) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    checkActive();
  }, [location]);
  return (
    <Link
      to={to}
      role="button"
      tabIndex="0"
      className={`flex  justify-center sm:justify-between dark:text-slate-400 text-slate-700  items-center w-full py-3 p-1 rounded-lg text-start leading-tight hover:bg-teal-600/50  focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 dark:hover:text-slate-300 hover:text-slate-900 focus:text-teal-900 active:text-teal-900 outline-none ${
        active
          ? " dark:bg-teal-300/50 bg-teal-300/30 text-teal-900 dark:text-white"
          : ""
      }`}
    >
      <div className="flex  ">
        <div className="">
          <Icon
            className="sm:w-5 sm:h-5 w-8 h-8 mx-1 dark:text-teal-400 text-teal-600"
            icon={icon}
          />
        </div>
        <span className="sm:block hidden font-Almarai font-600 mx-3">
          {isArabic ? title_ar : title}{" "}
        </span>
      </div>
      {count ? (
        <div className="sm:grid hidden justify-self-start">
          <div
            className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-teal-300/50 dark:text-white text-blue-900 py-1 px-2 text-xs rounded-full"
            style={{ opacity: 1 }}
          >
            <span
              className={`${
                !active ? "text-teal-400" : "dark:text-white text-teal-800"
              }`}
            >
              {count}
            </span>
          </div>
        </div>
      ) : null}
    </Link>
  );
};

export default SideBarTab;
