import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import logo from "/logo/logo.webp";
import "./header.css";

export default function header() {
  return (
    <>
      {/* Bootstrap Navbar */}
 <nav className="navbar navbar-expand-lg header-container">
  <div className="container">
    {/* Brand Section (Logo + Name stacked) */}
    <div className="d-flex flex-column">
      <Link className="navbar-brand p-0 m-0" to="/">
        <img src={logo} alt="Logo" height="50"  className="logoImage"/>
      </Link>
    </div>

    {/* Hamburger Toggle */}
    

 <button
  className="navbar-toggler collapsed"
  type="button"
  data-bs-toggle="collapse"
  data-bs-target="#navbarNav"
  aria-controls="navbarNav"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span className="toggler-icon"></span>
  <span className="toggler-icon"></span>
  <span className="toggler-icon"></span>
</button>
    {/* Navbar links */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto align-items-center gap-2 gap-md-3">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About Us</Link>
        </li>

        {/* Dropdown */}
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="productsDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Products
          </a>
          <ul className="dropdown-menu" aria-labelledby="productsDropdown">
            <li><Link className="dropdown-item" to="/container">Container Seal</Link></li>
            <li><Link className="dropdown-item" to="/bolt">Bolt Seal</Link></li>
            <li><Link className="dropdown-item" to="/plastic">Plastic Seal</Link></li>
            <li><Link className="dropdown-item" to="/cutter">Wire / Seal Cutter</Link></li>
            <li><Link className="dropdown-item" to="/padlock">Padlock Seal</Link></li>
            <li><Link className="dropdown-item" to="/product">View All Seals</Link></li>
          </ul>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/contact">Contact Us</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/store">Store</Link>
        </li> */}

        {/* Quote button */}
        <li className="nav-item">
           <Link className="request-quote ms-2" to="/quate">Request Quote</Link>
          {/* <button className="btn btn-primary ms-2">Request Quote</button> */}
        </li>

        {/* WhatsApp desktop icon */}
        <li className="nav-item  whatsapp-desktop whatsapp-mobile">
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

    </>
  );
}
