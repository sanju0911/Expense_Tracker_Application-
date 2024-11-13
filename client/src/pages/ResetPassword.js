import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!formData.email || !formData.code || !formData.newPassword) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        formData
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password.");
    }
  };

  return (
    <Container className="form-container">
      <h2 className="text-center mb-4">Reset Password</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCode" className="mb-3">
          <Form.Label>Reset Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the code sent to your email"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formNewPassword" className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your new password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="custom-button">
          Reset Password
        </Button>

        <Button variant="link" onClick={() => navigate("/login")}>
          Go to Login
        </Button>
      </Form>
    </Container>
  );
};

export default ResetPassword;
