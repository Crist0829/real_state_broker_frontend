import { Navbar } from "@/components/main/Navbar";
import { PropsWithChildren } from "react";
import PrincipalBackground from "@/components/main/PrincipalBackground";

function PrincipalLayout({ children }: PropsWithChildren) {

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
