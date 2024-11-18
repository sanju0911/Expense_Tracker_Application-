import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "./Navbar";
import {
  Table,
  Alert,
  Container,
  Spinner,
  Button,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { jsPDF } from "jspdf"; // Import jsPDF library

const ExploreExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0); // New state to hold the total amount

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

        // Fetch all expenses
        const expensesResponse = await axios.get(
          "http://localhost:5000/api/expenses/",
          config
        );
        setExpenses(expensesResponse.data);

        // Fetch total expenses
        const totalResponse = await axios.get(
          "http://localhost:5000/api/expenses/ExpenseId", // Adjust the route if necessary
          config
        );
        setTotalExpenses(totalResponse.data.total); // Set the total expenses
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

  // Function to handle saving changes after editing an expense
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

  // Function to handle small changes in the currentExpense and automatically update the backend
  const handleExpenseChange = async (e) => {
    const { id, value } = e.target;
    const updatedExpense = { ...currentExpense, [id]: value };
    setCurrentExpense(updatedExpense);

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

      // API call to save changes immediately
      await axios.put(
        `http://localhost:5000/api/expenses/${currentExpense._id}`,
        updatedExpense,
        config
      );
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update expense");
    }
  };

  // Function to generate and download the PDF of expenses
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text("Expenses Report", 14, 22);

    // Add column headers
    doc.setFontSize(12);
    doc.text("Name", 14, 30);
    doc.text("Amount", 60, 30);
    doc.text("Reason", 100, 30);
    doc.text("Date", 160, 30);

    // Add each expense to the PDF
    expenses.forEach((expense, index) => {
      const yPosition = 40 + index * 10;
      doc.text(expense.name, 14, yPosition);
      doc.text(`$${expense.amount}`, 60, yPosition);
      doc.text(expense.reason, 100, yPosition);
      doc.text(new Date(expense.date).toLocaleDateString(), 160, yPosition);
    });

    // Save the PDF to the local system
    doc.save("expenses_report.pdf");
  };

  return (
    <div>
      <NavigationBar />
      <Container>
        <Row>
          <Col className="d-flex justify-content-end mt-4">
            <h4>Total Expenses: ${totalExpenses}</h4>{" "}
            {/* Display total expenses */}
          </Col>
        </Row>
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

        {/* Show the Download PDF button if total expenses exceed 100,000 */}
        {totalExpenses >= 100000 && (
          <div className="d-flex justify-content-center mt-4">
            <Button variant="success" onClick={downloadPDF}>
              Download Expenses as PDF
            </Button>
          </div>
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
                    onChange={handleExpenseChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    className="form-control"
                    value={currentExpense.amount}
                    onChange={handleExpenseChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="reason">Reason</label>
                  <input
                    type="text"
                    id="reason"
                    className="form-control"
                    value={currentExpense.reason}
                    onChange={handleExpenseChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    className="form-control"
                    value={currentExpense.date.split("T")[0]} // Convert to the right format
                    onChange={handleExpenseChange}
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </div>
  );
};

export default ExploreExpenses;
