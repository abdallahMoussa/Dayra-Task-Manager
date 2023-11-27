import React, { useContext } from "react";
import Waves from "../../components/Waves/Waves";
import todo from "../../assets/imgs/todo.png";
import ThemeContext from "../../context/ThemeContext";
import ButtonGlass from "../../components/UI/ButtonGlass";
import { InlineIcon } from "@iconify/react";
const Home = () => {
  const { langDir, trans, isArabic } = useContext(ThemeContext);
  return (
    <div className="min-h-screen w-[100vw] overflow-hidden pt-10 md:pt-0 flex justify-center md:items-center">
      <Waves className="absolute bottom-0 fill-teal-500 md:h-32 h-28  z-10" />
      <div
        dir={langDir}
        className="hero w-full h-full flex md:flex-row flex-col-reverse justify-between items-center md:pt-0 pt-10"
      >
        <div
          dir={langDir}
          className="slogen md:px-10 px-5 md:w-1/2 w-full h-full "
        >
          <h1
            data-aos={isArabic ? "fade-left" : "fade-right"}
            data-aos-duration="1000"
            data-aos-delay="1000"
            className="max-w-max text-2xl md:text-4xl xl:text-6xl font-bold text-teal-600 dark:text-slate-200 font-imapact"
          >
            {trans("Dayra Task Manager", "دايره لادارة المهام")}
          </h1>
          <ul
            dir={langDir}
            className={`dark:text-teal-200 text-teal-900 max-w-max ${
              isArabic ? "text-right" : "text-left"
            } md:mt-10 md:px-10 px-4 mt-5 text-xl xl:text-3xl space-y-4`}
          >
            <li
              data-aos={isArabic ? "fade-left" : "fade-right"}
              data-aos-duration="1500"
              data-aos-delay="2000"
              className="flex"
            >
              {trans("Create your mission", "قم بانشاء مهمتك ")}{" "}
              <InlineIcon
                icon="carbon:task-star"
                className="mx-2 my-1  text-teal-600 animate-pulse"
              />
            </li>
            <li
              data-aos={isArabic ? "fade-left" : "fade-right"}
              data-aos-duration="1500"
              data-aos-delay="2500"
              className="flex"
            >
              {trans("Edit your mission details", "عدل تفاصيلك مهمتك")}
              <InlineIcon
                icon="wpf:edit"
                className="mx-2 my-1  text-teal-600 animate-pulse"
              />
            </li>
            <li
              data-aos={isArabic ? "fade-left" : "fade-right"}
              data-aos-duration="1500"
              data-aos-delay="3000"
              className="flex"
            >
              {trans(
                "Mark your task as completed",
                "ضع علامة على مهمتك كمكتملة"
              )}
              <InlineIcon
                icon="carbon:task-complete"
                className="mx-2 my-1  text-teal-600 animate-pulse"
              />
            </li>
          </ul>
          <div
            data-aos={!isArabic ? "fade-left" : "fade-right"}
            data-aos-duration="1500"
            data-aos-delay="3000"
            dir={langDir}
            className="enter pt-8 flex justify-end"
          >
            <ButtonGlass title_ar="تسجيل الدخول" title_en="LogIn" to="/login" />
            <ButtonGlass
              title_ar="إنشاء حساب"
              title_en="SignUp"
              to="/signup"
              className="mx-5"
            />
          </div>
        </div>

        <div
          dir={langDir}
          data-aos="zoom-in"
          data-aos-duration="1500"
          className="img md:w-1/2  w-full relative justify-center flex "
        >
          <img
            src={todo}
            alt="slide hero"
            className=" md:w-9/12 w-6/12 custome-animate"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
