import {
  useEffect,
} from "react";

import {
  BriefcaseBusiness,
  CalendarDays,
} from "lucide-react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import PageHeader
from "../../components/layout/PageHeader";

import Skeleton
from "../../components/ui/Skeleton";

import EmptyState
from "../../components/ui/EmptyState";

import Badge
from "../../components/ui/Badge";

import useApplications
from "../../hooks/useApplications";

function MyApplicationsPage() {

  const {

    applications,

    loading,

    fetchApplications,

  } = useApplications();

  // FETCH APPLICATIONS
  useEffect(() => {

    fetchApplications();

  }, []);

  // STATUS COLOR
  const getStatusStyle =
    (status) => {

      switch (status) {

        case "accepted":

          return `
            bg-green-100
            text-green-700
          `;

        case "rejected":

          return `
            bg-red-100
            text-red-700
          `;

        case "interview":

          return `
            bg-blue-100
            text-blue-700
          `;

        default:

          return `
            bg-yellow-100
            text-yellow-700
          `;
      }
    };

  return (
    <DashboardLayout>

      {/* HEADER */}
      <PageHeader
        title="My Applications"
        description="
          Track the status of your
          internship applications.
        "
      />

      {/* CONTENT */}
      <div className="mt-10">

        {loading ? (
  <div
    className="
      grid
      grid-cols-1
      xl:grid-cols-2
      gap-6
    "
  >
    {[...Array(4)].map((_, index) => (
      <div
        key={index}
        className="
          p-7
          rounded-[32px]
          bg-white
          border
          border-border
          space-y-5
        "
      >
        {/* COMPANY */}
        <Skeleton
          className="
            h-4
            w-24
          "
        />

        {/* TITLE */}
        <Skeleton
          className="
            h-8
            w-3/4
          "
        />

        {/* STATUS */}
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <Skeleton
            className="
              h-6
              w-24
            "
          />

          <Skeleton
            className="
              h-10
              w-28
              rounded-full
            "
          />
        </div>

        {/* SKILLS */}
        <div className="flex gap-3">
          <Skeleton
            className="
              h-8
              w-20
            "
          />

          <Skeleton
            className="
              h-8
              w-20
            "
          />

          <Skeleton
            className="
              h-8
              w-20
            "
          />
        </div>

        {/* META */}
        <div
          className="
            flex
            gap-4
            pt-2
          "
        >
          <Skeleton
            className="
              h-5
              w-28
            "
          />

          <Skeleton
            className="
              h-5
              w-36
            "
          />
        </div>

        {/* AI SCORE */}
        <Skeleton
          className="
            h-10
            w-32
            rounded-full
          "
        />
      </div>
    ))}
  </div>
) : applications.length === 0 ? (

          <EmptyState
            title="No applications yet"
            description="
              Start applying to internships
              to track them here.
            "
          />

        ) : (

          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-6
            "
          >

            {applications.map(
              (application) => {

                const job =
                  application.job;

                return (

                  <div
                    key={
                      application._id
                    }

                    className="
                      bg-white
                      border
                      border-border
                      rounded-[32px]
                      p-7
                      shadow-soft
                    "
                  >

                    {/* TOP */}
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >

                      <div>

                        <p
                          className="
                            text-sm
                            text-muted
                          "
                        >
                          {job?.company}
                        </p>

                        <h2
                          className="
                            mt-2
                            text-2xl
                            font-semibold
                            text-primary
                          "
                        >
                          {job?.title}
                        </h2>

                      </div>

                      {/* STATUS */}
                      <div
                        className={`
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          font-medium
                          capitalize

                          ${getStatusStyle(
                            application.status
                          )}
                        `}
                      >

                        {
                          application.status
                        }

                      </div>

                    </div>

                    {/* SKILLS */}
                    <div
                      className="
                        mt-6
                        flex
                        flex-wrap
                        gap-3
                      "
                    >

                      {job?.requiredSkills
                        ?.slice(0, 4)
                        .map((skill) => (

                          <Badge
                            key={skill}
                          >
                            {skill}
                          </Badge>

                        ))}

                    </div>

                    {/* META */}
                    <div
                      className="
                        mt-8
                        flex
                        flex-wrap
                        items-center
                        gap-5
                        text-sm
                        text-muted
                      "
                    >

                      {/* TYPE */}
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <BriefcaseBusiness
                          size={16}
                        />

                        <span
                          className="
                            capitalize
                          "
                        >
                          {job?.type}
                        </span>

                      </div>

                      {/* DATE */}
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <CalendarDays
                          size={16}
                        />

                        <span>

                          Applied on{" "}

                          {new Date(
                            application.createdAt
                          ).toLocaleDateString()}

                        </span>

                      </div>

                    </div>

                    {/* AI SCORE */}
                    {application.matchScore >
                      0 && (

                      <div
                        className="
                          mt-6
                          inline-flex
                          items-center
                          gap-2
                          px-4
                          py-2
                          rounded-full
                          bg-blue-50
                          text-accent
                          text-sm
                          font-semibold
                        "
                      >

                        <span>

                          {
                            application.matchScore
                          }
                          % Score

                        </span>

                      </div>

                    )}

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default MyApplicationsPage;