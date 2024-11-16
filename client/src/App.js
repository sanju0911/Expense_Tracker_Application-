import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "./store/actions/themeActions";

import Login from "./components/LoginUser";
import Register from "./components/RegisterUser";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/Profile";
import AddExpenses from "./pages/AddExpenses";
import ExploreExpenses from "./pages/ExploreExpenses";
import AboutUs from "./pages/AboutUs";
import NavigationBar from "./pages/Navbar";

function App() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <Router>
      <NavigationBar />
      <div className={isDarkMode ? "dark-theme" : "light-theme"}>
        <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-expenses" element={<AddExpenses />} />
          <Route path="/explore-expenses" element={<ExploreExpenses />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
