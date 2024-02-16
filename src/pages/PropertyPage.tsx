import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PrincipalLayout from "@/layouts/PrincipalLayout";
import { useProperties } from "@/store/useProperties";
import { Property } from "@/types";
import {
  Bed,
  Loader2Icon,
  ParkingCircle,
  ParkingCircleOff,
  ShoppingCart,
  ShowerHead,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Autoplay from "embla-carousel-autoplay";

const imagesDefault = [
  "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  "https://img.freepik.com/free-photo/stylish-scandinavian-living-room-with-design-mint-sofa-furnitures-mock-up-poster-map-plants-eleg_1258-152143.jpg?w=1800&t=st=1708012763~exp=1708013363~hmac=8e1085078b6d6bf8427dcf1429b40595100ffa2e3ba5734a8f0906ced0cc2986",
];

function PropertyPage() {
  const { id } = useParams<{ id: string }>(); // Asegúrate de especificar que id es de tipo string

  const { loadingGetAllProperties, allProperties } = useProperties();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    console.log(allProperties);
    console.log(loadingGetAllProperties);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingGetAllProperties]);

  /* if (notFound) {F
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
  } */

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
          <section className="flex flex-col md:flex-row gap-5">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
              className="w-full    relative flex justify-center "
            >
              <CarouselContent>
                {imagesDefault.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 ">
                      <img
                        alt=""
                        src={src}
                        className="h-full w-full rounded-md object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="left-0 " />
              <CarouselNext className="right-0    " />
            </Carousel>
            {/* end Slider */}
            <div className="md:w-[400px] flex flex-col gap-3 ">
              <header className="flex flex-col gap-1">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {currentProperty.name}
                </h2>
                <p className="text-xl font-light flex flex-col ">
                  <small className="text-sm opacity-55">Descripción</small>
                  {currentProperty.description}
                </p>
              </header>

              <div className="mt-6 flex flex-col gap-5">
                <h3 className="text-2xl font-semibold leading-4">Detalles</h3>
                <div className="flex gap-3 items-center ">
                  {currentProperty.garage ? (
                    <>
                      <ParkingCircle width={35} height={35} />
                      <div className="">
                        <p className="opacity-90">con garage</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <ParkingCircleOff width={35} height={35} />
                      <div className="">
                        <p className="opacity-90">Sin garage</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex gap-3 items-center">
                  <ShowerHead width={35} height={35} />
                  <div className=" flex gap-3">
                    <p className="font-medium">{currentProperty.bathrooms}</p>
                    <p className="opacity-90">Baños</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <Bed width={35} height={35} />
                  <div className=" flex gap-3">
                    <p className="font-medium">{currentProperty.bedrooms}</p>
                    <p className="opacity-90">Dormitorio</p>
                  </div>
                </div>
              </div>

              <div>
                <small className="text-sm opacity-55">Precio</small>
                <p className="font-mono text-2xl">$80.402</p>
              </div>
              <Button className="flex items-center gap-3">
                Adquirir
                <ShoppingCart />
              </Button>
            </div>
          </section>
        )}
      </main>
    </PrincipalLayout>
  );
}

export default PropertyPage;
