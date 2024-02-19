import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

import { ImgPreview, Property } from "@/types";
import { Button, buttonVariants } from "../ui/button";
import { useState } from "react";
import { ImagePlusIcon } from "lucide-react";
import { toast } from "sonner";
import axios from "@/lib/axiosConfig";
import { getProperty } from "@/services/properties";
import { getMsgErrorResponse } from "@/helpers/getMsgErrorResponse";
import FormAddImage from "./FormAddImage";
import { fileReader } from "@/helpers/fileReader";
import CarouselProperty from "./CarouselProperty";

// eslint-disable-next-line react-refresh/only-export-components
export const INTIAL_VALUE_CREATE_IMAGE = {
  urlTemp: "",
  file: null,
};

function UpdateImagesProperty({ property }: { property: Property }) {
  const [images, setImages] = useState(property.images);
  const [imagePreview, setImagePreview] = useState<ImgPreview>(
    INTIAL_VALUE_CREATE_IMAGE
  );
  const [description, setDescription] = useState("");
  const [openCreate, setOpenCreate] = useState(false);

  async function handleSubmit() {
    const data = {
      description,
      image: imagePreview.file,
    };
    try {
      const res = await axios.post(
        `/property/uploadImage/${property.id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        toast.success("Imagen agregada correctamente");
        const currentProperty = await getProperty(property.id);
        setImages(currentProperty.data.property.images);
        setImagePreview(INTIAL_VALUE_CREATE_IMAGE);
        setOpenCreate(false);
      }
    } catch (error : any) {
      const errorMsg = getMsgErrorResponse(error)
      errorMsg && toast.error(errorMsg)
    }
  }

  async function handleDelete(id: number) {
    try {
      const { status } = await axios.delete(`property/image/${id}`);
      if (status === 204 || status === 200) {
        toast.success("Elimnado correctamente");
        const currentProperty = await getProperty(property.id);
        setImages(currentProperty.data.property.images);
      }
    } catch (error : any) {
      const errorMsg = getMsgErrorResponse(error)
      errorMsg && toast.error(errorMsg)
    }
  }

  /* HANDLE CHANGE IMAGE */
  async function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) return;
    const file = e.target.files[0];
    if (!file.type.startsWith("image")) {
      return toast.warning("Solo con esta extensión: .gif, .jpg, .png, .jpeg");
    }
    if (file.size > 3 * 1024 * 1024)
      return toast.warning("El archivo debe pesar menos de 3MB");
    const urlTemp = await fileReader(file);
    setImagePreview({
      file,
      urlTemp,
    });
  }

  return (
    <SheetContent
      side="top"
      className="h-screen flex flex-col shadow-2xl  overflow-auto gap-0 bg-neutral-300 dark:bg-transparent"
    >
      <SheetHeader>
        <SheetTitle className="text-3xl text-center">
          Edita las imagenes de tu inmueble {property.name}
        </SheetTitle>
        <SheetDescription className="text-lg text-center">
          <h2>{images.length === 0 && "Todavia no tiene imagenes"}</h2>
          <p>Por favor que sean imagenes con un aspect radio 16/9</p>
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col items-center ">
        <div className=" flex flex-col gap-2  p-2 w-full max-w-xs">
          <Button
            variant={openCreate ? "secondary" : "outline"}
            onClick={() => {
              setOpenCreate(!openCreate);
            }}
          >
            {openCreate ? "Cerrar" : "Agregar"}
          </Button>

          <div
            className={
              openCreate
                ? "animate-fade-in-down duration-150"
                : "animate-fade-out-up duration-75"
            }
          >
            <FormAddImage
              description={description}
              handleSubmit={handleSubmit}
              imagePreview={imagePreview}
              setDescription={setDescription}
              setImagePreview={setImagePreview}
              handleChangeFile={handleChangeFile}
            />
          </div>
        </div>
      </div>
      {/* Carousel con las imagenes  */}
      {!openCreate && (
        <CarouselProperty images={images} handleDelete={handleDelete} />
      )}

      {/* Show preview images */}
      {openCreate && (
        <figure className="animate-fade-in-down aspect-video border-dashed border-2 w-full h-full  max-w-5xl mx-auto relative">
          {imagePreview !== INTIAL_VALUE_CREATE_IMAGE ? (
            <img
              src={imagePreview.urlTemp}
              className="object-cover w-full h-full aspect-video animate-fade-in-up "
              alt="Vista previa de la imagen"
            />
          ) : (
            <label
              htmlFor="image"
              className="w-full h-full border absolute top-0 bottom-0 right-0 left-0"
            >
              <input
                onChange={handleChangeFile}
                id="image"
                name="image"
                type="file"
                className="absolute top-0 bottom-0 right-0 left-0 opacity-0"
              />
              {imagePreview.file === null && (
                <div
                  className={`${buttonVariants({
                    variant: "secondary",
                  })} w-full h-full p-2 `}
                >
                  <ImagePlusIcon className="size-16" />
                </div>
              )}
            </label>
          )}
        </figure>
      )}
    </SheetContent>
  );
}

export default UpdateImagesProperty;
