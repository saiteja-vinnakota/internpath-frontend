import {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import PageHeader
from "../../components/layout/PageHeader";

import Skeleton
from "../../components/ui/Skeleton";

import EmptyState
from "../../components/ui/EmptyState";

import ApplicationCard
from "../../components/cards/ApplicationCard";

import ApplicationTimeline
from "../../components/application/ApplicationTimeline";

import useApplications
from "../../hooks/useApplications";

function MyApplicationsPage() {

  const {

    applications,

    loading,

    fetchApplications,

  } = useApplications();

  // SELECTED APPLICATION
  const [

    selectedApplication,

    setSelectedApplication,

  ] = useState(null);

  // FETCH
  useEffect(() => {

    fetchApplications();

  }, []);

  // DEFAULT SELECT
  useEffect(() => {

    if (
      applications.length > 0 &&
      !selectedApplication
    ) {

      setSelectedApplication(
        applications[0]
      );
    }

  }, [applications]);

  return (
    <DashboardLayout>

      {/* HEADER */}
      <PageHeader
        title="My Applications"
        description="
          Track your internship
          application progress and
          hiring stages.
        "
      />

      {/* CONTENT */}
      <div className="mt-10">

        {/* LOADING */}
        {loading ? (

          <div
            className="
              grid
              grid-cols-1
              2xl:grid-cols-3
              gap-6
            "
          >

            {/* LEFT */}
            <div
              className="
                2xl:col-span-2
                space-y-6
              "
            >

              {[...Array(3)].map(
                (_, index) => (

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

                    <Skeleton
                      className="
                        h-4
                        w-24
                      "
                    />

                    <Skeleton
                      className="
                        h-8
                        w-3/4
                      "
                    />

                    <Skeleton
                      className="
                        h-24
                        w-full
                        rounded-[24px]
                      "
                    />

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

                    </div>

                  </div>

                )
              )}

            </div>

            {/* RIGHT */}
            <div>

              <div
                className="
                  p-7
                  rounded-[32px]
                  bg-white
                  border
                  border-border
                  space-y-5
                "
              >

                <Skeleton
                  className="
                    h-8
                    w-48
                  "
                />

                <Skeleton
                  className="
                    h-20
                    w-full
                    rounded-[24px]
                  "
                />

                <Skeleton
                  className="
                    h-20
                    w-full
                    rounded-[24px]
                  "
                />

              </div>

            </div>

          </div>

        ) : applications.length === 0 ? (

          <EmptyState
            title="
              No applications yet
            "
            description="
              Start applying to internships
              to track your progress here.
            "
          />

        ) : (

          <div
            className="
              grid
              grid-cols-1
              2xl:grid-cols-3
              gap-6
              items-start
            "
          >

            {/* APPLICATION LIST */}
            <div
              className="
                2xl:col-span-2
                space-y-6
              "
            >

              {applications.map(
                (application) => (

                  <div
                    key={
                      application._id
                    }
                    onClick={() =>

                      setSelectedApplication(
                        application
                      )
                    }
                    className={`
                      cursor-pointer
                      transition-all

                      ${selectedApplication?._id ===
                        application._id

                        ? `
                          ring-2
                          ring-primary
                          rounded-[34px]
                        `

                        : ""
                      }
                    `}
                  >

                    <ApplicationCard
                      application={
                        application
                      }
                    />

                  </div>

                )
              )}

            </div>

            {/* TIMELINE */}
            <div
              className="
                sticky
                top-24
              "
            >

              {selectedApplication && (

                <ApplicationTimeline
                  status={
                    selectedApplication.status
                  }
                />

              )}

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default MyApplicationsPage;