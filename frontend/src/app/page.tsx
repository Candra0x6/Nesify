import { Metadata } from "next";
import FinalCTA from "@/components/sections/final-cta";
import HeroGeometric from "@/components/sections/hero-geometric";
import HowItWorks from "@/components/sections/how-it-works";
import TechnologyBenefits from "@/components/sections/technology-benefits";
import Testimonials from "@/components/sections/testimonials";
import UseCases from "@/components/sections/use-cases";
import WhyChooseUs from "@/components/sections/why-choose-us";

export const metadata: Metadata = {
  title: "NFT Ticketing Platform | The Future of Event Ticketing",
  description:
    "Experience the future of event ticketing with our NFT-based platform. Secure, transparent, and seamless ticket management for all your events.",
  keywords:
    "NFT ticketing, blockchain tickets, event management, digital tickets",
};

export default async function Home() {
  return (
    <main>
      <HeroGeometric
        badge="NFT Ticketing"
        title1="The Future of"
        title2="Event Ticketing"
      />
      <TechnologyBenefits />
      <HowItWorks />
      <WhyChooseUs />
      <UseCases />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
