import {
  useEffect,
  useMemo,
} from "react";

import {
  Link,
} from "react-router-dom";

import {

  BriefcaseBusiness,

  FileText,

  Users,

  BadgeCheck,

  TrendingUp,

  Clock3,

  ArrowRight,

} from "lucide-react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import PageHeader
from "../../components/layout/PageHeader";

import StatCard
from "../../components/cards/StatCard";

import JobList
from "../../components/job/JobList";

import EmptyState
from "../../components/ui/EmptyState";

import Button
from "../../components/ui/Button";

import useJobs
from "../../hooks/useJobs";

function RecruiterDashboard() {

  const {

    jobs = [],

    loading,

    error,

    fetchRecruiterJobs,

  } = useJobs();

  // FETCH
  useEffect(() => {

    fetchRecruiterJobs();

  }, []);

  // STATS
  const analytics =
    useMemo(() => {

      const totalJobs =
        jobs.length;

      const activeJobs =
        jobs.filter(
          (job) => job.isActive
        ).length;

      const totalApplications =
        jobs.reduce(

          (acc, job) =>

            acc +
            (job.applicationsCount || 0),

          0
        );

      const totalOpenings =
        jobs.reduce(

          (acc, job) =>

            acc +
            (job.openingsCount || 0),

          0
        );

      const averageApplications =
        totalJobs > 0

          ? Math.round(
              totalApplications /
                totalJobs
            )

          : 0;

      const topPerformingJob =
        [...jobs].sort(

          (a, b) =>

            (b.applicationsCount || 0) -
            (a.applicationsCount || 0)
        )[0];

      return {

        totalJobs,

        activeJobs,

        totalApplications,

        totalOpenings,

        averageApplications,

        topPerformingJob,
      };

    }, [jobs]);

  return (
    <DashboardLayout>

      {/* HEADER */}
      <PageHeader
        title="Recruiter Dashboard"
        description="
          Track hiring performance,
          manage internships,
          and review applicants.
        "
      />

      {/* ANALYTICS */}
      <div
        className="
          mt-8
          grid
          grid-cols-2
          xl:grid-cols-4
          gap-4
          sm:gap-6
        "
      >

        <StatCard
          title="Internships"
          value={
            analytics.totalJobs
          }
          icon={BriefcaseBusiness}
        />

        <StatCard
          title="Applications"
          value={
            analytics.totalApplications
          }
          icon={FileText}
        />

        <StatCard
          title="Active Jobs"
          value={
            analytics.activeJobs
          }
          icon={BadgeCheck}
        />

        <StatCard
          title="Openings"
          value={
            analytics.totalOpenings
          }
          icon={Users}
        />

      </div>

      {/* INSIGHTS */}
      {!loading && !error && (

        <div
          className="
            mt-8
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-6
          "
        >

          {/* HIRING OVERVIEW */}
          <div
            className="
              xl:col-span-2
              bg-white
              border
              border-border
              rounded-[32px]
              p-6
            "
          >

            {/* HEADER */}
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                flex-wrap
              "
            >

              <div>

                <h2
                  className="
                    text-2xl
                    font-semibold
                    text-primary
                  "
                >

                  Hiring Overview

                </h2>

                <p
                  className="
                    mt-2
                    text-muted
                  "
                >

                  Quick insights into
                  your internship performance.

                </p>

              </div>

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-blue-50
                  text-accent
                  flex
                  items-center
                  justify-center
                "
              >

                <TrendingUp
                  size={22}
                />

              </div>

            </div>

            {/* METRICS */}
            <div
              className="
                mt-8
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-5
              "
            >

              {/* AVG APPLICATIONS */}
              <div
                className="
                  p-5
                  rounded-[28px]
                  bg-stone
                  border
                  border-border
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-blue-50
                    text-accent
                    flex
                    items-center
                    justify-center
                  "
                >

                  <Users
                    size={20}
                  />

                </div>

                <p
                  className="
                    mt-5
                    text-sm
                    text-muted
                  "
                >

                  Average Applications

                </p>

                <h3
                  className="
                    mt-2
                    text-3xl
                    font-semibold
                    text-primary
                  "
                >

                  {
                    analytics.averageApplications
                  }

                </h3>

              </div>

              {/* ACTIVE RATE */}
              <div
                className="
                  p-5
                  rounded-[28px]
                  bg-stone
                  border
                  border-border
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-green-50
                    text-green-700
                    flex
                    items-center
                    justify-center
                  "
                >

                  <Clock3
                    size={20}
                  />

                </div>

                <p
                  className="
                    mt-5
                    text-sm
                    text-muted
                  "
                >

                  Active Internship Rate

                </p>

                <h3
                  className="
                    mt-2
                    text-3xl
                    font-semibold
                    text-primary
                  "
                >

                  {analytics.totalJobs > 0

                    ? Math.round(

                        (
                          analytics.activeJobs /

                          analytics.totalJobs
                        ) * 100
                      )

                    : 0}

                  %

                </h3>

              </div>

            </div>

          </div>

          {/* TOP JOB */}
          <div
            className="
              bg-white
              border
              border-border
              rounded-[32px]
              p-6
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                gap-3
              "
            >

              <div>

                <h2
                  className="
                    text-xl
                    font-semibold
                    text-primary
                  "
                >

                  Top Internship

                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    text-muted
                  "
                >

                  Highest performing listing

                </p>

              </div>

              <div
                className="
                  w-11
                  h-11
                  rounded-2xl
                  bg-blue-50
                  text-accent
                  flex
                  items-center
                  justify-center
                "
              >

                <BriefcaseBusiness
                  size={20}
                />

              </div>

            </div>

            {analytics.topPerformingJob ? (

              <div className="mt-8">

                <div
                  className="
                    p-5
                    rounded-[28px]
                    bg-stone
                    border
                    border-border
                  "
                >

                  <p
                    className="
                      text-sm
                      text-muted
                    "
                  >

                    {
                      analytics.topPerformingJob.company
                    }

                  </p>

                  <h3
                    className="
                      mt-2
                      text-xl
                      font-semibold
                      text-primary
                    "
                  >

                    {
                      analytics.topPerformingJob.title
                    }

                  </h3>

                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div>

                      <p
                        className="
                          text-sm
                          text-muted
                        "
                      >

                        Applications

                      </p>

                      <h4
                        className="
                          mt-1
                          text-2xl
                          font-semibold
                          text-primary
                        "
                      >

                        {
                          analytics
                            .topPerformingJob
                            .applicationsCount
                        }

                      </h4>

                    </div>

                    <Link
                      to={`
                        /recruiter/applicants/
                        ${
                          analytics
                            .topPerformingJob
                            ._id
                        }
                      `}
                    >

                      <Button
                        className="
                          rounded-2xl
                        "
                      >

                        View

                        <ArrowRight
                          size={16}
                        />

                      </Button>

                    </Link>

                  </div>

                </div>

              </div>

            ) : (

              <div className="mt-8">

                <EmptyState
                  title="
                    No data available
                  "
                  description="
                    Post internships to
                    see performance insights.
                  "
                />

              </div>

            )}

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

      {/* INTERNSHIPS */}
      {!error && (

        <div className="mt-12">

          {/* HEADER */}
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              flex-wrap
            "
          >

            <div>

              <h2
                className="
                  text-2xl
                  font-semibold
                  text-primary
                "
              >

                Your Internships

              </h2>

              <p
                className="
                  mt-2
                  text-muted
                "
              >

                Manage and track your
                posted internship listings.

              </p>

            </div>

          </div>

          {/* LIST */}
          <div className="mt-6">

            <JobList
              jobs={jobs}
              loading={loading}
              recruiterMode={true}
              emptyTitle="
                No internships posted
              "
              emptyDescription="
                Start by posting your
                first internship.
              "
            />

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}

export default RecruiterDashboard;