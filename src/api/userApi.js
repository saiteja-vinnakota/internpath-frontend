import api from "./index";

// GET CURRENT USER
export const getCurrentUser = async () => {
  const response = await api.get("/users/me");

  return response.data;
};

// UPDATE USER PROFILE
export const updateUserProfile = async (formData) => {
  const response = await api.put("/users/me", formData);

  return response.data;
};

// UPLOAD PROFILE PICTURE
export const uploadProfilePicture = async (file) => {
  const formData = new FormData();

  formData.append("profilePicture", file);

  const response = await api.post("/users/upload-profile-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
