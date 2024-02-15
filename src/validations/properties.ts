import { z } from "zod";

export const createPropertySchema = z.object({
  name: z.string().nonempty("El nombre no puede estar vacío"),
  description: z.string().nonempty("La descripción no puede estar vacía"),
  location: z.string().nonempty("La ubicación no puede estar vacía"),
  floors: z.string().nonempty("El número de pisos no puede estar vacío"),
  livingrooms: z
    .string()
    .nonempty("El número de salas de estar no puede estar vacío"),
  bathrooms: z.string().nonempty("El número de baños no puede estar vacío"),
  kitchens: z.string().nonempty("El número de cocinas no puede estar vacío"),
  bedrooms: z
    .string()
    .nonempty("El número de dormitorios no puede estar vacío"),
  garage: z.boolean(),
  status: z.enum(["available", "sold", "rented"], {
    invalid_type_error:
      "El estado debe ser 'disponible', 'vendido' o 'rentado'",
  }),
});
