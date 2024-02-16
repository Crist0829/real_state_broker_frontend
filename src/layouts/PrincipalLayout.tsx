import { Navbar } from "@/components/Navbar";
import { PropsWithChildren } from "react";
import PrincipalBackground from "@/components/PrincipalBackground";
import { useProperties } from "@/store/useProperties";
import { useEffect } from "react";
function PrincipalLayout({ children }: PropsWithChildren) {
  const getAllProperties = useProperties((state) => state.getAllProperties);

  useEffect(() => {
    getAllProperties();
  }, [getAllProperties]);
  
  return (
    <div className="relative flex flex-col min-h-screen w-screen">
      <Navbar />
      <main className="overflow-hidden">{children}</main>
      <PrincipalBackground />
    </div>
  );
}

export default PrincipalLayout;

/* login, home, register */
