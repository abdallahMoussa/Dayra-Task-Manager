import React, { useContext, useEffect, useState } from "react";
import SideBarTab from "./SideBarTab";
import Profile from "./Profile";
import AppContext from "../../context/AppContext";

const SideBar = () => {
  const { tasks } = useContext(AppContext);
  const [completedCount, setCompletedCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const countsHandler = () => {
    let completed = tasks.filter((task) => task.completed).length;
    setCompletedCount((prev) => completed);
    setActiveCount((prev) => tasks.length - completed);
  };
  useEffect(() => {
    countsHandler();
  }, [tasks]);
  return (
    <>
      <div className="relative w-20 sm:w-[330px] flex flex-col min-h-screen pt-2 bg-clip-border dark:bg-slate-800  bg-white text-gray-700   shadow-xl shadow-blue-gray-900/5">
        <nav className="flex flex-col gap-1 w-full p-2 font-sans text-base font-normal text-gray-700 dark:text-slate-200">
          <Profile />
          <SideBarTab
            title="Home"
            title_ar="الرئيسية"
            icon="ion:home"
            to="/dashboard"
          />
          <SideBarTab
            title="All Tasks"
            title_ar="كل المهام"
            icon="streamline:strategy-tasks-solid"
            count={tasks.length}
            to="tasks"
          />
          <SideBarTab
            title="Active"
            title_ar="النشطه"
            icon="icon-park-solid:doc-fail"
            count={activeCount}
            to="active"
          />
          <SideBarTab
            title="Completed"
            title_ar="المكتمله"
            icon="clarity:tasks-solid"
            count={completedCount}
            to="completed"
          />
        </nav>
      </div>
    </>
  );
};

export default SideBar;
