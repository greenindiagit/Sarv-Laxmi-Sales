import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import "../../../index.css";
import axiosInstance from "../../../api/axiosInstance";
import API_PATHS from "../../../api/apiUrl";

export default function ProductQuatation() {
  const products = [
    { id: "RX-C102", img: "/productimg/camara.jpg" },
    { id: "RX-C103", img: "/productimg/bolt-seal.jpeg" },
    { id: "RX-A101", img: "/productimg/rope-wire-seal.jpg" },
    { id: "RX-M102", img: "/productimg/roto-seal-twist-type-meter-seal.webp" },
    { id: "RX-PB101", img: "/productimg/cable-seal.jpg" },
    { id: "RX-PD102", img: "/productimg/plastic-seal.jpg" },
    { id: "RX-PD103", img: "/productimg/plastic-seal.jpg" },
    { id: "RX-PD104", img: "/productimg/plastic-seal.jpg" },
  ];

  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSelect = (id) => {
    setSelected(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selected) {
      setMessage("❌ Please select a seal.");
      return;
    }

    const formData = {
      sealType: selected,
      quantityRange: e.target.quantity.value,
      sealColour: e.target.colour.value,
      customizationPrinting: e.target.customization.value,
      deliveryLocation: e.target.location.value,
      personName: e.target.name.value,
      companyName: e.target.company.value,
      mobileNo: e.target.mobile.value,
      whatsAppNo: e.target.whatsapp.value,
      emailId: e.target.email.value,
    };

    try {
      const response = await axiosInstance.post(API_PATHS.Quatation, formData, {
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        setMessage("✅ Your message has been sent!");
        e.target.reset();
        setSelected(null);
      } else {
        setMessage("❌ Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setMessage(
        "❌ Error: " + (error.response?.data?.message || error.message)
      );
    }

    console.log("Form Submitted:", formData);
  };

  return (
    <div className="container px-2 px-sm-3 py-3">
      <section className="p-3 thick-border ">
        <div className="text-center mb-4">
          <button className="btn-arrow">
            QUOTE REQUEST - OFFLINE BULK ORDER
            <FaArrowRightArrowLeft className="ms-2" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="container mb-4">
          <label className="fw-bold col-12 col-md-6 col-md-3 mb-3">
            SELECT THE SEAL <span className="starcolor">*</span>
          </label>
          <div className="row">
            {products.map((p, index) => (
              <div className="col-6 col-sm-4 col-md-3 mb-4" key={index}>
                <div
                  className={`border rounded p-2 shadow-sm position-relative ${
                    selected === p.id ? "border-success shadow-lg" : ""
                  }`}
                  onClick={() => handleSelect(p.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={p.img} alt={p.id} className="img-fluid  " />
                  <p className="ssmall fw-bold text-center">{p.id}</p>

                  {selected === p.id && (
                    <FaCheckCircle
                      className="text-success position-absolute bg-white rounded-circle"
                      style={{ top: "10px", right: "10px", fontSize: "20px" }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-md-10">
              <form
                className="shadow p-4 rounded bg-white"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Quantity Range <span className="starcolor">*</span>
                    </label>
                    <select name="quantity" className="form-select" required>
                      <option value="">Select Quantity</option>
                      <option value="100-500">100 - 500</option>
                      <option value="500-1000">500 - 1000</option>
                      <option value="1000+">1000+</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Seal Colour</label>
                    <select name="colour" className="form-select">
                      <option value="">Select Colour</option>
                      <option value="Red">Red</option>
                      <option value="Blue">Blue</option>
                      <option value="Yellow">Yellow</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Customization / Printing?
                    </label>
                    <input
                      type="text"
                      name="customization"
                      className="form-control"
                      placeholder="Enter details"
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Delivery Location</label>
                    <input
                      type="text"
                      name="location"
                      className="form-control"
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      className="form-control"
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input type="tel" name="mobile" className="form-control" />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">WhatsApp Number</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      className="form-control"
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">
                      Email ID <span className="starcolor">*</span>
                    </label>
                    <input type="email" name="email" className="form-control" />
                    <span className="small text-muted">
                      PLEASE TYPE YOUR DOMAIN EMAIL ID TO GET REQUIRED
                      INFORMATION OR TO AVOID SPAM / JUNK EMAIL.
                    </span>
                  </div>

                  <div className="col-12 text-center mt-3">
                    <button type="submit" className="quote-form-btn ">
                      Submit
                    </button>
                  </div>

                  {message && (
                    <div className="col-12">
                      <p className="text-center mt-3 fw-bold text-danger">
                        {message}
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
