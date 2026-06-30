import { Link } from "react-router-dom";
import { FaArrowLeft, FaRegClock } from "react-icons/fa";

const LegalLayout = ({ title, children }) => {
  return (
    <div className="legal-page">
      <div className="container">

        <Link to="/" className="back-btn">
          <FaArrowLeft />
        </Link>

        <div className="legal-card">

          <div className="legal-header">
            <h5>{title}</h5>

            <div className="date-badge">
              <FaRegClock />
              <span>Effective June 2026</span>
            </div>
          </div>

          <hr />

          <div className="legal-content">
            {children}
          </div>

        </div>

      </div>
    </div>
  );
};

export default LegalLayout;