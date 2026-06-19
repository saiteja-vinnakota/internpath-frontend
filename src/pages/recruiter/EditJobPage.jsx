import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { showToast } from "../../utils/toastService";

import { TOAST_MESSAGES } from "../../constants/toastMessages";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageHeader from "../../components/layout/PageHeader";

import JobPostForm from "../../components/forms/JobPostForm";

import Skeleton from "../../components/ui/Skeleton";

import EmptyState from "../../components/ui/EmptyState";

import { getSingleJob } from "../../api/jobApi";

import useJobs from "../../hooks/useJobs";

import { getErrorMessage } from "../../utils/errorHandler";

function EditJobPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { handleUpdateJob } = useJobs();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [error, setError] = useState("");

  // FETCH JOB
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);

        setError("");

        const data = await getSingleJob(id);

        setJob(data?.data);
      } catch (err) {
        console.log(err);

        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // SUBMIT
  const handleSubmit = async (formData) => {
    try {
      setSubmitLoading(true);

      await handleUpdateJob(
        id,

        formData,
      );

      showToast.success("Internship updated successfully");

      navigate("/recruiter/manage-listings");
    } catch (err) {
      console.log(err);

      showToast.error(getErrorMessage(err));
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* HEADER */}
      <PageHeader
        title="
          Edit Internship
        "
        description="
          Update internship details,
          requirements, and hiring information.
        "
      />

      {/* LOADING */}
      {loading && (
        <div
          className="
            mt-8
            bg-white
            border
            border-border
            rounded-[36px]
            p-8
            space-y-6
          "
        >
          {[...Array(8)].map((_, index) => (
            <Skeleton
              key={index}
              className="
                  h-16
                  rounded-2xl
                "
            />
          ))}
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="mt-8">
          <EmptyState
            title="
              Failed to load internship
            "
            description={error}
          />
        </div>
      )}

      {/* FORM */}
      {!loading && !error && job && (
        <div className="mt-8">
          <JobPostForm
            initialData={job}
            onSubmit={handleSubmit}
            loading={submitLoading}
          />
        </div>
      )}
    </DashboardLayout>
  );
}

export default EditJobPage;
