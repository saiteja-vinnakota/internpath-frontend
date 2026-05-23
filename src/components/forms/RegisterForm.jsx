import { useState } from "react";

import { Link } from "react-router-dom";

import Input from "../ui/Input";

import Select from "../ui/Select";

import Button from "../ui/Button";

import { useAuth } from "../../context/AuthContext";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",

    email: "",

    password: "",

    role: "student",
  });

  const {
    register,

    loading,
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
      await register(formData);
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
      {/* NAME */}
      <Input
        label="Full Name"
        type="text"
        name="name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange}
      />

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
        placeholder="Create a password"
        value={formData.password}
        onChange={handleChange}
      />

      {/* ROLE */}
      <Select
        label="Account Type"
        name="role"
        value={formData.role}
        onChange={handleChange}
        options={[
          {
            label: "Student",
            value: "student",
          },

          {
            label: "Recruiter",
            value: "recruiter",
          },
        ]}
      />

      {/* BUTTON */}
      <Button type="submit" loading={loading} className="w-full">
        Create Account
      </Button>

      {/* LOGIN */}
      <p
        className="
          text-center
          text-sm
          text-muted
        "
      >
        Already have an account?{" "}
        <Link
          to="/login"
          className="
            text-accent
            font-medium
            hover:underline
          "
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
