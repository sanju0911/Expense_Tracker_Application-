import React, { useState, useEffect, useCallback } from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import NavigationBar from "./Navbar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUserData = useCallback(
    async (userId, token) => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setUserData(response.data.user);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError(err.response?.data?.error || "Failed to fetch user data.");
        }
      }
    },
    [navigate]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      fetchUserData(userId, token);
    }
  }, [navigate, fetchUserData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <NavigationBar />
      <Container className="main-content">
        {error && <Alert variant="danger">{error}</Alert>}

        {userData ? (
          <div className="user-info">
            <h4>Welcome, {userData.username}!</h4>
            <Button variant="danger" onClick={handleLogout} className="mt-3">
              Logout
            </Button>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        <div className="description">
          <h2 className="text-center mt-5">Expense Tracker</h2>
          <p className="text-center">
            Manage your personal finances, track expenses, and stay on top of
            your spending.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
