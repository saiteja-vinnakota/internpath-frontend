import { Eye } from "lucide-react";

import { formatDate } from "../../utils/formatDate";

import { formatStatus, getStatusColor } from "../../utils/formatStatus";

import Button from "../ui/Button";

import EmptyState from "../ui/EmptyState";

import Skeleton from "../ui/Skeleton";

function ApplicationTable({
  applications = [],

  onView,

  loading = false,

  showEmptyState = true,
}) {
  if (loading && applications.length === 0) {
    return (
      <div
        className="
          bg-white
          border
          border-border
          rounded-[32px]
          overflow-hidden
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-stone">
                {Array.from({ length: 5 }).map((_, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left text-sm font-semibold text-primary"
                  >
                    <Skeleton className="h-4 w-24" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, index) => (
                <tr key={index} className="border-b border-border">
                  {[...Array(5)].map((__, cellIndex) => (
                    <td key={cellIndex} className="px-6 py-5">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    if (!showEmptyState) {
      return null;
    }

    return (
      <EmptyState
        title="
          No Applications
        "
        description="
          No students have
          applied yet.
        "
      />
    );
  }

  return (
    <div
      className="
        bg-white

        border
        border-border

        rounded-[32px]

        overflow-hidden
      "
    >
      <div
        className="
          overflow-x-auto
        "
      >
        <table
          className="
            w-full
          "
        >
          <thead>
            <tr
              className="
                border-b
                border-border

                bg-stone
              "
            >
              <th
                className="
                  px-6
                  py-4

                  text-left

                  text-sm
                  font-semibold
                  text-primary
                "
              >
                Student
              </th>

              <th
                className="
                  px-6
                  py-4

                  text-left

                  text-sm
                  font-semibold
                  text-primary
                "
              >
                Email
              </th>

              <th
                className="
                  px-6
                  py-4

                  text-left

                  text-sm
                  font-semibold
                  text-primary
                "
              >
                Status
              </th>

              <th
                className="
                  px-6
                  py-4

                  text-left

                  text-sm
                  font-semibold
                  text-primary
                "
              >
                Applied
              </th>

              <th
                className="
                  px-6
                  py-4

                  text-right

                  text-sm
                  font-semibold
                  text-primary
                "
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => {
              const colors = getStatusColor(application.status);

              return (
                <tr
                  key={application._id}
                  className="
                      border-b
                      border-border

                      hover:bg-stone/40

                      transition-colors
                    "
                >
                  {/* STUDENT */}

                  <td
                    className="
                        px-6
                        py-5
                      "
                  >
                    <div>
                      <p
                        className="
                            font-medium
                            text-primary
                          "
                      >
                        {application.student?.name}
                      </p>
                    </div>
                  </td>

                  {/* EMAIL */}

                  <td
                    className="
                        px-6
                        py-5

                        text-muted
                      "
                  >
                    {application.student?.email}
                  </td>

                  {/* STATUS */}

                  <td
                    className="
                        px-6
                        py-5
                      "
                  >
                    <span
                      className={`
                          inline-flex

                          px-3
                          py-1

                          rounded-full

                          text-xs
                          font-medium

                          ${colors.bg}
                          ${colors.text}
                        `}
                    >
                      {formatStatus(application.status)}
                    </span>
                  </td>

                  {/* DATE */}

                  <td
                    className="
                        px-6
                        py-5

                        text-muted
                      "
                  >
                    {formatDate(application.createdAt)}
                  </td>

                  {/* ACTION */}

                  <td
                    className="
                        px-6
                        py-5

                        text-right
                      "
                  >
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onView?.(application)}
                    >
                      <Eye size={16} />
                      View profile
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApplicationTable;
