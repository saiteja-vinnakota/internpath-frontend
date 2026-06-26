import {
  Building2,
  MapPin,
  BriefcaseBusiness,
  CalendarDays,
  IndianRupee,
  Clock3,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";
import ApplicationStatusBadge from "../application/ApplicationStatusBadge";
import {formatDate} from "../../utils/formatDate";
import {formatStipend} from "../../utils/formatCurrency";

const formatCategory = (cat) =>
  cat === "fullstack" ? "Full Stack"
  : cat === "aiml" ? "AI/ML"
  : cat === "datascience" ? "Data Science"
  : cat;

// match bar colors aligned with ApplicationStatusBadge palette
function MatchBar({ score }) {
  const s = score || 0;
  if (s === 0) return null;

  const style =
    s >= 85
      ? { bar: "#16a34a", bg: "bg-green-50",  text: "text-green-700",  label: "Excellent Match" }
      : s >= 70
      ? { bar: "#2563EB", bg: "bg-blue-50",   text: "text-blue-700",   label: "Strong Match"    }
      : { bar: "#d97706", bg: "bg-amber-50",  text: "text-amber-700",  label: "Moderate Match"  };

  return (
    <div className="mt-4 flex items-center gap-3">
      <Sparkles size={13} style={{ color: style.bar, flexShrink: 0 }} />
      <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${s}%`, background: style.bar }}
        />
      </div>
      <span className="text-xs font-bold text-primary tabular-nums">{s}%</span>
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
        {style.label}
      </span>
    </div>
  );
}

function ApplicationCard({ application }) {
  const { job, status, createdAt, matchScore } = application;
  const stipendFormatted = formatStipend(job?.stipend);
  const isExpired = job?.deadline && new Date(job.deadline) < new Date();

  return (
    <div className="bg-white border border-border rounded-[24px] p-5 transition-shadow duration-200 hover:shadow-md">

      {/* ── HEADER ── */}
      <div className="flex items-start justify-between gap-4">

        <div className="flex-1 min-w-0">
          {/* BADGES */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone border border-border text-xs text-muted">
              <Building2 size={11} />
              {job?.company}
            </span>
            {job?.category && (
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                {formatCategory(job.category)}
              </span>
            )}
            {isExpired && (
              <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium">
                Closed
              </span>
            )}
          </div>

          {/* TITLE */}
          <h2 className="mt-2.5 text-base font-semibold leading-snug text-primary">
            {job?.title}
          </h2>

          {/* META */}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
            {job?.location && (
              <span className="flex items-center gap-1"><MapPin size={11} />{job.location}</span>
            )}
            {job?.mode && (
              <span className="flex items-center gap-1 capitalize"><BriefcaseBusiness size={11} />{job.mode}</span>
            )}
            {job?.duration && (
              <span className="flex items-center gap-1"><Clock3 size={11} />{job.duration}</span>
            )}
          </div>
        </div>

        {/* STAGE */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted">Stage</p>
          <ApplicationStatusBadge status={status} />
        </div>

      </div>

      {/* ── MATCH BAR ── */}
      <MatchBar score={matchScore} />

      {/* ── FOOTER ── */}
      <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">

        <div className="flex flex-wrap gap-4 text-xs">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-muted">Stipend</p>
            <div className="mt-0.5 flex items-center gap-0.5 font-semibold text-primary">
              {stipendFormatted
                ? <span>{stipendFormatted}</span>
                : <span className="text-muted font-medium">Unpaid</span>
              }
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wide text-muted">Applied</p>
            <p className="mt-0.5 font-medium text-primary">{formatDate(createdAt)}</p>
          </div>

          {job?.deadline && (
            <div>
              <p className="text-[10px] uppercase tracking-wide text-muted">Deadline</p>
              <p className="mt-0.5 font-medium text-primary">{formatDate(job.deadline)}</p>
            </div>
          )}
        </div>

        <Link
          to={`/jobs/${job?._id}`}
          className="text-xs font-medium px-3 py-1.5 rounded-lg border border-border text-primary hover:bg-stone transition-colors"
        >
          View Job →
        </Link>

      </div>
    </div>
  );
}

export default ApplicationCard;