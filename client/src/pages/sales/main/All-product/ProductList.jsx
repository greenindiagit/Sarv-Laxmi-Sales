import React from "react";

// Sample product data
const products = [
  {
    id: 1,
    name: "BOLT CUTTER",
    code: "RX-TP01",
    image: "/images/bolt-cutter.png",
  },
  {
    id: 2,
    name: "CABLE CUTTER",
    code: "RX-TP02",
    image: "/images/cable-cutter.png",
  },
  {
    id: 3,
    name: "BOLT SEAL",
    code: "RX-A102",
    image: "/images/bolt-seal.png",
  },
  {
    id: 4,
    name: "FLAP SEAL",
    code: "RX-PS111",
    image: "/images/flap-seal.png",
  },
];

const ProductList = () => {
  return (
    <div className="container my-5">
      <div className="row g-4 justify-content-center">
        {products.map((product) => (
          <div className="col-md-3 col-sm-6 col-12" key={product.id}>
            <div
              className="card text-center border border-primary shadow"
              style={{ borderRadius: "20px" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{
                  maxHeight: "220px",
                  objectFit: "contain",
                  padding: "20px",
                }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold text-uppercase text-dark">
                  {product.name}
                </h5>
                <h6 className="card-subtitle mb-3 text-primary fw-semibold">
                  {product.code}
                </h6>
                <button className="btn btn-success px-4">Place Order</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA section */}
      <div className="text-center mt-5">
        <p className="fs-5 fw-semibold">
          Tell us about your seals requirement and we will get back to you with
          best rates.
        </p>
        <button className="btn btn-outline-primary px-5 py-2 rounded-pill fw-bold">
          GET A QUOTE
        </button>
      </div>
    </div>
  );
};

export default ProductList;
