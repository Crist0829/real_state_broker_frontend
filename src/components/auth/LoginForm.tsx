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
import { Loader } from "lucide-react";

interface User {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const setAuthenticate = useAuthenticate((state) => state.setAuthenticate);
  const isAuthenticated = useAuthenticate((state) => state.isAuthenticated);

  const [loadingLogin, setLoadingLogin] = useState(false);

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
    setLoadingLogin(true);
    try {
      /* const csrf = () => axios.get("/sanctum/csrf-cookie");
      await csrf(); */
      const userValidated = loginUserSchema.parse(user);
      const response = await axios.post("/login", userValidated);
      localStorage.setItem("token", response.data.token);
      if (response.status === 204 || response.status === 200) {
        const userAuthenticated = await axios.get("/user");
        toast.success("Inicio de sesión correcto");
        setAuthenticate(userAuthenticated.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
        toast.error("Ha ocurrido un error al iniciar sesión");
      }
      if (error instanceof ZodError) {
        const msg = error.issues[0].message;
        toast.error(msg);
      }
    } finally {
      setLoadingLogin(false);
      setUser({
        email: "",
        password: "",
      });
    }
  };

  return (
    <PrincipalLayout className=" border  flex items-center justify-center">
      <Card className="max-w-[400px] w-11/12  mx-auto dark:bg-zinc-900/30 animate-fade-in">
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

            <Button disabled={loadingLogin}>
              {loadingLogin ? (
                <Loader className="animate-spin-clockwise animate-iteration-count-infinite" />
              ) : (
                "Iniciar sesión"
              )}
            </Button>
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
