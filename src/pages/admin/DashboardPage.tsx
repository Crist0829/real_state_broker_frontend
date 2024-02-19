import DataTableProperties from "@/components/properties/DataTableProperites";
import AuthLayout from "@/layouts/AuthLayout";
import { useAuthenticate } from "@/store/useAuthenticate";

function DashboardPage() {
  const user = useAuthenticate((state) => state.user);

  return (
    <AuthLayout>
      <main className="py-10">
        <h1 className="text-3xl md:text-6xl text-center font-extrabold animate-slide-in-top">
          Inmuebes de {user?.name}
        </h1>
        <DataTableProperties />
      </main>
    </AuthLayout>
  );
}

export default DashboardPage;
