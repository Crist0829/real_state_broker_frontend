import PrincipalLayout from "@/layouts/PrincipalLayout";

import { Property } from "@/types";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import CarouselProperty from "@/components/properties/CarouselProperty";
import { getProperty } from "@/services/properties";
import { getMsgErrorResponse } from "@/helpers/getMsgErrorResponse";
import { toast } from "sonner";

import SectionInfoProperty from "@/components/properties/SectionInfoProperty";

function PropertyPage() {
  const { id } = useParams<{ id: string }>(); // Asegúrate de especificar que id es de tipo string

  const [currentProperty, setCurrentProperty] = useState<Property | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [calification, setCalification] = useState<boolean>(false)
 
  const fetchProperty = async () => {
    try {
      if (!id || isNaN(parseInt(id))) return navigate("/");
      const res = await getProperty(parseInt(id));
        setCalification(false)
      if (res.status === 200) {
        setCurrentProperty(res.data.property);
      } else {
        setNotFound(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(getMsgErrorResponse(error));
      error.response.status === 404 && setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [calification]);

  if (notFound) {
    return (
      <PrincipalLayout>
        <div className="grid my-20  place-content-center  px-4">
          <div className="text-center">
            <h1 className="text-9xl font-black ">404</h1>
            <p className="text-2xl font-bold tracking-tight  sm:text-4xl">
              Uh-oh!
            </p>
            <p className="mt-4 text-gray-500">No encontramos esta propiedad.</p>
            <Link
              to="/"
              className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
            >
              Volver al home
            </Link>
          </div>
        </div>
      </PrincipalLayout>
    );
  }

  return (
    <PrincipalLayout>
      <main className="container animate-fade-in">
        {/* Si esta cargando */}
        {loading && (
          <div className="w-full flex justify-center p-52">
            {" "}
            <Loader2Icon className="animate-spin-counter-clockwise animate-iteration-count-infinite" />{" "}
          </div>
        )}
        {/* Si ya lo encontro */}
        {currentProperty && (
          <section className="flex flex-col md:flex-row gap-5 items-center">
            {currentProperty.images.length > 0 && (
              <CarouselProperty
                images={currentProperty.images}
                withAutoplay={true}
              />
            )}

            {/* INFORMACIÓN PROPERTY */}
            <SectionInfoProperty currentProperty={currentProperty} setCalification={ (e : boolean) => setCalification(e)} />
          </section>
        )}
      </main>
    </PrincipalLayout>
  );
}

export default PropertyPage;
