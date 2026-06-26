import {
  Bookmark,
  Sparkles,
  IndianRupee,
  Users,
  Pencil,
  Trash2,
  Lock,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import JobTagList from "../job/JobTagList";
import JobMeta from "../job/JobMeta";

import useAIMatch from "../../hooks/useAIMatch";
import { useAuth } from "../../context/AuthContext";

// ── COLOR-CODED MATCH BADGE ──────────────────────────────
function ScoreBadge({ score }) {
  const color =
    score >= 70
      ? { bg: "#E1F5EE", text: "#0F6E56", border: "#9FE1CB" }
      : score >= 40
      ? { bg: "#FAEEDA", text: "#854F0B", border: "#FAC775" }
      : { bg: "#FCEBEB", text: "#A32D2D", border: "#F7C1C1" };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 12px",
        borderRadius: 999,
        background: color.bg,
        color: color.text,
        border: `1px solid ${color.border}`,
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      <Sparkles size={14} />
      {score}% Match
    </div>
  );
}

// ── STIPEND FORMATTER ────────────────────────────────────
function formatStipend(stipend) {
  if (!stipend || stipend === 0) return null;
  return stipend.toLocaleString("en-IN");
}

function JobCard({
  job,
  isSaved = false,
  onSave,
  onRemove,
  recruiterMode = false,
  onDelete,
  onClose,
  onReopen,
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { score, loading, fetchScore } = useAIMatch();

  const handleScore = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user?.resumeUrl) return;
    fetchScore(job._id);
  };

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isSaved ? onRemove?.(job._id) : onSave?.(job._id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.(job._id);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose?.(job._id);
  };

  const handleReopen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onReopen?.(job._id);
  };

  const handleApplicants = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/recruiter/applicants/${job._id}`);
  };

  const stipendFormatted = formatStipend(job.stipend);

  return (
    <Link to={`/jobs/${job._id}`} className="block h-full">
      <div
        className="
          h-full flex flex-col
          bg-white border border-border
          rounded-[32px] p-7
          transition-all duration-200
          hover:shadow-md
        "
      >
        {/* ── TOP ── */}
        <div className="flex items-start justify-between gap-5">

          <div className="flex-1 min-w-0">
            {/* COMPANY + BADGES */}
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm text-muted">{job.company || "Company"}</p>

              {job.category && (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-accent text-xs font-medium">
                  {job.category === "fullstack"
                    ? "Full Stack"
                    : job.category === "aiml"
                    ? "AI/ML"
                    : job.category === "datascience"
                    ? "Data Science"
                    : job.category}
                </span>
              )}

              {job.status === "closed" && (
                <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-medium">
                  Closed
                </span>
              )}
            </div>

            {/* TITLE */}
            <h2 className="mt-2 text-xl font-semibold leading-tight text-primary">
              {job.title}
            </h2>
          </div>

          {/* RIGHT ACTION */}
          {!recruiterMode ? (
            <button
              onClick={handleSave}
              title={isSaved ? "Unsave job" : "Save job"}
              className="
                w-10 h-10 flex-shrink-0 rounded-2xl
                border border-border
                flex items-center justify-center
                transition-colors hover:bg-stone
              "
            >
              <Bookmark
                size={17}
                className={isSaved ? "fill-primary text-primary" : "text-muted"}
              />
            </button>
          ) : (
            <div className="px-3 py-1.5 rounded-full bg-stone text-sm text-primary font-medium flex-shrink-0">
              {job.applicationsCount || 0} Applicants
            </div>
          )}
        </div>

        {/* ── AI MATCH SCORE ── */}
        {!recruiterMode && (
          <div className="mt-4">
            {score ? (
              <ScoreBadge score={score} />
            ) : (
              <button
                onClick={handleScore}
                disabled={loading || !user?.resumeUrl}
                className="
                  inline-flex items-center gap-2
                  px-4 py-2 rounded-full
                  bg-stone text-primary text-sm font-medium
                  transition-colors hover:bg-border
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {loading ? <Spinner size="sm" /> : <Sparkles size={15} />}
                <span>
                  {!user?.resumeUrl
                    ? "Resume Required"
                    : loading
                    ? "Analysing..."
                    : "Check Match"}
                </span>
              </button>
            )}
          </div>
        )}

        {/* ── DESCRIPTION ── */}
        <p className="mt-5 text-sm text-muted leading-7 line-clamp-3">
          {job.description || "No description available."}
        </p>

        {/* ── SKILLS ── */}
        <div className="mt-5">
          <JobTagList skills={job.requiredSkills} limit={4} />
        </div>

        {/* ── PERKS ── */}
        {job.perks?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {job.perks.slice(0, 3).map((perk) => (
              <div key={perk} className="px-3 py-1 rounded-full bg-stone text-xs text-primary">
                {perk}
              </div>
            ))}
          </div>
        )}

        {/* ── META — stipend removed here, lives in footer only ── */}
        <div className="mt-6">
          <JobMeta
            location={job.location}
            mode={job.mode}
            duration={job.duration}
            openingsCount={job.openingsCount}
            deadline={job.deadline}
          />
        </div>

        {/* ── FOOTER ── */}
        <div className="mt-auto pt-6 border-t border-border flex items-center justify-between gap-4 flex-wrap">

          {/* STIPEND — IndianRupee icon renders ₹, span has number only */}
          <div>
            <p className="text-xs text-muted uppercase tracking-wide">Stipend</p>
            <div className="mt-1 flex items-center gap-0.5 text-lg font-semibold text-primary">
              {stipendFormatted ? (
                <>
                  <IndianRupee size={16} strokeWidth={2.5} />
                  <span>{stipendFormatted}</span>
                </>
              ) : (
                <span className="text-base text-muted font-medium">Unpaid</span>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          {!recruiterMode ? (
            <div className="px-5 py-2.5 rounded-2xl bg-primary text-white text-sm font-medium">
              View Details
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              <Button onClick={handleApplicants} variant="secondary" className="rounded-2xl">
                <Users size={15} /> Applicants
              </Button>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/recruiter/jobs/${job._id}/edit`);
                }}
                variant="secondary"
                className="rounded-2xl"
              >
                <Pencil size={15} /> Edit
              </Button>

              {job.status === "active" && (
                <Button onClick={handleClose} variant="secondary" className="rounded-2xl">
                  <Lock size={15} /> Close
                </Button>
              )}

              {job.status === "closed" && (
                <Button onClick={handleReopen} variant="secondary" className="rounded-2xl">
                  <Sparkles size={15} /> Reopen
                </Button>
              )}

              <Button onClick={handleDelete} className="rounded-2xl">
                <Trash2 size={15} /> Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default JobCard;