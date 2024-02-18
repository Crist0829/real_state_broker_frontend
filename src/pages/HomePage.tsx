import GridAllProperties from "@/components/properties/GridAllProperties";
import Hero from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import PrincipalLayout from "@/layouts/PrincipalLayout";

function HomePage() {
  return (
    <PrincipalLayout>
      <Hero />
      <HowItWorks />
      {/* All properties */}
      <GridAllProperties />
    </PrincipalLayout>
  );
}

export default HomePage;
