import axios from "@/lib/axiosConfig";
import { Property } from "@/types";
import { Button } from "../ui/button";
import { useProperties } from "@/store/useProperties";
import { toast } from "sonner";
import { getMsgErrorResponse } from "@/helpers/getMsgErrorResponse";
import { Redo2, RedoIcon, TrashIcon } from "lucide-react";

function ButtonRestore({ property }: { property: Property }) {
  const refresh = useProperties((state) => state.refreshProperties);

  return (
    <Button
      onClick={async () => {
        try {
          const res = await axios.post(`property/restore/${property.id}`);
          if (res.status === 204 || res.status === 200) {
            refresh();
            toast.success("Se resturauró la propiedad");
          }
        } catch (error) {
          toast.error(getMsgErrorResponse(error) || "Ha ocurrido un error");
        }
      }}
      className="w-full text-start"
      variant="ghost"
    >
      Restaurar <Redo2 className="text-lg p-1"/>
    </Button>
  );
}

export default ButtonRestore;
