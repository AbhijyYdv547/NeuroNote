import Workflow from "@/components/landing/Workflow";
import FeatureSection from "@/components/landing/FeatureSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import { ResizableNav } from "@/components/landing/Navbar";
import DemoSection from "@/components/landing/DemoSection";
import FaqSection from "@/components/landing/FaqSection";

export default function Home() {
  return (
    <>
      <ResizableNav />

      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <FeatureSection />
        <Workflow />
        <DemoSection/>
        <FaqSection/>
        <Footer />
      </div>
    </>
  );
}