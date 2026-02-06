import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import AIAgentSection from "./AIAgentSection";
import HowItWorksSection from "./HowItWorksSection";
import ZeroDowntimeSection from "./ZeroDowntimeSection";
import StatsSection from "./StatsSection";
import TestimonialsSection from "./TestimonialsSection";
import ComparisonSection from "./ComparisonSection";
import FAQSection from "./FAQSection";
import PricingSection from "./PricingSection";

function HomePage() {
  return (
    <main className="relative z-10">
      <HeroSection />
      <div id="ai-agent">
        <AIAgentSection />
      </div>
      <HowItWorksSection />
      <ZeroDowntimeSection />
      <div id="features">
        <FeaturesSection />
      </div>
      <StatsSection />
      {/* <TestimonialsSection /> */}
      <ComparisonSection />
      <div id="pricing">
        <PricingSection />
      </div>
      <FAQSection />
    </main>
  );
}

export default HomePage;
