import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addExpense } from "../actions/expensesActions";
import NavigationBar from "./Navbar";

const AddExpense = () => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    reason: "",
    date: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addExpense(expense));

      setMessage("Expense added successfully");
      setExpense({ name: "", amount: "", reason: "", date: "" });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add expense");
      setMessage(null);
    }
  };

  return (
    <div>
      <NavigationBar />

      <Container className="mt-4">
        <h2>Add Expense</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={expense.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter reason"
              name="reason"
              value={expense.reason}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Expense
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddExpense;
