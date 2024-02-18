import { Price } from "@/types";
import { typesPrice } from "../constants/typePrices";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { toLocalePrice } from "@/helpers/toLocalePrice";

function SectionPrices({ prices }: { prices: Price[] }) {
  return (
    <div>
      {prices.length === 0 ? (
        <div className="flex gap-3 items-center">
          <p className="text-lg text-zinc-500">
            Todavia no se han actualizaco los precios
          </p>
        </div>
      ) : (
        <>
          <small className="text-sm opacity-55">Precios</small>
          {prices.map((price) => {
            return (
              <div key={price.created_at} className="p-5 shadow border-t">
                <h2 className="text-lg font-bold"> {price.name}</h2>
                <div className="justify-between flex items-center gap-3 ">
                  <p className="text-pretty">{price.description}</p>

                  <div className="flex gap-3">
                    <span className="border p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900">
                      {typesPrice[price.type] || price.type}
                    </span>
                    <Button className="flex items-center gap-3">
                      {toLocalePrice(price.price)}
                      <ShoppingCart />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default SectionPrices;
