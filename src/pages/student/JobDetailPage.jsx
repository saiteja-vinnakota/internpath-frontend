import { useEffect, useRef, useState } from "react";
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

  const { matchData, loading: aiLoading, fetchScore } = useAIMatch();
  const {
    applications,
    fetchApplications,
    handleApply: applyToJob,
    applyingJobId,
    hasApplied,
  } = useApplications();

  const isStudent = user?.role === "student";
  const matchSectionRef = useRef(null);

  // Auto-load existing match score on mount.
  // If a MatchCache entry exists for this student+job (whether they applied
  // or just previously checked), serve it immediately from the backend cache
  // so the "Check Match Score" button never shows when a score already exists.
  useEffect(() => {
    if (!isStudent || !id || !user?.resumeUrl) return;
    fetchScore(id).catch(() => {
      // Silently ignore — if no cache exists yet, AIMatchSection will show
      // the "Check Match Score" button, which is the correct empty state.
    });
  }, [isStudent, id, user?.resumeUrl]);

  // Fetch applications on mount for hasApplied() state
  useEffect(() => {
    if (!isStudent || !id) return;
    fetchApplications();
  }, [isStudent, id]);

  // ── APPLY FLOW ──
  const handleApply = async (jobId) => {
    const success = await applyToJob(jobId);

    if (success) {
      // Re-fetch immediately so hasApplied() returns true and the button
      // switches to "Already Applied" without requiring a page refresh.
      await fetchApplications();
    } else if (!matchData?.score) {
      showToast.error("Check your AI match score first, then apply.");
      matchSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Derive applied state from the live applications list
  const alreadyApplied = hasApplied(id);

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
          {isStudent && <Skeleton className="h-40 w-full rounded-[28px]" />}
        </div>
      ) : error ? (
        <ErrorState title="Failed to load job" description={error} />
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