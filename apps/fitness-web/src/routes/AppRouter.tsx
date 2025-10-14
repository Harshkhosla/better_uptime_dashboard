import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import HomePage from '../pages/HomePage';
import FeaturesPage from '../pages/FeaturesPage';
import CoachesPage from '../pages/CoachesPage';
import HowItWorksPage from '../pages/HowItWorksPage';

export default function AppRouter() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/coaches" element={<CoachesPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}