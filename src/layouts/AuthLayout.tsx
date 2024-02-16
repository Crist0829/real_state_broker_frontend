import Sidebar from "@/components/auth/Sidebar";
import { PropsWithChildren, useEffect } from "react";
import PrincipalBackground from "@/components/main/PrincipalBackground";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axiosConfig";
import { useAuthenticate } from "@/store/useAuthenticate";
import { toast } from "sonner";

function AuthLayout({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const deleteAuthenticated = useAuthenticate(
    (state) => state.deleteAuthenticate
  );
  const setAuthenticated = useAuthenticate((state) => state.setAuthenticate);

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const res = await axios.get("api/user");
        setAuthenticated(res.data);
        //getProperties();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (e.response.status === 401) {
          deleteAuthenticated();
          toast("No estas autorizado", {
            description: "Inicia sesión nuevamente",
          });
          navigate("/");
        }
      }
    };
    checkAuthenticated();
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
