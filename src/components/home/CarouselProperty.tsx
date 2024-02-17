import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { Image } from "@/types";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

const CarouselProperty = ({
  images,
  withAutoplay = false,
  handleDelete,
  ...props
}: {
  images: Image[];
  withAutoplay?: boolean;
  handleDelete?: (id: number) => void;
}) => {
  return (
    <Carousel
      plugins={withAutoplay ? [Autoplay({ delay: 5000 })] : []}
      {...props}
      className="w-full max-w-5xl animate-fade-in mx-auto"
    >
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="p-1 relative">
              <Card className="border-none bg-transparent">
                {handleDelete && (
                  <Button
                    onClick={() => {
                      handleDelete(img.id);
                    }}
                    variant="secondary"
                    className="absolute right-0 p-0 w-10 h-8"
                  >
                    <Trash width={15} />
                  </Button>
                )}
                <CardContent className="flex bg-rose aspect-video items-center justify-center p-6">
                  <figure className=" h-min">
                    <img className="aspect-auto" src={img.url} />
                  </figure>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {images.length > 1 && (
        <>
          <CarouselPrevious className="left-5" />
          <CarouselNext className="right-5" />
        </>
      )}
    </Carousel>
  );
};

export default CarouselProperty;
