import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );
      setMessage(response.data.message);
      navigate("/reset-password");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send reset code.");
    }
  };

  return (
    <Container className="form-container">
      <h2 className="text-center mb-4">Forget Password</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="custom-button">
          Send Reset Code
        </Button>
      </Form>
    </Container>
  );
};

export default ForgetPassword;
