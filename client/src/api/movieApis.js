import axios from "axios";
const url = import.meta.env.VITE_BACKEND_APP_URI;

const formDataconfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

const jsonconfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// create Movie API
export const creteMovie = async (movieData) => {
  try {
    const { data } = await axios.post(
      `${url}/api/v1/movie/create`,
      movieData,
      formDataconfig
    );
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};

// update Movie API
export const updateMovie = async (movieData) => {
  console.log(movieData);
  try {
    const { data } = await axios.post(
      `${url}/api/v1/movie/update`,
      movieData,
      jsonconfig
    );
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};

// get Movies Api
export const getMovie = async () => {
  try {
    const { data } = await axios.get(
      `${url}/api/v1/movie/getMovies`,
      jsonconfig
    );
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};

// delete Movie Api
export const deleteMovie = async (movieID) => {
  try {
    const { data } = await axios.delete(
      `${url}/api/v1/movie/delete?id=${movieID}`,
      jsonconfig
    );
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};
