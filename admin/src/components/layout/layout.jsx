import React from "react";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <div className="main-layout">
        <Sidebar />
        {/* <div className="content">
          <Outlet />
        </div> */}

           <main className="main-content">
          <Outlet /> {/* Renders nested routes like Dashboard */}
          
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
