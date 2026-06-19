import { useEffect, useMemo, useState } from "react";

import { useParams } from "react-router-dom";

import { Search, Users, Sparkles, ArrowUpDown, Filter } from "lucide-react";

import { showToast } from "../../utils/toastService";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PageHeader from "../../components/layout/PageHeader";

import ApplicationTable from "../../components/application/ApplicationTable";

import EmptyState from "../../components/ui/EmptyState";

import Pagination from "../../components/ui/Pagination";

import Skeleton from "../../components/ui/Skeleton";

import Modal from "../../components/modals/Modal";

import ConfirmModal from "../../components/modals/ConfirmModal";

import useApplicants from "../../hooks/useApplicants";
import useJob from "../../hooks/useJob";

import { APPLICATION_STATUS } from "../../constants/applicationStatus";

function ApplicantReviewPage() {
  const { jobId } = useParams();

  const {
    applicants = [],

    loading,

    error,

    pagination,

    fetchApplicants,

    handleStatusUpdate,
  } = useApplicants();

  const { job, loading: jobLoading } = useJob(jobId);

  // SEARCH
  const [search, setSearch] = useState("");

  // STATUS
  const [statusFilter, setStatusFilter] = useState("");

  // SCORE
  const [scoreFilter, setScoreFilter] = useState("");

  // SORT
  const [sortBy, setSortBy] = useState("score");

  // MODAL
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [viewedApplicant, setViewedApplicant] = useState(null);

  const [nextStatus, setNextStatus] = useState("");

  const [actionLoading, setActionLoading] = useState(false);

  // AVAILABLE ACTIONS PER STATUS
  const getAvailableActions = (status) => {
    const actions = {
      [APPLICATION_STATUS.APPLIED]: [
        APPLICATION_STATUS.SHORTLISTED,
        APPLICATION_STATUS.REJECTED,
      ],
      [APPLICATION_STATUS.SHORTLISTED]: [
        APPLICATION_STATUS.INTERVIEW,
        APPLICATION_STATUS.REJECTED,
      ],
      [APPLICATION_STATUS.INTERVIEW]: [
        APPLICATION_STATUS.SELECTED,
        APPLICATION_STATUS.REJECTED,
      ],
      [APPLICATION_STATUS.SELECTED]: [],
      [APPLICATION_STATUS.REJECTED]: [],
    };
    return actions[status] || [];
  };

  // FETCH
  useEffect(() => {
    fetchApplicants(jobId, 1);
  }, [jobId]);

  // FILTERED
  const filteredApplicants = useMemo(() => {
    let filtered = [...applicants];

    // SEARCH
    if (search.trim()) {
      const query = search.toLowerCase();

      filtered = filtered.filter((application) => {
        const student = application.student;

        const skills = student?.skills || [];

        return (
          student?.name?.toLowerCase().includes(query) ||
          student?.email?.toLowerCase().includes(query) ||
          skills.some((skill) => skill.toLowerCase().includes(query))
        );
      });
    }

    // STATUS
    if (statusFilter) {
      filtered = filtered.filter(
        (application) => application.status === statusFilter,
      );
    }

    // SCORE
    if (scoreFilter) {
      filtered = filtered.filter((application) => {
        const score = application.matchScore || 0;

        if (scoreFilter === "90") {
          return score >= 90;
        }

        if (scoreFilter === "75") {
          return score >= 75;
        }

        if (scoreFilter === "50") {
          return score >= 50;
        }

        return true;
      });
    }

    // SORT
    if (sortBy === "score") {
      filtered.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    }

    if (sortBy === "recent") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (sortBy === "name") {
      filtered.sort((a, b) => a.student?.name?.localeCompare(b.student?.name));
    }

    return filtered;
  }, [applicants, search, statusFilter, scoreFilter, sortBy]);

  const hasActiveFilters = Boolean(search || statusFilter || scoreFilter);

  const jobTitle = job?.title || "this role";
  const jobCompany = job?.company?.name || job?.company;

  const jobMeta = [job?.location, job?.mode, job?.category]
    .filter(Boolean)
    .join(" • ");

  const pageDescription = job?.title
    ? `Review, shortlist, interview, and manage applicants for ${job.title}.`
    : "Review, shortlist, interview, and manage applicants.";

  // FETCH ON LOAD
  useEffect(() => {
    fetchApplicants(jobId, 1);
  }, [jobId]);

  // STATS
  const totalApplicants = pagination.total || 0;

  const shortlistedCount = applicants.filter(
    (a) => a.status === APPLICATION_STATUS.SHORTLISTED,
  ).length;

  const interviewCount = applicants.filter(
    (a) => a.status === APPLICATION_STATUS.INTERVIEW,
  ).length;

  const avgScore =
    applicants.length > 0
      ? Math.round(
          applicants.reduce(
            (acc, curr) => acc + (curr.matchScore || 0),

            0,
          ) / applicants.length,
        )
      : 0;

  // ACTION
  const openActionModal = (applicationId, status) => {
    setSelectedApplication(applicationId);

    setNextStatus(status);
  };

  // CLOSE
  const closeModal = () => {
    setSelectedApplication(null);

    setNextStatus("");
  };

  const handleViewApplicant = (application) => {
    setViewedApplicant(application);
  };

  const closeViewModal = () => {
    setViewedApplicant(null);
  };

  // CONFIRM
  const confirmAction = async () => {
    try {
      setActionLoading(true);

      await handleStatusUpdate(
        selectedApplication,

        nextStatus,
      );

      closeModal();
    } catch (err) {
      showToast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* HEADER */}
      <PageHeader
        title="
          Applicant Pipeline
        "
        description={pageDescription}
      />

      <div className="mt-3 grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="rounded-[24px] border border-border bg-white p-5">
          <p className="text-sm text-muted">Selected role</p>
          <p className="mt-2 text-lg font-semibold text-primary">{jobTitle}</p>
          {jobMeta && <p className="mt-2 text-sm text-muted">{jobMeta}</p>}
        </div>
        {jobCompany && (
          <div className="rounded-[24px] border border-border bg-white p-5">
            <p className="text-sm text-muted">Company</p>
            <p className="mt-2 text-lg font-semibold text-primary">
              {jobCompany}
            </p>
          </div>
        )}
      </div>

      {/* STATS */}
      {!error && (
        <div
          className="
            mt-6
            grid
            grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          <StatCard
            title="Applicants"
            value={totalApplicants}
            icon={<Users size={18} />}
          />

          <StatCard
            title="Shortlisted"
            value={shortlistedCount}
            icon={<Sparkles size={18} />}
          />

          <StatCard
            title="Interview"
            value={interviewCount}
            icon={<Filter size={18} />}
          />

          <StatCard
            title="Avg Score"
            value={`${avgScore}%`}
            icon={<ArrowUpDown size={18} />}
          />
        </div>
      )}

      {/* FILTERS */}
      {!error && (
        <div
          className="
            mt-6
            bg-white
            border
            border-border
            rounded-[24px]
            p-4
            sm:p-5
          "
        >
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-4
              gap-3
            "
          >
            {/* SEARCH */}
            <div className="relative">
              <Search
                size={16}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-muted
                "
              />

              <input
                type="text"
                placeholder="
                  Search applicants...
                "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  h-11
                  pl-10
                  pr-4
                  rounded-2xl
                  border
                  border-border
                  bg-white
                  outline-none
                  text-sm
                  focus:border-primary
                "
              />
            </div>

            {/* STATUS */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="
                h-11
                px-4
                rounded-2xl
                border
                border-border
                bg-white
                outline-none
                text-sm
                focus:border-primary
              "
            >
              <option value="">All Status</option>

              <option value={APPLICATION_STATUS.APPLIED}>Applied</option>

              <option value={APPLICATION_STATUS.SHORTLISTED}>
                Shortlisted
              </option>

              <option value={APPLICATION_STATUS.INTERVIEW}>Interview</option>

              <option value={APPLICATION_STATUS.SELECTED}>Selected</option>

              <option value={APPLICATION_STATUS.REJECTED}>Rejected</option>
            </select>

            {/* SCORE */}
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="
                h-11
                px-4
                rounded-2xl
                border
                border-border
                bg-white
                outline-none
                text-sm
                focus:border-primary
              "
            >
              <option value="">All AI Scores</option>

              <option value="90">90%+ Match</option>

              <option value="75">75%+ Match</option>

              <option value="50">50%+ Match</option>
            </select>

            {/* SORT */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
                h-11
                px-4
                rounded-2xl
                border
                border-border
                bg-white
                outline-none
                text-sm
                focus:border-primary
              "
            >
              <option value="score">Highest AI Score</option>

              <option value="recent">Most Recent</option>

              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
      )}

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

      {/* APPLICANTS */}
      {!error && (
        <div className="mt-8">
          {/* If filters applied, show filtered results without pagination */}
          {hasActiveFilters ? (
            <>
              <ApplicationTable
                applications={filteredApplicants}
                loading={loading && applicants.length === 0}
                showEmptyState={false}
                onView={handleViewApplicant}
              />
              {filteredApplicants.length === 0 && (
                <div className="mt-6">
                  <EmptyState
                    title="No applicants found"
                    description="Try changing filters or wait for new applications."
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <ApplicationTable
                applications={applicants}
                loading={loading && applicants.length === 0}
                showEmptyState={false}
                onView={handleViewApplicant}
              />
              {pagination.pages > 1 && (
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.pages}
                  onPageChange={(page) => fetchApplicants(jobId, page)}
                />
              )}
              {applicants.length === 0 &&
                pagination.total === 0 &&
                !loading && (
                  <div className="mt-6">
                    <EmptyState
                      title="No applicants found"
                      description="Try changing filters or wait for new applications."
                    />
                  </div>
                )}
            </>
          )}
        </div>
      )}

      {/* VIEW APPLICANT DETAILS */}
      <Modal
        open={!!viewedApplicant}
        onClose={closeViewModal}
        maxWidth="max-w-2xl"
      >
        {viewedApplicant && (
          <div className="p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <h2 className="text-2xl font-semibold text-primary">
                  {viewedApplicant.student?.name}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {viewedApplicant.student?.email}
                </p>
                <p className="mt-2 text-sm text-muted">
                  Applied on{" "}
                  {new Date(viewedApplicant.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span className="inline-flex items-center rounded-full bg-stone px-4 py-2 text-sm font-medium text-primary">
                {viewedApplicant.matchScore || 0}% Match
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-border bg-white p-5">
                <p className="text-sm text-muted">Status</p>
                <p className="mt-2 text-lg font-semibold text-primary">
                  {viewedApplicant.status}
                </p>
              </div>
              <div className="rounded-[24px] border border-border bg-white p-5">
                <p className="text-sm text-muted">Current Degree</p>
                <p className="mt-2 text-lg font-semibold text-primary">
                  {viewedApplicant.student?.college || "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-border bg-white p-5">
                <p className="text-sm text-muted">Location</p>
                <p className="mt-2 text-lg font-semibold text-primary">
                  {viewedApplicant.student?.location || "N/A"}
                </p>
              </div>
              <div className="rounded-[24px] border border-border bg-white p-5">
                <p className="text-sm text-muted">GitHub</p>
                {viewedApplicant.student?.github ? (
                  <a
                    href={viewedApplicant.student.github}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-sm text-primary transition hover:text-primary/80"
                  >
                    View GitHub
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-muted">Not provided</p>
                )}
              </div>
              <div className="rounded-[24px] border border-border bg-white p-5">
                <p className="text-sm text-muted">LinkedIn</p>
                {viewedApplicant.student?.linkedin ? (
                  <a
                    href={viewedApplicant.student.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-sm text-primary transition hover:text-primary/80"
                  >
                    View LinkedIn
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-muted">Not provided</p>
                )}
              </div>
            </div>

            {viewedApplicant.student?.resumeUrl && (
              <div className="mt-6 rounded-[24px] border border-border bg-white p-5">
                <p className="text-sm text-muted">Resume</p>
                <a
                  href={viewedApplicant.student.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm text-primary transition hover:text-primary/80"
                >
                  View resume
                </a>
              </div>
            )}

            <div className="mt-6">
              <p className="text-sm font-medium text-primary">Skills</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(viewedApplicant.student?.skills || [])
                  .slice(0, 10)
                  .map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-stone px-3 py-2 text-sm text-primary"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-medium text-primary">Bio</p>
              <p className="mt-3 text-muted leading-7">
                {viewedApplicant.student?.bio || "No bio available."}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 justify-end">
              <button
                onClick={closeViewModal}
                className="h-11 rounded-2xl border border-border bg-white px-5 text-sm font-medium text-primary transition hover:border-primary"
              >
                Close
              </button>

              {getAvailableActions(viewedApplicant.status).length === 0 ? (
                <div className="h-11 rounded-2xl bg-stone px-5 text-sm font-medium text-muted flex items-center">
                  Final Status - No actions available
                </div>
              ) : (
                <>
                  {getAvailableActions(viewedApplicant.status).map(
                    (nextStatusOption) => (
                      <button
                        key={nextStatusOption}
                        onClick={() => {
                          openActionModal(
                            viewedApplicant._id,
                            nextStatusOption,
                          );
                          closeViewModal();
                        }}
                        className={`h-11 rounded-2xl px-5 text-sm font-medium text-white transition ${
                          nextStatusOption === APPLICATION_STATUS.REJECTED
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-primary hover:bg-primary/90"
                        }`}
                      >
                        {nextStatusOption === APPLICATION_STATUS.SHORTLISTED
                          ? "Shortlist"
                          : nextStatusOption === APPLICATION_STATUS.INTERVIEW
                            ? "Interview"
                            : nextStatusOption === APPLICATION_STATUS.SELECTED
                              ? "Select"
                              : "Reject"}
                      </button>
                    ),
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* CONFIRM STATUS CHANGE MODAL */}
      <ConfirmModal
        open={!!selectedApplication}
        onClose={closeModal}
        onConfirm={confirmAction}
        loading={actionLoading}
        variant={
          nextStatus === APPLICATION_STATUS.REJECTED ? "danger" : "primary"
        }
        title={
          nextStatus === APPLICATION_STATUS.REJECTED
            ? "Reject Applicant"
            : `Move to ${nextStatus}`
        }
        description={`
          Applicant status will be
          updated to ${nextStatus}.
        `}
        confirmText="Continue"
      />
    </DashboardLayout>
  );
}

// COMPACT STAT CARD
function StatCard({ title, value, icon }) {
  return (
    <div
      className="
        bg-white
        border
        border-border
        rounded-[24px]

        px-4
        py-4

        sm:p-6
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div>
          <p
            className="
              text-xs
              sm:text-sm
              text-muted
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-2
              text-2xl
              sm:text-3xl
              font-semibold
              text-primary
            "
          >
            {value}
          </h2>
        </div>

        <div
          className="
            w-10
            h-10
            sm:w-11
            sm:h-11

            rounded-2xl
            bg-stone

            flex
            items-center
            justify-center

            text-primary
            shrink-0
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default ApplicantReviewPage;
