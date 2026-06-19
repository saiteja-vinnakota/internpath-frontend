import { useState } from "react";

import { showToast } from "../utils/toastService";

import { TOAST_MESSAGES } from "../constants/toastMessages";

import { updateUserProfile } from "../api/userApi";

import { useAuth } from "../context/AuthContext";

function useUser() {
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  // UPDATE PROFILE
  const updateProfile = async (formData) => {
    try {
      setLoading(true);

      const data = await updateUserProfile(formData);

      // UPDATE GLOBAL AUTH USER
      setUser(data.data);

      showToast.success("Profile updated successfully");

      return data;
    } catch (err) {
      console.log(err);

      showToast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    updateProfile,
  };
}

export default useUser;
