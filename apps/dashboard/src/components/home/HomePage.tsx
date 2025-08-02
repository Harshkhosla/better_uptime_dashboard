import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import PricingSection from "./PricingSection";

function HomePage() {
  return (
    <main className="relative z-10">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
    </main>
  );
}

export default HomePage;
