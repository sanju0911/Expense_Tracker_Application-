import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/Profile";
import AddExpenses from "./pages/AddExpenses";
import ExploreExpenses from "./pages/ExploreExpenses";
import AboutUs from "./pages/AboutUs";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-expenses" element={<AddExpenses />} />
        <Route path="/explore-expenses" element={<ExploreExpenses />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/" element={<RegisterUser />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
