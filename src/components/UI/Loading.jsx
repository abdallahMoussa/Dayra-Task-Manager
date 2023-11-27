import { Icon } from "@iconify/react";
import React from "react";
import logo from "../../assets/imgs/dayra-logo.png";
const Loading = () => {
  return (
    <div className=" w-44 flex justify-center items-center relative z-50 ">
      <Icon
        icon="eos-icons:bubble-loading"
        className="text-7xl duration-800 text-teal-700 dark:text-teal-500 relative z-50"
      />
      <img src={logo} alt="logo-loader" className="w-10 absolute z-10 " />
    </div>
  );
};

export default Loading;
