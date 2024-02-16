import GridAllProperties from "@/components/home/GridAllProperties";
import Hero from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import PrincipalLayout from "@/layouts/PrincipalLayout";
import { useProperties } from "@/store/useProperties";
import { useEffect } from "react";


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
