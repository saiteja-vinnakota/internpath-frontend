import DashboardLayout
from "../../components/layout/DashboardLayout";

import PageHeader
from "../../components/layout/PageHeader";

import ProfileForm
from "../../components/forms/ProfileForm";

import Skeleton
from "../../components/ui/Skeleton";

import useUser
from "../../hooks/useUser";

import {
  useAuth,
} from "../../context/AuthContext";

function RecruiterProfilePage() {

  // AUTH USER
  const { user } =
    useAuth();

  // USER OPERATIONS
  const {

    loading,

    updateProfile,

  } = useUser();

  // LOADING
  if (loading && !user) {

    return (
      <DashboardLayout>

        <div
          className="
            bg-white
            border
            border-border
            rounded-[32px]
            p-8
            space-y-8
          "
        >

          {/* HEADER */}
          <div className="space-y-4">

            <Skeleton
              className="
                h-8
                w-52
              "
            />

            <Skeleton
              className="
                h-5
                w-80
              "
            />

          </div>

          {/* FORM */}
          <div className="space-y-6">

            <Skeleton
              className="
                h-14
                w-full
              "
            />

            <Skeleton
              className="
                h-14
                w-full
              "
            />

            <Skeleton
              className="
                h-40
                w-full
              "
            />

          </div>

        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* HEADER */}
      <PageHeader
        title="
          Recruiter Profile
        "
        description="
          Manage your recruiter
          profile and company details.
        "
      />

      {/* FORM */}
      <div className="mt-10">

        <ProfileForm
          user={user}
          onSubmit={
            updateProfile
          }
          loading={loading}
        />

      </div>

    </DashboardLayout>
  );
}

export default RecruiterProfilePage;