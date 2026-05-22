import RootLayout
from "../../components/layout/RootLayout";

import Hero
from "../../components/landing/Hero";

import Features
from "../../components/landing/Features";

import HowItWorks
from "../../components/landing/HowItWorks";

import CTA
from "../../components/landing/CTA";

function LandingPage() {

  return (
    <RootLayout>

      <Hero />

      <Features />

      <HowItWorks />

      <CTA />

    </RootLayout>
  );
}

export default LandingPage;