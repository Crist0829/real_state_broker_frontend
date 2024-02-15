import axios from "@/lib/axiosConfig";
import { Property, ResponseData } from "@/types";
import { create } from "zustand";

interface State {
  responseData: ResponseData | null;
  properties: Property[];
  loadingGetProperties: boolean;
  setProperties: () => void;
  getProperties: () => Promise<void>;
}

export const useProperties = create<State>((set) => {
  return {
    properties: [],
    loadingGetProperties: false,
    responseData: null,

    setProperties: () => {},

    getProperties: async () => {
      set(() => ({ loadingGetProperties: true }));
      const res = await axios.get("/properties");

      set(() => ({
        loadingGetProperties: false,
        properties: res.data.properties.data,
        responseData: res.data.properties,
      }));
    },
  };
});
