import { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { loginUser, registerUser } from "../api/authApi";

import { getCurrentUser } from "../api/userApi";

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

      toast.success("Login successful");

      // REDIRECT
      navigate(`/${data.data.user.role}/dashboard`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");

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

      toast.success("Account created successfully");

      // REDIRECT
      navigate(`/${data.data.user.role}/dashboard`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);

    toast.success("Logged out successfully");

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
