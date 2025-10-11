import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import logo from "/logo/logo.webp";
import axiosInstance from "../../../api/axiosInstance";
import API_PATHS from "../../../api/apiUrl";
import "./header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // Navbar collapse
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Products dropdown
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.productMaster);
      setProducts(res.data || []);
      // console.log(res.data);ss
    } catch (err) {
      console.error(err);
      // toast.error("Failed to fetch product masters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg header-container">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand p-0 m-0" to="/" onClick={closeNavbar}>
          <img src={logo} alt="Logo" height="50" className="logoImage" />
        </Link>

        {/* Hamburger toggle */}
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

        {/* Navbar links */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-center gap-2 gap-md-3">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNavbar}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeNavbar}>
                About Us
              </Link>
            </li>

            {/* Products Dropdown */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                onClick={toggleDropdown}
                to="/product"
              >
                Products
              </span>

              <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                {products.length > 0 ? (
                  products.filter(Boolean).map((p, index) => (
                    <li key={p._id || index}>
                      <Link
                        className="dropdown-item"
                        to={`/product/${p.name}`} // link dynamically if needed
                        onClick={closeNavbar}
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <p>No products found.</p>
                )}
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={closeNavbar}>
                Contact Us
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="request-quote ms-2"
                to="/quate"
                onClick={closeNavbar}
              >
                Request Quote
              </Link>
            </li>

            <li className="nav-item whatsapp-desktop whatsapp-mobile">
              <a
                href="https://wa.me/919555541415"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link whatsapp-desktop"
              >
                <FaWhatsapp className="whatsappicon" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
