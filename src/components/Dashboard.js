import { useEffect, useState } from "react";
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

    fetch(`${API_URL}/api/dashboard`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setUserId(data.userId);
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        navigate("/login");
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (err) {
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
