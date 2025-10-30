import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";

const Layout = () => {
  return (
  <div className="app-layout">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
