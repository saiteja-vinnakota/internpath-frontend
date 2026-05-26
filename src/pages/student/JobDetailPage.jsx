import {
  useParams,
} from "react-router-dom";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import JobDetailPanel
from "../../components/job/JobDetailPanel";

import Skeleton
from "../../components/ui/Skeleton";

import ErrorState
from "../../components/ui/ErrorState";

import useJob
from "../../hooks/useJob";

function JobDetailPage() {

  const { id } =
    useParams();

  const {

    job,

    loading,

    error,

  } = useJob(id);

  return (
    <DashboardLayout>

      {loading ? (

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

              {/* COMPANY */}
              <Skeleton
                className="
                  h-4
                  w-28
                "
              />

              {/* TITLE */}
              <Skeleton
                className="
                  h-10
                  w-[320px]
                "
              />

              {/* META */}
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

            {/* ACTION BUTTON */}
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

              <Skeleton
                className="
                  h-9
                  w-32
                  rounded-full
                "
              />

            </div>

          </div>

          {/* EXTRA INFO */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-6
            "
          >

            <Skeleton
              className="
                h-28
                rounded-3xl
              "
            />

            <Skeleton
              className="
                h-28
                rounded-3xl
              "
            />

            <Skeleton
              className="
                h-28
                rounded-3xl
              "
            />

          </div>

        </div>

      ) : error ? (

        <ErrorState
          title="Failed to load job"
          description={error}
        />

      ) : (

        <JobDetailPanel
          job={job}
        />

      )}

    </DashboardLayout>
  );
}

export default JobDetailPage;