import { z } from "zod";

export const createPropertySchema = z.object({
  name: z.string().min(1, "El nombre no puede estar vacío"),
  description: z
    .string()
    .min(1, "La descripción no puede estar vacía")
    .max(250, "La descripción no puede tener más de 250 caracteres"),
  location: z.string().min(1, "La ubicación no puede estar vacía"),
  floors: z.string().min(1, "El número de pisos no puede estar vacío"),
  livingrooms: z
    .string()
    .min(1, "El número de salas de estar no puede estar vacío"),
  bathrooms: z.string().min(1, "El número de baños no puede estar vacío"),
  kitchens: z.string().min(1, "El número de cocinas no puede estar vacío"),
  bedrooms: z.string().min(1, "El número de dormitorios no puede estar vacío"),
  garage: z.boolean(),
  status: z.enum(["available", "sold", "rented"], {
    invalid_type_error:
      "El estado debe ser 'disponible', 'vendido' o 'rentado'",
  }),
});
