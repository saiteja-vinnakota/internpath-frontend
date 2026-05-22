import { Link } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

function Login() {
  return (
    <AuthLayout>

      {/* HEADER */}
      <div>

        <h1 className="
          font-serif
          text-4xl
          text-primary
        ">
          Welcome back
        </h1>

        <p className="
          mt-3
          text-muted
          leading-7
        ">
          Sign in to continue exploring internships
          and tracking your applications.
        </p>

      </div>

      {/* FORM */}
      <form className="
        mt-10
        space-y-6
      ">

        {/* EMAIL */}
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
        />

        {/* PASSWORD */}
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        {/* FORGOT PASSWORD */}
        <div className="flex justify-end">

          <button
            type="button"
            className="
              text-sm
              text-accent
              hover:underline
            "
          >
            Forgot Password?
          </button>

        </div>

        {/* BUTTON */}
        <Button
          className="
            w-full
            py-3.5
          "
        >
          Sign In
        </Button>

      </form>

      {/* REGISTER REDIRECT */}
      <p className="
        mt-8
        text-center
        text-muted
      ">
        Don’t have an account?{" "}

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

    </AuthLayout>
  );
}

export default Login;