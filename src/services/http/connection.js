import { toast } from "react-toastify";

const isOnline = () => {
  if (!navigator.onLine) {
    toast.error(
      trans(
        "make sure internet connection ",
        "من فضلك تأكد من إتصالك بالانترنت"
      )
    );
    return false;
  }
  return true;
};
const isOffline = () => {
  if (!navigator.onLine) {
    return false;
  }
  return true;
};

const lastSegment = () => {
  const path = window.location.pathname;
  const segments = path?.split("/").filter((segment) => segment !== "");
  const lastSegment = segments[segments.length - 1];
  return lastSegment;
};

const trans = (en, ar) => {
  let lang = localStorage.getItem("isArabic");
  return lang == "true" ? ar : en;
};

export { isOnline, lastSegment, isOffline };
