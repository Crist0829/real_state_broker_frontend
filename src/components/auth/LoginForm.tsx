import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "../../lib/axiosConfig";
import { loginUserSchema } from "@/validations/user";
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
import { useAuthenticate } from "@/store/useAuthenticate";
import { Link, useNavigate } from "react-router-dom";
import PrincipalLayout from "@/layouts/PrincipalLayout";
import { toast } from "sonner";

interface User {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const setAuthenticate = useAuthenticate((state) => state.setAuthenticate);
  const isAuthenticated = useAuthenticate((state) => state.isAuthenticated);

  useEffect(() => {
    isAuthenticated && navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
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
      /* const csrf = () => axios.get("/sanctum/csrf-cookie");
      await csrf(); */
      const userValidated = loginUserSchema.parse(user);
      const response = await axios.post("/login", userValidated);
      localStorage.setItem('token', response.data.token)
      if (response.status === 204 || response.status === 200) {
        const userAuthenticated = await axios.get("/user");
        toast.success("Inicio de sesión correcto");
        setAuthenticate(userAuthenticated.data);
        navigate("/dashboard");
      }
      setUser({
        email: "",
        password: "",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(
          error.response?.data.message ||
            "Ha ocurrido un error al registrar al usuario"
        );
      }
      if (error instanceof ZodError) {
        const msg = error.issues[0].message;
        return alert(msg);
      }
    }
  };

  return (
    <PrincipalLayout>
      <Card className="w-[400px] mx-auto dark:bg-zinc-900/30 animate-fade-in">
        <CardHeader className="flex justify-between flex-row">
          <CardTitle>Inicia Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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

            <Button>Iniciar sesión</Button>
          </form>
        </CardContent>
        <CardFooter className=" justify-end">
          <small className="flex gap-2 items-center">
            No tienes una cuenta?{" "}
            <Link
              to="/register"
              className={` opacity-75 underline hover:scale-105 transition`}
            >
              Crea una cuenta
            </Link>
          </small>
        </CardFooter>
      </Card>
    </PrincipalLayout>
  );
};

export default LoginForm;
