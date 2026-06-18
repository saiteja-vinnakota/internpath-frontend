import HeroSection from "../../components/landing/HeroSection";
import StatsSection from "../../components/landing/StatsSection";
import StudentSection from "../../components/landing/StudentSection";
import RecruiterSection from "../../components/landing/RecruiterSection";
import AIMatchingSection from "../../components/landing/AIMatchingSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import CTASection from "../../components/landing/CTASection";
import Footer from "../../components/landing/Footer";

function LandingPage() {
  return (
    <main
      className="
        min-h-screen
        bg-stone
      "
    >
      <HeroSection />

      <StatsSection />

      <StudentSection />

      <RecruiterSection />

      <AIMatchingSection />

      <FeaturesSection />

      <CTASection />

      <Footer />
    </main>
  );
}

export default LandingPage;