import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import "../App.css";

const API_URL = process.env.REACT_APP_API_URL;

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/dashboard`, { withCredentials: true })
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {});
  }, [navigate]);

  const validatePassword = (pw) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(pw);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(password))
      return setStatus("error"), setMessage("Weak password");
    if (password !== confirmPassword)
      return setStatus("error"), setMessage("Passwords do not match");

    setStatus("loading");
    setMessage("Please wait...");
    try {
      const res = await axios.post(
        `${API_URL}/api/register`,
        { email, password },
        { withCredentials: true }
      );
      if (
        res.status === 201 ||
        res.data.message?.toLowerCase().includes("success")
      ) {
        setStatus("success");
        setMessage("Account created");
        setTimeout(() => navigate("/login"), 1200);
      } else {
        setStatus("error");
        setMessage(res.data.message || "Registration failed");
      }
    } catch {
      setStatus("error");
      setMessage("Server error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-image">
        <img
          src="https://res.cloudinary.com/du3fq1wgm/image/upload/v1757082594/sign_up_v7piwa.avif"
          alt="Register Illustration"
        />
      </div>
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/du3fq1wgm/image/upload/v1757082995/klickks_logo_nyhatm.png"
          alt="Klickks Logo"
          className="auth-logo"
        />
        <h2 className="form-title">Register</h2>

        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-input"
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />{" "}
            Show Passwords
          </label>

          <button
            type="submit"
            className="form-btn"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <BeatLoader color="#ffffff" loading={true} size={8} margin={2} />
            ) : (
              "Register"
            )}
          </button>

          {message && (
            <p
              className={`form-message ${
                status === "error" ? "error" : "success"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        <div className="switch-auth">
          <p>
            Already have an account?{" "}
            <button className="link-btn" onClick={() => navigate("/login")}>
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
