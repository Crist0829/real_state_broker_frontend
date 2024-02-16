import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "../ui/carousel";

  import { Image } from '@/types';



const CarouselProperty = ({ images } : { images : Image[]}) => {
    return (
        <Carousel className="w-full  relative flex justify-center">
          <CarouselContent>
            {images.map((image : Image, index : number) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <img
                    alt=""
                    src={image.url}
                    className="h-56 w-full rounded-md object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute w-6/12 bottom-6">
            <CarouselPrevious className="left-0 bottom-0" />
            <CarouselNext className="right-0    bottom-0" />
          </div>
        </Carousel>
    )
}

export default CarouselProperty 