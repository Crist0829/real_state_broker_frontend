import { useAuthenticate } from "@/store/useAuthenticate";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "sonner";

function ProtectedRoutes() {
  const isAuthenticated = useAuthenticate((state) => state.isAuthenticated);

  !isAuthenticated &&
    toast("No estas autorizado", {
      description: "Inicia sesión nuevamente",
    });

  return isAuthenticated ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoutes;
