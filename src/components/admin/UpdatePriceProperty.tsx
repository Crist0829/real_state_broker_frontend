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

function UpdatePriceProperty({ property }: { property: Property }) {
  return (
    <SheetContent side="left" className="h-screen container">
      <SheetHeader>
        <SheetTitle>Edita el precio de tu inmueble {property.name}</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nombre
          </Label>
          <Input id="name" placeholder={property.name} className="col-span-3" />
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

export default UpdatePriceProperty;
