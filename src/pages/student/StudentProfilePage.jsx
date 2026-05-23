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

function StudentProfilePage() {

  const {

    user,

    loading,

    updateProfile,

    fetchUser,

  } = useUser();

  if (loading && !user) {

    return (
      <DashboardLayout>

        <Skeleton
          className="
            h-[700px]
            rounded-[32px]
          "
        />

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
          onUploadSuccess={
            fetchUser
          }
        />

      </div>

    </DashboardLayout>
  );
}

export default StudentProfilePage;