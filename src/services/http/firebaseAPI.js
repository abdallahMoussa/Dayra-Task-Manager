import Swal from "sweetalert2";
import { auth } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { isOnline } from "./connection";

const signUp = async (userData, setIsLoading) => {
  try {
    if (isOnline()) {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: user.name });
      setIsLoading(false);

      successAlert(setIsLoading, {
        title_en: "Account Created Successfully",
        title_ar: "تم إنشاء الحساب بنجاح",
      });

      return getUserData(user);
    } else {
      return "noConnection";
    }
  } catch (error) {
    setIsLoading(false);
    if (error.code && error.message) {
      const errorCode = error.code;
      const errorMessage = error.message;

      switch (errorCode) {
        case "auth/invalid-email":
          failureAlert(setIsLoading, {
            text_en: "Invalid email address.",
            text_ar: "عنوان البريد الإلكتروني غير صالح.",
          });
          break;

        case "auth/email-already-in-use":
          failureAlert(setIsLoading, {
            text_en: "Email address already exist.",
            text_ar: "عنوان البريد الإلكتروني مسجل مسبقا.",
          });
          break;
        case "auth/weak-password":
          failureAlert(setIsLoading, {
            text_en: "Password should be at least 6 characters.",
            text_ar: "كلمة المرور أقل من 6 أحرف.",
          });
          break;

        default:
          failureAlert(setIsLoading, {
            title_en: "Oops...",
            title_ar: "خطأ...",
            text_en: errorMessage,
            text_ar: errorMessage,
          });
          break;
      }
    } else {
      failureAlert(setIsLoading, {
        title_en: "Oops...",
        title_ar: "خطأ...",
        text_en: "Something went wrong!",
        text_ar: "لقد حدث خطأ اثناء التسجيل",
      });
    }
  }
};

const signInWithGoogle = async (setIsLoading) => {
  const provider = new GoogleAuthProvider();

  try {
    if (isOnline()) {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      successAlert(setIsLoading, {
        title_en: "Login Successfully",
        title_ar: "تم تسجيل الدخول بنجاح",
      });
      return getUserData(user);
    }
  } catch (error) {
    failureAlert(setIsLoading, {});
  }
};

const logIn = async (credentials, setIsLoading) => {
  try {
    if (isOnline()) {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const user = userCredential.user;
      successAlert(setIsLoading, {
        title_en: "Login Successfully",
        title_ar: "تم تسجيل الدخول بنجاح",
      });

      return getUserData(user);
    } else {
      return "noConnection";
    }
  } catch (error) {
    failureAlert(setIsLoading, {
      title_en: "Invalid Credentials...",
      title_ar: "يوجد خطأ فى البريد أو كلمة المرور...",
      text_en: "Please Enter The Correct Email and Password",
      text_ar: "من فضلك تأكد من البريد وكلمة المرور",
    });
  }
};

const successAlert = (
  setIsLoading = (value) => {},
  {
    title_en = "Success..",
    title_ar = "تم بنجاح",
    text_en = "task completed",
    text_ar = "تم تنفيذ الطلب بنجاح",
  }
) => {
  Swal.fire({
    icon: "success",
    title: trans(title_en, title_ar),
    text: trans(text_en, text_ar),
    timer: 3000,
    showConfirmButton: false,
  });
  setIsLoading(false);
};

const failureAlert = (
  setIsLoading = (value) => {},
  {
    title_en = "Error..",
    title_ar = "خطأ..",
    text_en = "something wrong happened",
    text_ar = "لقد وقع خطأ ما",
    confirm_en = "Ok",
    confirm_ar = "حسناً",
  }
) => {
  Swal.fire({
    icon: "error",
    title: trans(title_en, title_ar),
    text: trans(text_en, text_ar),
    confirmButtonText: trans(confirm_en, confirm_ar),
  });
  setIsLoading(false);
};

const trans = (en, ar) => {
  let lang = localStorage.getItem("isArabic");
  return Boolean(lang) ? ar : en;
};

const loader = (
  title_en = "Request Running..",
  title_ar = "جاري تنفيذ الطلب.."
) => {
  Swal.fire({
    title: trans(title_en, title_ar),
    allowOutsideClick: false,
    showConfirmButton: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
};

const getUserData = (user) => {
  return {
    token: user.accessToken,
    name: user.reloadUserInfo.displayName,
    photo: user.reloadUserInfo.photoUrl,
    email: user.reloadUserInfo.email,
  };
};

let Firebase = {
  signUp,
  signInWithGoogle,
  logIn,
  failureAlert,
  successAlert,
  loader,
};

export default Firebase;
