import axios from "@/lib/axiosConfig";
import { create } from "zustand";
import { User, State } from "@/types";

export const useAuthenticate = create<State>((set) => {
  return {
    user: null,
    isAuthenticated: false,
    loading: true,

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
      } finally {
        set(() => ({
          loading: false,
        }));
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
