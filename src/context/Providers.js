import React from "react";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";
import { AppProvider } from "./AppContext";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppProvider>{children}</AppProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Providers;
