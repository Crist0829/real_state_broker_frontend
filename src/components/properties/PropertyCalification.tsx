import { PropertyCalificationType, User } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReactStars from "react-rating-star-with-type";
import { useAuthenticate } from "@/store/useAuthenticate";
import PropertyMyCalification from "./PropertyMyCalification";

const PropertyCalification = ({
  califications,
  propertyId,
  setCalification,
}: {
  califications: PropertyCalificationType[];
  propertyId: number;
  setCalification?: any;
}) => {
  const [generalCalification, setGeneralCalification] = useState<number>(0);

  const [myCalification, setMyCalification] =
    useState<PropertyCalificationType | null>(null);

  const [showMyCalification, setShowMyCalification] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = useAuthenticate((state) => state.isAuthenticated);
  const userAuthenticated = useAuthenticate((state) => state.user);

  useEffect(() => {
    const checkAuthenticated = () => {
      try {
        if (isAuthenticated) {
          setUser(userAuthenticated);
          setShowMyCalification(true);
          if (califications.length > 0) {
            const myCalificationR = califications.find(
              (calification) => calification.user_id === user?.id
            );

            if (myCalificationR) setMyCalification(myCalificationR);
          }
        } else {
          setShowMyCalification(false);
        }
      } catch (error: any) {
        toast.error("Error al obtener datos del usuario:", error);
      }
    };

    checkAuthenticated();
  }, [califications, isAuthenticated, user, userAuthenticated]);

  useEffect(() => {
    // Saco la calificación general
    if (califications.length > 0) {
      const nC = califications.length;
      const tC = califications.reduce(
        (total, calification) => total + calification.calification,
        0
      );
      const gC = Math.round(tC / nC);
      setGeneralCalification(gC);
    }
  }, [califications, setCalification]);

  /* calification temporal */

  return (
    <div className="flex gap-8 my-5 items-center justify-center ">
      <div
        className={`flex flex-col items-center justify-center ${
          generalCalification == 0 && "mt-5"
        }`}
      >
        <p className="text-sm my-1">Calificación general:</p>
        <ReactStars
          value={generalCalification}
          activeColors={["red", "orange", "#FFCE00", "#9177FF", "#8568FC"]}
        />
      </div>

      {showMyCalification && (
        <PropertyMyCalification
          generalCalification={generalCalification}
          myCalification={myCalification}
          propertyId={propertyId}
          setCalification={setCalification}
          setMyCalification={setMyCalification}
        />
      )}
    </div>
  );
};

export default PropertyCalification;
