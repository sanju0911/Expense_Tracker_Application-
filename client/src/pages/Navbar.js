import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions";

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("token");

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

        <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
