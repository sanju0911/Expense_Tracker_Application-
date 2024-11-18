import React, { useState, useEffect, useCallback } from "react";
import { Container, Alert, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";
import NavigationBar from "./Navbar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const fetchUserData = useCallback(
    async (token) => {
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
    if (!token) {
      navigate("/login");
    } else {
      fetchUserData(token);
    }
  }, [token, fetchUserData, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!userData && !error) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="dashboard-container">
      <NavigationBar />
      <Container className="main-content">
        {error && <Alert variant="danger">{error}</Alert>}

        {userData ? (
          <div className="user-info text-center">
            <h4>Welcome, {userData.username}!</h4>

            {userData.photo ? (
              <Image
                src={`http://localhost:5000${userData.photo}`}
                roundedCircle
                className="profile-image"
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  width: "auto",
                  height: "auto",
                  objectFit: "cover",
                  marginTop: "15px",
                }}
              />
            ) : (
              <Image
                src="/default-avatar.png"
                roundedCircle
                className="profile-image"
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  width: "auto",
                  height: "auto",
                  objectFit: "cover",
                  marginTop: "15px",
                }}
              />
            )}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        <div className="description mt-5">
          <h2 className="text-center">Expense Tracker</h2>
          <p className="text-center">
            Manage your personal finances, track expenses, and stay on top of
            your spending with our user-friendly expense tracker application.
          </p>
        </div>

        <Row className="benefits-section mt-5">
          <Col md={6}>
            <h5>Benefits of Using the Expense Tracker</h5>
            <ul>
              <li>Gain better control over your financial habits.</li>
              <li>Identify areas where you can save money.</li>
              <li>Set and track financial goals effectively.</li>
              <li>Secure and easy-to-use interface for managing expenses.</li>
            </ul>
          </Col>
          <Col md={6}>
            <h5>How to Use the Application</h5>
            <ol>
              <li>Register or log in to access your dashboard.</li>
              <li>Navigate to 'Add Expenses' to input your expense details.</li>
              <li>
                Explore past expenses under the 'Explore Expenses' section.
              </li>
              <li>Update your profile through the 'Profile' tab.</li>
              <li>Track total spending and download reports.</li>
            </ol>
          </Col>
        </Row>
      </Container>

      <footer className="footer mt-5">
        <Container>
          <Row>
            <Col className="text-center">
              <p>Follow us:</p>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="bi bi-instagram"></i> Instagram
              </a>
              {" | "}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="bi bi-linkedin"></i> LinkedIn
              </a>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Dashboard;
