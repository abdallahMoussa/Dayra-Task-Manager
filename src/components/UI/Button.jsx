import React from "react";
import { Icon } from "@iconify/react";

const Button = ({
  dir = "ltr",
  className,
  type = "",
  onClick = () => {},
  isLoading = false,
  children,
}) => {
  const clickHandler = () => {
    if (!isLoading) {
      onClick();
    }
  };
  return (
    <button
      onClick={clickHandler}
      dir={dir}
      type={type}
      disabled={isLoading}
      className={` md:w-1/2 w-full tracking-wide font-semibold  min-h-[30px] m-auto py-2 rounded-lg  transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${className}`}
    >
      {isLoading ? (
        <Icon
          icon="eos-icons:bubble-loading"
          className="text-2xl duration-800"
        />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Button;
