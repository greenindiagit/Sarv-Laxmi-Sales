import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    currentPrice: "",
    oldPrice: "",
    rating: "",
    description: "", // you can input multiple lines separated by comma
  });

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Append text fields
      for (const key in formData) {
        if (key === "description") {
          // Convert comma separated to array JSON string
          const descArray = formData.description.split(",").map((d) => d.trim());
          data.append("description", JSON.stringify(descArray));
        } else {
          data.append(key, formData[key]);
        }
      }

      // Append image
      if (imageFile) {
        data.append("image", imageFile);
      }

      const res = await axios.post(`${BACKEND_URL}/api/products`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Product created successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Error creating Product");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={{ marginBottom: 10 }}>
            <label>{key}</label>
            <input
              type={key.includes("Price") ? "number" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required={true}
            />
          </div>
        ))}

        <div style={{ marginBottom: 10 }}>
          <label>Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </div>

        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ProductForm;
