import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../../context/ThemeContext";
import DarkmodeButton from "./DarkmodeButton";
import LangButton from "./LangButton";
import AuthContext from "../../context/AuthContext";

const GuestLayout = () => {
  const { isArabic } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);

  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!auth) {
      setRendered(true);
    } else {
      setRendered(false);
    }
  }, [auth]);
  return (
    <>
      {rendered ? (
        <div
          className={`fixed flex flex-col items-center z-50 bottom-2 ${
            isArabic ? "left-2" : "right-2"
          }`}
        >
          <DarkmodeButton className="w-[36px] scale-[1.1] overflow-hidden" />
          <LangButton className="scale-125 mt-1 " />
        </div>
      ) : null}
    </>
  );
};

export default GuestLayout;
