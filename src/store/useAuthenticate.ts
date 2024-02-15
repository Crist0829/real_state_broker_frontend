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
}

export const useAuthenticate = create<State>((set) => {
  return {
    user: null,
    isAuthenticated: false,

    setAuthenticate: (user: User) =>
      set(() => ({
        user,
        isAuthenticated: true,
      })),

    logout: async () => {
      localStorage.removeItem("accessToken");
      const res = await axios.post("/logout");
      console.log(res);
      if (res.status === 204) {
        set(() => ({
          user: null,
          isAuthenticated: false,
        }));
      }
    },
  };
});
