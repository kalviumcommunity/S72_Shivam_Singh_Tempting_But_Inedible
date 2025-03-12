import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./components/login";
import Navbar from "./components/Navbar";
import ExplorePage from "./components/ExplorePage";
import Entities from "./components/Entities";
import HomePage from "./pages/HomePage";
import "./index.css";

const App = () => {
  const isAuthenticated = localStorage.getItem('user');

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Entities /> : <HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={isAuthenticated ? <ExplorePage /> : <Login />} />
        <Route path="/collection" element={isAuthenticated ? <Entities /> : <Login />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);