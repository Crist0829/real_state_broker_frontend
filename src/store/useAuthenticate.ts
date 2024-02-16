import axios from "@/lib/axiosConfig";
import { create } from "zustand";

interface User {
  created_at: string;
  email: string;
  id: number;
  name: string;
  updated_at: string;
  email_verefied_at: string | null;
}

interface State {
  user: User | null;
  isAuthenticated: boolean;
  setAuthenticate: (user: User) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  deleteAuthenticate: () => void;
}

export const useAuthenticate = create<State>((set) => {
  return {
    user: null,
    isAuthenticated: false,

    csrf: async () => {
      axios.get("/sanctum/csrf-cookie");
    },

    setAuthenticate: (user: User) =>
      set(() => ({
        user,
        isAuthenticated: true,
      })),

    deleteAuthenticate: () =>
      set(() => ({
        user: null,
        isAuthenticated: false,
      })),

    checkAuth: async () => {
      try {
        const res = await axios.get("/api/user");
        if (res.status === 200 || res.status === 204) {
          set(() => ({
            user: res.data,
            isAuthenticated: true,
          }));
        }
      } catch (e) {
        if (e.response === 401) {
          set(() => ({
            user: null,
            isAuthenticated: false,
          }));
        }
      }
    },

    logout: async () => {
      const res = await axios.post("/logout");

      if (res.status === 204) {
        set(() => ({
          user: null,
          isAuthenticated: false,
        }));
      }
    },
  };
});
