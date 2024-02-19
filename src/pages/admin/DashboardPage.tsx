import DataTableProperties from "@/components/properties/DataTableProperites";
import AuthLayout from "@/layouts/AuthLayout";

function DashboardPage() {


  return (
    <AuthLayout>
      <main className="py-10">
        <h1 className="text-3xl md:text-6xl text-center font-extrabold animate-slide-in-top">
          ¡Bienvenid@!
        </h1>
        <p className="text-center">Estas son tus propiedades publicadas</p>
        <DataTableProperties />
      </main>
    </AuthLayout>
  );
}

export default DashboardPage;
