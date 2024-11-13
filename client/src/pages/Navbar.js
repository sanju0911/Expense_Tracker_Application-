// src/components/Navbar.js
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
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
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
