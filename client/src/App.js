import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/LoginUser";
import Register from "./components/RegisterUser";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/Profile";
import AddExpenses from "./pages/AddExpenses";
import ExploreExpenses from "./pages/ExploreExpenses";
import AboutUs from "./pages/AboutUs";
import NavigationBar from "./pages/Navbar";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-expenses" element={<AddExpenses />} />
        <Route path="/explore-expenses" element={<ExploreExpenses />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
