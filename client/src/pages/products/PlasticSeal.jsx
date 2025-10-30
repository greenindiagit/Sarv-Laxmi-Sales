import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const PlasticSeal = ({ darkMode = false }) => {
  const navigate = useNavigate();
    const { apiUrl, postData, imageCheck } = useContext(AppContext);
    const Urls = apiUrl();
  const [PRODUCTTYPE, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
          const response = await postData(null, Urls.PRODUCTTYPE, "GET");
      setProducts(response.data || response || []);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center my-5">Loading...</p>;
  // Filtered products
  const filteredProducts = PRODUCTTYPE.filter(
    (product) => product.type === "Plastic-Seal"
  );
  return (
    <div className="container">
      {filteredProducts.length === 0 ? (
        <p className="text-center text-danger fw-bold my-5">
          🚫 No record found
        </p>
      ) : (
        filteredProducts.map((product, index) => (
          <div
            key={product._id || index}
            className="row shadow rounded p-3 p-md-4 align-items-center mb-4"
            style={{ background: "#f9f9f9" }}
          >
            {/* Image Section */}
            <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
              <div
                className={`product-card shadow h-100 ${
                  darkMode ? "bg-secondary text-light" : ""
                }`}
              >
                <img
                src={imageCheck(product.image || product.url)}
                  alt={product.name || "Product"}
                  className="product-image mx-auto d-block img-fluid rounded"
                  style={{ maxHeight: "220px", objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="col-12 col-md-8">
              <h5 className="fw-bold text-primary mb-2 text-center text-md-start">
                {product.title}
              </h5>
              <p>
                <strong>FEATURE:</strong> {product.features}
              </p>
              <p>
                <strong>APPLICATION:</strong> {product.application}
              </p>
              <p>
                <strong>COLORS:</strong> {product.colour}
              </p>
              <p>
                <strong>PACKAGE:</strong> {product.packing}
              </p>
              <p>
                <strong>SERIAL NUMBER:</strong> {product.serialNo}
              </p>
              <p>
                <strong>CUSTOMIZATION:</strong> {product.customization}
              </p>

              {/* CTA Button */}
              <div className="text-center text-md-start">
                <button
                  className="btn btn-success btn-sm fw-bold px-4 py-2 mt-3"
                  onClick={() => navigate("/quate")}
                >
                  CLICK HERE
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PlasticSeal;
