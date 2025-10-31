import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ChangePasswordModal from "../change-password/changePassword";
import { decodeToken } from "../../utiltes/auth";

export default function Header() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      setUserName(decoded?.name || "Guest");
      setCurrentUserId(decoded?.id || null);
    }

    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg header-container">
      <div className="container">
        <Link className="navbar-brand p-0 m-0" to="/" onClick={closeNavbar}>
          <img src="./logo.png" height="50" alt="logo" className="logoImage" />
        </Link>

        <button
          className={`navbar-toggler ${isOpen ? "" : "collapsed"}`}
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
          <span className="toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-center gap-2 gap-md-3">
            <li className="nav-item">
              <div className="nav-search">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                />
                <button className="search-btn">
                  <FaSearch />
                </button>
              </div>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                role="button"
                onClick={toggleDropdown}
              >
                <i className=" material-symbols-outlined"> passkey</i>
              </Link>

              <ul
                className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
                onClick={() => setIsDropdownOpen(false)} // 👈 close on any click
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to="/profile"
                    onClick={() => {
                      setIsDropdownOpen(false); // close dropdown
                      closeNavbar(); // optional
                    }}
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item"
                    onClick={() => {
                      setShowPasswordModal(true);
                      setIsDropdownOpen(false); // 👈 close dropdown when clicked
                    }}
                  >
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="dropdown-item"
                    onClick={(e) => {
                      e.preventDefault(); // prevent default navigation
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <span className="username-show"> {userName}</span>
            </li>
          </ul>
        </div>

        {showPasswordModal && (
          <ChangePasswordModal
            userId={currentUserId}
            show={showPasswordModal}
            onClose={() => setShowPasswordModal(false)}
          />
        )}
      </div>
    </nav>
  );
}
