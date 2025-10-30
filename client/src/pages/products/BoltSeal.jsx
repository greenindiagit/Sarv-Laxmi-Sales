import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const BoltSeal = ({ darkMode = false }) => {
  const navigate = useNavigate();
  const [PRODUCTTYPE, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { apiUrl, postData, imageCheck } = useContext(AppContext);
  const Urls = apiUrl();
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

  // useEffect to call fetch on component mount
 useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center my-5">Loading...</p>;
  // Filtered products
  const filteredProducts = PRODUCTTYPE.filter(
    (product) => product.type === "Bolt Seal"
  );
  return (
    <div className={`container py-4 ${darkMode ? "bg-dark text-white" : ""}`}>
      <div className="row g-4">
          {filteredProducts.length === 0 ? (
        <p className="text-center text-danger fw-bold my-5">
          🚫 No record found
        </p>
      ) : (
        filteredProducts.map((product, index) => (
          <div key={product._id || index} className="col-sm-6 col-md-4">
            <div
              className={`product-card shadow h-100 ${
                darkMode ? "bg-secondary text-light" : ""
              }`}
            >
              <img
               src={imageCheck(product.image || product.url)}
            alt={product.title}
                className="product-image mx-auto d-block"
              />
              <div className="product-content">
                <h5 className="text-primary fw-bold mb-3">{product.title}</h5>
                {product.description?.map((line, i) => (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{ __html: line }}
                    className="mb-2"
                  />
                ))}
                <button
                  className="btn btn-success btn-sm fw-bold px-3 py-2 mt-3"
                  onClick={() => navigate("/quate")}
                >
                  CLICK HERE
                </button>
              </div>
            </div>
          </div>
       ) ))}
      </div>
    </div>
  );
};

export default BoltSeal;
