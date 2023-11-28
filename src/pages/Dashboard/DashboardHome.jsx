import React from "react";
import AddTask from "../../components/Tasks/AddTask";
import ChartData from "../../components/UI/ChartData";

const DashboardHome = () => {
  return (
    <div className="w-full min-h-screen p-3">
      <AddTask />
      <div className="w-full h-full flex justify-center items-start">
        <ChartData />
      </div>
    </div>
  );
};

export default DashboardHome;
