import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import "./social.css"

function SocialSection() {
  return (
    <section className="section-light">
        <div className="row follow-us-section">
          {/* Left: Follow Us text */}
          <div className="col-md-6">
           <h2 className="follow-us-title">Follow Us</h2>

          </div>

          {/* Right: Social icons */}
          <div className="social-icons-container col-md-6">
            <div className="d-flex gap-3 fs-4 flex-wrap ">
              <a href="#" className="social-icon facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon linkedin">
                <FaLinkedin />
              </a>
              <a href="#" className="social-icon whatsapp">
                <FaWhatsapp />
              </a>
              <a href="#" className="social-icon youtube">
                <FaYoutube />
              </a>
              <a href="#" className="social-icon instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        </section>
  );
}
export default SocialSection;
