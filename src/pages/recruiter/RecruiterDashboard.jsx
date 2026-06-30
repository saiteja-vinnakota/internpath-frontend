import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness, FileText, Users, BadgeCheck,
  TrendingUp, Clock3, ArrowRight, Plus, Sparkles,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import JobList from "../../components/job/JobList";
import EmptyState from "../../components/ui/EmptyState";
import useJobs from "../../hooks/useJobs";

// ── STAT CARD ─────────────────────────────────────────────
function StatCard({ title, value, icon: Icon, accent }) {
  const ACCENTS = {
    blue:   { bg: "#E6F1FB", icon: "#185FA5" },
    green:  { bg: "#E1F5EE", icon: "#0F6E56" },
    purple: { bg: "#EEEDFE", icon: "#534AB7" },
    amber:  { bg: "#FAEEDA", icon: "#854F0B" },
  };
  const c = ACCENTS[accent] || ACCENTS.blue;

  return (
    <div className="bg-white border border-border rounded-[24px] p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">{title}</p>
          <p className="mt-2 text-3xl font-bold text-primary tracking-tight">{value ?? "—"}</p>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: c.bg }}>
          <Icon size={18} style={{ color: c.icon }} />
        </div>
      </div>
    </div>
  );
}

// ── METRIC TILE ───────────────────────────────────────────
function MetricTile({ icon: Icon, label, value, accent }) {
  const ACCENTS = {
    blue:  { bg: "bg-blue-50",  icon: "text-blue-600"  },
    green: { bg: "bg-green-50", icon: "text-green-700" },
  };
  const c = ACCENTS[accent] || ACCENTS.blue;

  return (
    <div className="p-5 rounded-[20px] bg-stone border border-border">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.bg}`}>
        <Icon size={17} className={c.icon} />
      </div>
      <p className="mt-4 text-xs text-muted uppercase tracking-wide font-medium">{label}</p>
      <p className="mt-1.5 text-3xl font-bold text-primary tracking-tight">{value}</p>
    </div>
  );
}

// ── QUICK ACTION ──────────────────────────────────────────
function QuickAction({ to, icon: Icon, label, description, accent }) {
  const ACCENTS = {
    blue:  { bg: "bg-blue-50",   icon: "text-blue-600"   },
    green: { bg: "bg-green-50",  icon: "text-green-700"  },
  };
  const c = ACCENTS[accent] || ACCENTS.blue;

  return (
    <Link to={to}
      className="flex items-center gap-4 p-4 rounded-[18px] bg-stone border border-border hover:bg-white hover:border-primary/20 hover:shadow-sm transition-all group">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.bg}`}>
        <Icon size={18} className={c.icon} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-primary">{label}</p>
        <p className="text-xs text-muted mt-0.5">{description}</p>
      </div>
      <ArrowRight size={14} className="text-muted group-hover:text-primary transition-colors flex-shrink-0" />
    </Link>
  );
}

