import React, { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import DarkmodeButton from "./DarkmodeButton";
import LangButton from "./LangButton";
import AuthContext from "../../context/AuthContext";

const GuestLayout = () => {
  const { isArabic } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);

  return auth ? null : (
    <div
      className={`fixed flex flex-col items-center z-50 bottom-2 ${
        isArabic ? "left-2" : "right-2"
      }`}
    >
      <DarkmodeButton className="w-[36px] scale-[1.1] overflow-hidden" />
      <LangButton className="scale-125 mt-1 " />
    </div>
  );
};

export default GuestLayout;
