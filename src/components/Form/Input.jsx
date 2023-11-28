import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Input = ({
  name = "",
  placeholder_en = "",
  placeholder_ar = "",
  type = "text",
  isRequired = true,
  className = "",
}) => {
  const { trans } = useContext(ThemeContext);
  return (
    <input
      className={`w-full h-full px-2 py-3 rounded-lg font-medium bg-gray-100 dark:bg-gray-200 border border-gray-200 placeholder-gray-500  focus:outline-none focus:border-gray-400 focus:bg-white ${className}`}
      type={type}
      name={name}
      required={isRequired}
      placeholder={trans(placeholder_en, placeholder_ar)}
    />
  );
};

export default Input;