// ── MAIN ─────────────────────────────────────────────────
function RecruiterDashboard() {
  const { jobs = [], loading, error, fetchRecruiterJobs } = useJobs();
  const navigate = useNavigate();

  useEffect(() => { fetchRecruiterJobs(); }, []);

  const analytics = useMemo(() => {
    const totalJobs          = jobs.length;
    const activeJobs         = jobs.filter((j) => j.isActive).length;
    const totalApplications  = jobs.reduce((a, j) => a + (j.applicationsCount || 0), 0);
    const totalOpenings      = jobs.reduce((a, j) => a + (j.openingsCount || 0), 0);
    const avgApplications    = totalJobs > 0 ? Math.round(totalApplications / totalJobs) : 0;
    const activeRate         = totalJobs > 0 ? Math.round((activeJobs / totalJobs) * 100) : 0;
    const topJob             = [...jobs].sort((a, b) => (b.applicationsCount || 0) - (a.applicationsCount || 0))[0];
    return { totalJobs, activeJobs, totalApplications, totalOpenings, avgApplications, activeRate, topJob };
  }, [jobs]);

  return (
    <DashboardLayout>

      {/* ── HEADER ── */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-primary">Recruiter Dashboard</h1>
          <p className="mt-1 text-sm text-muted">Track hiring performance and manage your internship listings.</p>
        </div>
        <Link to="/recruiter/post-job"
          className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors">
          <Plus size={15} /> Post Internship
        </Link>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <StatCard title="Internships"  value={analytics.totalJobs}         icon={BriefcaseBusiness} accent="blue"   />
        <StatCard title="Applications" value={analytics.totalApplications}  icon={FileText}          accent="purple" />
        <StatCard title="Active Jobs"  value={analytics.activeJobs}         icon={BadgeCheck}        accent="green"  />
        <StatCard title="Openings"     value={analytics.totalOpenings}      icon={Users}             accent="amber"  />
      </div>

      {/* ── INSIGHTS ROW ── */}
      {!loading && !error && (
        <div className="mt-5 grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">

          {/* LEFT — hiring overview */}
          <div className="bg-white border border-border rounded-[24px] p-6">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-base font-semibold text-primary">Hiring Overview</h2>
                <p className="mt-0.5 text-xs text-muted">Quick insights into your internship performance.</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <TrendingUp size={16} className="text-blue-600" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <MetricTile icon={Users}  label="Avg. Applications / Job" value={analytics.avgApplications} accent="blue"  />
              <MetricTile icon={Clock3} label="Active Internship Rate"   value={`${analytics.activeRate}%`} accent="green" />
            </div>

            {/* TOP JOB inline */}
            {analytics.topJob && (
              <div className="mt-4 p-4 rounded-[18px] bg-stone border border-border flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">Top Performing</p>
                  <p className="mt-1 text-sm font-semibold text-primary truncate">{analytics.topJob.title}</p>
                  <p className="mt-0.5 text-xs text-muted">{analytics.topJob.applicationsCount || 0} applications</p>
                </div>
                <Link
                  to={`/recruiter/applicants/${analytics.topJob._id}`}
                  className="inline-flex items-center gap-1.5 h-8 px-4 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex-shrink-0"
                >
                  View <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT — quick actions */}
          <div className="bg-white border border-border rounded-[24px] p-6">
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-base font-semibold text-primary">Quick Actions</h2>
                <p className="mt-0.5 text-xs text-muted">Jump to common tasks.</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                <Sparkles size={16} className="text-purple-600" />
              </div>
            </div>

            <div className="space-y-2.5">
              <QuickAction
                to="/recruiter/post-job"
                icon={Plus}
                label="Post New Internship"
                description="Create and publish a new listing"
                accent="blue"
              />
              <QuickAction
                to="/recruiter/manage-listings"
                icon={BriefcaseBusiness}
                label="Manage Listings"
                description="Edit, close, or reopen postings"
                accent="green"
              />
              {analytics.topJob && (
                <QuickAction
                  to={`/recruiter/applicants/${analytics.topJob._id}`}
                  icon={Users}
                  label="Review Applicants"
                  description={`${analytics.topJob.applicationsCount || 0} pending on top listing`}
                  accent="blue"
                />
              )}
            </div>
          </div>

        </div>
      )}

      {/* ── ERROR ── */}
      {error && (
        <div className="mt-8">
          <EmptyState title="Something went wrong" description={error} />
        </div>
      )}

      {/* ── INTERNSHIPS LIST ── */}
      {!error && (
        <div className="mt-8">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-base font-semibold text-primary">Your Internships</h2>
              <p className="mt-0.5 text-xs text-muted">Manage and track your posted listings.</p>
            </div>
            <Link to="/recruiter/manage-listings"
              className="text-xs font-medium text-muted hover:text-primary transition-colors px-3 py-1.5 rounded-lg border border-border hover:bg-stone">
              View all →
            </Link>
          </div>

          <JobList
            jobs={jobs}
            loading={loading}
            recruiterMode={true}
            emptyTitle="No internships posted"
            emptyDescription="Start by posting your first internship."
          />
        </div>
      )}

    </DashboardLayout>
  );
}

export default RecruiterDashboard;