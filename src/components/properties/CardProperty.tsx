import { Bed, ParkingCircle, ParkingCircleOff, ShowerHead } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from "../ui/card"
import { Property } from '@/types';
import CarouselProperty from './CarouselProperty';
import PropertyCalification from './PropertyCalification';

const CardProperty = ({ property, setCalification }: { property: Property, setCalification : any }) => {

    return (
      <Card className="block rounded-lg p-4 shadow-sm border ">

        {
          property.images.length > 0 && <CarouselProperty images={property.images}/>
        }
        
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

              {
                <PropertyCalification califications={property.califications} propertyId={property.id} setCalification={(e : number) => setCalification(e)} />
              }
          
        </div>
      </Card>
    )
}

export default CardProperty