import React from "react";
import "../../../index.css";
import banner from "/productimg/Container-Seal.svg";
import SocialSection from "../main/social-link/social";
import HomePageProduct from "./All-product/home-product";
import CustomerAction from "./Call-to-Action/cta";

export default function Home() {
  return (
    <>
      <section className="position-relative text-center my-3">
        <img
          src={banner}
          alt="Transport"
          className="img-fluid w-100  banner-img"
        />
        <div className="banner-overlay">
          <h2 className="fw-bold fs-4 fs-md-2">
            SINGLE-USE LOCK WITH MAXIMUM SECURITY
          </h2>
          <div className="banner-subtext mx-auto">
            PROTECTING YOUR CONSIGNMENTS FROM THEFT AND PIRACY
          </div>
          <h3 className="fw-bold mb-3 fs-5 fs-md-3">
            Sarv Laxmi Sales Corporation
          </h3>
        </div>
      </section>
      {/* Products Section */}
      <HomePageProduct />

      {/* CTA Section */}
      <CustomerAction />

      {/* Follow Us Section */}
      <SocialSection />
    </>
  );
}
