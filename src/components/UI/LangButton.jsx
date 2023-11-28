import { Switch } from "@headlessui/react";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ar from "../../assets/imgs/ar.png";
import en from "../../assets/imgs/en.png";

const LangButton = ({ className = "" }) => {
  let { toggleLang, lang, isArabic, trans } = useContext(ThemeContext);

  return (
    <div
      title={trans("change language", "تغيير اللغه")}
      className={`${className}`}
    >
      <Switch
        checked={JSON.parse(!isArabic)}
        onChange={toggleLang}
        className={`relative inline-flex overflow-hidden items-center py-2 p-2  rounded-full transition-colors duration-300 
            bg-slate-100 dark:bg-slate-800 scale-75
           `}
      >
        <img
          className={`transform transition-transform ${
            isArabic
              ? `scale-[2] duration-300 `
              : `scale-0 duration-500 -translate-x-[2.625rem]`
          } w-6 `}
          src={en}
          alt="English icon"
          width="256"
          height="256"
        ></img>

        <span
          className={`absolute p-1 top-0.5 left-0.5 w-8 h-8 m-[2px]  rounded-full flex items-center justify-center transition duration-500 transform ${
            isArabic && `translate-x-[2.625rem] scale-[.6] opacity-70`
          }`}
        >
          <img
            className={`flex-none transition duration-500 transform  w-full ${
              isArabic ? `opacity-0 scale-0` : `opacity-100  scale-[2]`
            }`}
            src={ar}
            alt="Arabic icon"
            loading="lazy"
            width="110"
            height="110"
          />
        </span>
      </Switch>
    </div>
  );
};

export default LangButton;
