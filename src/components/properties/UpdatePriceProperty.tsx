/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Property } from "@/types";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createPriceSchema } from "@/validations/properties";
import { getMsgErrorResponse } from "@/helpers/getMsgErrorResponse";
import { toast } from "sonner";
import axios from "@/lib/axiosConfig";
import { useProperties } from "@/store/useProperties";
import { TablePricesProperty } from "./TablePricesPropery";
import { getProperty } from "@/services/properties";

function UpdatePriceProperty({ property }: { property: Property }) {
  const refresh = useProperties((state) => state.refreshProperties);
  const [prices, setPrices] = useState(property.prices);
  const [openForm, setOpenForm] = useState(false);
  const [newPrice, setNewPrice] = useState({
    name: "",
    description: "",
    price: "",
    type: "sale",
  });

  function handleChange(e: any) {
    setNewPrice((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit() {
    try {
      const newPriceValidated = createPriceSchema.parse(newPrice);
      const res = await axios.post(
        `/property/addPrice/${property.id}`,
        newPriceValidated
      );

      if (res.status === 200) {
        const currenrProperty = await getProperty(property.id);
       
        setPrices(currenrProperty.data.property.prices); // actualiza la lista de precios
        toast.success("Precio añadido correctamente");
        refresh();
      }
    } catch (error : any) {
      const errorMsg = getMsgErrorResponse(error)
      errorMsg && toast.error(errorMsg)
    }
  }

  return (
    <SheetContent
      side="left"
      className="h-screen  container shadow-2xl w-full sm:max-w-xl overflow-auto flex flex-col items-center"
    >
      <SheetHeader>
        <SheetTitle className="text-2xl">
          Edita el precio de tu inmueble {property.name}
        </SheetTitle>
        <SheetDescription>
          {prices.length === 0 && (
            <p className="text-lg text-center">No tiene precios todavia.</p>
          )}
        </SheetDescription>
      </SheetHeader>
      {prices.length > 0 && (
        <TablePricesProperty
          property={property}
          prices={prices}
          setPrices={setPrices}
        />
      )}

      <Button
        className="transtition w-full "
        onClick={() => {
          setOpenForm(!openForm);
        }}
        variant={openForm ? "destructive" : "ghost"}
      >
        {openForm ? "Cerrar" : "Agregar"}
      </Button>

      {openForm && (
        <article className="animate-fade-in-down w-full">
          <div className="grid gap-4 py-4">
            <div className="flex flex-col  items-start gap-1">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                onChange={handleChange}
                id="name"
                name="name"
                placeholder="Verano"
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col  items-start gap-1">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Input
                onChange={handleChange}
                id="description"
                name="description"
                placeholder="Promoción de verano..."
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col  items-start gap-1">
              <Label htmlFor="price" className="text-right">
                Precio
              </Label>
              <Input
                onChange={handleChange}
                name="price"
                id="price"
                className="col-span-3"
                type="number"
              />
            </div>

            <div className="flex flex-col  items-start gap-1">
              <Label>Tipo</Label>
              {/* tipo */}
              <Select
                name="type"
                onValueChange={(value) => {
                  const e = {
                    target: {
                      name: "type",
                      value,
                    },
                  };
                  handleChange(e);
                }}
                defaultValue={newPrice.type}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="rent">Venta</SelectItem>
                    <SelectItem value="sale">Renta</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <SheetFooter>
            <Button onClick={handleSubmit} type="submit">
              Agregar precio
            </Button>
          </SheetFooter>
        </article>
      )}
    </SheetContent>
  );
}

export default UpdatePriceProperty;
