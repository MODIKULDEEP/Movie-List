import axios from "axios";
const url = import.meta.env.VITE_BACKEND_APP_URI;

const jsonconfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
const formDataconfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

// Login API
export const loginApi = async (loginCred) => {
  try {
    const { data } = await axios.post(
      `${url}/api/v1/auth/login`,
      loginCred,
      jsonconfig
    );
    if (data.success) {
      localStorage.setItem("token", data.data.token);
    }
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};

// Logout Api
export const logoutApi = async () => {
  try {
    const { data } = await axios.get(`${url}/api/v1/auth/logout`, jsonconfig);
    if (data.success) {
      localStorage.setItem("token", "");
    }
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};
