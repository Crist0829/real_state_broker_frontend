import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AuthLayout from "@/layouts/AuthLayout";
import axios from "@/lib/axiosConfig";
import { useAuthenticate } from "@/store/useAuthenticate";
import { createPropertySchema } from "@/validations/properties";
import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";

const INITIAL_VALUE = {
  name: "",
  description: "",
  location: "",
  floors: "",
  livingrooms: "",
  bathrooms: "",
  kitchens: "",
  bedrooms: "",
  garage: false,
  status: "available",
};
function Create() {
  const { user } = useAuthenticate();

  const [data, setData] = useState(INITIAL_VALUE);

  const formRef = useRef(null);

  async function handleSubmit() {
    console.log(data);
    try {
      const dataValidated = createPropertySchema.parse(data);
      const res = await axios.post("/properties/store", dataValidated);
      console.log(res);
      if (res.status === 200) {
        toast.success("Inmueble añadido correctamente");
        setData(INITIAL_VALUE);

        formRef.current.reset();
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const msg = error.issues[0].message;
        toast.error(msg);
      }
      if (error instanceof AxiosError) {
        const msg = Object.values(error.response?.data.errores)[0][0];
        toast.error(msg);
      }
    }
  }

  function handleChange(
    e: any
    /* | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEventHandler<HTMLTextAreaElement> */
  ) {
    setData((old) => ({
      ...old,
      [e.target.name]:
        e.target.name === "garage" ? e.target.checked : e.target.value,
    }));
  }

  return (
    <AuthLayout>
      <h1 className="">Añade un inmueble</h1>
      <section className="w-full ">
        <Card className="  w-full lg:max-w-[500px]  border-none bg-transparent">
          <CardHeader>
            <CardTitle>Añadir nuevo inmueble</CardTitle>
            <CardDescription>
              Este inmueble pertenece a {user?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="w-full space-y-3 items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-lg font-bold" htmlFor="name">
                    Nombre
                  </Label>
                  <small className="text-xs">
                    Trate de que sea un nombre breve.
                  </small>
                  <Input
                    onChange={handleChange}
                    id="name"
                    name="name"
                    className="w-full"
                    placeholder="Colpatría"
                  />
                </div>

                <div className="flex flex-col space-y-1.5   max-h-[300px] ">
                  <Label className="text-lg font-bold" htmlFor="description">
                    Descripción
                  </Label>
                  <small className="text-xs">Describe detalladamente</small>
                  {/* input to description */}
                  <Textarea
                    onChange={handleChange}
                    placeholder="Edificio más grande de la ciudad de Bogota"
                    className="resize-none"
                    name="description"
                    id="description"
                    maxLength={200}
                  />
                  {/* end input to description */}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-lg font-bold" htmlFor="location">
                    Ubicación
                  </Label>

                  <Input
                    onChange={handleChange}
                    id="location"
                    name="location"
                    placeholder="Rivadavia, Mendoza , Argentina"
                  />
                </div>

                {/* Cantidad */}
                <h3 className="text-lg font-bold">Cantidad de: </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4  items-center gap-5">
                  <Label htmlFor="floors">
                    <small className="text-sm  uppercase text-center block">
                      pisos
                    </small>
                    <Input
                      min={0}
                      onChange={handleChange}
                      name="floors"
                      type="number"
                      id="floors"
                    />
                  </Label>

                  <Label htmlFor="livingrooms">
                    <small className="text-sm  uppercase text-center block">
                      livings
                    </small>
                    <Input
                      onChange={handleChange}
                      min={0}
                      type="number"
                      id="livingrooms"
                      name="livingrooms"
                    />
                  </Label>

                  <Label htmlFor="bathrooms">
                    <small className="text-sm  uppercase text-center block">
                      baños
                    </small>
                    <Input
                      onChange={handleChange}
                      name="bathrooms"
                      min={0}
                      type="number"
                      id="bathrooms"
                    />
                  </Label>
                  <Label htmlFor="kitchens">
                    <small className="text-sm  uppercase text-center block ">
                      Cocinas
                    </small>
                    <Input
                      onChange={handleChange}
                      min={0}
                      type="number"
                      name="kitchens"
                      id="kitchens"
                    />
                  </Label>
                  <Label htmlFor="bedrooms">
                    <small className="text-sm  uppercase text-center block ">
                      dormitorios
                    </small>
                    <Input
                      onChange={handleChange}
                      min={0}
                      type="number"
                      name="bedrooms"
                      id="bedrooms"
                    />
                  </Label>
                </div>

                <div className="flex items-center ml-auto mr-5 my-2 gap-3">
                  <Label className="text-lg font-bold" htmlFor="garage">
                    Tiene garage
                  </Label>
                  <Input
                    type="checkbox"
                    className="w-4 "
                    onChange={handleChange}
                    name="garage"
                    id="garage"
                  />

                  <fieldset>
                    <legend>Estado</legend>
                    <select
                      className="text-black"
                      onChange={handleChange}
                      defaultValue="available"
                      defaultChecked
                      name="status"
                      id="status"
                    >
                      <option value="available">Disponible</option>
                      <option value="sold">Vendido</option>
                      <option value="rented">Rentado</option>
                    </select>
                  </fieldset>
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancelar</Button>
            <Button onClick={handleSubmit}>Guardar</Button>
          </CardFooter>
        </Card>
      </section>
    </AuthLayout>
  );
}

export default Create;
