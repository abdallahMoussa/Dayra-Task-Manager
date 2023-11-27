import React, { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";

const Container = ({ children }) => {
  const { langDir } = useContext(ThemeContext);
  return (
    <div
      dir={langDir}
      className="w-full m-auto flex min-h-screen  overflow-hidden "
    >
      {children}
    </div>
  );
};

export default Container;
