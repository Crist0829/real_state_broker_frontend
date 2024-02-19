import RegistroUsuario from "@/components/auth/RegisterForm";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";

import LoginForm from "./components/auth/LoginForm";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import DashboardPage from "./pages/admin/DashboardPage";

import { Toaster } from "./components/ui/sonner";
import Create from "./pages/admin/properties/Create";

import PropertyPage from "./components/properties/PropertyPage";
import { useAuthenticate } from "./store/useAuthenticate";
import { useEffect } from "react";
import Profile from "./pages/admin/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegistroUsuario />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/property/:id",
    element: <PropertyPage />,
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/properties/create",
        element: <Create />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  const checkAuth = useAuthenticate((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          closeButton: true,
        }}
        visibleToasts={3}
        duration={3000}
        richColors={true}
        position="top-right"
      />
    </>
  );
}

export default App;
