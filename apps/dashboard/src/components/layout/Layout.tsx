import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => navigate("/login");
  const handleNavigateToSignup = () => navigate("/signup");

  return (
    <div
      className="min-h-screen bg-white text-gray-900 font-sans relative overflow-hidden"
      style={{ fontFeatureSettings: '"rlig" 1, "calt" 1' }}
    >
      <Header
        onNavigateToLogin={handleNavigateToLogin}
        onNavigateToSignup={handleNavigateToSignup}
      />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
