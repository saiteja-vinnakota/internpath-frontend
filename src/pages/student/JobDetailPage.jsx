import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import JobDetailPanel from "../../components/job/JobDetailPanel";
import AIMatchSection from "../../components/ai/AIMatchSection";
import Skeleton from "../../components/ui/Skeleton";
import ErrorState from "../../components/ui/ErrorState";
import { showToast } from "../../utils/toastService";

import useJob from "../../hooks/useJob";
import useAIMatch from "../../hooks/useAIMatch";
import useApplications from "../../hooks/useApplications";
import { useAuth } from "../../context/AuthContext";

function JobDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const { job, loading, error } = useJob(id);

  const {
    matchData,
    loading: aiLoading,
    fetchScore,
  } = useAIMatch();

  const {
    applications,
    fetchApplications,
    handleApply: applyToJob,
    applyingJobId,
  } = useApplications();

  const isStudent = user?.role === "student";

  const matchSectionRef = useRef(null);

  // Load user's applications
  useEffect(() => {
    if (!isStudent || !id) return;

    fetchApplications();
  }, [id, isStudent]);

  // Find application for this job
  const currentApplication = useMemo(() => {
    return (
      applications.find(
        (application) =>
          application.job?._id === id || application.job === id
      ) || null
    );
  }, [applications, id]);

  const alreadyApplied = Boolean(currentApplication);

  // Always fetch AI score (backend returns cached score if available)
  useEffect(() => {
    if (!isStudent || !id) return;

    fetchScore(id).catch(() => {});
  }, [id, isStudent]);

  const handleApply = async (jobId) => {
    const success = await applyToJob(jobId);

    if (success) {
      // Refresh applications so button changes immediately
      await fetchApplications();

      // Refresh AI score
      try {
        await fetchScore(jobId, true);
      } catch {}

      return;
    }

    if (!matchData?.score) {
      showToast.error("Check your AI match score first, then apply.");

      matchSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <DashboardLayout>
      {loading ? (
        <div className="space-y-5">
          <div className="bg-white border border-border rounded-[28px] p-8 space-y-6">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-9 w-80" />

            <div className="flex gap-3">
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>

            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>

          {isStudent && (
            <Skeleton className="h-40 w-full rounded-[28px]" />
          )}
        </div>
      ) : error ? (
        <ErrorState
          title="Failed to load job"
          description={error}
        />
      ) : (
        <div className="space-y-5">
          <JobDetailPanel
            job={job}
            onApply={handleApply}
            isApplying={applyingJobId === id}
            alreadyApplied={alreadyApplied}
          />

          {isStudent && (
            <div ref={matchSectionRef}>
              <AIMatchSection
                matchData={matchData}
                loading={aiLoading}
                hasResume={Boolean(user?.resumeUrl)}
                onFetchScore={() => fetchScore(id)}
                onRefresh={() => fetchScore(id, true)}
              />
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

export default JobDetailPage;