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
    <div className="container align-content-center align-items-center w-75 py-3">
      <section className="p-3 thick-border ">
        <div className="text-center mb-4">
          <button className="btn-md w-50 align-items-center justify-content-center btn-arrow">
            QUOTE REQUEST - OFFLINE BULK ORDER
            <FaArrowRightArrowLeft className="ms-2" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="container mb-4">
          <label className="fw-bold mb-3">
            SELECT THE SEAL <span className="starcolor">*</span>
          </label>
          <div className="row">
            {products.map((p, index) => (
              <div className="col-6 col-md-3 mb-4" key={index}>
                <div
                  className={`border rounded p-2 shadow-sm position-relative ${
                    selected === p.id ? "border-success shadow-lg" : ""
                  }`}
                  onClick={() => handleSelect(p.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={p.img}
                    alt={p.id}
                    className="img-fluid mb-2"
                    style={{ width: "120px", height: "120px" }}
                  />
                  <p className="small fw-bold">{p.id}</p>

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
        </div>

        {/* Form */}
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="row w-100 justify-content-center ">
            <div className="col-md-9">
              <form
                className="shadow p-4 rounded bg-white"
                onSubmit={handleSubmit}
              >
                <div className="mb-3">
                  <label className="form-label">
                    Quantity Range<span className="starcolor">*</span>
                  </label>
                  <select name="quantity" className="form-select" required>
                    <option value="">Select Quantity</option>
                    <option value="100-500">100 - 500</option>
                    <option value="500-1000">500 - 1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Seal Colour</label>
                  <select name="colour" className="form-select">
                    <option value="">Select Colour</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Yellow">Yellow</option>
                  </select>
                </div>

                <div className="mb-3">
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

                <div className="mb-3">
                  <label className="form-label">Delivery Location</label>
                  <input type="text" name="location" className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" name="name" className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Company Name</label>
                  <input type="text" name="company" className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input type="tel" name="mobile" className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">WhatsApp Number</label>
                  <input type="tel" name="whatsapp" className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Email ID <span className="starcolor">*</span>
                  </label>
                  <input type="email" name="email" className="form-control" />
                  <span  className="small text-muted">
                    PLEASE TYPE YOUR DOMAIN EMAIL ID TO GET REQUIRED INFORMATION
                    OR TO AVOID SPAM / JUNK EMAIL.
                  </span>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
                {message && <p className="mt-3 text-center">{message}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
