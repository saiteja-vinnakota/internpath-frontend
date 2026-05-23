import AuthLayout
from "../../components/layout/AuthLayout";

import RegisterForm
from "../../components/forms/RegisterForm";

function RegisterPage() {

  return (
    <AuthLayout
      title="Create your account"
      subtitle="
        Join InternPath to discover
        internships, track applications,
        and unlock AI-powered matching.
      "
    >

      <RegisterForm />

    </AuthLayout>
  );
}

export default RegisterPage;