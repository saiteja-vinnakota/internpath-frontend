import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast
from "react-hot-toast";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import PageHeader
from "../../components/layout/PageHeader";

import JobPostForm
from "../../components/forms/JobPostForm";

import useJobs
from "../../hooks/useJobs";

function PostJobPage() {

  const navigate =
    useNavigate();

  const {

    handleCreateJob,

  } = useJobs();

  const [

    submitting,

    setSubmitting,

  ] = useState(false);

  // SUBMIT
  const submitHandler =
    async (formData) => {

      try {

        setSubmitting(true);

        await handleCreateJob(
          formData
        );

        toast.success(
          "Internship posted successfully"
        );

        navigate(
          "/recruiter/manage-listings"
        );

      } catch (err) {

        toast.error(

          err.response?.data
            ?.message ||

          "Failed to post internship"
        );

      } finally {

        setSubmitting(false);
      }
    };

  return (
    <DashboardLayout>

      {/* HEADER */}
      <PageHeader
        title="
          Post Internship
        "
        description="
          Create and publish
          internship opportunities
          for students.
        "
      />

      {/* FORM */}
      <div className="mt-8">

        <JobPostForm
          onSubmit={
            submitHandler
          }
          loading={
            submitting
          }
        />

      </div>

    </DashboardLayout>
  );
}

export default PostJobPage;