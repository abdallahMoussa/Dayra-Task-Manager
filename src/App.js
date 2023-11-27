import "./App.css";
import React, { Suspense, useContext } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Landing/Home.jsx";
import User from "./services/middlewares/User";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import { AuthProvider } from "./context/AuthContext";
import ThemeContext, { ThemeProvider } from "./context/ThemeContext.js";
import Guest from "./services/middlewares/Guest.jsx";
import GuestLayout from "./components/UI/GuestLayout.jsx";
import Loading from "./components/UI/Loading.jsx";
import Tasks from "./pages/Dashboard/Tasks.jsx";
import DashboardHome from "./pages/Dashboard/DashboardHome.jsx";
import LogIn from "./pages/LogIn/LogIn.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "./components/UI/Logo.jsx";

import AOS from "aos";
import "aos/dist/aos.css";

const SignUp = React.lazy(() => import("./pages/SignUp/SignUp.jsx"));

function App() {
  const { isArabic } = useContext(ThemeContext);
  const paths = ["tasks", "completed", "active"];
  AOS.init();

  return (
    <div className="App dark:bg-slate-900 bg-slate-100 overflow-hidden">
      <ToastContainer
        position={!isArabic ? "top-left" : "top-right"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={true}
        draggable={false}
        pauseOnHover={false}
      />

      <GuestLayout />
      <Logo />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
              <Guest>
                <Home />
              </Guest>
            }
          />
          <Route
            path="/signup"
            element={
              <Guest>
                <SignUp />
              </Guest>
            }
          />
          <Route
            path="/login"
            element={
              <Guest>
                <LogIn />
              </Guest>
            }
          />
          <Route
            path="/dashboard"
            element={
              <User>
                <Dashboard />
              </User>
            }
          >
            <Route index exact element={<DashboardHome />} />
            {paths.map((path) => (
              <Route key={path} path={path} element={<Tasks />} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
