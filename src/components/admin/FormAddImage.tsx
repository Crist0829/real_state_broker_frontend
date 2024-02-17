import { ImagePlus } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { Button } from "../ui/button";

import { INTIAL_VALUE_CREATE_IMAGE } from "./UpdateImagesProperty";
import { ImgPreview } from "@/types";
import { ChangeEvent, Dispatch } from "react";

interface Props {
  imagePreview: ImgPreview;
  setImagePreview: Dispatch<ImgPreview>;
  description: string;
  setDescription: Dispatch<string>;
  handleSubmit: () => void;
  handleChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormAddImage({
  setImagePreview,
  imagePreview,
  description,
  setDescription,
  handleSubmit,
  handleChangeFile,
}: Props) {
  return (
    <div>
      <Label htmlFor="description" className="">
        Descripción
      </Label>
      <div className="flex gap-3 items-center">
        {/* --DESCRIPTION */}
        <Input
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          id="description"
          type="text"
          placeholder="Baño principal"
          className="col-span-3"
        />
        {/* --END DESCRIPTION */}
        {/* --INPUT FILE--- */}
        <Label
          htmlFor="multimedia"
          className={`w-min border p-3 rounded-md bg-zinc-700/10 cursor-pointer  hover:bg-zinc-50 dark:hover:bg-zinc-700/30 transition `}
        >
          <ImagePlus />
          <Input
            onChange={handleChangeFile}
            id="multimedia"
            name="multimedia"
            type="file"
            className="hidden"
          />
        </Label>
      </div>
      {/*END  INPUT FILE */}

      {/* ENVIAR INFORMACIÓN */}
      {imagePreview !== INTIAL_VALUE_CREATE_IMAGE && (
        <div className="flex items-center gap-3 justify-between mt-3">
          <Button
            onClick={() => {
              setDescription("");
              setImagePreview(INTIAL_VALUE_CREATE_IMAGE);
            }}
            className="animate-fade-in"
            variant="destructive"
          >
            Cancelar
          </Button>

          <Button
            onClick={handleSubmit}
            type="submit"
            className="animate-fade-in"
          >
            Guardar
          </Button>
        </div>
      )}
    </div>
  );
}

export default FormAddImage;
