import { Bed, ParkingCircle, ParkingCircleOff, ShowerHead } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import { useProperties } from "@/store/useProperties";

const imagesDefault = [
  "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  "https://img.freepik.com/free-photo/stylish-scandinavian-living-room-with-design-mint-sofa-furnitures-mock-up-poster-map-plants-eleg_1258-152143.jpg?w=1800&t=st=1708012763~exp=1708013363~hmac=8e1085078b6d6bf8427dcf1429b40595100ffa2e3ba5734a8f0906ced0cc2986",
];

function GridAllProperties() {
  const allProperties = useProperties((state) => state.allProperties);
  const loading = useProperties((state) => state.loadingGetAllProperties);

  return (
    <article className="container my-10 animate-fade-in" id="all-properties">
      <h2 className="text-3xl font-bold mb-5 ">Edificios disponibles</h2>
      {loading && <div>Cargando..</div>}
      {!loading && (
        <section className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 relative animate-fade-in">
          {allProperties.map((property) => (
            <Card className="block rounded-lg p-4 shadow-sm border ">
              <Carousel className="w-full  relative flex justify-center">
                <CarouselContent>
                  {imagesDefault.map((src, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <img
                          alt=""
                          src={src}
                          className="h-56 w-full rounded-md object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute w-6/12 bottom-6">
                  <CarouselPrevious className="left-0 bottom-0" />
                  <CarouselNext className="right-0    bottom-0" />
                </div>
              </Carousel>

              {/* Datos */}
              <div className="mt-2 group">
                <div>
                  <Link
                    to={`/property/${property.id}`}
                    className="text-xl md:text-2xl border-t-black font-bold group-hover:underline opacity-70 hover:opacity-100 transition"
                  >
                    {property.name}
                  </Link>
                </div>

                <dl>
                  <div>
                    <dt className="sr-only">Precio</dt>
                    <dd className="text-sm text-gray-500">$240,000</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Ubicación</dt>
                    <dd className="font-medium">{property.location}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex items-center gap-8 text-xs">
                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    {property.garage ? (
                      <>
                        <ParkingCircle />
                        <div className="mt-1.5 sm:mt-0">
                          <p className="text-gray-500">con garage</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <ParkingCircleOff />
                        <div className="mt-1.5 sm:mt-0">
                          <p className="text-gray-500">Sin garage</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <ShowerHead />
                    <div className="mt-1.5 sm:mt-0">
                      <p className="text-gray-500">Baños</p>
                      <p className="font-medium">{property.bathrooms}</p>
                    </div>
                  </div>
                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <Bed />
                    <div className="mt-1.5 sm:mt-0">
                      <p className="text-gray-500">Dormitorio</p>
                      <p className="font-medium">{property.bedrooms}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </section>
      )}
    </article>
  );
}

export default GridAllProperties;
