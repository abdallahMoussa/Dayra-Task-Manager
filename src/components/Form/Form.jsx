import React, { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";

const Form = ({ children, onSubmit, className }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());
    onSubmit(formDataObject);
  };
  const { langDir } = useContext(ThemeContext);
  return (
    <form
      dir={langDir}
      onSubmit={submitHandler}
      className={` w-full flex flex-wrap space-x-reverse relative  ${className}`}
    >
      {children}
    </form>
  );
};

export default Form;
