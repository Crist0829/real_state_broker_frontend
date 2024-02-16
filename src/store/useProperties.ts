import axios from "@/lib/axiosConfig";
import { Property, ResponseData } from "@/types";
import { create } from "zustand";

interface State {
  responseData: ResponseData | null;
  properties: Property[];
  allProperties: Property[];
  loadingGetProperties: boolean;
  loadingGetAllProperties: boolean;
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
    allProperties: [],

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

    getAllProperties: async () => {
      set(() => ({ loadingGetAllProperties: true }));
      const res = await axios.get("/all-properties");
      set(() => ({
        loadingGetAllProperties: false,
        allProperties: res.data.properties.data,
        responseData: res.data.properties,
      }));
    },
  };
});
