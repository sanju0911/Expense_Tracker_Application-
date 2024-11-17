import React, { useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
=======
import NavigationBar from "./Navbar";
>>>>>>> parent of 87b8421 (added redux)
import {
  Table,
  Alert,
  Container,
  Spinner,
  Button,
  Modal,
} from "react-bootstrap";

const ExploreExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:5000/api/expenses/",
          config
        );
        setExpenses(response.data);
      } catch (err) {
        setError(
          err.response?.data?.error || err.message || "Failed to fetch expenses"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleEditClick = (expense) => {
    setCurrentExpense(expense);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (expenseId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `http://localhost:5000/api/expenses/${expenseId}`,
        config
      );
      setExpenses(expenses.filter((expense) => expense._id !== expenseId));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete expense");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        `http://localhost:5000/api/expenses/${currentExpense._id}`,
        currentExpense,
        config
      );

      setShowEditModal(false);
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense._id === currentExpense._id ? currentExpense : expense
        )
      );
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update expense");
    }
  };

  return (
    <Container>
      <NavigationBar />
      <h2 className="mt-4">Explore Expenses</h2>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && expenses.length === 0 && (
        <Alert variant="info">No expenses found.</Alert>
      )}
      {!loading && expenses.length > 0 && (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={expense._id}>
                <td>{index + 1}</td>
                <td>{expense.name}</td>
                <td>${expense.amount}</td>
                <td>{expense.reason}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(expense)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(expense._id)}
                    className="ml-2"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {currentExpense && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={currentExpense.name}
                  onChange={(e) =>
                    setCurrentExpense({
                      ...currentExpense,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  className="form-control"
                  value={currentExpense.amount}
                  onChange={(e) =>
                    setCurrentExpense({
                      ...currentExpense,
                      amount: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="reason">Reason</label>
                <input
                  type="text"
                  id="reason"
                  className="form-control"
                  value={currentExpense.reason}
                  onChange={(e) =>
                    setCurrentExpense({
                      ...currentExpense,
                      reason: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  className="form-control"
                  value={
                    new Date(currentExpense.date).toISOString().split("T")[0]
                  }
                  onChange={(e) =>
                    setCurrentExpense({
                      ...currentExpense,
                      date: e.target.value,
                    })
                  }
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default ExploreExpenses;
