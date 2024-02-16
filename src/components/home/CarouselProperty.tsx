import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { Image } from "@/types";

const imagesDefault = [
  "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  "https://img.freepik.com/free-photo/stylish-scandinavian-living-room-with-design-mint-sofa-furnitures-mock-up-poster-map-plants-eleg_1258-152143.jpg?w=1800&t=st=1708012763~exp=1708013363~hmac=8e1085078b6d6bf8427dcf1429b40595100ffa2e3ba5734a8f0906ced0cc2986",
];

const CarouselProperty = ({ images }: { images: Image[] }) => {
  console.log({images});
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full  relative flex justify-center"
    >
      <CarouselContent>
        {images.map((image: Image, index: number) => (
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
  );
};

export default CarouselProperty;
