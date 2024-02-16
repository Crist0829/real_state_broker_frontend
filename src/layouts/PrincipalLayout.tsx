import { Navbar } from "@/components/Navbar";
import { PropsWithChildren, useEffect } from "react";
import PrincipalBackground from "@/components/PrincipalBackground";
import { useProperties } from "@/store/useProperties";
import { useAuthenticate } from "@/store/useAuthenticate";
import axios from "@/lib/axiosConfig";

function PrincipalLayout({ children }: PropsWithChildren) {
  const stateGlobal = useAuthenticate();

  /* Trae todos las propiedades */
  const getAllProperties = useProperties((state) => state.getAllProperties);
  useEffect(() => {
    getAllProperties();
    console.log("Get all propierties");
  }, []);

  /* Verifica si el token es valido */
  async function getUserAuthenticated() {
    if (!localStorage.getItem("accessToken")) {
      console.log("logout");
      stateGlobal.logout();
      return;
    }
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
