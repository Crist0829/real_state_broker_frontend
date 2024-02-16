import Sidebar from "@/components/auth/Sidebar";
import { PropsWithChildren, useEffect } from "react";

import PrincipalBackground from "@/components/PrincipalBackground";
import { useProperties } from "@/store/useProperties";

import { useAuthenticate } from "@/store/useAuthenticate";
import axios from "@/lib/axiosConfig";

function AuthLayout({ children }: PropsWithChildren) {
  const getProperties = useProperties((state) => state.getProperties);
  const getAllProperties = useProperties((state) => state.getAllProperties);

  useEffect(() => {
    getProperties();
    getAllProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stateGlobal = useAuthenticate();

  /* Verifica si el token es valido */
  async function getUserAuthenticated() {
    if (!localStorage.getItem("accessToken")) {
      console.log("logout");
      stateGlobal.logout();
      return;
    }
    try {
      const user = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      stateGlobal.setAuthenticate(user.data);

      return user.data;
    } catch (error) {
      console.log(error);
      stateGlobal.logout();

      return false;
    }
  }

  useEffect(() => {
    // getUserAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
