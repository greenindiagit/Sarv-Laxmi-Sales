
import { useContext,  useState } from "react";
import { AppContext } from "../../context/AppContext";
import { validateContactForm } from "../../utils/formValidators"; // 🔥 import
import "./contact.css";
// import "../../../index.css";

function Contact() {
   const { apiUrl, postData } = useContext(AppContext);
    const Urls = apiUrl();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    contactMessage: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // 🧩 Step 1: Validate form data
  const validationErrors = validateContactForm(formData);
  if (!formData.termsAccepted) {
    validationErrors.termsAccepted = "You must accept terms & conditions.";
  }

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  setErrors({});
  setSubmitting(true);

  try {
    // 🧩 Step 2: Call API
    const response = await postData(formData, Urls.ContactPost, "POST");

    // 🧩 Step 3: Check API success
    if (response?.success) {
      setMessage("✅ Your message has been sent successfully!");
      setFormData({
        name: "",
        mobile: "",
        email: "",
        address: "",
        contactMessage: "",
        termsAccepted: false,
      });

      // Optional reload delay
      setTimeout(() => setMessage(""), 4000);
    } else {
      setMessage("❌ Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Contact form submission error:", error);
    setMessage("❌ " + (error?.message || "Network error"));
  } finally {
    setSubmitting(false);
  }

    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <section className="section-light">
      <div className="container">
        <h2 className="text-center">CONTACT US</h2>
        <div className="row">
          <div className="col-12 col-md-6">
            {/* Left Panel */}
            <div className="contact-info-container">
              <h3 className="contact-info-title">Contact Information</h3>
              <div className="contact-info-item">
                <strong>Address:</strong>
                <p>
                  Basement Floor, At-110, Main Market Road, Sultanpur, Near Peer
                  Baba, New Delhi - 110030, INDIA
                </p>
              </div>
              <div className="contact-info-item">
                <strong>GST TIN:</strong>
                <p>07BKWPM4815J1ZJ</p>
              </div>
              <div className="contact-info-item">
                <strong>Email:</strong>
                <p>
                  <a href="mailto:sarvlaxmi2019@gmail.com">
                    sarvlaxmi2019@gmail.com
                  </a>
                  ,<a href="mailto:otlseals@gmail.com">otlseals@gmail.com</a>
                </p>
              </div>
              <div className="contact-info-item">
                <strong>Phone / WhatsApp:</strong>
                <p>
                  <a href="tel:+919555541415">+91-955-5541-415</a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}

          <div className="col-12 col-md-6">
            <div className="enquiry-form-container">
              <p className="contact-title">Enquiry From</p>
              <form onSubmit={handleSubmit}>
                <div className="form-top-bar"></div>

                {/* Name */}
                <div className="enquiry-form-row">
                  <label htmlFor="name" className="enquiry-form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`enquiry-form-input ${
                      errors.name ? "error" : ""
                    }`}
                    id="name"
                    name="name"
                    placeholder={errors.name ? errors.name : "Enter your name"}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {/* Mobile */}
                <div className="enquiry-form-row">
                  <label htmlFor="mobile" className="enquiry-form-label">
                    Contact No.
                  </label>
                  <input
                    type="tel"
                    className={`enquiry-form-input ${
                      errors.mobile ? "error" : ""
                    }`}
                    id="mobile"
                    name="mobile"
                    placeholder={
                      errors.name ? errors.mobile : "Enter your Contact No."
                    }
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="enquiry-form-row">
                  <label htmlFor="email" className="enquiry-form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`enquiry-form-input ${
                      errors.email ? "error" : ""
                    }`}
                    id="email"
                    name="email"
                    placeholder={
                      errors.name ? errors.email : "Enter your Email"
                    }
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Location */}
                <div className="enquiry-form-row">
                  <label htmlFor="address" className="enquiry-form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className={`enquiry-form-input ${
                      errors.address ? "error" : ""
                    }`}
                    id="address"
                    name="address"
                    placeholder={
                      errors.name ? errors.address : "Enter your Address"
                    }
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="enquiry-form-row">
                  <label
                    htmlFor="contactMessage"
                    className="enquiry-form-label"
                  >
                    Your Message
                  </label>

                  <textarea
                    name="contactMessage"
                    value={formData.contactMessage}
                    onChange={handleChange}
                    rows={4}
                    className={`enquiry-form-textarea ${
                      errors.contactMessage ? "error" : ""
                    }`}
                    placeholder={
                      errors.contactMessage
                        ? errors.contactMessage
                        : "Your message"
                    }
                  />
                </div>
                {/* Checkbox */}
                <div className="checkbox-row">
                  <label
                    className={`checkbox-label ${
                      errors.termsAccepted ? "error-text" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                    />{" "}
                    {errors.termsAccepted
                      ? errors.termsAccepted
                      : "I agree to the Terms & Conditions"}
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="enquiry-form-btn"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>

                {/* {message && <p className="feedback-message">{message}</p>} */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
