// src/components/Navbar.js
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
      <Navbar.Brand href="/dashboard">Expense Tracker</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/add-expenses">
          Add Expenses
        </Nav.Link>
        <Nav.Link as={Link} to="/explore-expenses">
          Explore Expenses
        </Nav.Link>
        <Nav.Link as={Link} to="/profile">
          Profile
        </Nav.Link>
        <Nav.Link as={Link} to="/about-us">
          About Us
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard">
          Dashboard
        </Nav.Link>
        {/* Logout link */}
        <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
