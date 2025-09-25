import {
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaStore,
  FaShoppingCart,
  FaUniversity,
  FaRegCreditCard,
  FaPaypal,
  FaWallet,
} from "react-icons/fa";
import React, { useState } from "react";
import ChatModal from "../../chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import "../../../index.css";

function Footer() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleClick = () => setIsChatOpen(true);
  const handleClose = () => setIsChatOpen(false);
  return (
    <div className="main-footer py-5">
      <div className="container">
        <div className="row">
          {/* Address */}
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <h5 className="mb-3">Address</h5>
            <p className="d-flex flex-column justify-content-start">
              Basement Floor, At-110, Main Market Road, Sultanpur, Near Peer
              Baba,
              <br />
              New Delhi - 110030, INDIA.
              <br />
              GST TIN – 07BKWPM4815J1ZJ
            </p>
          </div>

          {/* Sales */}
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <h5 className="mb-3">Sales Phone & Email</h5>
            <div className="d-flex flex-column justify-content-start">
              <p className="small mb-1">
                <FaPhoneAlt className="me-2" />
                <a
                  href="tel:+919555541415"
                  className="text-light text-decoration-none"
                >
                  +91-9555541415
                </a>
                ,{" "}
                <a
                  href="tel:+919650561009"
                  className="text-light text-decoration-none"
                >
                  96505 61009
                </a>
                ,{" "}
                <a
                  href="tel:+918115131513"
                  className="text-light text-decoration-none"
                >
                  81151 31513
                </a>
              </p>
              <p className="small mb-1">
                <FaEnvelope className="me-2" />
                <a
                  href="mailto:sarvlaxmi2019@gmail.com"
                  className="text-light text-decoration-none"
                >
                  sarvlaxmi2019@gmail.com
                </a>
                ,{" "}
                <a
                  href="mailto:otlseals@gmail.com"
                  className="text-light text-decoration-none"
                >
                  otlseals@gmail.com
                </a>
              </p>
              <p className="small mb-1">
                <FaWhatsapp className="me-2" />
                <a
                  href="https://wa.me/919555541415"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none"
                >
                  +91-9555541415
                </a>
              </p>
              <p className="fw-bold">
                <a href="/contact" className="text-light">
                  Contact Us
                </a>
              </p>
            </div>
          </div>

          {/* Payment Options */}
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <h5 className="mb-3">Payment Options</h5>
            <div className="d-flex flex-column justify-content-start">
              <ul className="list-unstyled small">
                <li>
                  <FaUniversity className="me-2" /> NEFT / IMPS / RTGS
                </li>
                <li>
                  <FaRegCreditCard className="me-2" /> Cheque / DD
                </li>
                <li>
                  <FaRegCreditCard className="me-2" /> Debit / Credit Card
                </li>
                <li>
                  <FaWallet className="me-2" /> BHIM / Wallet Pay
                </li>
              </ul>
            </div>
          </div>

          {/* Security Seals */}
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <h5 className="mb-3">Security Seals</h5>
            <div className="d-flex flex-column justify-content-start">
              <ul className="list-unstyled small">
                <li>Container Seal</li>
                <li>Cable Seal</li>
                <li>Wire Seal</li>
                <li>Padlock Seal</li>
                <li>Metal Seal</li>
                <li>Plastic Seal</li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="pt-3 mt-3 border-top"
          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <div
            className="container copyright text-center"
            style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
          >
            &copy; Copyright 2025 Sarv Laxmi Sales Corporation Pvt. Ltd. All
            Rights Reserved. CIN: U51909DL2022PTC406952
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <button
            onClick={handleClick}
            className="btn btn-primary rounded-circle position-fixed"
            style={{
              width: "50px",
              height: "50px",
              bottom: "20px",
              left: "20px",
              zIndex: 1000,
            }}
          >
            <FontAwesomeIcon icon={faComment} size="lg" />
          </button>

          {/* Modal render conditionally but Hooks inside ChatModal must be top-level */}
          {isChatOpen && <ChatModal onClose={handleClose} />}
        </div>
    </div>
  );
}

export default Footer;
