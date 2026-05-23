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

  // NOT AUTHORIZED
  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // AUTHORIZED
  return children;
}

export default ProtectedRoute;