import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Search, Users, Sparkles, X, MapPin, GraduationCap,
  GitBranch, Link2, FileText, ExternalLink, Award,
  ChevronRight, MessageSquare, Star,
} from "lucide-react";

import { showToast } from "../../utils/toastService";
import DashboardLayout from "../../components/layout/DashboardLayout";
import EmptyState from "../../components/ui/EmptyState";
import Pagination from "../../components/ui/Pagination";
import Skeleton from "../../components/ui/Skeleton";
import ConfirmModal from "../../components/modals/ConfirmModal";
import useApplicants from "../../hooks/useApplicants";
import useJob from "../../hooks/useJob";
import { APPLICATION_STATUS } from "../../constants/applicationStatus";
import { formatDate } from "../../utils/formatDate";
import { formatStatus, getStatusColor } from "../../utils/formatStatus";

// ── HELPERS ──────────────────────────────────────────────
const STAGE_ACTIONS = {
  [APPLICATION_STATUS.APPLIED]:     [APPLICATION_STATUS.SHORTLISTED, APPLICATION_STATUS.REJECTED],
  [APPLICATION_STATUS.SHORTLISTED]: [APPLICATION_STATUS.INTERVIEW,   APPLICATION_STATUS.REJECTED],
  [APPLICATION_STATUS.INTERVIEW]:   [APPLICATION_STATUS.SELECTED,    APPLICATION_STATUS.REJECTED],
  [APPLICATION_STATUS.SELECTED]:    [],
  [APPLICATION_STATUS.REJECTED]:    [],
};

const ACTION_META = {
  [APPLICATION_STATUS.SHORTLISTED]: { label: "Shortlist", color: "bg-purple-600 hover:bg-purple-700 text-white" },
  [APPLICATION_STATUS.INTERVIEW]:   { label: "Interview", color: "bg-amber-500  hover:bg-amber-600  text-white" },
  [APPLICATION_STATUS.SELECTED]:    { label: "Select",    color: "bg-green-600  hover:bg-green-700  text-white" },
  [APPLICATION_STATUS.REJECTED]:    { label: "Reject",    color: "bg-red-500    hover:bg-red-600    text-white" },
};

