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


function Footer() {
 const [isChatOpen, setIsChatOpen] = useState(false); 

  const handleClick = () => setIsChatOpen(true);
  const handleClose = () => setIsChatOpen(false);
  return (
    <footer className="bg-dark text-light pt-5">
      <div className="container">
        <div className="row">
          {/* Address */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase">Address</h5>
            <p className="small">
              Basement Floor, At-110, Main Market Road, Sultanpur, Near Peer
              Baba,
              <br />
              New Delhi - 110030, INDIA.
              <br />
              GST TIN – 07BKWPM4815J1ZJ
            </p>
          </div>

          {/* Sales */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase">Sales Phone & Email</h5>
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
              Wechat ID – Sarv Laxmi sales Corporation
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

          {/* Payment Options */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase">Payment Options</h5>
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

          {/* Security Seals */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase">Security Seals</h5>
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

      {/* Footer bottom */}
      <div className="bg-secondary text-light py-3 mt-4">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
       <div className="container copyright text-center">
  <p
    style={{
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderStyle: "solid",
      borderWidth: "1px",
      padding: "10px",
    }}
  >
    © Copyright 2025 Sarv Laxmi Sales Corporation Pvt. Ltd. All Rights Reserved.
    CIN: U51909DL2022PTC406952
  </p>
</div>

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
    </footer>
  );
}

export default Footer;
