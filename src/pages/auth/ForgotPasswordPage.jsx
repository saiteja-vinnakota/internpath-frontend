import {
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import AuthLayout
from "../../components/layout/AuthLayout";

import Input
from "../../components/ui/Input";

import Button
from "../../components/ui/Button";

function ForgotPasswordPage() {

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // HANDLE SUBMIT
  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      console.log(email);

      // API INTEGRATION LATER

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="
        Enter your email address and
        we will send you instructions
        to reset your password.
      "
    >

      <form
        onSubmit={handleSubmit}
        className="
          space-y-6
        "
      >

        {/* EMAIL */}
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        {/* BUTTON */}
        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          Send Reset Link
        </Button>

        {/* BACK */}
        <p
          className="
            text-center
            text-sm
            text-muted
          "
        >

          Remember your password?{" "}

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

    </AuthLayout>
  );
}

export default ForgotPasswordPage;