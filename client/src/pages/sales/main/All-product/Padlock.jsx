import React from "react";

const Padlock = () => {
  return (
    <div className="container my-5">
      <div
        className="row shadow rounded p-4 align-items-center"
        style={{ background: "#f9f9f9" }}
      >
        {/* Image Section */}
        <div className="col-md-4 text-center mb-4 mb-md-0">
          <img
            src="/images/container-seal.png"
            alt="Container Seal"
            className="img-fluid"
          />
        </div>

        {/* Details Section */}
        <div className="col-md-8">
          <h5 className="fw-bold text-primary mb-3">CONTAINER SEAL RX-B101</h5>
          <p>
            <strong>CONTAINER SEAL</strong> IS MANUFACTURED WITH HIGH GRADE STEEL
            PIN AND PLASTIC.
          </p>
          <p>
            <strong>FEATURE:</strong> Harden Steel Locking Mechanism which reveals
            the evidence of any attempt of Tampering.
          </p>
          <p>
            <strong>APPLICATION:</strong> Cargo Container, Shipping Container,
            Truck Trailer, Rail Freight, Domestic Logistics etc.
          </p>
          <p>
            <strong>COLORS:</strong> Green | Red | Blue | White | Yellow
          </p>
          <p>
            <strong>PACKAGE:</strong> 100 Seals in 1 Box
          </p>
          <p>
            <strong>SERIAL NUMBER:</strong> Running Serial number Embossed on Seal
          </p>
          <p>
            <strong>CUSTOMIZATION:</strong> Available
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-4">
        <button className="btn btn-success btn-lg fw-bold px-5 py-3">
          CLICK HERE TO SUBMIT QUOTE / PRICE REQUEST
        </button>
      </div>
    </div>
  );
};

export default Padlock;
