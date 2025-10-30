import { Outlet } from "react-router-dom";
import Navbar from "../Header/header";
import Footer from "../Footer/footer";

const Layout = () => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;