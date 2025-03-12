import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/login";
import Navbar from "./components/Navbar";
import ExplorePage from "./components/ExplorePage";
import Entities from "./components/Entities";
import HomePage from "./pages/HomePage";
import AuthPage from "./components/signup";
import "./index.css";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          navigate('/login');
        }
      } catch {
        navigate('/login');
      }
    };
    
    checkAuth();
  }, [navigate]);

  return children;
};

const App = () => {
  const isAuthenticated = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user && user.id;
    } catch {
      return false;
    }
  };

  return (
    <Router>
      {isAuthenticated() && <Navbar />}
      <div className={`app-container ${isAuthenticated() ? 'authenticated' : ''}`}>
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated() ? (
                <Navigate to="/collection" replace />
              ) : (
                <HomePage />
              )
            } 
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated() ? (
                <Navigate to="/collection" replace />
              ) : (
                <Login />
              )
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated() ? (
                <Navigate to="/collection" replace />
              ) : (
                <AuthPage />
              )
            } 
          />
          <Route 
            path="/explore" 
            element={
              <AuthWrapper>
                <ExplorePage />
              </AuthWrapper>
            } 
          />
          <Route 
            path="/collection" 
            element={
              <AuthWrapper>
                <Entities />
              </AuthWrapper>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);