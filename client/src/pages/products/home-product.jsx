import React from "react";
import { useNavigate } from "react-router-dom";
// If using React Icons
import { FaEye, FaShoppingCart } from "react-icons/fa";
import "../../index.css";

const products = [
  {
    title: "Container Seal",
    img: "/productimg/CONTAINER-SEAL-2.jpg",
    desc: "The container seals are mechanism used to seal shipping containers in a way that provides tamper evidence and some level of security.",
  },
  {
    title: "Wire Seal",
    img: "/productimg/wire-seal.jpg",
    desc: "Wire seals allow for more versatile application, as they have variable length of the locking mechanism limited only by the cable length.",
  },
  {
    title: "Padlock Seal",
    img: "/productimg/padlock-seal.jpg",
    desc: "Padlock Seals are used for informal transport: smaller container Door locking, Shutter locking, Trolley locking etc.",
  },
  {
    title: "Meter Seal",
    img: "/productimg/meter-seal.jpg",
    desc: "Meter seals or Polycarbonate seal (PC) used at Electric Meter Sealing, Mining Transport locking, Oil Drum Sealing etc.",
  },
  {
    title: "Plastic Seal",
    img: "/productimg/plastic-seal.jpg",
    desc: "Plastic Seal (T) is used at Courier Bags, Postal Bags, Chemical Packets, Supermarket, Drum Locking etc.",
  },
  {
    title: "Cable Seal",
    img: "/productimg/cable-seal.jpg",
    desc: "Cable Seal is used at Oil Drum Locking, Wagon Locking, Tank Locking, Chemical container & drum locking etc.",
  },
  {
    title: "Rope Wire Seal",
    img: "/productimg/rope-wire-seal.jpg",
    desc: "The wire seal is mainly used at Oil Drum Locking, Oil Tanker Locking, Chemical Barrel Locking, Liquid drum locking etc.",
  },
  {
    title: "Meter Roto Seal",
    img: "/productimg/roto-seal-twist-type-meter-seal.webp",
    desc: "Meter Padmeter seals used in export oil drums, storage tanks, truck panels, meter locking, chemical drum locking etc.",
  },
  {
    title: "Bolt Seal",
    img: "/productimg/bolt-seal.jpeg",
    desc: "Container Bolt Seal is used in locking containers, wagon locking, door locking, train door locking etc.",
  },
];

function HomePageProduct() {
  const navigate = useNavigate();

  return (
   <div className="container py-3">
  <p className="text-muted mb-5 hide-mobile">
    Founded in 2018, Sarv Laxmi Sales Corporation is a leading Manufacturer,
    Wholesaler, and Retailer of premium quality security seals and locks.
    With a commitment to innovation, durability, and customer trust, we
    serve clients across India and the globe.
  </p>

  <div className="row g-3">
    {products.map((product, index) => (
      <div className="col-6 col-md-4 mb-4" key={index}>
        <div className="product-card h-100 d-flex flex-column justify-content-between">
          {/* Image */}
          <div className="product-image-container">
            <img
              src={product.img}
              alt={product.title}
              className="product-image"
              onClick={() => navigate("/quate")}
            />
            {/* <div className="product-overlay">
              <button
                className="btn-overlay btn-view"
                onClick={() => navigate("/quate")}
              >
                <FaEye />
              </button>
            </div> */}
          </div>

          {/* Product Details */}
          <div className="product-content flex-grow-1 text-center">
            <h5
              className="product-title mt-2"
              onClick={() => navigate("/quate")}
            >
              {product.title}
            </h5>

            <p className="product-description  hide-mobile">
              {product.desc}
            </p>
            <button
              className="btn btn-warning"
              onClick={() => navigate("/quate")}
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

export default HomePageProduct;
