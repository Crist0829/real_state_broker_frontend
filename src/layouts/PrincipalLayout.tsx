import axios from "@/lib/axiosConfig";
import { Navbar } from "@/components/Navbar";
import { useAuthenticate } from "@/store/useAuthenticate";
import { PropsWithChildren, useEffect } from "react";
import PrincipalBackground from "@/components/PrincipalBackground";


function PrincipalLayout({ children }: PropsWithChildren) {
  const stateGlobal = useAuthenticate();

  async function getUserAuthenticated() {
    try {
      const user = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      return user.data;
    } catch (error) {
      console.log(error);
      stateGlobal.logout();

      return false;
    }
  }

  useEffect(() => {
    localStorage.getItem("accessToken") &&
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
