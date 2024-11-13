import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import axios from "axios";
import "../styles/RegisterUser.css";
import { useNavigate } from "react-router-dom";
const RegisterUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are mandatory.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        console.log("User has successfully signed up");
        setSuccess("User has successfully signed up.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="register-container">
      <div className="watermark">Expense Tracking System</div>
      <Container className="form-container">
        <h2 className="text-center mb-4">Expense Tracker</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="custom-button">
            Register
          </Button>

          <Button variant="link" onClick={() => navigate("/login")}>
            Already have an account? Go to Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default RegisterUser;
