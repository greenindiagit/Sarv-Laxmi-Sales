import React, { useState, useEffect } from "react";

const Product = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // In a real app, replace with your actual API
        const response = await fetch(`https://api.example.com/products/${productId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-card">
      <img
        src={product.imageURL || product.image || "/images/placeholder.png"}
        alt={product.name || "Product Image"}
      />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>

      {/* Example extra UI elements */}
      <button className="btn btn-primary">Add to Cart</button>
    </div>
  );
};

export default Product;
