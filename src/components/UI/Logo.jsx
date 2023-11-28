import React, { useContext } from "react";
import logo from "../../assets/imgs/logo.png";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import AuthContext from "../../context/AuthContext";

function Logo() {
  const { isArabic } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);
  return (
    <>
      {!auth ? (
        <div
          className={`fixed flex top-2 w-32 h-16 p-2 ${
            isArabic ? "right-2" : "left-2"
          }`}
        >
          <Link to="/">
            <img
              alt="logo"
              className="h-full saturate-200 hover:scale-105"
              src={logo}
            />
          </Link>
        </div>
      ) : null}
    </>
  );
}

export default Logo;
