import "./globals.css";
import Navbar from "../components/landing/Navbar";
import { Workflow } from "lucide-react";
import FeatureSection from "../components/landing/FeatureSection";
import Footer from "../components/landing/Footer";
import HeroSection from "../components/landing/HeroSection";
import Pricing from "../components/landing/Pricing";
import Testimonials from "../components/landing/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar/>
      <HeroSection />
      <FeatureSection />
      <Workflow />
      <Testimonials />
      <Pricing />
      <Footer />
    </>
  );
}



