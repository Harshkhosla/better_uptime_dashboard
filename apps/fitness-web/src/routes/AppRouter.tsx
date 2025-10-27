import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import HomePage from "../pages/HomePage";
import FeaturesPage from "../pages/FeaturesPage";
import CoachesPage from "../pages/CoachesPage";
import HowItWorksPage from "../pages/HowItWorksPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import Home from "../pages/Home";

export default function AppRouter() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feature" element={<FeaturesPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/coaches" element={<CoachesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
