import FinalCTA from "@/components/sections/final-cta";
import HeroGeometric from "@/components/sections/hero-geometric";
import HowItWorks from "@/components/sections/how-it-works";
import TechnologyBenefits from "@/components/sections/technology-benefits";
import Testimonials from "@/components/sections/testimonials";
import UseCases from "@/components/sections/use-cases";
import WhyChooseUs from "@/components/sections/why-choose-us";

export default function Home() {
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
