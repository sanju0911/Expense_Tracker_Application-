import React, { useState } from "react";
import axios from "axios";
import NavigationBar from "./Navbar";
import { Form, Button, Alert, Container } from "react-bootstrap";

const AddExpenses = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    reason: "",
    date: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/expenses/add",
        formData,
        config
      );

      setMessage(response.data.message);
      setFormData({ name: "", amount: "", reason: "", date: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add expense");
    }
  };

  return (
    <Container>
      <NavigationBar />
      <h2 className="mt-4">Add Expenses</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formAmount" className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formReason" className="mb-3">
          <Form.Label>Reason</Form.Label>
          <Form.Control
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDate" className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddExpenses;
