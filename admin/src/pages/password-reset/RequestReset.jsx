import React, { useState } from "react";
import API_PATHS from "../../api/apiUrl";
import axiosInstance from "../../api/publicAxoisInstance";

const RequestReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(API_PATHS.passwordReset, { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
  <div className="card p-4 shadow reset-container" style={{ maxWidth: "400px", width: "100%" }}>
    <h2 className="text-center mb-4">Request Password Reset</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button className="btn btn-primary w-100" type="submit">
        Send Reset Link
      </button>
    </form>
    {message && <p className="mt-3 text-center text-success">{message}</p>}
  </div>
</div>

  );
};

export default RequestReset;
