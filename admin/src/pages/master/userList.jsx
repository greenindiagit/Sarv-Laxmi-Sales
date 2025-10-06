import React, { useEffect, useState } from "react";
import CommonBreadcrumb from "../../components/breadcrumb/breadcrumb";
import axiosInstance from "../../api/axiosInstance";
import API_PATHS from "../../api/apiUrl";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.users);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side duplicate check when adding new user
    if (!editingUser) {
      const duplicate = users.find(
        (u) =>
          u.name === formData.name ||
          u.email === formData.email ||
          u.mobile === formData.mobile
      );
      if (duplicate) {
        alert("Name, email, or mobile already exists");
        return;
      }
    }

    try {
      if (editingUser) {
        const res = await axiosInstance.put(
          `${API_PATHS.users}/${editingUser._id}`,
          formData
        );
        setUsers((prev) =>
          prev.map((u) => (u._id === editingUser._id ? res.data : u))
        );
      } else {
        const res = await axiosInstance.post(API_PATHS.users, formData);
        setUsers((prev) => [...prev, res.data.users]);
      }

      // Reset modal
      setFormData({ name: "", email: "", mobile: "", password: "" });
      setEditingUser(null);
      setShowModal(false);
    } catch (err) {
      console.error("Error saving user:", err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`${API_PATHS.users}/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
      password: "",
    });
    setShowModal(true);
  };

  const breadcrumbItems = [
    { label: "Home", link: "/dashboard" },
    { label: "Users", link: "/users" },
    { label: "User List" },
  ];

  return (
    <div className="container mt-4">
      <CommonBreadcrumb crumbs={breadcrumbItems} />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User List</h2>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Add User
        </button>
      </div>

      {/* Modal */}
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
                  {editingUser ? "Update User" : "Add User"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                    setFormData({
                      name: "",
                      email: "",
                      mobile: "",
                      password: "",
                    });
                  }}
                />
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="mobile"
                      placeholder="Mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required={!editingUser}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary w-100">
                      {editingUser ? "Update" : "Add"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary w-100"
                      onClick={() => {
                        setShowModal(false);
                        setEditingUser(null);
                        setFormData({
                          name: "",
                          email: "",
                          mobile: "",
                          password: "",
                        });
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
        <p>Loading users...</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users
                .filter((u) => u) // ✅ remove undefined/null users
                .map((u, index) => (
                  <tr key={u._id}>
                    <td>{index + 1}</td>
                    <td>{u.name || "N/A"}</td>
                    <td>{u.email || "N/A"}</td>
                    <td>{u.mobile || "N/A"}</td>
                    <td>{u.status === 1 ? "Active" : "Inactive"}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEdit(u)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(u._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
