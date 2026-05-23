import { useState } from "react";

import { Link } from "react-router-dom";

import Input from "../ui/Input";

import Button from "../ui/Button";

import Checkbox from "../ui/Checkbox";

import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {
    login,

    loading,

    error,
  } = useAuth();

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-6
      "
    >
      {/* ERROR */}
      {error && (
        <div
          className="
            px-4
            py-3
            rounded-2xl
            bg-red-50
            border
            border-red-100
            text-sm
            text-red-500
          "
        >
          {error}
        </div>
      )}

      {/* EMAIL */}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      {/* PASSWORD */}
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />

      {/* OPTIONS */}
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <Checkbox label="Remember me" />

        <Link
          to="/forgot-password"
          className="
            text-sm
            text-accent
            hover:underline
          "
        >
          Forgot password?
        </Link>
      </div>

      {/* BUTTON */}
      <Button type="submit" loading={loading} className="w-full">
        Sign In
      </Button>

      {/* REGISTER */}
      <p
        className="
          text-center
          text-sm
          text-muted
        "
      >
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="
            text-accent
            font-medium
            hover:underline
          "
        >
          Create account
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
