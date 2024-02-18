import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "../../lib/axiosConfig";
import { createUserSchema } from "@/validations/user";
import { ZodError } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import PrincipalLayout from "@/layouts/PrincipalLayout";
import { useAuthenticate } from "@/store/useAuthenticate";
import { toast } from "sonner";
// import { useAuthenticate } from "@/store/useAuthenticate";

interface User {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterUser: React.FC = () => {
  const navigate = useNavigate();

  const setAuthenticate = useAuthenticate((state) => state.setAuthenticate);
  const isAuthenticated = useAuthenticate((state) => state.isAuthenticated);

  useEffect(() => {
    isAuthenticated && navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
   

    try {
      const csrf = () => axios.get("/sanctum/csrf-cookie");
      await csrf();
      const userValidated = createUserSchema.parse(user);
      const response = await axios.post("/register", userValidated);
      if (response.status === 204) {
        const userAuthenticated = await axios.get("/api/user");
        setAuthenticate(userAuthenticated.data);
        navigate("/dashboard");
      }

      setUser({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
       
        toast.error(
          error.response?.data.message ||
            "Ha ocurrido un error al registrar al usuario"
        );
      }
      if (error instanceof ZodError) {
        const msg = error.issues[0].message;
        return toast.error(msg);
      }

      // console.error("Error al registrar usuario", error.response.data);
    }
  };

  return (
    <PrincipalLayout>
      <Card className="w-[400px] mx-auto dark:bg-zinc-900/30 animate-fade-in">
        <CardHeader className="flex justify-between flex-row">
          <CardTitle>Registro de Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <Label>
              Nombre:
              <Input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </Label>

            <Label>
              Correo:
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </Label>

            <Label>
              Contraseña:
              <Input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </Label>

            <Label>
              Confirmar Contraseña:
              <Input
                type="password"
                name="password_confirmation"
                value={user.password_confirmation}
                onChange={handleChange}
              />
            </Label>

            <Button>Registrar</Button>
          </form>
        </CardContent>
        <CardFooter>
          <small className="flex gap-2 items-center">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className={`opacity-75 underline hover:scale-105 transition`}
            >
              Inicia sesión
            </Link>
          </small>
        </CardFooter>
      </Card>
    </PrincipalLayout>
  );
};

export default RegisterUser;
