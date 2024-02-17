import { useAuthenticate } from "@/store/useAuthenticate";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import axios from "@/lib/axiosConfig";
import { AxiosError } from "axios";

const ChangePasswordForm = () => {
  const user = useAuthenticate((state) => state.user);

  interface ChangePassword {
    old_password: string;
    password: string;
    password_confirmation: string;
  }

  const [changePassword, setChangePassword] = useState<ChangePassword>({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const csrf = () => axios.get("/sanctum/csrf-cookie");
      await csrf();

      const response = await axios.put(
        "/user/updatePassword/" + user.id,
        changePassword
      );

      if (response.status === 200) {
        toast.success("La contraseña se actualizó correctamente");
      }

      if (response.status === 204) {
        toast.success("No puede elegir la misma contraseña");
      }
    } catch (error) {
      toast.error("Ocurrió un problema, por favor verifique los datos");
      if (error instanceof AxiosError) {
        alert(
          error.response?.data.message ||
            "Ha ocurrido un error al editar la información"
        );
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Label>
        Contraseña actual:
        <Input
          className="mt-2"
          type="password"
          name="old_password"
          onChange={handleChange}
        />
      </Label>


      <Label>
        Nueva Contraseña:
        <Input
          className="mt-2"
          type="password"
          name="password"
          onChange={handleChange}
        />
      </Label>

      <Label>
        Confirmar Nueva Contraseña:
        <Input
          className="mt-2"
          type="password"
          name="password_confirmation"
          onChange={handleChange}
        />
      </Label>

      <Button>Actualizar Contraseña</Button>
    </form>
  );
};

export default ChangePasswordForm;
