import HeroSection from "../../components/landing/HeroSection";
import StatsSection from "../../components/landing/StatsSection";
import StudentSection from "../../components/landing/StudentSection";
import RecruiterSection from "../../components/landing/RecruiterSection";
import AIMatchingSection from "../../components/landing/AIMatchingSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import TestimonialsSection from "../../components/landing/TestimonialsSection";
import CTASection from "../../components/landing/CTASection";

function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <StatsSection />
      <StudentSection />
      <RecruiterSection />
      <AIMatchingSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}

export default LandingPage;