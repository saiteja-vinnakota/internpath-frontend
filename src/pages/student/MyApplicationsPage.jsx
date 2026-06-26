import { useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import ApplicationCard from "../../components/cards/ApplicationCard";
import ApplicationTimeline from "../../components/application/ApplicationTimeline";
import useApplications from "../../hooks/useApplications";
import { APPLICATION_STATUS } from "../../constants/applicationStatus";

const STATUS_FILTERS = [
  { label: "All",         value: ""                              },
  { label: "Applied",     value: APPLICATION_STATUS.APPLIED      },
  { label: "Shortlisted", value: APPLICATION_STATUS.SHORTLISTED  },
  { label: "Interview",   value: APPLICATION_STATUS.INTERVIEW    },
  { label: "Selected",    value: APPLICATION_STATUS.SELECTED     },
  { label: "Rejected",    value: APPLICATION_STATUS.REJECTED     },
];

// pill color per status — matches ApplicationStatusBadge exactly
const STATUS_ACTIVE_STYLE = {
  [APPLICATION_STATUS.APPLIED]:     "bg-blue-50 text-blue-700 border-blue-200",
  [APPLICATION_STATUS.SHORTLISTED]: "bg-purple-50 text-purple-700 border-purple-200",
  [APPLICATION_STATUS.INTERVIEW]:   "bg-amber-50 text-amber-700 border-amber-200",
  [APPLICATION_STATUS.SELECTED]:    "bg-green-50 text-green-700 border-green-200",
  [APPLICATION_STATUS.REJECTED]:    "bg-red-50 text-red-700 border-red-200",
};

function MyApplicationsPage() {
  const { applications, loading, fetchApplications } = useApplications();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => { fetchApplications(); }, []);

  // auto-select first on load
  useEffect(() => {
    if (applications.length > 0 && !selectedApplication) {
      setSelectedApplication(applications[0]);
    }
  }, [applications]);

  // client-side filter + search
  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        !search ||
        app.job?.title?.toLowerCase().includes(search.toLowerCase()) ||
        app.job?.company?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = !statusFilter || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  const pillBase = "h-8 px-3 rounded-lg text-xs font-medium border transition-all whitespace-nowrap";
  const pillInactive = "bg-stone border-border text-muted hover:border-primary hover:text-primary";
  const pillAllActive = "bg-primary text-white border-primary";

  return (
    <DashboardLayout>

      <PageHeader
        title="My Applications"
        description="Track your internship application progress and hiring stages."
      />

      {/* ── SEARCH + FILTERS ── */}
      <div className="bg-white border border-border rounded-[20px] p-3 mb-6 flex flex-wrap items-center gap-2">

        {/* SEARCH */}
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or company..."
            className="w-full h-8 pl-8 pr-3 rounded-lg bg-stone border border-border text-xs text-primary placeholder:text-muted outline-none focus:border-primary focus:bg-white transition-colors"
          />
        </div>

        {/* DIVIDER */}
        <div className="w-px h-5 bg-border shrink-0" />

        {/* STATUS PILLS */}
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`${pillBase} ${
              statusFilter === f.value
                ? f.value === ""
                  ? pillAllActive
                  : `${STATUS_ACTIVE_STYLE[f.value]} font-semibold`
                : pillInactive
            }`}
          >
            {f.label}
          </button>
        ))}

      </div>

      {/* ── LOADING ── */}
      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 items-start">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-5 rounded-[24px] bg-white border border-border space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-2 w-full rounded-full" />
                <div className="flex gap-3 pt-1">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-[24px] bg-white border border-border space-y-4">
            <Skeleton className="h-5 w-36" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-9 w-9 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── EMPTY ── */}
      {!loading && applications.length === 0 && (
        <EmptyState
          title="No applications yet"
          description="Start applying to internships to track your progress here."
        />
      )}

      {/* ── CONTENT ── */}
      {!loading && applications.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_325px] gap-5 items-start">

          {/* APPLICATION LIST */}
          <div className="space-y-3 min-w-0">

            {filtered.length === 0 ? (
              <EmptyState
                title="No results"
                description="Try a different search or filter."
              />
            ) : (
              filtered.map((application) => (
                <div
                  key={application._id}
                  onClick={() => setSelectedApplication(application)}
                  className={`cursor-pointer transition-all rounded-[26px] ${
                    selectedApplication?._id === application._id
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                >
                  <ApplicationCard application={application} />
                </div>
              ))
            )}

          </div>

          {/* ── TIMELINE PANEL ── */}
          <div className="sticky top-24">
            {selectedApplication && (
              <div className="bg-white border border-border rounded-[24px] p-5">

                {/* PANEL HEADER */}
                <div className="pb-4 mb-4 border-b border-border">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-muted">
                    Application Progress
                  </p>
                  <p className="mt-1 text-sm font-semibold text-primary line-clamp-1">
                    {selectedApplication.job?.title}
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    {selectedApplication.job?.company}
                  </p>
                </div>

                <ApplicationTimeline status={selectedApplication.status} />

              </div>
            )}
          </div>

        </div>
      )}

    </DashboardLayout>
  );
}

export default MyApplicationsPage;