import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

// Pages
import Login from "./pages/Login/Login.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard.jsx";
import Products from "./pages/admin/Products/Products.jsx";

// Styles
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("user_token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="app-container">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
      <Toaster />
    </HelmetProvider>
  );
}

export default App;
