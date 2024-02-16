import GridAllProperties from "@/components/GridAllProperties";
import Hero from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
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
