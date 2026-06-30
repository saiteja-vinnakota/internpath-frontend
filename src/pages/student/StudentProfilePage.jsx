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
  const { user, loading: authLoading } = useAuth();
  const { loading, updateProfile } = useUser();

  const handleProfileUpdate = async (payload) => {
    const data = await updateProfile(payload);
    if (data) setEditMode(false);
  };

  if (authLoading || !user) {
    return (
      <DashboardLayout>
        <div className="bg-white border border-border rounded-[28px] p-8 space-y-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-5 w-72" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="My Profile"
        description="Manage your profile, resume, and skills."
        action={
          <Button onClick={() => setEditMode((v) => !v)}>
            {editMode ? "Close Editor" : "Edit Profile"}
          </Button>
        }
      />

      <StudentProfileOverview user={user} />

      {editMode && (
        <EditProfileModal onClose={() => setEditMode(false)}>
          <div className="space-y-6">
            <ProfilePictureUploadForm user={user} />
            <ProfileForm user={user} onSubmit={handleProfileUpdate} loading={loading} />
            <ResumeUploadForm user={user} />
          </div>
        </EditProfileModal>
      )}
    </DashboardLayout>
  );
}

function EditProfileModal({ children, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center bg-black/40 backdrop-blur-sm px-3 py-3 sm:px-4 sm:py-6"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
        className="flex max-h-[calc(100vh-1.5rem)] sm:max-h-[calc(100vh-3rem)] w-full max-w-3xl flex-col bg-background rounded-[28px] border border-border shadow-medium overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between gap-4 border-b border-border bg-white px-6 py-4">
          <div>
            <h2 id="edit-profile-title" className="text-base font-semibold text-primary">Edit Profile</h2>
            <p className="mt-0.5 text-xs text-muted">Update profile details, interests, achievements, and resume.</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-white text-primary hover:bg-stone transition-colors"
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </div>
      </section>
    </div>
  );
}

export default StudentProfilePage;