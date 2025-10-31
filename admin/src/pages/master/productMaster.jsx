import React, { useEffect, useState } from "react";
import CommonBreadcrumb from "../../components/breadcrumb/breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import axios from "axios";
import apis from "../../api/apis";

const ProductMaster = () => {
  const { validToken } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    status: 1,
    createdBy: "admin",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch products
const fetchProducts = async () => {
  setLoading(true);
  try {
    const response = await axios.get(apis.productMaster.get, {
      headers: { Authorization: validToken },
    });

    // ✅ FIX: Access array directly from response.data
    const data = Array.isArray(response.data) ? response.data : response.data.data || [];
    setProducts(data);
  } catch (err) {
    console.error("❌ Fetch error:", err.response?.data || err.message);
    toast.error("Failed to fetch product masters.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Add or Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (editingProduct) {
        res = await axios.put(
          `${apis.productMaster.get}/${editingProduct._id}`,
          formData,
          { headers: { Authorization: validToken } }
        );
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProduct._id ? res.data.data : p))
        );
        toast.success("Product updated successfully!");
      } else {
        res = await axios.post(apis.productMaster.get, formData, {
          headers: { Authorization: validToken },
        });
        setProducts((prev) => [...prev, res.data.data]);
        toast.success("Product added successfully!");
      }

      // Reset modal & form
      setFormData({
        name: "",
        url: "",
        description: "",
        status: 1,
        createdBy: "admin",
      });
      setEditingProduct(null);
      setShowModal(false);
    } catch (err) {
      console.error("❌ Submit error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    const backup = [...products];
    setProducts((prev) => prev.filter((p) => p._id !== id));

    try {
      await axios.delete(`${apis.productMaster.get}/${id}`, {
        headers: { Authorization: validToken },
      });
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error("❌ Delete error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Something went wrong");
      setProducts(backup);
    }
  };

  const handleEdit = (item) => {
    setEditingProduct(item);
    setFormData({
      name: item.name || "",
      url: item.url || "",
      description: item.description || "",
      status: item.status ?? 1,
      createdBy: item.createdBy || "admin",
    });
    setShowModal(true);
  };

  const breadcrumbItems = [
    { label: "Home", link: "/dashboard" },
    { label: "Product Master", link: "/product-master" },
  ];

  return (
    <div className="container mt-4">
      <CommonBreadcrumb crumbs={breadcrumbItems} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Product Master</h2>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Add Product
        </button>
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProduct(null);
                  }}
                />
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label>Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary w-100">
                      {editingProduct ? "Update" : "Add"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary w-100"
                      onClick={() => {
                        setShowModal(false);
                        setEditingProduct(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Sr.No</th>
              <th>Name</th>
              <th>URL</th>
              <th>Description</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p, index) => (
                <tr key={p._id || index}>
                  <td>{index + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.url}</td>
                  <td>{p.description}</td>
                  <td>{p.status === 1 ? "Active" : "Inactive"}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(p._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No Product Masters found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProductMaster;
