import React, { useState } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
// import './sidebar.css'

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };
 const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Token हटाओ
    navigate("/login"); // ✅ Redirect to login
  };
  return (
    <div className="deznav">
      <div className="deznav-scroll">
          <ul className="metismenu" id="menu">
            {/* Dashboard */}
            <li>
              <NavLink to="/dashboard/">
                <div className="menu-icon">
                  {/* SVG here */}
                </div>
                <span className="nav-text">Dashboard</span>
              </NavLink>
            </li>

            {/* Master Menu */}
            <li>
              <div
                className="has-arrow menu-link"
                onClick={() => toggleMenu("master")}
              >
                <div className="menu-icon">
                  {/* SVG here */}
                </div>
                <span className="nav-text">Master</span>
              </div>
              {openMenu === "master" && (
                <ul>
                  <li>
                    <NavLink to="/users">Users List</NavLink>
                  </li>
                   <li>
                    <NavLink to="/banner">Banner List</NavLink>
                  </li>
                  <li>
                    <NavLink to="/project-master">Product List</NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* Similar conversion for Providers, Customers, Bookings, Utilities, Blog, Career, Refund, Support, Transaction */}

          </ul>
          <ul className="metismenu" id="menu">
            <li>
              <div
                className="has-arrow menu-link"
                onClick={() => toggleMenu("Project")}
              >
                <div className="menu-icon">{/* SVG */}</div>
                <span className="nav-text">Project</span>
              </div>
              {openMenu === "Project" && (
                <ul>
                  <li>
                    <NavLink to="/Projects">Project List</NavLink>
                  </li>
                  <li>
                    <NavLink to="/ProjectType">Project Type List</NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        <div className="help-desk">
          <button  className="btn btn-primary"
          onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
