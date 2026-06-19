import { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginUser, registerUser } from "../api/authApi";

import { getCurrentUser } from "../api/userApi";

import { showToast } from "../utils/toastService";

import { TOAST_MESSAGES, getToastMessage } from "../constants/toastMessages";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // LOAD USER
  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");

      // NO TOKEN
      if (!token) {
        setLoading(false);

        return;
      }

      const data = await getCurrentUser();

      // SET USER
      setUser(data.data);
    } catch (err) {
      console.log(err);

      localStorage.removeItem("token");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const login = async (formData) => {
    try {
      setLoading(true);

      const data = await loginUser(formData);

      // STORE TOKEN
      localStorage.setItem(
        "token",

        data.data.token,
      );

      // STORE USER
      setUser(data.data.user);

      await loadUser();

      showToast.success(TOAST_MESSAGES.AUTH.LOGIN_SUCCESS);

      // REDIRECT
      navigate(`/${data.data.user.role}/dashboard`);
    } catch (err) {
      showToast.error(err.response?.data?.message || TOAST_MESSAGES.AUTH.LOGIN_FAILED);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const register = async (formData) => {
    try {
      setLoading(true);

      const data = await registerUser(formData);

      // STORE TOKEN
      localStorage.setItem(
        "token",

        data.data.token,
      );

      // STORE USER
      setUser(data.data.user);

      await loadUser();

      showToast.success(TOAST_MESSAGES.AUTH.REGISTER_SUCCESS);

      // REDIRECT
      navigate(`/${data.data.user.role}/dashboard`);
    } catch (err) {
      showToast.error(err.response?.data?.message || TOAST_MESSAGES.AUTH.REGISTER_FAILED);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);

    showToast.success(TOAST_MESSAGES.AUTH.LOGOUT_SUCCESS);

    navigate("/login");
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,

        setUser,

        loading,

        login,

        register,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// CUSTOM HOOK
export function useAuth() {
  return useContext(AuthContext);
}
