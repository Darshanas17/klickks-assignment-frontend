import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = process.env.REACT_APP_API_URL;

function Dashboard() {
  const [userId, setUserId] = useState(null);
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening"
    );

    axios
      .get(`${API_URL}/api/dashboard`, { withCredentials: true })
      .then((res) => setUserId(res.data.userId))
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/logout`, {}, { withCredentials: true });
      navigate("/login");
    } catch {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="dashboard-page">
      <button className="logout-btn-fixed" onClick={handleLogout}>
        Logout
      </button>
      <img
        src="https://res.cloudinary.com/du3fq1wgm/image/upload/v1757082995/klickks_logo_nyhatm.png"
        alt="Klickks Logo"
        className="dashboard-logo"
      />
      <div className="dashboard-container">
        <h2 className="dashboard-greeting">{greeting}!</h2>
        <p className="user-id-display">
          {userId ? (
            <>
              Your User ID: <strong>{userId}</strong>
            </>
          ) : (
            "Loading user info..."
          )}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
