import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import API_PATHS from "../../../api/apiUrl";
import { validateContactForm } from "../../../utils/formValidators"; // 🔥 import
import "./contact.css";
// import "../../../index.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    landingNo: "",
    mobile: "",
    email: "",
    extension: "",
    location: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate before submit
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    setSubmitting(true);
    try {
      const response = await axiosInstance.post(
        API_PATHS.ContactPost,
        formData
      );
      if (response.status === 200 || response.status === 201) {
        setMessage("✅ Your message has been sent!");
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        setMessage("❌ Something went wrong.");
      }
    } catch (error) {
      setMessage(
        "❌ Error: " + (error.response?.data?.message || error.message)
      );
    }
    setSubmitting(false);
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <section className="section-light">
      <div className="enquiry-form-container">
        <h2 className="contact-title">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-top-bar"></div>

          {/* Name */}
          <div className="enquiry-form-row">
            <label htmlFor="name" className="enquiry-form-label">
              Name
            </label>
            <input
              type="text"
              className={`enquiry-form-input ${errors.name ? "error" : ""}`}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          {/* Landing No */}
          <div className="enquiry-form-row">
            <label htmlFor="landingNo" className="enquiry-form-label">
              Landing No.
            </label>
            <input
              type="text"
              className={`enquiry-form-input ${
                errors.landingNo ? "error" : ""
              }`}
              id="landingNo"
              name="landingNo"
              value={formData.landingNo}
              onChange={handleChange}
            />
            {errors.landingNo && (
              <p className="error-text">{errors.landingNo}</p>
            )}
          </div>

          {/* Email */}
          <span className="enquiry-form-small">
            Please prefix 0 before landing no.
          </span>
          <div className="enquiry-form-row">
            <label htmlFor="email" className="enquiry-form-label">
              Email
            </label>
            <input
              type="email"
              className={`enquiry-form-input ${errors.email ? "error" : ""}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          {/* Mobile */}
          <div className="enquiry-form-row">
            <label htmlFor="mobile" className="enquiry-form-label">
              Contact No.
            </label>
            <input
              type="tel"
              className={`enquiry-form-input ${errors.mobile ? "error" : ""}`}
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <p className="error-text">{errors.mobile}</p>}
          </div>

          {/* Location */}
          <div className="enquiry-form-row">
            <label htmlFor="location" className="enquiry-form-label">
              Location
            </label>
            <input
              type="text"
              className={`enquiry-form-input ${errors.location ? "error" : ""}`}
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <p className="error-text">{errors.location}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="enquiry-form-btn"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>

          {message && <p className="feedback-message">{message}</p>}
        </form>
      </div>
    </section>
  );
}

export default Contact;
