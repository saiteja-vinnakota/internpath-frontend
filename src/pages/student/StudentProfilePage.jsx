import DashboardLayout
from "../../components/layout/DashboardLayout";

import PageHeader
from "../../components/layout/PageHeader";

import ProfileForm
from "../../components/forms/ProfileForm";

import ResumeUploadForm
from "../../components/forms/ResumeUploadForm";

import Skeleton
from "../../components/ui/Skeleton";

import useUser
from "../../hooks/useUser";

import {
  useAuth,
} from "../../context/AuthContext";

function StudentProfilePage() {

  // GLOBAL AUTH USER
  const { user } =
    useAuth();

  // USER OPERATIONS
  const {

    loading,

    updateProfile,

  } = useUser();

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
        title="My Profile"
        description="
          Manage your profile,
          resume, and skills.
        "
      />

      <div
        className="
          mt-10
          grid
          grid-cols-1
          xl:grid-cols-[1fr_420px]
          gap-8
        "
      >

        {/* PROFILE */}
        <ProfileForm
          user={user}
          onSubmit={
            updateProfile
          }
          loading={loading}
        />

        {/* RESUME */}
        <ResumeUploadForm
          user={user}
        />

      </div>

    </DashboardLayout>
  );
}

export default StudentProfilePage;