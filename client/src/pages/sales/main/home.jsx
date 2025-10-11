
import React, { useEffect, useState } from "react";
import "../../../index.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import SocialSection from "../main/social-link/social";
import HomePageProduct from "./All-product/home-product";
import CustomerAction from "./Call-to-Action/cta";

import axiosInstance from "../../../api/axiosInstance";
import API_PATHS from "../../../api/apiUrl";
const backend_url = axiosInstance.defaults.baseURL;


export default function Home() {

   const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch banners from backend
  const fetchBanners = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.Banners);
      setBanners(response.data); // assuming response.data is an array of banners
    } catch (error) {
      console.error("Failed to fetch banners", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading banners...</div>;
  }
  return (
    <>
      <section className="section-light">
       <div className="container">
        {/* Banner Carousel */}
        <div className="w-full">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            interval={4000}
            swipeable
            emulateTouch
          >
            {banners.map((banner) => (
              <div key={banner._id} className="banner position-relative">
                <img
                  src={banner.bannerImg ? `${axiosInstance.defaults.baseURL}${banner.bannerImg}` : "/uploads/Banners/default.jpg"}
                  alt={banner.title}
                  className="banner-img w-100"
                />
                <div className="banner-overlay position-absolute top-50 start-50 translate-middle text-center text-white">
                  <h2 className="fw-bold fs-4 fs-md-2">{banner.title}</h2>
                  <div className="banner-subtext">{banner.subtitle}</div>
                  <h3 className="fw-bold mb-3 fs-5 fs-md-3">{banner.company}</h3>
                </div>
              </div>
            ))}
          </Carousel>
        </div>


          {/* Products Section */}
          <HomePageProduct />

          {/* CTA Section */}
          <CustomerAction />

          {/* Follow Us Section */}
          <SocialSection />
        </div>
      </section>
    </>
  );
}
