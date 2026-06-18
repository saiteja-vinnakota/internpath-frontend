import { useEffect } from "react";

import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";

import JobDetailPanel from "../../components/job/JobDetailPanel";

import AIScoreCard from "../../components/ai/AIScoreCard";

import MatchBreakdown from "../../components/ai/MatchBreakdown";

import Skeleton from "../../components/ui/Skeleton";

import ErrorState from "../../components/ui/ErrorState";

import useJob from "../../hooks/useJob";

import useAIMatch from "../../hooks/useAIMatch";

import { useAuth } from "../../context/AuthContext";

function JobDetailPage() {
  const { id } = useParams();

  const { user } = useAuth();

  const {
    job,

    loading,

    error,
  } = useJob(id);

  const {
    matchData,

    loading: aiLoading,

    fetchScore,
  } = useAIMatch();

  // FETCH AI MATCH
  useEffect(() => {
    if (id && user?.role === "student") {
      fetchScore(id);
    }
  }, [id, user]);

  return (
    <DashboardLayout>
      {loading ? (
        <div
          className="
            space-y-6
          "
        >
          {/* JOB PANEL */}
          <div
            className="
              bg-white
              border
              border-border
              rounded-[36px]
              p-8
              space-y-8
            "
          >
            {/* HEADER */}
            <div
              className="
                flex
                flex-col
                lg:flex-row
                lg:items-start
                lg:justify-between
                gap-6
              "
            >
              <div className="space-y-4">
                <Skeleton
                  className="
                    h-4
                    w-28
                  "
                />

                <Skeleton
                  className="
                    h-10
                    w-[320px]
                  "
                />

                <div className="flex gap-3">
                  <Skeleton
                    className="
                      h-8
                      w-24
                      rounded-full
                    "
                  />

                  <Skeleton
                    className="
                      h-8
                      w-24
                      rounded-full
                    "
                  />

                  <Skeleton
                    className="
                      h-8
                      w-24
                      rounded-full
                    "
                  />
                </div>
              </div>

              <Skeleton
                className="
                  h-12
                  w-40
                  rounded-2xl
                "
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-4">
              <Skeleton
                className="
                  h-6
                  w-40
                "
              />

              <Skeleton
                className="
                  h-5
                  w-full
                "
              />

              <Skeleton
                className="
                  h-5
                  w-full
                "
              />

              <Skeleton
                className="
                  h-5
                  w-3/4
                "
              />
            </div>

            {/* SKILLS */}
            <div className="space-y-4">
              <Skeleton
                className="
                  h-6
                  w-32
                "
              />

              <div className="flex flex-wrap gap-3">
                <Skeleton
                  className="
                    h-9
                    w-24
                    rounded-full
                  "
                />

                <Skeleton
                  className="
                    h-9
                    w-28
                    rounded-full
                  "
                />

                <Skeleton
                  className="
                    h-9
                    w-24
                    rounded-full
                  "
                />
              </div>
            </div>
          </div>

          {/* AI SKELETON */}
          {user?.role === "student" && (
            <div
              className="
                bg-white
                border
                border-border
                rounded-[36px]
                p-8
                space-y-6
              "
            >
              <Skeleton
                className="
                  h-10
                  w-52
                "
              />

              <Skeleton
                className="
                  h-5
                  w-full
                "
              />

              <Skeleton
                className="
                  h-40
                  w-full
                  rounded-[28px]
                "
              />
            </div>
          )}
        </div>
      ) : error ? (
        <ErrorState title="Failed to load job" description={error} />
      ) : (
        <div
          className="
            space-y-6
          "
        >
          {/* JOB DETAILS */}
          <JobDetailPanel job={job} aiScore={matchData?.score || 0} />

          {/* AI SECTION */}
          {user?.role === "student" && !aiLoading && matchData && (
            <div
              className="
                mt-6
                space-y-6
              "
            >
              {/* SCORE CARD */}
              <AIScoreCard
                score={matchData.score || 0}
                matchedSkills={matchData.matchedSkills || []}
                missingSkills={matchData.missingSkills || []}
                suggestion={matchData.suggestion || ""}
              />

              {/* BREAKDOWN */}
              <MatchBreakdown
                score={matchData.score || 0}
                matchedSkills={matchData.matchedSkills || []}
                missingSkills={matchData.missingSkills || []}
                suggestion={matchData.suggestion || ""}
              />
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

export default JobDetailPage;
