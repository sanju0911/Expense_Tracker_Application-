// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";
import Dashboard from "./pages/dashboard";
import AddExpenses from "./pages/AddExpenses";
import ExploreExpenses from "./pages/ExploreExpenses";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expenses" element={<AddExpenses />} />
        <Route path="/explore-expenses" element={<ExploreExpenses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/" element={<RegisterUser />} />
      </Routes>
    </Router>
  );
}

export default App;
