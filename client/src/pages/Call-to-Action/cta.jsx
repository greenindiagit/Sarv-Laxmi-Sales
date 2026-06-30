import React from "react";
import { useNavigate } from "react-router-dom";
import "./cta.css"; // Your existing CSS file

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="section-light">
       <div className="container my-3">
  <div className="cta-section">
    <div className="row align-items-center">
      {/* Left Column */}
      <div className="col-lg-9 cta-left">
        <h4 className="fw-bold mb-3">
          Would you like to start your procurement process with us?
        </h4>
        <p>
          Perhaps you’d like to learn more about our company or confirm
          how we can fulfill your unique business goals?
        </p>
        <p>We value transparent and continuous communication.</p>
        <p>
          Contact us anytime — our team is eager to assist and collaborate.
        </p>
      </div>

      {/* Right Column */}
      <div className="col-lg-3 d-flex flex-column gap-3 align-items-center align-items-lg-end cta-right mt-4 mt-lg-0">
        <a href="tel:+918115131513" className="cta-btn-phone">
          +91-81-1513-1513
        </a>
        <button
          type="button"
          className="cta-btn-order"
          onClick={() => navigate("/quate")}
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
