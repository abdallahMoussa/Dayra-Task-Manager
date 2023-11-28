import React from "react";
import { Outlet } from "react-router-dom";
import Container from "../../components/Admin/Container";
import SideBar from "../../components/Admin/SideBar";

const Dashboard = () => {
  return (
    <Container>
      <SideBar />
      <Outlet />
    </Container>
  );
};

export default Dashboard;
