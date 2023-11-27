import React, { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isArabic, setIsArabic] = useState(true);
  const [langDir, setLangDir] = useState("rtl");
  const [darkmode, setDarkmode] = useState(true);

  const toggleLang = () => {
    localStorage.setItem("isArabic", !isArabic);
    setIsArabic((prev) => !prev);
  };

  const toggleDarkmode = () => {
    if (!darkmode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkmode", !darkmode);
    setDarkmode((prev) => !prev);
  };

  const trans = (en, ar) => {
    return isArabic ? ar : en;
  };

  useEffect(() => {
    let isDark = JSON.parse(localStorage.getItem("darkmode"));
    if (isDark) {
      document.body.classList.add("dark");
      setDarkmode(true);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkmode", false);
      setDarkmode(false);
    }
    let lang = JSON.parse(localStorage.getItem("isArabic"));
    setIsArabic((prev) => lang);
  }, []);

  useEffect(() => {
    let direction = isArabic ? "rtl" : "ltr";
    setLangDir(direction);
  }, [isArabic]);

  return (
    <ThemeContext.Provider
      value={{
        isArabic,
        toggleDarkmode,
        darkmode,
        toggleLang,
        langDir,
        trans,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
