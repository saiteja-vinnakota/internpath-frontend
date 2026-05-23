import api from "./index";

// LOGIN
export const loginUser =
  async (formData) => {

    const response =
      await api.post(
        "/auth/login",
        formData
      );

    return response.data;
  };

// REGISTER
export const registerUser =
  async (formData) => {

    const response =
      await api.post(
        "/auth/register",
        formData
      );

    return response.data;
  };

// GET PROFILE
export const getProfile =
  async () => {

    const response =
      await api.get(
        "/auth/me"
      );

    return response.data;
  };