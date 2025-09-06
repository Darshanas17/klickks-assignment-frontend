import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Loading from "./components/Loading";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/dashboard`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) setIsAuthenticated(true);
        else setIsAuthenticated(false);
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
