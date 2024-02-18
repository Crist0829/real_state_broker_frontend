import axios from "axios";
import ReactStars from "react-rating-star-with-type";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { PropertyCalificationType } from "@/types";

interface Props {
  propertyId: number;
  myCalification: PropertyCalificationType | null;
  setMyCalification: Dispatch<SetStateAction<PropertyCalificationType | null>>;
  setCalification: Dispatch<SetStateAction<PropertyCalificationType | null>>;
  generalCalification: number;
}

function PropertyMyCalification({
  setMyCalification,
  setCalification,
  generalCalification,
  myCalification,
  propertyId,
}: Props) {
  const [calificationTemp, setCalificationTemp] = useState({
    calification: 0,
    isCalificate: false,
  });

  function handleCalification(e: MouseEvent<HTMLSpanElement, MouseEvent>) {
    const tempCalification = e.target.dataset.calification;

    setCalificationTemp({
      isCalificate: true,
      calification: tempCalification,
    });
  }

  function handleCancelCalification() {
    setCalificationTemp({
      isCalificate: false,
      calification: 0,
    });
  }

  const changeHandle = async (e: any) => {
    const calification = e.target.dataset.calification;
    const res = await axios.post("/property/addCalification/" + propertyId, {
      calification,
    });
    setCalification(true);
    setMyCalification(res.data);
    toast.success("Calificación agregada", {
      description: "Has calificado esta propiedad",
    });
  };

  return (
    <div
      className={`flex flex-col items-center justify-center  relative${
        generalCalification == 0 && "mt-5"
      }`}
    >
      <p className="text-sm my-1">Tu calificación:</p>
      <div className="relative w-full flex ">
        <ReactStars
          onChange={changeHandle}
          value={
            calificationTemp.isCalificate
              ? calificationTemp.calification
              : myCalification?.calification
          }
          isEdit={true}
          activeColors={["red", "orange", "#FFCE00", "#9177FF", "#8568FC"]}
          isHalf={true}
        />
        <div className="border border-emerald-600  absolute bottom-0 cursor-pointer w-11/12 flex opacity-0">
          <span
            onMouseOver={handleCalification}
            onMouseLeave={handleCancelCalification}
            onClick={changeHandle}
            className="start-calification-1 flex-grow  h-3 "
            data-calification="1"
          ></span>
          <span
            onMouseOver={handleCalification}
            onMouseLeave={handleCancelCalification}
            onClick={changeHandle}
            className="start-calification-2 flex-grow  h-3  "
            data-calification="2"
          ></span>
          <span
            onMouseOver={handleCalification}
            onMouseLeave={handleCancelCalification}
            onClick={changeHandle}
            className="start-calification-3 flex-grow  h-3  "
            data-calification="3"
          ></span>
          <span
            onMouseOver={handleCalification}
            onMouseLeave={handleCancelCalification}
            onClick={changeHandle}
            className="start-calification-4 flex-grow  h-3  "
            data-calification="4"
          ></span>
          <span
            onMouseOver={handleCalification}
            onMouseLeave={handleCancelCalification}
            onClick={changeHandle}
            className="start-calification-5 flex-grow  h-3  "
            data-calification="5"
          ></span>
        </div>
      </div>
    </div>
  );
}

export default PropertyMyCalification;
