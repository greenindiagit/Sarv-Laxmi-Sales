import { useContext, useEffect, useState } from "react";
import "../../index.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SocialSection from "../social-link/social";
import HomePageProduct from "../products/home-product";
import CustomerAction from "../Call-to-Action/cta";
import { AppContext } from "../../context/AppContext";

export default function Home() {
  const { apiUrl, postData, imageCheck } = useContext(AppContext);
  const Urls = apiUrl();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch banners from backend
  const fetchBanners = async () => {
    try {
      const response = await postData(null, Urls.Banners, "GET");
      setBanners(response.data || response || []);
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
        <div className="container section-light">
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
                      src={imageCheck(banner.bannerImg || banner.url)}

                    alt={banner.title}
                    className="banner-img w-100"
                  />
                  <div className="banner-overlay position-absolute top-50 start-50 translate-middle text-center text-white">
                    <h2 className="fw-bold  fs-md-2">{banner.title}</h2>
                    <div className="banner-subtext">{banner.subtitle}</div>
                    <h3 className="fw-bold mb-3  fs-md-3">
                      {banner.company}
                    </h3>
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