function ScoreBadge({ score }) {
  if (!score) return <span className="text-xs text-muted">—</span>;
  const style =
    score >= 75 ? "bg-green-50 text-green-700 border-green-200"
    : score >= 50 ? "bg-blue-50 text-blue-700 border-blue-200"
    : "bg-amber-50 text-amber-700 border-amber-200";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${style}`}>
      <Sparkles size={9} />{score}%
    </span>
  );
}

function StatusBadge({ status }) {
  const colors = getStatusColor(status);
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
      {formatStatus(status)}
    </span>
  );
}

function StatCard({ title, value, icon: Icon, accent }) {
  const A = {
    blue:   { bg: "#E6F1FB", ic: "#185FA5" },
    purple: { bg: "#EEEDFE", ic: "#534AB7" },
    amber:  { bg: "#FAEEDA", ic: "#854F0B" },
    green:  { bg: "#E1F5EE", ic: "#0F6E56" },
  }[accent] || { bg: "#E6F1FB", ic: "#185FA5" };
  return (
    <div className="bg-white border border-border rounded-[20px] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-primary tracking-tight">{value ?? "—"}</p>
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: A.bg }}>
          <Icon size={16} style={{ color: A.ic }} />
        </div>
      </div>
    </div>
  );
}

// ── APPLICANT MODAL ───────────────────────────────────────
function ApplicantModal({ application, onClose, onAction, navigate }) {
  if (!application) return null;
  const s      = application.student || {};
  const score  = application.matchScore || 0;
  const actions = STAGE_ACTIONS[application.status] || [];
  const achievements = Array.isArray(s.achievements) ? s.achievements.filter(Boolean) : [];
  const skills       = Array.isArray(s.skills)       ? s.skills.filter(Boolean)       : [];

  const scoreStyle =
    score >= 75 ? { bar: "#16a34a", bg: "#E1F5EE", text: "#0F6E56" }
    : score >= 50 ? { bar: "#2563EB", bg: "#E6F1FB", text: "#185FA5" }
    : { bar: "#d97706", bg: "#FAEEDA", text: "#854F0B" };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl bg-white sm:border border-border sm:rounded-[28px] rounded-t-[28px] shadow-[0_-8px_40px_rgba(0,0,0,0.12)] sm:shadow-[0_24px_80px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[calc(100vh-2rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* drag handle on mobile */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 px-5 pt-3 sm:pt-5 pb-4 border-b border-border flex-shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-primary">{s.name || "Applicant"}</h2>
              <StatusBadge status={application.status} />
            </div>
            <p className="mt-0.5 text-xs text-muted">{s.email}</p>
            <p className="text-xs text-muted">Applied {formatDate(application.createdAt)}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-border hover:bg-stone transition-colors flex-shrink-0"
          >
            <X size={15} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

          {/* AI MATCH */}
          {score > 0 && (
            <div className="p-3.5 rounded-[16px] border border-border bg-stone">
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={13} style={{ color: scoreStyle.bar }} />
                  <span className="text-xs font-semibold text-primary">AI Match Score</span>
                </div>
                <span className="text-sm font-bold" style={{ color: scoreStyle.text }}>{score}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-border overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${score}%`, background: scoreStyle.bar }} />
              </div>
            </div>
          )}

          {/* INFO */}
          <div className="grid grid-cols-2 gap-2">
            {s.college && (
              <div className="col-span-2 flex items-center gap-2 p-3 rounded-[12px] bg-stone">
                <GraduationCap size={13} className="text-muted flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-muted uppercase tracking-wide">College</p>
                  <p className="text-xs font-semibold text-primary truncate">{s.college}</p>
                </div>
              </div>
            )}
            {s.location && (
              <div className="flex items-center gap-2 p-3 rounded-[12px] bg-stone">
                <MapPin size={13} className="text-muted flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-muted uppercase tracking-wide">Location</p>
                  <p className="text-xs font-semibold text-primary truncate">{s.location}</p>
                </div>
              </div>
            )}
          </div>

          {/* LINKS */}
          {(s.github || s.linkedin || s.resumeUrl) && (
            <div className="flex flex-wrap gap-2">
              {s.github && (
                <a href={s.github} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xl border border-border bg-stone text-xs font-medium text-primary hover:bg-blue-50 hover:text-accent transition-all">
                  <GitBranch size={12} /> GitHub
                </a>
              )}
              {s.linkedin && (
                <a href={s.linkedin} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xl border border-border bg-stone text-xs font-medium text-primary hover:bg-blue-50 hover:text-accent transition-all">
                  <Link2 size={12} /> LinkedIn
                </a>
              )}
              {s.resumeUrl && (
                <a href={s.resumeUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors">
                  <FileText size={12} /> Resume <ExternalLink size={10} />
                </a>
              )}
            </div>
          )}

          {/* BIO */}
          {s.bio && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-1.5">About</p>
              <p className="text-xs text-muted leading-5">{s.bio}</p>
            </div>
          )}

          {/* SKILLS */}
          {skills.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-1.5">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((sk) => (
                  <span key={sk} className="px-2.5 py-1 rounded-full bg-stone border border-border text-xs font-medium text-primary">{sk}</span>
                ))}
              </div>
            </div>
          )}

          {/* ACHIEVEMENTS */}
          {achievements.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-1.5">Achievements</p>
              <div className="space-y-1.5">
                {achievements.map((a) => (
                  <div key={a} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Award size={10} className="text-amber-600" />
                    </div>
                    <p className="text-xs text-primary leading-5">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-5 py-3 border-t border-border bg-stone flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <button
            onClick={() => { navigate(`/profile/${s._id}`); onClose(); }}
            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
          >
            Full Profile <ChevronRight size={11} />
          </button>

          <div className="flex flex-wrap gap-2">
            {actions.length === 0 ? (
              <span className="text-xs text-muted px-3 py-1.5 rounded-xl bg-white border border-border">
                {application.status === APPLICATION_STATUS.SELECTED ? "✓ Selected" : "× Rejected"}
              </span>
            ) : (
              actions.map((next) => {
                const meta = ACTION_META[next];
                return (
                  <button key={next} onClick={() => onAction(application._id, next)}
                    className={`h-8 px-4 rounded-xl text-xs font-semibold transition-colors ${meta.color}`}>
                    {meta.label}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MOBILE ROW CARD ───────────────────────────────────────
function MobileApplicantRow({ app, onView }) {
  const colors = getStatusColor(app.status);
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-primary truncate">{app.student?.name}</p>
          <ScoreBadge score={app.matchScore} />
        </div>
        <div className="mt-1 flex items-center gap-2 flex-wrap">
          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${colors.bg} ${colors.text}`}>
            {formatStatus(app.status)}
          </span>
          <span className="text-[10px] text-muted">{formatDate(app.createdAt)}</span>
        </div>
      </div>
      <button
        onClick={() => onView(app)}
        className="h-7 px-3 rounded-lg border border-border bg-stone text-xs font-medium text-primary hover:bg-white flex-shrink-0 transition-all"
      >
        View
      </button>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────
function ApplicantReviewPage() {
  const { jobId }  = useParams();
  const navigate   = useNavigate();

  const { applicants = [], loading, error, pagination, fetchApplicants, handleStatusUpdate } = useApplicants();
  const { job } = useJob(jobId);

  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [scoreFilter,  setScoreFilter]  = useState("");
  const [sortBy,       setSortBy]       = useState("score");

  const [viewedApplicant,     setViewedApplicant]     = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [nextStatus,          setNextStatus]          = useState("");
  const [actionLoading,       setActionLoading]       = useState(false);

  useEffect(() => { fetchApplicants(jobId, 1); }, [jobId]);

  const filtered = useMemo(() => {
    let list = [...applicants];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((a) =>
        a.student?.name?.toLowerCase().includes(q) ||
        a.student?.email?.toLowerCase().includes(q) ||
        (a.student?.skills || []).some((sk) => sk.toLowerCase().includes(q))
      );
    }
    if (statusFilter) list = list.filter((a) => a.status === statusFilter);
    if (scoreFilter)  list = list.filter((a) => (a.matchScore || 0) >= Number(scoreFilter));
    if (sortBy === "score")  list.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    if (sortBy === "recent") list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === "name")   list.sort((a, b) => a.student?.name?.localeCompare(b.student?.name));
    return list;
  }, [applicants, search, statusFilter, scoreFilter, sortBy]);

  const hasFilters = Boolean(search || statusFilter || scoreFilter);
  const displayList = hasFilters ? filtered : applicants;

  const stats = useMemo(() => ({
    total:       pagination.total || 0,
    shortlisted: applicants.filter((a) => a.status === APPLICATION_STATUS.SHORTLISTED).length,
    interview:   applicants.filter((a) => a.status === APPLICATION_STATUS.INTERVIEW).length,
    avgScore:    applicants.length > 0
      ? Math.round(applicants.reduce((s, a) => s + (a.matchScore || 0), 0) / applicants.length) : 0,
  }), [applicants, pagination]);

  const openAction = (appId, status) => {
    setSelectedApplication(appId);
    setNextStatus(status);
    setViewedApplicant(null);
  };

  const confirmAction = async () => {
    try {
      setActionLoading(true);
      await handleStatusUpdate(selectedApplication, nextStatus);
      setSelectedApplication(null);
      setNextStatus("");
    } catch (err) {
      showToast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setActionLoading(false);
    }
  };

  const jobTitle   = job?.title || "Applicant Pipeline";
  const jobCompany = job?.company?.name || job?.company || "";
  const jobMeta    = [job?.location, job?.mode, job?.category].filter(Boolean).join(" · ");

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">Applicant Pipeline</p>
        <h1 className="text-xl font-bold tracking-tight text-primary">{jobTitle}</h1>
        {(jobCompany || jobMeta) && (
          <p className="mt-0.5 text-sm text-muted">{[jobCompany, jobMeta].filter(Boolean).join(" · ")}</p>
        )}
      </div>

      {/* STATS */}
      {!error && (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
          <StatCard title="Applicants"    value={stats.total}          icon={Users}         accent="blue"   />
          <StatCard title="Shortlisted"   value={stats.shortlisted}    icon={Star}          accent="purple" />
          <StatCard title="Interview"     value={stats.interview}      icon={MessageSquare} accent="amber"  />
          <StatCard title="Avg AI Score"  value={`${stats.avgScore}%`} icon={Sparkles}      accent="green"  />
        </div>
      )}

      {/* FILTERS */}
      {!error && (
        <div className="bg-white border border-border rounded-[18px] p-3 mb-4 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[140px]">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search name, email or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-stone border border-border text-xs placeholder:text-muted outline-none focus:border-primary focus:bg-white transition-colors"
            />
          </div>
          <div className="w-px h-5 bg-border flex-shrink-0 hidden sm:block" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="h-8 px-3 rounded-lg bg-stone border border-border text-xs font-medium text-primary outline-none focus:border-primary cursor-pointer">
            <option value="">All Status</option>
            <option value={APPLICATION_STATUS.APPLIED}>Applied</option>
            <option value={APPLICATION_STATUS.SHORTLISTED}>Shortlisted</option>
            <option value={APPLICATION_STATUS.INTERVIEW}>Interview</option>
            <option value={APPLICATION_STATUS.SELECTED}>Selected</option>
            <option value={APPLICATION_STATUS.REJECTED}>Rejected</option>
          </select>
          <select value={scoreFilter} onChange={(e) => setScoreFilter(e.target.value)}
            className="h-8 px-3 rounded-lg bg-stone border border-border text-xs font-medium text-primary outline-none focus:border-primary cursor-pointer">
            <option value="">All Scores</option>
            <option value="90">90%+</option>
            <option value="75">75%+</option>
            <option value="50">50%+</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="h-8 px-3 rounded-lg bg-stone border border-border text-xs font-medium text-primary outline-none focus:border-primary cursor-pointer sm:ml-auto">
            <option value="score">Top Score</option>
            <option value="recent">Recent</option>
            <option value="name">A–Z</option>
          </select>
        </div>
      )}

      {error && <EmptyState title="Something went wrong" description={error} />}

      {/* TABLE */}
      {!error && (
        <>
          {loading && applicants.length === 0 ? (
            <div className="bg-white border border-border rounded-[24px] overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5 border-b border-border last:border-0">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-7 w-16 rounded-lg ml-auto" />
                </div>
              ))}
            </div>
          ) : displayList.length === 0 ? (
            <EmptyState title="No applicants found" description="Try adjusting your filters." />
          ) : (
            <div className="bg-white border border-border rounded-[24px] overflow-hidden">

              {/* DESKTOP TABLE HEADER — hidden on mobile */}
              <div className="hidden md:grid md:grid-cols-[1.2fr_1.6fr_120px_110px_90px] gap-4 px-5 py-3 bg-stone border-b border-border">
                {["Student", "Email", "Status", "Applied", ""].map((h, i) => (
                  <p key={i} className={`text-[10px] font-bold uppercase tracking-widest text-muted ${i === 4 ? "text-right" : ""}`}>{h}</p>
                ))}
              </div>

              {/* ROWS */}
              {displayList.map((app) => {
                const colors = getStatusColor(app.status);
                return (
                  <div key={app._id}>

                    {/* MOBILE ROW */}
                    <div className="md:hidden">
                      <MobileApplicantRow app={app} onView={setViewedApplicant} />
                    </div>

                    {/* DESKTOP ROW */}
                    <div className="hidden md:grid md:grid-cols-[1.2fr_1.6fr_120px_110px_90px] gap-4 items-center px-5 py-3.5 border-b border-border last:border-0 hover:bg-stone/50 transition-colors">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-primary truncate">{app.student?.name}</p>
                        <div className="mt-0.5"><ScoreBadge score={app.matchScore} /></div>
                      </div>
                      <p className="text-xs text-muted truncate">{app.student?.email}</p>
                      <div>
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                          {formatStatus(app.status)}
                        </span>
                      </div>
                      <p className="text-xs text-muted">{formatDate(app.createdAt)}</p>
                      <div className="flex justify-end">
                        <button
                          onClick={() => setViewedApplicant(app)}
                          className="h-7 px-3 rounded-lg border border-border bg-stone text-xs font-medium text-primary hover:bg-white hover:border-primary/30 transition-all"
                        >
                          View
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {!hasFilters && pagination.pages > 1 && (
            <div className="mt-5">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={(page) => fetchApplicants(jobId, page)}
              />
            </div>
          )}
        </>
      )}

      <ApplicantModal
        application={viewedApplicant}
        onClose={() => setViewedApplicant(null)}
        onAction={openAction}
        navigate={navigate}
      />

      <ConfirmModal
        open={!!selectedApplication}
        onClose={() => { setSelectedApplication(null); setNextStatus(""); }}
        onConfirm={confirmAction}
        loading={actionLoading}
        variant={nextStatus === APPLICATION_STATUS.REJECTED ? "danger" : "primary"}
        title={nextStatus === APPLICATION_STATUS.REJECTED ? "Reject Applicant" : `Move to ${formatStatus(nextStatus)}`}
        description={`The applicant's status will be updated to "${formatStatus(nextStatus)}".`}
        confirmText="Confirm"
      />

    </DashboardLayout>
  );
}

export default ApplicantReviewPage;