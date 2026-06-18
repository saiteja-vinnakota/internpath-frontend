import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageHeader from "../../components/layout/PageHeader";

import JobList from "../../components/job/JobList";

import EmptyState from "../../components/ui/EmptyState";

import Button from "../../components/ui/Button";

import Input from "../../components/ui/Input";

import ConfirmModal from "../../components/modals/ConfirmModal";

import Modal from "../../components/modals/Modal";

import useJobs from "../../hooks/useJobs";

function ManageListingsPage() {
  const {
    jobs,

    loading,

    error,

    fetchRecruiterJobs,

    handleDeleteJob,

    handleCloseJob,

    handleUpdateJob,
  } = useJobs();

  // DELETE MODAL
  const [selectedJobId, setSelectedJobId] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  // CLOSE MODAL
  const [selectedCloseJobId, setSelectedCloseJobId] = useState(null);

  const [closeLoading, setCloseLoading] = useState(false);

  const [selectedReopenJobId, setSelectedReopenJobId] = useState(null);

  const [reopenDeadline, setReopenDeadline] = useState("");

  const [reopenLoading, setReopenLoading] = useState(false);

  // FETCH JOBS
  useEffect(() => {
    fetchRecruiterJobs();
  }, []);

  // DELETE
  const openDeleteModal = (jobId) => {
    setSelectedJobId(jobId);
  };

  const closeDeleteModal = () => {
    setSelectedJobId(null);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);

      await handleDeleteJob(selectedJobId);

      closeDeleteModal();
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  // CLOSE JOB
  const openCloseModal = (jobId) => {
    setSelectedCloseJobId(jobId);
  };

  const closeCloseModal = () => {
    setSelectedCloseJobId(null);
  };

  const confirmClose = async () => {
    try {
      setCloseLoading(true);

      await handleCloseJob(selectedCloseJobId);

      closeCloseModal();
    } catch (err) {
      console.log(err);
    } finally {
      setCloseLoading(false);
    }
  };

  const openReopenModal = (jobId) => {
    const job = jobs.find((job) => job._id === jobId);

    const formattedDate = job?.deadline
      ? new Date(job.deadline).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];

    setSelectedReopenJobId(jobId);
    setReopenDeadline(formattedDate);
  };

  const closeReopenModal = () => {
    setSelectedReopenJobId(null);
    setReopenDeadline("");
  };

  const confirmReopen = async () => {
    if (!reopenDeadline) {
      return;
    }

    try {
      setReopenLoading(true);

      await handleUpdateJob(selectedReopenJobId, {
        status: "active",
        deadline: reopenDeadline,
      });

      await fetchRecruiterJobs();

      closeReopenModal();
    } catch (err) {
      console.log(err);
    } finally {
      setReopenLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* HEADER */}
      <PageHeader
        title="
          Manage Listings
        "
        description="
          View, manage, and track
          your posted internships.
        "
      />

      {/* ERROR */}
      {error && (
        <div className="mt-10">
          <EmptyState
            title="
              Something went wrong
            "
            description={error}
          />
        </div>
      )}

      {/* JOBS */}
      {!error && (
        <div className="mt-10">
          <JobList
            jobs={jobs}
            loading={loading}
            recruiterMode={true}
            onDelete={openDeleteModal}
            onClose={openCloseModal}
            onReopen={openReopenModal}
            emptyTitle="
              No internships posted
            "
            emptyDescription="
              Start posting internships
              to attract applicants.
            "
          />
        </div>
      )}

      {/* CLOSE INTERNSHIP MODAL */}
      <ConfirmModal
        open={!!selectedCloseJobId}
        onClose={closeCloseModal}
        onConfirm={confirmClose}
        loading={closeLoading}
        variant="warning"
        title="
          Close Internship
        "
        description="
          Students will no longer be able
          to view or apply for this internship.

          Existing applicants will remain
          available for review.
        "
        confirmText="
          Close Internship
        "
      />

      {/* REOPEN MODAL */}
      <Modal
        open={!!selectedReopenJobId}
        onClose={closeReopenModal}
        maxWidth="max-w-xl"
      >
        <div
          className="
            p-8
          "
        >
          <h2
            className="
              text-2xl
              font-semibold
              text-primary
            "
          >
            Reopen Internship
          </h2>

          <p
            className="
              mt-3
              text-muted
              leading-7
            "
          >
            Provide a new application deadline to reopen the internship for
            students.
          </p>

          <div
            className="
              mt-6
            "
          >
            <Input
              label="New Deadline"
              type="date"
              value={reopenDeadline}
              onChange={(e) => setReopenDeadline(e.target.value)}
            />
          </div>

          <div
            className="
              mt-8
              flex
              flex-wrap
              justify-end
              gap-3
            "
          >
            <Button
              variant="secondary"
              onClick={closeReopenModal}
              className="
                rounded-2xl
              "
            >
              Cancel
            </Button>

            <Button
              onClick={confirmReopen}
              loading={reopenLoading}
              disabled={!reopenDeadline}
              className="
                rounded-2xl
              "
            >
              Reopen Internship
            </Button>
          </div>
        </div>
      </Modal>

      {/* DELETE MODAL */}
      <ConfirmModal
        open={!!selectedJobId}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        variant="danger"
        title="
          Delete Internship
        "
        description="
          This internship and all
          associated applications
          will be permanently removed.
        "
        confirmText="
          Delete Internship
        "
      />
    </DashboardLayout>
  );
}

export default ManageListingsPage;
