import { AxiosError } from "axios";
import { ZodError } from "zod";

interface ErrorResponse {
  errores?: Record<string, string[]>;
  // Otros campos según tu estructura de respuesta
}


//Lista los errores 
const statusCodeMessages: { [key: number]: string } = {
  404: "No encontrado",
  401: "No autorizado",
};

export function getMsgErrorResponse(error: ZodError | AxiosError<ErrorResponse>): string | boolean {
  if (error instanceof ZodError) {
    return error.issues[0].message;
  }

  if (error instanceof AxiosError) {
    if (error.response && error.response.status) {
      return statusCodeMessages[error.response.status] || "Ha ocurrido un error"; 
    }
    return "Ha ocurrido un error";
  }

  return false;
}