import React from "react";
import { useNavigate } from "react-router-dom";
import "./cta.css"; // Your existing CSS file

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="section-light">
      <div className="container">
         <div className="cta-section">
        <div className="row align-items-center">
          {/* Left Column - 9 parts */}
          <div className="col-lg-9 text-center text-lg-start cta-left">
            <h2 className="fw-bold mb-3">
              Would you like to place a purchase order with us?
            </h2>
            <p className="mb-2">
              Or do you have any questions about our business, or want to see if
              we match your specific needs?
            </p>
            <p className="mb-2">We strive to stay in communication with our clients.</p>
            <p className="mb-0">
              Send us a message, or give us a call. We're always happy to meet new customers!
            </p>
          </div>

          {/* Right Column - 3 parts */}
          <div className="col-lg-3 d-flex flex-column gap-3 cta-right text-center">
            <a
              href="tel:+919555541415"
              className="cta-btn-phone"
            >
              +91-9555541415
            </a>
            <button
              type="button"
              className="cta-btn-order"
              onClick={() => navigate("/quote")}
            >
               ORDER NOW
            </button>
          </div>
        </div>
      </div>
      </div>
      </section>
  );
}

export default CTA;
