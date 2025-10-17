import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";

const Layout = () => {
  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
