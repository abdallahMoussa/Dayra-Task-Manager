import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const User = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  return auth ? <>{children}</> : navigate("/login");
};

export default User;
