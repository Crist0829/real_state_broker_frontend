import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Property } from "@/types";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "@/lib/axiosConfig";

import { toast } from "sonner";
import { useProperties } from "@/store/useProperties";
import { getMsgErrorResponse } from "@/helpers/getMsgErrorResponse";

function UpdateDataProperty({ property }: { property: Property }) {
  const [formData, setFormData] = useState<Property>(property);

  const refresh = useProperties((state) => state.refreshProperties);

  function handleChange(e: any) {
    setFormData((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit() {
    try {
      const res = await axios.put(`/property/${property.id}`, formData);
      console.log(res);
      if (res.status === 200) {
        refresh();
        toast.success(`${formData.name} Actualizado correctamente`);
      }
    } catch (error) {
      getMsgErrorResponse(error);
      console.log(error);
      console.log(error.response.data.message);
    }
  }

  return (
    <SheetContent side="right" className="h-screen container shadow-2xl">
      <SheetHeader>
        <SheetTitle>
          <h2 className="text-lg">
            EDITANDO <strong className="text-xl"> {property.name}</strong>{" "}
          </h2>
        </SheetTitle>
      </SheetHeader>
      <div className="grid gap-4 py-9">
        <div className="grid  md:grid-cols-4 md:items-center gap-2 md:gap-4">
          <Label htmlFor="name" className="text-left">
            Nombre
          </Label>
          <Input
            onChange={handleChange}
            id="name"
            name="name"
            value={formData.name}
            className="col-span-3"
          />
        </div>

        <div className="grid  md:grid-cols-4 md:items-center gap-2 md:gap-4">
          <Label htmlFor="description" className="text-left">
            Description
          </Label>
          <Textarea
            onChange={handleChange}
            id="description"
            name="description"
            value={formData.description}
            className="col-span-3 resize-none"
          />
        </div>

        <div className="grid  md:grid-cols-4 md:items-center gap-2 md:gap-4">
          <Label htmlFor="location" className="text-left">
            Ubicación
          </Label>
          <Input
            onChange={handleChange}
            name="location"
            id="location"
            value={formData.location}
            className="col-span-3"
          />
        </div>

        <h3 className="text-lg font-bold">Cantidad de: </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 max-w-lg  items-center gap-5">
          <Label htmlFor="floors">
            <small className="text-sm  uppercase text-center block">
              pisos
            </small>
            <Input
              onChange={handleChange}
              min={0}
              name="floors"
              type="number"
              id="floors"
              value={formData.floors.toString()}
            />
          </Label>

          <Label htmlFor="livingrooms">
            <small className="text-sm  uppercase text-center block">
              livings
            </small>
            <Input
              onChange={handleChange}
              min={0}
              type="number"
              id="livingrooms"
              name="livingrooms"
              value={formData.livingrooms.toString()}
            />
          </Label>

          <Label htmlFor="bathrooms">
            <small className="text-sm  uppercase text-center block">
              baños
            </small>
            <Input
              onChange={handleChange}
              name="bathrooms"
              min={0}
              type="number"
              id="bathrooms"
              value={formData.bathrooms.toString()}
            />
          </Label>
          <Label htmlFor="kitchens">
            <small className="text-sm  uppercase text-center block ">
              Cocinas
            </small>
            <Input
              onChange={handleChange}
              min={0}
              type="number"
              name="kitchens"
              id="kitchens"
              value={formData.kitchens.toString()}
            />
          </Label>
          <Label htmlFor="bedrooms">
            <small className="text-sm  uppercase text-center block ">
              dormitorios
            </small>
            <Input
              onChange={handleChange}
              min={0}
              type="number"
              name="bedrooms"
              id="bedrooms"
              value={formData.bedrooms.toString()}
            />
          </Label>
        </div>

        <div className="flex items-center w-full justify-between ml-auto  my-2 gap-3">
          {/* GARAGE */}
          <div className="flex items-center justify-center gap-3">
            <label htmlFor="garage" className=" truncate">
              {" "}
              Tiene garage{" "}
            </label>
            <input
              type="checkbox"
              name="garage"
              id="garage"
              defaultChecked={formData.garage}
              className="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-gray-300 rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5"
            />
          </div>
          {/* STATUS */}
          <Select
            id="status"
            name="status"
            onValueChange={(value) => {
              const e = {
                target: {
                  name: "status",
                  value,
                },
              };
              console.log(e);
            }}
            defaultValue={formData.status}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                defaultValue={formData.status}
                placeholder="Elegir estado"
              />
            </SelectTrigger>
            <SelectContent
              onChange={(e) => {
                console.log(e);
              }}
            >
              <SelectGroup>
                <SelectLabel>Estado</SelectLabel>
                <SelectItem value="available">Disponible</SelectItem>
                <SelectItem value="sold">Vendido</SelectItem>
                <SelectItem value="rented">Rentado</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label className="text-lg font-bold" htmlFor="size">
            Metros cuadrados:
          </Label>

          <Input
            onChange={handleChange}
            className="max-w-[250px]"
            min={0}
            value={formData.size.toString()}
            id="size"
            name="size"
            type="number"
          />
        </div>
      </div>
      <SheetFooter>
        <Button onClick={handleSubmit} type="submit">
          Guardar Cambios
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}

export default UpdateDataProperty;
