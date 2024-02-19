import { Property } from "@/types";
import {
  Bed,
  Home,
  ParkingCircle,
  ParkingCircleOff,
  Ruler,
  ShowerHead,
} from "lucide-react";
function PropertyDetails({
  property,
  className,
}: {
  property: Property;
  className?: string;
}) {
  return (
    <div
      className={`mt-6 flex  gap-3  flex-wrap ${className}`}
    >
      <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
        {property.garage ? (
          <>
            <ParkingCircle />
            <div className="mt-1.5 sm:mt-0 flex gap-1">
              <p className="text-gray-500">con garage</p>
            </div>
          </>
        ) : (
          <>
            <ParkingCircleOff />
            <div className="mt-1.5 sm:mt-0 flex gap-1">
              <p className="text-gray-500">Sin garage</p>
            </div>
          </>
        )}
      </div>
      <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
        <ShowerHead />
        <div className="mt-1.5 sm:mt-0 flex gap-1">
          <p className="font-medium">{property.bathrooms}</p>
          <p className="text-gray-500">Baños</p>
        </div>
      </div>
      <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
        <Bed />
        <div className="mt-1.5 sm:mt-0 flex gap-1">
          <p className="font-medium">{property.bedrooms}</p>
          <p className="text-gray-500">Dormitorio</p>
        </div>
      </div>
      <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
        <Home />
        <div className="mt-1.5 sm:mt-0 flex gap-1">
          <p className="font-medium">{property.floors}</p>
          <p className="text-gray-500">Pisos</p>
        </div>
      </div>
      <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
        <Ruler />
        <div className="mt-1.5 sm:mt-0 flex gap-1">
          <p className="text-gray-500">Tamaño</p>
          <p className="font-medium">{property.size}m²</p>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
