import { Property } from "@/types";
import { ImageOff, LoaderIcon } from "lucide-react";
import SectionPrices from "./SectionPrices";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { useAuthenticate } from "@/store/useAuthenticate";
import PropertyCalification from "./PropertyCalification";
import PropertyDetails from "./PropertyDetails";

function SectionInfoProperty({
  currentProperty,
  setCalification,
}: {
  currentProperty: Property;
  setCalification: any;
}) {
  const isAuthenticated = useAuthenticate((state) => state.isAuthenticated);
  const userAuthenticated = useAuthenticate((state) => state.user);
  const loadingAuth = useAuthenticate((state) => state.loading);

  return (
    <div
      className={`w-full md:w-[400px] flex flex-col gap-3 animate-fade-in-left ${
        currentProperty.images.length === 0 && "mx-auto md:w-[700px]"
      }`}
    >
      <header className="flex flex-col gap-1">
        <p className="text-base uppercase opacity-55 text-right">
          Propietario {currentProperty.user.name}
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold flex items-center ">
          {currentProperty.name}
        </h2>
        <p className="text-xl font-light flex flex-col ">
          <small className="text-sm opacity-55">Descripción</small>
          {currentProperty.description}
        </p>
      </header>

      <div className="mt-6 flex flex-col gap-5">
        <h3 className="text-2xl font-semibold leading-4">Detalles</h3>
        {currentProperty.images.length === 0 && (
          <p className="text-sm font-thin flex items-center gap-3">
            <ImageOff width={35} height={35} />
            Sin imagenes
          </p>
        )}

        <PropertyDetails
          className=" w-full  flex-col items-start justify-start "
          property={currentProperty}
        />
      </div>

      {/* SECTION PRECIOS */}
      <SectionPrices prices={currentProperty.prices} />

      {/* CALIFICACIÖN */}
      <PropertyCalification
        propertyId={currentProperty.id}
        califications={currentProperty.califications}
        setCalification={(e: boolean) => setCalification(e)}
      />

      {/* SI ES EL PROPIETARIO */}
      {loadingAuth ? (
        <p>
          <LoaderIcon className="animate-spin-clockwise animate-iteration-count-infinite" />
        </p>
      ) : (
        isAuthenticated &&
        currentProperty.user_id === userAuthenticated?.id && (
          <Link
            to="/dashboard"
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            Editar información
          </Link>
        )
      )}
    </div>
  );
}

export default SectionInfoProperty;
