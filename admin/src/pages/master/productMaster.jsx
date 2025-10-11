import React, { useEffect, useState } from "react";
import CommonBreadcrumb from "../../components/breadcrumb/breadcrumb";
import axiosInstance from "../../api/axiosInstance";
import API_PATHS from "../../api/apiUrl";
import { ToastContainer, toast } from "react-toastify";

const ProductMaster = () => {
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

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.productMaster);
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
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

  // Add or Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        // Update
        const res = await axiosInstance.put(
          `${API_PATHS.productMaster}/${editingProduct._id}`,
          formData
        );
        // Reflect update immediately
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProduct._id ? res.data.data : p))
        );
        toast.success("Product updated successfully!");
      } else {
        // Add
        const res = await axiosInstance.post(API_PATHS.productMaster, formData);
        setProducts((prev) => [...prev, res.data.data]); // Reflect add immediately
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
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    // Optimistic update
    const backup = [...products];
    setProducts((prev) => prev.filter((p) => p._id !== id));

    try {
      await axiosInstance.delete(`${API_PATHS.productMaster}/${id}`);
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
      setProducts(backup); // revert if error
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

      {/* Modal */}
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

      {/* Table */}
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
              products.filter(Boolean).map((p, index) => (
                <tr  key={p._id || index}>
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

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProductMaster;
