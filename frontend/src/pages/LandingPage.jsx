import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import Testimonials from "../components/landing/Testimonials";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}