import { ArrowUpRightSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { Property } from "@/types";
import CarouselProperty from "./CarouselProperty";
import PropertyCalification from "./PropertyCalification";
import PropertyDetails from "./PropertyDetails";

const CardProperty = ({
  property,
  setCalification,
}: {
  property: Property;
  setCalification: any;
}) => {
  return (
    <Card className="block rounded-lg p-4 shadow-sm border ">
      {property.images.length > 0 && (
        <CarouselProperty images={property.images} />
      )}

      {/* Datos */}
      <div className="mt-2 group">
        <div>
          <Link
            to={`/property/${property.id}`}
            className="text-xl md:text-2xl border-t-black font-bold group-hover:underline opacity-70 hover:opacity-100 transition flex items-center gap-1"
          >
            {property.name} <ArrowUpRightSquare height={15} width={15} />
          </Link>
        </div>
        <dl>
          <div>
            <dt className="sr-only">Ubicación</dt>
            <dd className="font-medium">{property.location}</dd>
          </div>
        </dl>
        <PropertyDetails property={property} className="text-xs" />

        {
          <PropertyCalification
            califications={property.califications}
            propertyId={property.id}
            setCalification={(e: number) => setCalification(e)}
          />
        }
      </div>
    </Card>
  );
};

export default CardProperty;
