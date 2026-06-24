import { useEffect, useState } from "react";

import { X } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageHeader from "../../components/layout/PageHeader";

import ProfileForm from "../../components/forms/ProfileForm";

import ProfilePictureUploadForm from "../../components/forms/ProfilePictureUploadForm";

import ResumeUploadForm from "../../components/forms/ResumeUploadForm";

import StudentProfileOverview from "../../components/profile/StudentProfileOverview";

import Button from "../../components/ui/Button";

import Skeleton from "../../components/ui/Skeleton";

import useUser from "../../hooks/useUser";

import { useAuth } from "../../context/AuthContext";

function StudentProfilePage() {
  const [editMode, setEditMode] = useState(false);

  // GLOBAL AUTH USER
  const { user, loading: authLoading } = useAuth();

  // USER OPERATIONS
  const {
    loading,

    updateProfile,
  } = useUser();

  const handleProfileUpdate = async (payload) => {
    const data = await updateProfile(payload);

    if (data) {
      setEditMode(false);
    }
  };

  if (authLoading || !user) {
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
          space-y-8
        "
      >
        <StudentProfileOverview user={user} />

        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >
          <Button
            type="button"
            onClick={() => setEditMode((current) => !current)}
          >
            {editMode ? "Close Editor" : "Edit Profile"}
          </Button>
        </div>

        {editMode && (
          <EditProfileModal onClose={() => setEditMode(false)}>
            <div className="space-y-8">
              {/* PROFILE PICTURE */}
              <ProfilePictureUploadForm user={user} />

              {/* PROFILE */}
              <ProfileForm
                user={user}
                onSubmit={handleProfileUpdate}
                loading={loading}
              />

              {/* RESUME */}
              <ResumeUploadForm user={user} />
            </div>
          </EditProfileModal>
        )}
      </div>
    </DashboardLayout>
  );
}

function EditProfileModal({ children, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-start
        sm:items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
        px-3
        py-3
        sm:px-4
        sm:py-6
      "
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
        className="
          flex
          max-h-[calc(100vh-1.5rem)]
          sm:max-h-[calc(100vh-3rem)]
          w-full
          max-w-4xl
          flex-col
          bg-background
          rounded-[32px]
          border
          border-border
          shadow-[0_20px_80px_rgba(0,0,0,0.2)]
          overflow-hidden
        "
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            border-b
            border-border
            bg-white
            px-5
            py-4
            sm:px-8
          "
        >
          <div>
            <h2
              id="edit-profile-title"
              className="
                text-xl
                font-semibold
                text-primary
              "
            >
              Edit Profile
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-muted
              "
            >
              Update profile details, interests, achievements, and resume.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-border
              bg-white
              text-primary
              transition-all
              hover:bg-stone
            "
            aria-label="Close edit profile popup"
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="
            flex-1
            overflow-y-auto
            px-5
            pb-5
            pt-0
            sm:px-8
            sm:pb-8
            sm:pt-0
          "
        >
          {children}
        </div>
      </section>
    </div>
  );
}

export default StudentProfilePage;
