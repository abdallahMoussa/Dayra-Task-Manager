import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  const addUser = (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setAuth(true);
      setUser(user);
    }
  };

  const logout = () => {
    localStorage.setItem("user", null);
    setAuth(false);
    setUser({});
    navigate("/");
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    if (user && Object.keys(user).length) {
      setAuth(true);
      setUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        auth,
        setAuth,
        addUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
