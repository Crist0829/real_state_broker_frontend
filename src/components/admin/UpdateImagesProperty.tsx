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

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function UpdateImagesProperty({ property }: { property: Property }) {
  return (
    <SheetContent side="top" className="h-screen flex flex-col shadow-2xl container ">
      <SheetHeader>
        <SheetTitle>
          Edita las imagenes de tu inmueble {property.name}
        </SheetTitle>
        <SheetDescription>Imagenes con una aspect radio 16/9</SheetDescription>
      </SheetHeader>
      <div className="flex flex-col items-center ">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nombre
          </Label>
          <Input
            id="name"
            type="file"
            placeholder={property.name}
            className="col-span-3"
          />
        </div>

        {/* Carousel con la vista previa de las imagenes */}

        <Carousel className="w-full max-w-2xl ">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="mx-auto" >
                <div className="p-1">
                  <Card className="aspect-video border " >
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}

export default UpdateImagesProperty;
