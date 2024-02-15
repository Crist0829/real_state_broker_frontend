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

function UpdateDataProperty({ property }: { property: Property }) {
  return (
    <SheetContent side="right" className="h-screen container">
      <SheetHeader>
        <SheetTitle>Edita {property.name}</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid  md:grid-cols-4 md:items-center gap-2 md:gap-4">
          <Label htmlFor="name" className="text-left">
            Nombre
          </Label>
          <Input id="name" placeholder={property.name} className="col-span-3" />
        </div>

        <div className="grid  md:grid-cols-4 md:items-center gap-2 md:gap-4">
          <Label htmlFor="description" className="text-left">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder={property.description}
            className="col-span-3 resize-none" 
          />
        </div>

        <div className="grid  md:grid-cols-4 md:items-center gap-2 md:gap-4">
          <Label htmlFor="location" className="text-left">
            Ubicación
          </Label>
          <Input
            id="location"
            placeholder={property.location}
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
              placeholder={property.floors.toString()}
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
              placeholder={property.livingrooms.toString()}
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
              placeholder={property.bathrooms.toString()}
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
              placeholder={property.kitchens.toString()}
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
              placeholder={property.bedrooms.toString()}
            />
          </Label>
        </div>

        <div className="flex items-center w-full justify-between ml-auto mr-5 my-2 gap-3">
          <Label
            className="text-lg font-bold flex items-center gap-2"
            htmlFor="garage"
          >
            Tiene garage
            <Input
              type="checkbox"
              checked={property.garage}
              className="w-4 "
              name="garage"
              id="garage"
            />
          </Label>

          <fieldset>
            <legend>Estado</legend>
            <select
              className="text-black"
              defaultValue={property.status}
              defaultChecked
              name="status"
              id="status"
            >
              <option value="available">Disponible</option>
              <option value="sold">Vendido</option>
              <option value="rented">Rentado</option>
            </select>
          </fieldset>
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}

export default UpdateDataProperty;
