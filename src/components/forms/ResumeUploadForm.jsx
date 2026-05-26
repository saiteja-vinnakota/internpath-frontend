import {
  useState,
} from "react";

import {
  Upload,
  FileText,
  Loader2,
} from "lucide-react";

import toast
from "react-hot-toast";

import {
  uploadResume,
} from "../../api/resumeApi";

import {
  useAuth,
} from "../../context/AuthContext";

function ResumeUploadForm({

  user,

  onUploadSuccess,

}) {

  const { setUser } =
    useAuth();

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  // FILE CHANGE
  const handleFileChange =
    (e) => {

      const selectedFile =
        e.target.files[0];

      if (!selectedFile) {
        return;
      }

      // PDF VALIDATION
      if (
        selectedFile.type !==
        "application/pdf"
      ) {

        toast.error(
          "Only PDF resumes are allowed"
        );

        return;
      }

      setFile(selectedFile);
    };

  // UPLOAD
  const handleUpload =
    async () => {

      if (!file) {

        toast.error(
          "Select a resume file"
        );

        return;
      }

      try {

        setLoading(true);

        const response =
          await uploadResume(
            file
          );

          console.log(response);

        // UPDATE AUTH USER
        setUser(
          response.data
        );

        toast.success(
          "Resume uploaded successfully"
        );

        setFile(null);

        if (
          onUploadSuccess
        ) {

          onUploadSuccess();
        }

      } catch (err) {

        console.log(err);

        toast.error(

          err.response?.data
            ?.message ||

          "Resume upload failed"
        );

      } finally {

        setLoading(false);
      }
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
        Resume
      </h2>

      {/* CURRENT RESUME */}
      {user?.resumeUrl && (

        <a
          href={user.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="
            mt-6
            inline-flex
            items-center
            gap-3
            px-5
            py-4
            rounded-2xl
            bg-stone
            text-primary
            hover:bg-blue-50
          "
        >

          <FileText size={20} />

          <span>
            View Current Resume
          </span>

        </a>

      )}

      {/* INPUT */}
      <div className="mt-8">

        <label
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-4
            h-[220px]
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
            size={38}
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
              Upload Resume
            </p>

            <p
              className="
                mt-2
                text-sm
                text-muted
              "
            >
              PDF format only
            </p>

            {file && (

              <p
                className="
                  mt-3
                  text-sm
                  font-medium
                  text-accent
                "
              >
                {file.name}
              </p>

            )}

          </div>

          <input
            type="file"
            accept=".pdf"
            onChange={
              handleFileChange
            }
            className="hidden"
          />

        </label>

      </div>

      {/* BUTTON */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="
          mt-8
          h-14
          px-8
          rounded-2xl
          bg-primary
          text-white
          font-medium
          transition-all
          hover:bg-black
          disabled:opacity-70
        "
      >

        {loading ? (

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Loader2
              size={18}
              className="
                animate-spin
              "
            />

            <span>
              Uploading...
            </span>

          </div>

        ) : (

          "Upload Resume"

        )}

      </button>

    </div>
  );
}

export default ResumeUploadForm;