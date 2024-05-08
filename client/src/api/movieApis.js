import axios from "axios";
const url = import.meta.env.VITE_BACKEND_APP_URI;

const formDataconfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

// Login API
export const creteMovie = async (movieData) => {
  try {
    const { data } = await axios.post(
      `${url}/movie/create`,
      movieData,
      formDataconfig
    );
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};
