import { useAuthenticate } from "@/store/useAuthenticate";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const isAuthenticated = useAuthenticate((state) => state.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoutes;
