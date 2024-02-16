import {
  SheetClose,
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
import { Textarea } from "../ui/textarea";
import { useState } from "react";

function UpdateDataProperty({ property }: { property: Property }) {

  const [formData, setFormData] = useState<Property>(property)


  return (
    <SheetContent side="right" className="h-screen container bg-slate-300">
      <SheetHeader>
        <SheetTitle><h2 className="text-lg">EDITANDO <strong className="text-xl"> {property.name}</strong> </h2></SheetTitle>
      </SheetHeader>
      <div className="grid gap-4 py-9">
        <div className="grid  md:grid-cols-4 md:items-center gap-2 md:gap-4">
          <Label htmlFor="name" className="text-left">
            Nombre
          </Label>
          <Input id="name" value={formData.name} className="col-span-3" />
        </div>

        <div className="grid  md:grid-cols-4 md:items-center gap-2 md:gap-4">
          <Label htmlFor="description" className="text-left">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            className="col-span-3 resize-none" 
          />
        </div>

        <div className="grid  md:grid-cols-4 md:items-center gap-2 md:gap-4">
          <Label htmlFor="location" className="text-left">
            Ubicación
          </Label>
          <Input
            id="location"
            value={formData.location}
            className="col-span-3"
          />
        </div>

        <div className="grid  md:grid-cols-4 md:items-center gap-2 md:gap-4">
          <Label htmlFor="location" className="text-left">
            Tamañao
          </Label>
          <Input
            min={0}
            name="size"
            type="number"
            value={formData.size.toString()}
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
              min={0}
              type="number"
              name="bedrooms"
              id="bedrooms"
              value={formData.bedrooms.toString()}
            />
          </Label>
        </div>

        <div className="flex items-center w-full justify-between ml-auto mr-5 my-2 gap-3">

          <div className="flex items-center justify-center">
            <label htmlFor="garage" className="mx-4"> Tiene garage </label>
	          <input
              type="checkbox"
              name="garage"
              id="garage"
              defaultChecked={formData.garage}
            className="appearance-none w-9 focus:outline-none checked:bg-blue-300 h-5 bg-gray-300 rounded-full before:inline-block before:rounded-full before:bg-blue-500 before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5"/>
        </div>

        <div className="dark:bg-gray-800">
          <fieldset>
            <legend className="text-center text-sm">Estado</legend>
            <select
                  className="dark:text-white bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 outline-none focus:outline-none focus:ring focus:border-blue-300"
                  name="status"
                  id="status"
                  defaultValue={formData.status}
                >
                  <option value="available">Disponible</option>
                  <option value="sold">Vendido</option>
                  <option value="rented">Rentado</option>
                </select>  
          </fieldset>      
        </div>

          
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Guardar Cambios</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}

export default UpdateDataProperty;
