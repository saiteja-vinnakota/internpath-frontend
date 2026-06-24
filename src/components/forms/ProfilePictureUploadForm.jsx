import { useState } from "react";

import { Upload, X } from "lucide-react";

import Spinner from "../ui/Spinner";

import { showToast } from "../../utils/toastService";

import { TOAST_MESSAGES } from "../../constants/toastMessages";

import { uploadProfilePicture } from "../../api/userApi";

import { useAuth } from "../../context/AuthContext";

function ProfilePictureUploadForm({
  user,

  onUploadSuccess,
}) {
  const { setUser } = useAuth();

  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  // FILE CHANGE
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      return;
    }

    // IMAGE VALIDATION
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowedTypes.includes(selectedFile.type)) {
      showToast.error("Only JPEG, PNG, and WebP images are allowed");

      return;
    }

    // SIZE CHECK
    if (selectedFile.size > 2 * 1024 * 1024) {
      showToast.error("Image must be less than 2MB");

      return;
    }

    setFile(selectedFile);

    // CREATE PREVIEW
    const reader = new FileReader();

    reader.onload = (event) => {
      setPreview(event.target.result);
    };

    reader.readAsDataURL(selectedFile);
  };

  // UPLOAD
  const handleUpload = async () => {
    if (!file) {
      showToast.error("Select a profile picture");

      return;
    }

    try {
      setLoading(true);

      const response = await uploadProfilePicture(file);

      // UPDATE AUTH USER
      setUser(response.data);

      showToast.success("Profile picture uploaded successfully");

      setFile(null);

      setPreview(null);

      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err) {
      console.log(err);

      showToast.error(
        err.response?.data?.message || "Profile picture upload failed",
      );
    } finally {
      setLoading(false);
    }
  };

  // REMOVE PREVIEW
  const handleRemovePreview = () => {
    setFile(null);

    setPreview(null);
  };

  return (
    <div
      className="
        bg-white
        border
        border-border
        rounded-[32px]
        p-8
      "
    >
      {/* TITLE */}
      <h2
        className="
          text-2xl
          font-semibold
          text-primary
        "
      >
        Profile Picture
      </h2>

      {/* CURRENT PICTURE */}
      {user?.profilePicture && !preview && (
        <div
          className="
            mt-6
            flex
            items-center
            gap-4
            px-4
            py-4
            rounded-2xl
            bg-stone
            w-fit
          "
        >
          <img
            src={user.profilePicture}
            alt="Profile"
            className="
              h-16
              w-16
              rounded-full
              object-cover
              border-2
              border-border
            "
          />

          <div>
            <p
              className="
                text-sm
                text-muted
              "
            >
              Current profile picture
            </p>

            <p
              className="
                mt-1
                text-xs
                text-muted
              "
            >
              Click 'Upload Picture' to change it
            </p>
          </div>
        </div>
      )}

      {/* PREVIEW */}
      {preview && (
        <div
          className="
            mt-6
            flex
            items-center
            gap-4
            px-4
            py-4
            rounded-2xl
            bg-blue-50
            border
            border-blue-200
            w-fit
          "
        >
          <img
            src={preview}
            alt="Preview"
            className="
              h-16
              w-16
              rounded-full
              object-cover
              border-2
              border-primary
            "
          />

          <div>
            <p
              className="
                text-sm
                font-medium
                text-primary
              "
            >
              Preview
            </p>

            <p
              className="
                mt-1
                text-xs
                text-muted
                truncate
                max-w-xs
              "
            >
              {file?.name}
            </p>
          </div>
        </div>
      )}

      {/* INPUT */}
      <div className="mt-8">
        <label
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-3
            h-[200px]
            rounded-[28px]
            border-2
            border-dashed
            border-border
            cursor-pointer
            transition-all
            hover:border-accent
            hover:bg-blue-50/30
          "
        >
          <Upload
            size={36}
            className="
              text-accent
            "
          />

          <div
            className="
              text-center
            "
          >
            <p
              className="
                font-medium
                text-primary
              "
            >
              Upload Picture
            </p>

            <p
              className="
                mt-1
                text-sm
                text-muted
              "
            >
              JPEG, PNG, WebP - Max 2MB
            </p>
          </div>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* ACTIONS */}
      {(file || preview) && (
        <div
          className="
            mt-8
            flex
            flex-wrap
            gap-3
          "
        >
          <button
            onClick={handleUpload}
            disabled={loading}
            className="
              px-6
              py-3
              rounded-2xl
              bg-primary
              text-white
              font-medium
              transition-all
              hover:bg-blue-700
              disabled:opacity-50
              disabled:cursor-not-allowed
              flex
              items-center
              gap-2
            "
          >
            {loading && <Spinner size="sm" />}

            {loading ? "Uploading..." : "Upload Picture"}
          </button>

          <button
            onClick={handleRemovePreview}
            disabled={loading}
            className="
              px-6
              py-3
              rounded-2xl
              bg-stone
              text-primary
              font-medium
              transition-all
              hover:bg-gray-200
              disabled:opacity-50
              disabled:cursor-not-allowed
              flex
              items-center
              gap-2
            "
          >
            <X size={18} />
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePictureUploadForm;
