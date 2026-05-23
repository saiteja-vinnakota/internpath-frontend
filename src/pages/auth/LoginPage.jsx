import AuthLayout
from "../../components/layout/AuthLayout";

import LoginForm
from "../../components/forms/LoginForm";

function LoginPage() {

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="
        Sign in to continue exploring
        internships and track your
        applications.
      "
    >

      <LoginForm />

    </AuthLayout>
  );
}

export default LoginPage;