import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function Dashboard({ setIsAuthenticated }) {
  const [userId, setUserId] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening"
    );

    // Fetch user info
    fetch(`${API_URL}/api/dashboard`, {
      method: "GET",
      credentials: "include", // important for cookies
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setUserId(data.userId);
      })
      .catch(() => {
        setIsAuthenticated(false); // update auth state
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate, setIsAuthenticated]);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(false); // update auth state
        navigate("/login");
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch {
      alert("Logout failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

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
            "Could not load user info."
          )}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
