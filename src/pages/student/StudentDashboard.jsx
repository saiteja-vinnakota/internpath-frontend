import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Bookmark, Sparkles } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/cards/StatCard";
import JobList from "../../components/job/JobList";
import EmptyState from "../../components/ui/EmptyState";

import useJobs from "../../hooks/useJobs";
import useApplications from "../../hooks/useApplications";
import useSavedJobs from "../../hooks/useSavedJobs";

function StudentDashboard() {
  const { jobs = [], loading, error, fetchJobs } = useJobs({ limit: 4 });
  const { applications = [], fetchApplications } = useApplications();
  const { savedJobs, fetchSavedJobs, handleSaveJob, handleRemoveSavedJob } = useSavedJobs();

  useEffect(() => {
    fetchJobs();
    fetchApplications();
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  const totalApplications   = applications?.length || 0;
  const totalSavedJobs      = savedJobs?.length || 0;
  const totalRecommended    = jobs?.length || 0;

  return (
    <DashboardLayout>

      {/* ── HEADER — slightly larger for home page ── */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-primary">
          Student Dashboard
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          Track applications, discover internships, and manage your career journey.
        </p>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Applications"
          value={totalApplications}
          icon={FileText}
          accent="blue"
        />
        <StatCard
          title="Saved Jobs"
          value={totalSavedJobs}
          icon={Bookmark}
          accent="purple"
        />
        <StatCard
          title="Recommended Jobs"
          value={totalRecommended}
          icon={Sparkles}
          accent="green"
        />
      </div>

      {/* ── RECOMMENDED JOBS ── */}
      <div className="mt-10">

        {/* SECTION HEADER */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-primary">Recommended Jobs</h2>
            <p className="mt-0.5 text-sm text-muted">
              Personalized internship opportunities based on your profile.
            </p>
          </div>
          <Link
            to="/jobs"
            className="
              text-xs font-medium text-muted
              hover:text-primary transition-colors
              px-3 py-1.5 rounded-lg border border-border
              hover:bg-stone
            "
          >
            View all →
          </Link>
        </div>

        {error && (
          <EmptyState title="Failed to load jobs" description={error} />
        )}

        {!error && (
          <JobList
            jobs={jobs}
            loading={loading}
            savedJobs={savedJobs}
            onSave={handleSaveJob}
            onRemove={handleRemoveSavedJob}
            emptyTitle="No jobs found"
            emptyDescription="No internships available at the moment."
          />
        )}

      </div>

    </DashboardLayout>
  );
}

export default StudentDashboard;