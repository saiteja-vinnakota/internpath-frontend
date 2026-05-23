import {
  useEffect,
  useState,
} from "react";

import toast
from "react-hot-toast";

import {
  getCurrentUser,
  updateUserProfile,
} from "../api/userApi";

function useUser() {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // FETCH USER
  const fetchUser =
    async () => {

      try {

        setLoading(true);

        const data =
          await getCurrentUser();

        setUser(data.data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

  // UPDATE PROFILE
  const updateProfile =
    async (formData) => {

      try {

        setLoading(true);

        const data =
          await updateUserProfile(
            formData
          );

        setUser(data.data);

        toast.success(
          "Profile updated successfully"
        );

        return data;

      } catch (err) {

        console.log(err);

        toast.error(

          err.response?.data
            ?.message ||

          "Failed to update profile"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchUser();

  }, []);

  return {

    user,

    loading,

    updateProfile,

    fetchUser,
  };
}

export default useUser;