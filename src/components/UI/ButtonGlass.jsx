import React, { useContext } from "react";
import "./ButtonGlass.css";
import { Link } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";

const ButtonGlass = ({
  title_en = "Button",
  title_ar = "دخول",
  to = "",
  className = "",
}) => {
  const { trans } = useContext(ThemeContext);
  return (
    <Link to={to}>
      <div className={`button-container font-bold ${className}`}>
        <button className="button before " id="before" type="button">
          {trans(title_en, title_ar)}
        </button>
      </div>
    </Link>
  );
};

export default ButtonGlass;
