import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  loginUser,
  registerUser,
  getProfile,
} from "../api/authApi";

function useAuth() {

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [user, setUser] =
    useState(null);

  // LOGIN
  const login = async (
    formData
  ) => {

    try {

      setLoading(true);

      const data =
        await loginUser(
          formData
        );

      // STORE TOKEN
      localStorage.setItem(
        "token",
        data.token
      );

      // STORE USER
      setUser(data.user);

      toast.success(
        "Login successful"
      );

      // REDIRECT
      navigate(
        "/student/dashboard"
      );

      return data;

    } catch (err) {

      toast.error(

        err.response?.data
          ?.message ||

        "Login failed"
      );

      throw err;

    } finally {

      setLoading(false);
    }
  };

  // REGISTER
  const register = async (
    formData
  ) => {

    try {

      setLoading(true);

      const data =
        await registerUser(
          formData
        );

      // STORE TOKEN
      localStorage.setItem(
        "token",
        data.token
      );

      // STORE USER
      setUser(data.user);

      toast.success(
        "Account created successfully"
      );

      // REDIRECT
      navigate(
        "/student/dashboard"
      );

      return data;

    } catch (err) {

      toast.error(

        err.response?.data
          ?.message ||

        "Registration failed"
      );

      throw err;

    } finally {

      setLoading(false);
    }
  };

  // LOAD USER
  const loadUser =
    async () => {

      try {

        const data =
          await getProfile();

        setUser(data.user);

      } catch (err) {

        console.log(err);
      }
    };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    setUser(null);

    toast.success(
      "Logged out successfully"
    );

    navigate("/login");
  };

  return {

    user,

    loading,

    login,

    register,

    logout,

    loadUser,
  };
}

export default useAuth;