import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Price, Property } from "@/types";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import axios from "@/lib/axiosConfig";
import { toast } from "sonner";
import { getMsgErrorResponse } from "@/helpers/getMsgErrorResponse";
import { useProperties } from "@/store/useProperties";
import { Dispatch } from "react";
import { getProperty } from "@/services/properties";
import { toLocalePrice } from "@/helpers/toLocalePrice";

export function TablePricesProperty({
  property,
  prices,
  setPrices,
}: {
  property: Property;
  prices: Price[];
  setPrices: Dispatch<React.SetStateAction<Price[]>>;
}) {
  const refresh = useProperties((state) => state.refreshProperties);

  async function handleDelete(id: number) {
    try {
      const res = await axios.delete(`property/price/${id}`);
      if (res.status === 200 || res.status === 204) {
        refresh();
        const currentProperty = await getProperty(property.id);
        setPrices(currentProperty.data.property.prices);
        return toast.success("Eliminado correctamente");
      }
    } catch (error : any) {
      const errorMsg = getMsgErrorResponse(error);
      errorMsg && toast.error(errorMsg)
    }
  }

  return (
    <Table>
      <TableCaption>Precios de {property.name}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nombre</TableHead>
          <TableHead>Descriprción</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">Precio</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prices.map((price) => (
          <TableRow key={price.name}>
            <TableCell className="font-medium">{price.name}</TableCell>
            <TableCell>{price.description}</TableCell>
            <TableCell>{price.type}</TableCell>
            <TableCell className="text-right">
              {toLocalePrice(price.price)}
            </TableCell>
            <TableCell>
              <Button
                onClick={() => {
                  handleDelete(price.id);
                }}
                className=" p-0 w-8 h-8"
                variant="destructive"
              >
                <Trash width={12} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
