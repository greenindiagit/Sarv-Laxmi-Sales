import React, { useState, useEffect } from "react";
import CommonBreadcrumb from "../../components/breadcrumb/breadcrumb";
import { useAuth } from "../../context/auth.context";
import axios from "axios";
import apis from "../../api/apis";
const backend_url =
  apis.baseUrl || import.meta.env.VITE_API_URL || "http://localhost:5000"; // fallback

const ProjectList = () => {
  const { validToken } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      const response = await axios.get(apis.product.get, {
        headers: { Authorization: validToken },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (editingProject) {
      setEditingProject({ ...editingProject, [name]: value });
    }
  };

  // Open Add Modal
  const handleAddModal = () => {
    setFormData({
      name: "",
      code: "",
      currentPrice: "",
      oldPrice: "",
      rating: "",
      description: "",
      image: null, // use null for files
      status: 1, // default active
    });
    setEditingProject(null);
    setShowModal(true);
  };

  // Open Edit Modal
  const handleEditProject = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      code: project.code,
      currentPrice: project.currentPrice || "",
      oldPrice: project.oldPrice || "",
      rating: project.rating || "",
      description: project.description,
      image: null, // leave null, user can choose new file
      status: project.status || 1,
    });
    if (project.image) {
      const fullUrl = `${backend_url}/${project.image.replace(/^\/+/, "")}`;
      setImagePreview(fullUrl);
      console.log("Image preview URL:", fullUrl);
    } else {
      setImagePreview(null);
      console.log("No image found for this project");
    }
    setShowModal(true);
  };
  const handleAddProject = async () => {
    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("code", formData.code);
    dataToSend.append("currentPrice", formData.currentPrice);
    dataToSend.append("oldPrice", formData.oldPrice);
    dataToSend.append("rating", formData.rating);
    dataToSend.append("description", formData.description);
    dataToSend.append("status", formData.status || 1);
    if (formData.image) dataToSend.append("image", formData.image);

    try {
      const response = await axiosInstance.post(
        API_PATHS.Projects,
        dataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // ✅ Update the state immediately
      setProjects((prevProjects) => [...prevProjects, response.data.product]);

      setMessage("✅ Project added successfully!");
      setShowModal(false);
      setFormData({
        name: "",
        code: "",
        currentPrice: "",
        oldPrice: "",
        rating: "",
        description: "",
        image: null,
        status: 1,
      });
    } catch (error) {
      console.error("Error adding project:", error);
      setMessage("❌ Failed to add project.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  // Save edited project
  const handleSaveEdit = async () => {
    if (!editingProject || !editingProject._id) return;

    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("code", formData.code);
    dataToSend.append("currentPrice", formData.currentPrice);
    dataToSend.append("oldPrice", formData.oldPrice);
    dataToSend.append("rating", formData.rating);
    dataToSend.append(
      "description",
      typeof formData.description === "object"
        ? JSON.stringify(formData.description)
        : formData.description
    );
    dataToSend.append("status", formData.status);

    if (formData.image) dataToSend.append("image", formData.image);

    try {
      const response = await axiosInstance.put(
        `${API_PATHS.ProjectEdit}/${editingProject._id}`,
        dataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProjects((prev) =>
        prev.map((p) =>
          p._id === editingProject._id ? response.data.product : p
        )
      );

      setMessage("✅ Project updated successfully!");
      setEditingProject(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating project:", error);
      setMessage("❌ Failed to update project.");
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await axiosInstance.delete(`${API_PATHS.ProjectDelete}/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
      setMessage("✅ Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      setMessage("❌ Failed to delete project.");
    }
  };

  const breadcrumbItems = [
    { label: "Home", link: "/dashboard" },
    { label: "Project", link: "/Project" },
    { label: "Project List" },
  ];
  //const backend_url = "http://localhost:5000";
  return (
    <div className="container mt-4">
      <CommonBreadcrumb crumbs={breadcrumbItems} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Project List</h3>
        <button className="btn btn-success" onClick={handleAddModal}>
          + Add Project
        </button>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Code</th>
              <th>Description</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id || project.code}>
                <td>
                  <img
                    src={
                      project.image
                        ? `${backend_url}/${project.image.replace(/^\/+/, "")}`
                        : `${backend_url}/uploads/productTypes/default.jpg`
                    }
                    alt={project.name}
                    style={{
                      width: "80px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                </td>
                <td>{project.name}</td>
                <td>{project.code}</td>
                <td>{project.description}</td>
                <td>
                  <div className="d-flex justify-content-start">
                    <button
                      className="btn btn-sm btn-primary m-2"
                      onClick={() => handleEditProject(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger m-2"
                      onClick={() => handleDeleteProject(project._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingProject ? "Edit Project" : "Add Project"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProject(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Current Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="currentPrice"
                      value={formData.currentPrice}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Old Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="oldPrice"
                      value={formData.oldPrice}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Rating</label>
                    <input
                      type="text"
                      className="form-control"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={handleFileChange}
                  />

                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          width: "100px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProject(null);
                  }}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={editingProject ? handleSaveEdit : handleAddProject}
                >
                  {editingProject ? "Save Changes" : "Add Project"}
                </button>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
