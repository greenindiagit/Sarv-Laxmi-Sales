import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 const navigate = useNavigate();
 const { apiUrl, postData, imageCheck } = useContext(AppContext);
  const Urls = apiUrl();
  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await postData(null, Urls.PRODUCTTYPE, "GET");
      setProducts(response.data || response || []);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center my-5">Loading products...</p>;
  }

  if (!products.length) {
    return <p className="text-center my-5">No products available.</p>;
  }

  return (
    <div className="container">
      <div className="row g-4 justify-content-center">
        {products.map((product) => (
          <div className="col-md-3 col-sm-6 col-12" key={product._id}>
            <div
              className="card text-center border border-primary shadow"
              style={{ borderRadius: "20px" }}
            >
              <img
                src={imageCheck(product.image || product.url)}
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
                <button className="btn btn-success px-4"
                onClick={() => navigate("/quate")}
                >Place Order</button>
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
