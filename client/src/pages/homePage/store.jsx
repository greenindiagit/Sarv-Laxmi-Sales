import { FaShoppingCart, FaStore } from "react-icons/fa";
import buyNowImg from "/productimg/buynow.jpg";
import offlineOrderImg from "/productimg/Offline-Order.jpg";
import onlineFlowImg from "/productimg/Online-Payment-Process.jpg";
import offlineFlowImg from "/productimg/offline-order-768x105.jpg";
import "../../index.css"
export default function ProductStore() {
  return (
    <>
      {/* Section 1: Buy Now / Offline Orders */}
      <section className="py-3">
        <div className="container" style={{ backgroundColor: "#f0fafa" }}>
          {/* Info Text */}
          <div className="mb-4 text-muted">
            <p>
              <strong>Security Seals Online Store –</strong> The buyer can place
              direct online orders for the security seals through this portal
              and get delivered at their door steps or can collect from our unit
              directly. However buyer can also send quote request for other
              models which are not available online due to stock. Bulk orders
              with different specifications can submit an Offline Order Form or
              send an email with full details. Bulk prices are highly
              discounted.
            </p>

            {/* Scrolling Text */}
            <div className="py-2 overflow-hidden">
              <div
                className="d-inline-block"
                style={{
                  whiteSpace: "nowrap",
                  display: "inline-block",
                  animation: "scroll-left 15s linear infinite",
                }}
              >
                Pandemic Issues & Followed Governmental Guidelines. Orders are
                accepted at buyer's risk.
              </div>

              <style>
                {`
                  @keyframes scroll-left {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                  }
                `}
              </style>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Buy Now / Offline Images */}
      <section className="py-2 bg-white">
        <div className="container py-2 card h-100 shadow border-0 rounded-3 my-4">
          <div className="row text-center mb-4">
            <div className="col-md-6 mb-3 overflow-hidden">
              <a href="#">
                <img 
                  src={buyNowImg}
                  alt="Buy Now"
                  className="img-fluid hover-effect overflow-hidden"
                  style={{ maxHeight: "150px", cursor: "pointer" }}
                />
              </a>
            </div>
            <div className="col-md-6 mb-3 overflow-hidden">
              <a href="#">
                <img 
                  src={offlineOrderImg}
                  alt="Offline Order"
                  className="img-fluid hover-effect overflow-hidden"
                  style={{ maxHeight: "150px", cursor: "pointer" }}
                />
              </a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-4">
            <button className="btn btn-success btn-lg d-flex align-items-center gap-2  hover-effect">
              <FaShoppingCart />
              Click here for Online Orders with Pre-Printed Numbers.
            </button>
            <button className="btn btn-success btn-lg d-flex align-items-center gap-2  hover-effect">
              <FaStore />
              Click here for Offline Customized Orders or Customised Printing.
            </button>
          </div>

          {/* Section 3: Order Process Flows */}
          <div className="row text-center g-3">
            <div className="col-md-6">
              <a href="#">
                <img
                  src={onlineFlowImg}
                  alt="Online Order Process"
                  className="img-fluid w-100 h-100 hover-effect"
                  style={{
                    objectFit: "cover",
                    maxHeight: "300px",
                    cursor: "pointer",
                  }}
                />
              </a>
            </div>
            <div className="col-md-6 rounded overflow-hidden">
              <a href="#">
                <img
                  src={offlineFlowImg}
                  alt="Offline Order Process"
                  className="img-fluid w-100 h-100 hover-effect"
                  style={{
                    objectFit: "cover",
                    maxHeight: "300px",
                    cursor: "pointer",
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
