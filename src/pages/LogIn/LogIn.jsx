import { Link } from "react-router-dom";
import Input from "../../components/Form/Input";
import Button from "../../components/UI/Button";
import Form from "../../components/Form/Form";
import firebaseAPI from "../../services/http/firebaseAPI";
import { useContext, useState } from "react";
import ThemeContext from "../../context/ThemeContext";
import AuthContext from "../../context/AuthContext";
import { Icon } from "@iconify/react";
import login from "../../assets/imgs/login.png";
export default function LogIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGmailLoading, setIsGmailLoading] = useState(false);
  const { langDir, trans, isArabic } = useContext(ThemeContext);
  const { addUser } = useContext(AuthContext);

  const loginHandler = async (user) => {
    let userData = await firebaseAPI.logIn(user, setIsLoading);
    addUser(userData);
  };

  const signWithGoogle = async () => {
    let user = await firebaseAPI.signInWithGoogle(setIsGmailLoading);
    addUser(user);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center ">
      <div
        dir={langDir}
        className=" m-0 bg-white dark:bg-slate-950  flex justify-center items-center "
      >
        <div className="lg:w-1/2 w-full md:p-12 p-3 pt-10 md:pt-0">
          <div className="mt-8 flex flex-col items-center">
            <h1
              data-aos={"fade-top"}
              data-aos-duration="1500"
              className="text-2xl dark:text-slate-200 xl:text-3xl font-Almarai font-bold  mb-2"
            >
              {trans("LogIn", "تسجيل الدخول")}
            </h1>
            <div
              data-aos={isArabic ? "fade-left" : "fade-right"}
              data-aos-duration="1500"
              className="w-full mt-8 "
            >
              <Form className="justify-center gap-[2%]" onSubmit={loginHandler}>
                <Input
                  name="email"
                  placeholder_ar="البريد الإلكتروني"
                  placeholder_en="Email"
                  type="email"
                  className="w-full"
                />
                <Input
                  name="password"
                  placeholder_ar="كلمة المرور"
                  placeholder_en="Password"
                  type="password"
                  className="w-full mt-2"
                />

                <Button
                  dir="ltr"
                  className="bg-indigo-500  text-gray-100 hover:bg-indigo-700 mt-14 dark:bg-blue-900 dark:hover:opacity-80"
                  type="submit"
                  isLoading={isLoading}
                >
                  <Icon
                    icon="mdi:login"
                    className="text-2xl text-slate-200/80"
                  />
                  <span className="ml-3">{trans("LogIn", "تسجيل دخول")}</span>
                </Button>
              </Form>
              <span className="w-full text-sm dark:text-slate-400 ">
                {trans("or Create", "أو قم بإنشاء")}
                <Link className="text-blue-400" to={"/signup"}>
                  {trans(" Account", " حساب")}
                </Link>
              </span>

              <div className="mt-16 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide bg-white dark:bg-slate-950 dark:text-slate-200 transform translate-y-1/2">
                  {trans("Or sign up with", "أو يمكنك التسجيل بواسطه")}
                </div>
              </div>

              <div
                dir="ltr"
                className="social flex items-center pt-5 justify-center"
              >
                <Button
                  dir="ltr"
                  onClick={signWithGoogle}
                  isLoading={isGmailLoading}
                  className="bg-indigo-100 dark:bg-indigo-200 text-gray-800 hover:shadow focus:shadow-sm focus:shadow-outline xl:w-1/3 w-full space-x-3"
                >
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span>{trans("Google Account", "حساب جوجل")}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="image flex-1 bg-indigo-100 dark:bg-slate-800 text-center hidden lg:flex">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-dealy="2000"
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${login})`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
