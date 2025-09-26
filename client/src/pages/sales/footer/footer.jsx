import {
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaUniversity,
  FaRegCreditCard,
  FaWallet,
} from "react-icons/fa";
import React, { useState } from "react";
import ChatModal from "../../chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import "./footer.css";

function Footer() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleClick = () => setIsChatOpen(true);
  const handleClose = () => setIsChatOpen(false);
  return (
    <>
      <footer class="main-footer">
        <div class="container">
          <div class="row">
            <div class="col-md-3">
              {/* <!-- Address --> */}
              <h5 className="mb-3">Address</h5>
              <p className="small mb-1">
                Basement Floor, At-110, Main Market Road, Sultanpur, Near Peer
                Baba,
                <br />
                New Delhi - 110030, INDIA.
                <br />
                GST TIN – 07BKWPM4815J1ZJ
              </p>
            </div>
            <div class="col-md-3">
              {/* <!-- Sales Phone & Email --> */}
              <h5 className="mb-3">Sales Phone & Email</h5>
              <p className="small mb-1">
                <FaPhoneAlt className="me-2" />
                <a href="tel:+919555541415">+91-9555541415</a>,{" "}
                <a href="tel:+919650561009">96505 61009</a>,{" "}
                <a href="tel:+918115131513">81151 31513</a>
              </p>
              <p className="small mb-1">
                <FaEnvelope className="me-2" />
                <a href="mailto:sarvlaxmi2019@gmail.com">
                  sarvlaxmi2019@gmail.com
                </a>
                , <a href="mailto:otlseals@gmail.com">otlseals@gmail.com</a>
              </p>
              <p className="small mb-1">
                <FaWhatsapp className="me-2" />
                <a
                  href="https://wa.me/919555541415"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +91-9555541415
                </a>
              </p>
              <p className="fw-bold">
                <a href="/contact">Contact Us</a>
              </p>
            </div>
            <div class="col-md-3">
              {/* <!-- Payment Options --> */}
              <h5 className="mb-3">Payment Options</h5>
              <ul>
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
            <div class="col-md-3">
              {/* <!-- Security Seals --> */}
              <h5 className="mb-3">Security Seals</h5>
              <ul>
                <li>Container Seal</li>
                <li>Cable Seal</li>
                <li>Wire Seal</li>
                <li>Padlock Seal</li>
                <li>Metal Seal</li>
                <li>Plastic Seal</li>
              </ul>
            </div>
            <div className="container copyright text-center">
              &copy; Copyright 2025 Sarv Laxmi Sales Corporation Pvt. Ltd. All
              Rights Reserved. CIN: U51909DL2022PTC406952
            </div>
            {/* Footer bottom */}
         <div className="chat-wrapper">
              <button
                  onClick={handleClick}
                  className="icon-chat"
                >
                  <FontAwesomeIcon icon={faComment}  className="custom-comment-icon"  />
                </button>

                {/* Modal render conditionally but Hooks inside ChatModal must be top-level */}
                {isChatOpen && <ChatModal onClose={handleClose} />}
              </div>
            </div>
          </div>
      </footer>
    </>
  );
}

export default Footer;
