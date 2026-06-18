import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import Spinner
from "../components/ui/Spinner";

function ProtectedRoute({

  children,

  role,

}) {

  const {

    user,

    loading,

  } = useAuth();

  // LOADING
  if (loading) {

    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-stone
        "
      >

        <Spinner size="lg" />

      </div>
    );
  }

  // NOT LOGGED IN
  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ROLE CHECK
  if (

    role &&

    user.role !== role

  ) {

    return (
      <Navigate
        to={
          user.role ===
          "recruiter"

            ? "/recruiter/dashboard"

            : "/student/dashboard"
        }
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;