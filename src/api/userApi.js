import api from "./index";

// GET CURRENT USER
export const getCurrentUser =
  async () => {

    const response =
      await api.get(
        "/users/me"
      );

    return response.data;
  };

// UPDATE USER PROFILE
export const updateUserProfile =
  async (formData) => {

    const response =
      await api.put(
        "/users/me",
        formData
      );

    return response.data;
  };