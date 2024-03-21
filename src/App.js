import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactUs from "./pages/ContactUs";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import ExplorerPlan from "./plans/ExplorerPlan";
import RevertPlan from "./plans/RevertPlan";
import ExistingMuslimPlan from "./plans/ExistingMuslimPlan";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plans/explorer" element={<ExplorerPlan />} />
        <Route path="/plans/revert" element={<RevertPlan />} />
        <Route path="/plans/existing" element={<ExistingMuslimPlan />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
