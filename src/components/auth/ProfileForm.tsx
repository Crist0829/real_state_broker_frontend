import { useAuthenticate } from "@/store/useAuthenticate";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "@/lib/axiosConfig";
import { toast } from "sonner";
import { AxiosError } from "axios";

const ProfileForm = () => {
  interface User {
    name: string | undefined;
    email: string | undefined;
  }

  const user = useAuthenticate((state) => state.user);
  const setAuthenticate = useAuthenticate((state) => state.setAuthenticate);
  const [userForm, setUserForm] = useState<User>({
    name: user?.name,
    email: user?.email,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put("/user/update/" + user?.id, userForm);

      if (response.status === 200) {
        toast.success("La información se actualizó correctamente");
        const userAuthenticated = await axios.get("/user");
        setAuthenticate(userAuthenticated.data);
      }

      if (response.status === 204) {
        toast.success("No se realizó ningún cambio");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message ||
            "Ha ocurrido un error al editar la información"
        );
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Label className="my-1">
        Nombre:
        <Input
          type="text"
          name="name"
          value={userForm.name}
          onChange={handleChange}
        />
      </Label>

      <Label className="my-1">
        Correo:
        <Input
          type="email"
          name="email"
          value={userForm.email}
          onChange={handleChange}
        />
      </Label>
      <Button>Actualizar información</Button>
    </form>
  );
};

export default ProfileForm;
