import React, { useState, useEffect } from "react";
import CommonBreadcrumb from "../../components/breadcrumb/breadcrumb";
import axiosInstance from "../../api/axiosInstance";
import API_PATHS from "../../api/apiUrl";
const backend_url = axiosInstance.defaults.baseURL;
const ProjectTypeList = () => {
  const [projects, setProjects] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    manufacturing: "",
    application: "",
    features: "",
    material: "",
    size: "",
    printing: "",
    colour: [],
    serialNo: "",
    customization: "",
    security: "",
    packing: "",
    image: null,
    status: 1,
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.Projects);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  //   product type api call
  const fetchProductTypes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.ProductTypes);
      // 👆 replace with actual API path
      setProductTypes(response.data);
    } catch (error) {
      console.error("Error fetching product types:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, multiple, options } = e.target;

    if (multiple) {
      // Convert selected options to array
      const values = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData({ ...formData, [name]: values });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Open Add Modal
  const handleAddModal = () => {
    setFormData({
      title: "",
      type: "",
      manufacturing: "",
      application: "",
      features: "",
      material: "",
      size: "",
      printing: "",
      colour: "",
      serialNo: "",
      customization: "",
      security: "",
      packing: "",
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
      title: project.title || "",
      type: project.type || "",
      manufacturing: project.manufacturing || "",
      application: project.application || "",
      features: project.features || "",
      material: project.material || "",
      size: project.size || "",
      printing: project.printing || "",
      colour: Array.isArray(project.colour)
        ? project.colour
        : project.colour
        ? project.colour.split(",")
        : [],
      serialNo: project.serialNo || "",
      customization: project.customization || "",
      security: project.security || "",
      packing: project.packing || "",
      image: null, // keep null until a new file is chosen
      status: project.status || 1,
    });

    // show existing image in preview
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

  // Save edited project
  const handleSaveEdit = async () => {
    if (!editingProject || !editingProject._id) return;

    const dataToSend = new FormData();
    dataToSend.append("title", formData.title || "");
    dataToSend.append("type", formData.type || "");
    dataToSend.append("manufacturing", formData.manufacturing || "");
    dataToSend.append("application", formData.application || "");
    dataToSend.append("features", formData.features || "");
    dataToSend.append("material", formData.material || "");
    dataToSend.append("size", formData.size || "");
    dataToSend.append("printing", formData.printing || "");
    dataToSend.append(
      "colour",
      Array.isArray(formData.colour) ? formData.colour.join(",") : ""
    );
    dataToSend.append("serialNo", formData.serialNo || "");
    dataToSend.append("packing", formData.packing || "");
    dataToSend.append("customization", formData.customization || "");
    dataToSend.append("security", formData.security || "");
    dataToSend.append("status", formData.status || 1);
    if (formData.image) dataToSend.append("image", formData.image);

    try {
      const response = await axiosInstance.put(
        `${API_PATHS.ProductTypesEdit}/${editingProject._id}`,
        dataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Update state
      setProjects((prev) =>
        prev.map((p) =>
          p._id === editingProject._id ? response.data.product : p
        )
      );

      setMessage("✅ Project updated successfully!");
      setEditingProject(null);
      setShowModal(false);
      setImagePreview(null); // reset preview
    } catch (error) {
      console.error(
        "Error updating project:",
        error.response?.data || error.message
      );
      setMessage("❌ Failed to update project.");
    }
  };
  const handleAddProject = async () => {
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title || "");
    dataToSend.append("type", formData.type || "");
    dataToSend.append("manufacturing", formData.manufacturing || "");
    dataToSend.append("application", formData.application || "");
    dataToSend.append("features", formData.features || "");
    dataToSend.append("material", formData.material || "");
    dataToSend.append("size", formData.size || "");
    dataToSend.append("printing", formData.printing || "");
    dataToSend.append(
      "colour",
      Array.isArray(formData.colour) ? formData.colour.join(",") : ""
    );
    dataToSend.append(
      "serialNo",
      formData.serialNo || "Running Serial number Embossed on Seal"
    );
    dataToSend.append("customization", formData.customization || "");
    dataToSend.append("security", formData.security || "");
    dataToSend.append("packing", formData.packing || "");
    dataToSend.append("status", formData.status || 1);
    if (formData.image) dataToSend.append("image", formData.image);

    try {
      const response = await axiosInstance.post(
        API_PATHS.ProductTypes,
        dataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Use the correct property from your backend response
      const newProject = response.data.product; // <-- ensure this matches backend

      // ✅ Update the state immediately
      setProductTypes((prevProjects) => [...prevProjects, newProject]);

      setMessage("✅ Project added successfully!");
      setShowModal(false);
      setFormData({
        title: "",
        type: "",
        manufacturing: "",
        application: "",
        features: "",
        material: "",
        size: "",
        printing: "",
        colour: [],
        serialNo: "",
        customization: "",
        security: "",
        packing: "",
        image: null,
        status: 1,
      });
      setImagePreview(null); // reset preview
    } catch (error) {
      console.error("Error adding project:", error);
      setMessage("❌ Failed to add project.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file, // file store
      });
      setImagePreview(URL.createObjectURL(file)); // preview URL
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      const response = await axiosInstance.delete(
        `${API_PATHS.ProductTypesDelete}/${id}`
      );

      if (response.status === 200) {
        // Remove deleted project from state
        setProjects((prevProjects) => prevProjects.filter((p) => p._id !== id));
        setMessage("✅ Project deleted successfully!");
      } else {
        setMessage("❌ Failed to delete project.");
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      setMessage("❌ Failed to delete project.");
    }
  };

  const breadcrumbItems = [
    { label: "Home", link: "/dashboard" },
    { label: "Project", link: "/Project" },
    { label: "Project Type List" },
  ];
  //const backend_url = "http://localhost:5000";
  return (
    <div className="container mt-4">
      <CommonBreadcrumb crumbs={breadcrumbItems} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Project Type List</h3>
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
              <th>Type</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productTypes.map((project) => (
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
                <td>{project.title}</td>
                <td>{project.type}</td>
                <td>{project.status === 1 ? "Active" : "Inactive"}</td>
                <td>
                  <div className="d-flex justify-content-center">
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
                  {/* Type */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Type</label>
                    <select
                      className="form-control"
                      name="type"
                      value={formData.type || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">-- Select Product Type --</option>
                      {projects.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Title */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Manufacturing */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Manufacturing</label>
                    <input
                      type="text"
                      className="form-control"
                      name="manufacturing"
                      value={formData.manufacturing || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  {/* Application */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Application</label>
                    <input
                      type="text"
                      className="form-control"
                      name="application"
                      value={formData.application || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Features */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Features</label>
                    <input
                      type="text"
                      className="form-control"
                      name="features"
                      value={formData.features || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Material */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Material</label>
                    <input
                      className="form-control"
                      name="material"
                      value={formData.material || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  {/* Size */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Size</label>
                    <select
                      className="form-control"
                      name="size"
                      value={formData.size || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">-- Select Size --</option>
                      <option value='40 CM Large (16")'>
                        40 CM Large (16")
                      </option>
                    </select>
                  </div>

                  {/* Colour Multi-Select */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Colour</label>
                    <select
                      multiple
                      className="form-control"
                      name="colour"
                      value={formData.colour || []}
                      onChange={handleInputChange}
                    >
                      <option value="Green">Green</option>
                      <option value="Red">Red</option>
                      <option value="Blue">Blue</option>
                      <option value="White">White</option>
                      <option value="Yellow">Yellow</option>
                    </select>
                  </div>

                  {/* Serial Number */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Serial No</label>

                    <select
                      className="form-control"
                      name="serialNo"
                      value={formData.serialNo || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">-- Select --</option>
                      <option value="Running Serial number Embossed on Seal">
                        Running Serial number Embossed on Seal
                      </option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  {/* Packing */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Packing</label>
                    <select
                      className="form-control"
                      name="packing"
                      value={formData.packing || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">-- Select Packing --</option>
                      <option value="100 Seals in 1 Box">
                        100 Seals in 1 Box
                      </option>
                      <option value="200 Seals in 1 Box">
                        200 Seals in 1 Box
                      </option>
                    </select>
                  </div>

                  {/* Customization */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Customization</label>
                    <select
                      className="form-control"
                      name="customization"
                      value={formData.customization || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">-- Select --</option>
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                  </div>

                  {/* Security */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Security</label>
                    <input
                      className="form-control"
                      name="security"
                      value={formData.security || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Image Upload (full width) */}
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

export default ProjectTypeList;
