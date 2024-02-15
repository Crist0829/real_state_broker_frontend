import axios from "@/lib/axiosConfig";
import { Navbar } from "@/components/Navbar";
import { useAuthenticate } from "@/store/useAuthenticate";
import { PropsWithChildren, useEffect } from "react";
import PrincipalBackground from "@/components/PrincipalBackground";


function PrincipalLayout({ children }: PropsWithChildren) {
  const stateGlobal = useAuthenticate();

  async function getUserAuthenticated() {
    try {
      const user = await axios.get("/api/user");
      return user.data;
    } catch (error) {
      stateGlobal.logout();
      return false;
    }
  }

  useEffect(() => {
      getUserAuthenticated().then((res) => {
        if (!res) return stateGlobal.logout();
        stateGlobal.setAuthenticate(res);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
