import axios from "@/lib/axiosConfig";
import { Property } from "@/types";
import { Button } from "../ui/button";
import { useProperties } from "@/store/useProperties";
import { toast } from "sonner";
import { getMsgErrorResponse } from "@/helpers/getMsgErrorResponse";

function ButtonDelete({ property }: { property: Property }) {
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
      className="w-full"
      variant="destructive"
    >
      Eliminar
    </Button>
  );
}

export default ButtonDelete;
