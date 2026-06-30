import React, { useState } from "react";
import { useAuth } from "../../context/auth.context";
import axios from "axios";
import apis from "../../api/apis"
const ChangePasswordModal = ({userId ,show, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
 const { validToken } = useAuth();
  const handleChangePassword = async (e) => {
  e.preventDefault();

  if (!oldPassword || !newPassword || !confirmPassword) {
    setMessage("⚠️ All fields are required");
    return;
  }

  if (newPassword !== confirmPassword) {
    setMessage("❌ New passwords do not match");
    return;
  }

  try {
    // ✅ Correct API endpoint
   
     await axios.put( apis.passwordChange.update(userId),
      { oldPassword, newPassword },
      { headers: { Authorization: validToken } },
    
    );
  

    setMessage("✅ Password changed successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(onClose, 1500);
  } catch (err) {
    console.error("Error changing password:", err);
    setMessage(
      err.response?.data?.message || "❌ Failed to change password"
    );
  }
};


  if (!show) return null;

  return (
     <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
      <div className="modal-dialog">
        <div className="modal-content border-primary shadow-lg">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Change Password</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            {message && (
              <div
                className={`alert ${
                  message.startsWith("✅")
                    ? "alert-success"
                    : "alert-danger"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleChangePassword}>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary w-100">
                  Change Password
                </button>
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
