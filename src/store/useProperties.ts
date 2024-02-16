import axios from "@/lib/axiosConfig";
import { Property, ResponseData } from "@/types";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";

interface State {
  responseData: ResponseData | null;
  properties: Property[];
  allProperties: ResponseData | null;
  loadingGetProperties: boolean;
  loadingGetAllProperties: boolean;
  currentPage : number
  setProperties: () => void;
  getProperties: () => Promise<void>;
  getAllProperties: () => Promise<void>;
}

export const useProperties = create<State>((set) => {

  return {

    properties: [],
    loadingGetProperties: false,
    loadingGetAllProperties: false,
    responseData: null,
    allProperties: null,

    setProperties: () => {},

    getProperties: async () => {
      set(() => ({ loadingGetProperties: true }));  
      try {
        const res = await axios.get("/properties");
        set(() => ({
          loadingGetProperties: false,
          properties: res.data.properties.data,
          responseData: res.data.properties,
        }));
      } catch (error) {
        set(() => ({ loadingGetProperties: false, properties: [] }));
        if (error instanceof AxiosError) {
          if (error.code === "ERR_NETWORK")
            toast.error(
              "La conexión al servidor ha fallado, intentelo más tarde",
              {
                position: "top-center",
              }
            );
        }
      }
    },

    getAllProperties: async () => {
      try {
        set(() => ({ loadingGetAllProperties: true }));
        const res = await axios.get("/all-properties");
        set(() => ({
          loadingGetAllProperties: false,
          allProperties: res.data.properties,
          currentPage : res.data.properties.current_page
        }));
      } catch (error) {
        set(() => ({ loadingGetAllProperties: false }));
        if (error instanceof AxiosError) {
          if (error.code === "ERR_NETWORK")
            toast.error(
              "La conexión al servidor ha fallado, intentelo más tarde",
              {
                position: "top-center",
              }
            );
        }
      }
    },
  };
});
