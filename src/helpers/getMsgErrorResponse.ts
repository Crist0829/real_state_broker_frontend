import { AxiosError } from "axios";
import { ZodError } from "zod";

/* Si no es de validación de zod ni de respuesta de axios entonces de vuelve false algo poco probable */
export function getMsgErrorResponse(error: ZodError | AxiosError) {
  if (error instanceof ZodError) {
    return error.issues[0].message;
  }
  if (error instanceof AxiosError) {
    return Object.values(error.response?.data.errores)[0][0];
  }
  return false;
}
