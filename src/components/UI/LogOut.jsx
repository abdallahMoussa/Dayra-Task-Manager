import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import AuthContext from "../../context/AuthContext";
import Swal from "sweetalert2";

const LogOut = ({ className }) => {
  const { isArabic, trans } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const logoutHandler = () => {
    Swal.fire({
      icon: "question",
      title: trans("Logout", "تسجل الخروج"),
      text: trans(
        "Are you sure you want to logout?",
        "هل متأكد من تسجيل الخروج؟"
      ),
      confirmButtonText: trans("Logout", "تسجيل خروج"),
      showCancelButton: true,
      cancelButtonText: trans("Cancel", "إلغاء"),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: trans("LogingOut..", "..جاري تسجيل الخروج"),
          showConfirmButton: false,
        });
        setTimeout(() => {
          logout();
          Swal.close();
        }, 2000);
      }
    });
  };
  return (
    <div title={trans("logout", "تسجيل الخروج")}>
      <Icon
        onClick={logoutHandler}
        icon="solar:logout-2-bold"
        className={`text-3xl mt-1 text-teal-600 hover:text-teal-400 cursor-pointer drop-shadow-sm ${
          isArabic ? " -scale-x-100 ml-2" : "mr-3"
        } ${className}`}
      />
    </div>
  );
};

export default LogOut;
