import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Register() {
  const [role, setRole] = useState("student");

  return (
    <AuthLayout>

      {/* HEADER */}
      <div>

        <h1 className="
          font-serif
          text-4xl
          text-primary
        ">
          Create account
        </h1>

        <p className="
          mt-3
          text-muted
          leading-7
        ">
          Join InternPath and start discovering
          smarter internship opportunities.
        </p>

      </div>

      {/* ROLE SELECTION */}
      <div className="
        mt-10
        grid
        grid-cols-2
        gap-4
      ">

        {/* STUDENT */}
        <button
          type="button"
          onClick={() => setRole("student")}
          className={`
            p-5
            rounded-3xl
            border
            text-left
            transition-all
            duration-300

            ${
              role === "student"
                ? "border-accent bg-blue-50"
                : "border-border bg-white"
            }
          `}
        >

          <h3 className="
            font-semibold
            text-primary
          ">
            Student
          </h3>

          <p className="
            mt-2
            text-sm
            text-muted
            leading-6
          ">
            Discover internships and track
            applications.
          </p>

        </button>

        {/* RECRUITER */}
        <button
          type="button"
          onClick={() => setRole("recruiter")}
          className={`
            p-5
            rounded-3xl
            border
            text-left
            transition-all
            duration-300

            ${
              role === "recruiter"
                ? "border-accent bg-blue-50"
                : "border-border bg-white"
            }
          `}
        >

          <h3 className="
            font-semibold
            text-primary
          ">
            Recruiter
          </h3>

          <p className="
            mt-2
            text-sm
            text-muted
            leading-6
          ">
            Post internships and manage
            applicants.
          </p>

        </button>

      </div>

      {/* FORM */}
      <form className="
        mt-8
        space-y-6
      ">

        <Input
          label="Full Name"
          placeholder="Enter your full name"
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
        />

        {/* CONDITIONAL FIELD */}
        {role === "student" ? (
          <Input
            label="College Name"
            placeholder="Enter your college"
          />
        ) : (
          <Input
            label="Company Name"
            placeholder="Enter company name"
          />
        )}

        {/* BUTTON */}
        <Button
          className="
            w-full
            py-3.5
          "
        >
          Create Account
        </Button>

      </form>

      {/* LOGIN REDIRECT */}
      <p className="
        mt-8
        text-center
        text-muted
      ">
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

    </AuthLayout>
  );
}

export default Register;