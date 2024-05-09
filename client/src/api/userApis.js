import axios from "axios";
const url = import.meta.env.VITE_BACKEND_APP_URI;

const jsonconfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// Create User
export const CreateUserApi = async (userData) => {
  try {
    const { data } = await axios.post(
      `${url}/api/v1/user/create`,
      userData,
      jsonconfig
    );
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};
