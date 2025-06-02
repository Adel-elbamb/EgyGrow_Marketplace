import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/login/login"; 
import AdminOrder from "./pages/AdminOrder";
import "./App.css";

function App() {
  return (
 <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminOrders" element={<AdminOrder/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
