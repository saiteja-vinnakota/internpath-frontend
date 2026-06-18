import { useSearchParams } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";

import RegisterForm from "../../components/forms/RegisterForm";

function RegisterPage() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const initialRole = role === "recruiter" ? "recruiter" : "student";

  return (
    <AuthLayout
      title="Create your account"
      subtitle="
        Join InternPath to discover
        internships, track applications,
        and unlock AI-powered matching.
      "
    >
      <RegisterForm initialRole={initialRole} />
    </AuthLayout>
  );
}

export default RegisterPage;
