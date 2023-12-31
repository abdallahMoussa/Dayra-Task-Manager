import "./App.css";
import React, { Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import User from "./services/middlewares/User";
import { ThemeContext } from "./context/ThemeContext.js";
import Guest from "./services/middlewares/Guest.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "./components/UI/Logo.jsx";

import AOS from "aos";
import "aos/dist/aos.css";
import SuspenseLoading from "./components/UI/SuspenseLoading.jsx";

const SignUp = React.lazy(() => import("./pages/SignUp/SignUp.jsx"));
const LogIn = React.lazy(() => import("./pages/LogIn/LogIn.jsx"));
const Home = React.lazy(() => import("./pages/Landing/Home.jsx"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard.jsx"));
const Tasks = React.lazy(() => import("./pages/Dashboard/Tasks.jsx"));
const GuestLayout = React.lazy(() => import("./components/UI/GuestLayout.jsx"));
const DashboardHome = React.lazy(() =>
  import("./pages/Dashboard/DashboardHome.jsx")
);

function App() {
  const { isArabic } = useContext(ThemeContext);
  const paths = ["tasks", "completed", "active"];
  AOS.init();

  return (
    <div className="App dark:bg-slate-900 min-h-screen bg-slate-100 overflow-hidden">
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
      <Suspense fallback={<SuspenseLoading />}>
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
