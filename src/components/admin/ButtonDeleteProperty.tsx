import axios from "@/lib/axiosConfig";
import { Property } from "@/types";
import { Button } from "../ui/button";
import { useProperties } from "@/store/useProperties";
import { toast } from "sonner";
import { getMsgErrorResponse } from "@/helpers/getMsgErrorResponse";
import { TrashIcon } from "lucide-react";

function ButtonDeleteProperty({
  property,
  className,
}: {
  property: Property;
  className?: string;
}) {
  const refresh = useProperties((state) => state.refreshProperties);

  return (
    <Button
      onClick={async () => {
        try {
          const res = await axios.delete(`property/${property.id}`);
          if (res.status === 204 || res.status === 200) {
            refresh();
            toast.success("Eliminado correctamente");
          }
        } catch (error) {
          toast.error(getMsgErrorResponse(error) || "Ha ocurrido un error");
        }
      }}
<<<<<<< HEAD:src/components/admin/ButtonDelete.tsx
      className="w-full text-start"
      variant="ghost"
=======
      className={`w-full ${className}`}
      variant="destructive"
>>>>>>> 197c237fa2ed382d050e21a964cf4415632c0a68:src/components/admin/ButtonDeleteProperty.tsx
    >
      Eliminar <TrashIcon className="text-sm p-1"/>
    </Button>
  );
}

export default ButtonDeleteProperty;
