import React, { useState, useEffect } from "react";
import CommonBreadcrumb from "../../components/breadcrumb/breadcrumb";
import { useAuth } from "../../context/auth.context";
import axios from "axios";
import apis from "../../api/apis"; // Ensure apis.Banners.get, post, put, delete are defined

const BannersList = () => {
  const { validToken } = useAuth();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    company: "",
    bannerImg: null,
    status: 1,
  });
  const [message, setMessage] = useState("");

  // Base URL for images
  const baseUrl =
    apis.baseUrl ||
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000"; // fallback

  // ✅ Fetch all banners safely
  const fetchBanners = async () => {
    try {
      const response = await axios.get(apis.Banners.get, {
        headers: { Authorization: `Bearer ${validToken}` },
      });

      console.log("Banner API response:", response.data);
      const data = response.data;

      // ✅ Handle different response structures
      if (Array.isArray(data)) {
        setBanners(data);
      } else if (Array.isArray(data.banners)) {
        setBanners(data.banners);
      } else if (Array.isArray(data.data)) {
        setBanners(data.data);
      } else {
        console.warn("⚠️ Unexpected response format:", data);
        setBanners([]);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      setMessage("❌ Failed to load banners.");
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // File change handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, bannerImg: file }));
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  // Open Add Modal
  const handleAddModal = () => {
    setFormData({
      title: "",
      subtitle: "",
      company: "",
      bannerImg: null,
      status: 1,
    });
    setEditingBanner(null);
    setImagePreview(null);
    setShowModal(true);
  };

  // Open Edit Modal
  const handleEditBanner = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      company: banner.company,
      bannerImg: null,
      status: banner.status,
    });
    setImagePreview(
      banner.bannerImg ? `${baseUrl}${banner.bannerImg}` : null
    );
    setShowModal(true);
  };

  // ✅ Add Banner
  const handleAddBanner = async () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      const response = await axios.post(apis.Banners.add, data, {
        headers: {
          Authorization: `Bearer ${validToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const added = response.data.banner || response.data;
      setBanners((prev) => [...prev, added]);
      setMessage("✅ Banner added successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error adding banner:", error);
      setMessage("❌ Failed to add banner.");
    }
  };

  // ✅ Update Banner
  const handleSaveEdit = async () => {
    if (!editingBanner || !editingBanner._id) return;
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      const response = await axios.put(
        `${apis.Banners.update}/${editingBanner._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${validToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updated = response.data.banner || response.data;
      setBanners((prev) =>
        prev.map((b) => (b._id === editingBanner._id ? updated : b))
      );
      setMessage("✅ Banner updated successfully!");
      setShowModal(false);
      setEditingBanner(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error updating banner:", error);
      setMessage("❌ Failed to update banner.");
    }
  };

  // ✅ Delete Banner
  const handleDeleteBanner = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      await axios.delete(`${apis.Banners.delete}/${id}`, {
        headers: { Authorization: `Bearer ${validToken}` },
      });
      setBanners((prev) => prev.filter((b) => b._id !== id));
      setMessage("✅ Banner deleted successfully!");
    } catch (error) {
      console.error("Error deleting banner:", error);
      setMessage("❌ Failed to delete banner.");
    }
  };

  const breadcrumbItems = [
    { label: "Home", link: "/dashboard" },
    { label: "Master", link: "/Master" },
    { label: "Banner List" },
  ];

  return (
    <div className="container mt-4">
      <CommonBreadcrumb crumbs={breadcrumbItems} />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Banner List</h3>
        <button className="btn btn-success" onClick={handleAddModal}>
          + Add Banner
        </button>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      {loading ? (
        <p>Loading Banners...</p>
      ) : banners.length === 0 ? (
        <p>No banners found.</p>
      ) : (
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Company</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr key={banner._id}>
                <td>
                  <img
                    src={
                      banner.bannerImg
                        ? `${baseUrl}${banner.bannerImg}`
                        : "/uploads/Banners/default.jpg"
                    }
                    alt={banner.title}
                    style={{
                      width: "80px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                </td>
                <td>{banner.title}</td>
                <td>{banner.subtitle}</td>
                <td>{banner.company}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-primary m-1"
                    onClick={() => handleEditBanner(banner)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger m-1"
                    onClick={() => handleDeleteBanner(banner._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
                  {editingBanner ? "Edit Banner" : "Add Banner"}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setEditingBanner(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subtitle</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-control"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-control"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Banner Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="bannerImg"
                    onChange={handleFileChange}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "80px",
                        objectFit: "cover",
                        marginTop: "5px",
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setEditingBanner(null);
                  }}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={editingBanner ? handleSaveEdit : handleAddBanner}
                >
                  {editingBanner ? "Save Changes" : "Add Banner"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannersList;
