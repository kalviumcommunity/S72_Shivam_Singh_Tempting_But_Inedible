import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Navbar from "./components/Navbar";
import ExplorePage from "./components/ExplorePage";
import Entities from "./components/Entities";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./components/signup";
import "./index.css";

const AuthWrapper = ({ children }) => {
  const isAuthenticated = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user && user.id;
    } catch {
      return false;
    }
  };

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
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
      <div className={`app-container ${isAuthenticated() ? 'authenticated' : ''}`}>
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated() ? (
                <Navigate to="/home" replace />
              ) : (
                <LandingPage />
              )
            } 
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated() ? (
                <Navigate to="/home" replace />
              ) : (
                <Login />
              )
            }
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated() ? (
                <Navigate to="/home" replace />
              ) : (
                <AuthPage />
              )
            }
          />
          <Route 
            path="/home" 
            element={
              <AuthWrapper>
                <HomePage />
              </AuthWrapper>
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