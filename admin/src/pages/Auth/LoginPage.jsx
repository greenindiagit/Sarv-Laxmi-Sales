import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../api/apis";

const LoginPage = () => {
  const { storeToken } = useAuth();
  const navigate = useNavigate();
  const [email, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Mobile number is required");
      return;
    };

    if (!password) {
      toast.error("Password is required");
      return;
    };

    try {
      setLoading(true);
      const response = await axios.post(apis.auth.login, { email, password });

      if (response?.data?.token) {
        toast.success("Login successful");
        await storeToken(response?.data?.token);
       navigate("/dashboard");
         console.log("Stored token:", response?.data?.token);
      } else {
        toast.error("Something went wrong");
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="card-body">
          <img className="login-logo" src="logo.png"/>
          <p className="text-muted text-center mb-4">
          Please provide your login details below.
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Username"
                value={email}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control rounded-pill"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary rounded-pill py-2"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
                <div className="login-links">
          <a href="request-reset">Back to Home</a>
           <a href="request-reset">Forgot your password</a>
        </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
