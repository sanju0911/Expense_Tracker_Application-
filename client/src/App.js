import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/" element={<RegisterUser />} />
      </Routes>
    </Router>
  );
}

export default App;
