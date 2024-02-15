import DataTableProperties from "@/components/admin/DataTableProperites";
import AuthLayout from "@/layouts/AuthLayout";
import { useAuthenticate } from "@/store/useAuthenticate";
import { useProperties } from "@/store/useProperties";
import { useEffect } from "react";

function DashboardPage() {
  const user = useAuthenticate((state) => state.user);
  const getProperties = useProperties((state) => state.getProperties);

  useEffect(() => {
    getProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthLayout>
      <main className="py-10" >
        <h1 className="text-3xl md:text-6xl text-center font-extrabold animate-slide-in-top">
          Inmuebes de {user?.name}
        </h1>

        <DataTableProperties />
      </main>
    </AuthLayout>
  );
}

export default DashboardPage;
