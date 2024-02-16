export function toLocalePrice(price: number) {
  return price.toLocaleString("es-Ar", {
    style: "currency",
    currency: "ARS",
  });
}
