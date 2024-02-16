import axios from "@/lib/axiosConfig";

export const getProperty = async (id: number) => {
  try {
    return await axios.get("/property/" + id);
  } catch (error) {
    return Promise.reject(error);
  }
};
