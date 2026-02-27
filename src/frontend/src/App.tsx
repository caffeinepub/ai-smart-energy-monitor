import { Toaster } from "@/components/ui/sonner";
import StarField from "./components/StarField";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import DashboardSection from "./components/DashboardSection";
import AdvancedFeaturesSection from "./components/AdvancedFeaturesSection";
import AIAdvisorSection from "./components/AIAdvisorSection";
import AnalyticsSection from "./components/AnalyticsSection";
import SustainabilitySection from "./components/SustainabilitySection";
import TechStackSection from "./components/TechStackSection";
import SmartAlertsSection from "./components/SmartAlertsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Animated starfield background */}
      <StarField />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <HeroSection />

        <div className="divider-gradient" />
        <DashboardSection />

        <div className="divider-gradient" />
        <AdvancedFeaturesSection />

        <div className="divider-gradient" />
        <AIAdvisorSection />

        <div className="divider-gradient" />
        <AnalyticsSection />

        <div className="divider-gradient" />
        <SustainabilitySection />

        <div className="divider-gradient" />
        <TechStackSection />

        <div className="divider-gradient" />
        <SmartAlertsSection />

        <div className="divider-gradient" />
        <ContactSection />
      </main>

      <Footer />

      <Toaster position="top-right" theme="dark" />
    </div>
  );
}
