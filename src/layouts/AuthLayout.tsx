import Sidebar from "@/components/auth/Sidebar";
import { PropsWithChildren } from "react";

import PrincipalBackground from "@/components/PrincipalBackground";

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col min-h-dvh  relative">
      {/* Sidebar size */}
      <main className="md:pl-[120px] pb-[100px] container  mx-auto animate-fade-in ">
        {children}
      </main>
      <Sidebar />
      <PrincipalBackground />
    </div>
  );
}

export default AuthLayout;

/* Las páginas que si o si necesiten que el usuario este autenticado */
