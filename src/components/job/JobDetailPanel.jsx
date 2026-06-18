import {
  Building2,
  Sparkles,
  MapPin,
  Clock,
  Users,
  Wifi,
  Monitor,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  GraduationCap,
  Target,
} from "lucide-react";

import { useEffect } from "react";

import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

import useApplications from "../../hooks/useApplications";

import JobTagList from "./JobTagList";

const MODE_CONFIG = {
  remote: {
    label: "Remote",
    icon: Wifi,
    color: "#0F6E56",
    bg: "#E1F5EE",
  },

  hybrid: {
    label: "Hybrid",
    icon: Monitor,
    color: "#534AB7",
    bg: "#EEEDFE",
  },

  onsite: {
    label: "On-site",
    icon: Briefcase,
    color: "#185FA5",
    bg: "#E6F1FB",
  },
};

function formatDate(date) {
  if (!date) return null;

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function MetaChip({ icon: Icon, label, value, accent }) {
  return (
    <div className="meta-chip">
      <Icon
        size={14}
        className="chip-icon"
        style={accent ? { color: accent } : {}}
      />

      <span className="chip-label">{label}</span>

      <span className="chip-value">{value}</span>
    </div>
  );
}

function InfoCell({ label, value, highlight }) {
  return (
    <div className={`info-cell${highlight ? " info-cell--highlight" : ""}`}>
      <p className="info-cell__label">{label}</p>

      <p className="info-cell__value">{value}</p>
    </div>
  );
}

function SectionHeading({ icon: Icon, title }) {
  return (
    <div className="section-heading">
      {Icon && <Icon size={17} className="section-icon" />}

      <h2 className="section-title">{title}</h2>
    </div>
  );
}

function Divider() {
  return <div className="jdp-divider" />;
}

function JobDetailPanel({ job, aiScore = 0 }) {
  const { user } = useAuth();

  const {
    applyingJobId,

    fetchApplications,

    handleApply: applyToCurrentJob,

    hasApplied,
  } = useApplications();

  // FETCH APPLICATIONS
  useEffect(() => {
    if (user?.role === "student") {
      fetchApplications();
    }
  }, [user]);

  const alreadyApplied = hasApplied(job._id);

  const modeConfig = MODE_CONFIG[job.mode] || MODE_CONFIG.remote;

  const ModeIcon = modeConfig.icon;

  const isApplying = applyingJobId === job._id;

  // APPLY
  const handleApply = async () => {
    if (!user?.resumeUrl) {
      toast.error("Please upload your resume before applying.");

      return;
    }

    await applyToCurrentJob(job._id);
  };

  const deadlineDate = job.deadline ? new Date(job.deadline) : null;

  const today = new Date();

  const daysLeft = deadlineDate
    ? Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24))
    : null;

  const isUrgent = daysLeft !== null && daysLeft <= 5 && daysLeft > 0;

  const isExpired = daysLeft !== null && daysLeft <= 0;

  const matchScore = aiScore;

  const matchLabel =
    matchScore >= 80
      ? "Strong"
      : matchScore >= 60
        ? "Good"
        : matchScore >= 40
          ? "Moderate"
          : "Low";

  const matchColor =
    matchScore >= 80
      ? "#16A34A"
      : matchScore >= 60
        ? "#2563EB"
        : matchScore >= 40
          ? "#D97706"
          : "#DC2626";

  return (
    <>
      <style>{`
        .jdp {
          font-family:
            'DM Sans',
            'Outfit',
            'Geist',
            system-ui,
            sans-serif;

          color: #1a1a1a;
          background: #ffffff;
          border: 1px solid #e8e4df;
          border-radius: 28px;
          overflow: hidden;
        }

        .jdp__header {
          padding: 32px 32px 28px;
          border-bottom:
            1px solid #f0ece8;
        }

        .jdp__badges {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;

          padding: 4px 11px;

          border-radius: 999px;

          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .badge--company {
          background: #f5f2ee;
          color: #5c5449;
          border:
            1px solid #e8e4df;
        }

        .badge--category {
          background: #E6F1FB;
          color: #185FA5;
          border:
            1px solid #b5d4f4;
        }

        .jdp__title {
          font-size:
            clamp(
              20px,
              3vw,
              30px
            );

          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.15;

          color: #0f0e0c;

          margin:
            0 0 18px;
        }

        .jdp__meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          align-items: center;
        }

        .meta-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;

          background: #faf9f7;

          border:
            1px solid #e8e4df;

          border-radius: 999px;

          padding: 4px 10px;

          font-size: 12px;
          color: #5c5449;
        }

        .chip-icon {
          opacity: 0.65;
          flex-shrink: 0;
        }

        .chip-label {
          color: #9c9489;
          font-size: 11px;
        }

        .chip-value {
          color: #2d2a26;
          font-weight: 500;
        }

        .meta-divider {
          width: 1px;
          height: 13px;
          background: #e0dbd4;
          flex-shrink: 0;
        }

        .jdp__apply-strip {
          padding: 20px 32px;
          background: #faf9f7;
          border-bottom:
            1px solid #f0ece8;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .stipend-pill {
          display: flex;
          flex-direction: column;
        }

        .stipend-pill__label {
          font-size: 10.5px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #9c9489;
          margin-bottom: 2px;
        }

        .stipend-pill__amount {
          font-size: 24px;
          font-weight: 700;
          color: #0f0e0c;
          letter-spacing: -0.02em;
        }

        .stipend-pill__suffix {
          font-size: 12px;
          color: #9c9489;
        }

        .apply-btn {
          height: 44px;
          padding: 0 24px;

          border-radius: 12px;
          border: none;

          font-size: 14px;
          font-weight: 600;

          cursor: pointer;

          display: inline-flex;
          align-items: center;
          gap: 7px;

          transition:
            all 0.18s ease;

          font-family: inherit;
        }

        .apply-btn--active {
          background: #0f0e0c;
          color: #ffffff;
        }

        .apply-btn--done {
          background: #EAF3DE;
          color: #3B6D11;
          border:
            1px solid #C0DD97;
        }

        .apply-btn--expired {
          background: #FCEBEB;
          color: #A32D2D;
          border:
            1px solid #F7C1C1;
        }

        .apply-btn--loading {
          background: #e0dbd4;
          color: #9c9489;
        }

        .spinner {
          width: 16px;
          height: 16px;

          border:
            2px solid
            rgba(
              255,
              255,
              255,
              0.3
            );

          border-top-color:
            #ffffff;

          border-radius: 50%;

          animation:
            spin
            0.75s
            linear
            infinite;
        }

        @keyframes spin {
          to {
            transform:
              rotate(360deg);
          }
        }

        .jdp__info-grid {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);

          border-bottom:
            1px solid #f0ece8;
        }

        .info-cell {
          padding: 18px 20px;
          border-right:
            1px solid #f0ece8;
        }

        .info-cell:last-child {
          border-right: none;
        }

        .info-cell__label {
          font-size: 10.5px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #9c9489;
          margin: 0 0 5px;
        }

        .info-cell__value {
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
        }

        .jdp__body {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .section-heading {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 14px;
        }

        .section-icon {
          color: #185FA5;
        }

        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f0e0c;
          margin: 0;
        }

        .description-text {
          font-size: 14px;
          line-height: 1.85;
          color: #4a4540;
          white-space: pre-line;
        }

        .jdp-divider {
          height: 1px;
          background: #f0ece8;
        }

        .perks-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .perk-tag {
          padding: 5px 13px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          background: #E1F5EE;
          color: #0F6E56;
        }

        .elig-grid {
          display: grid;
          grid-template-columns:
            repeat(
              auto-fit,
              minmax(
                180px,
                1fr
              )
            );

          gap: 20px 32px;
        }

        .elig-label {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #9c9489;
          margin-bottom: 7px;
        }

        .tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tag {
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          background: #f5f2ee;
          color: #2d2a26;
        }
      `}</style>

      <div className="jdp">
        {/* HEADER */}
        <div className="jdp__header">
          <div className="jdp__badges">
            <span className="badge badge--company">
              <Building2 size={12} />

              {job.company}
            </span>

            {job.category && (
              <span className="badge badge--category">{job.category}</span>
            )}

            <span
              className="badge"
              style={{
                background: modeConfig.bg,

                color: modeConfig.color,
              }}
            >
              <ModeIcon size={12} />

              {modeConfig.label}
            </span>

            {isUrgent && !isExpired && (
              <span
                className="badge"
                style={{
                  background: "#FFF4E8",
                  color: "#B15D12",
                }}
              >
                <AlertCircle size={12} />
                Closing Soon
              </span>
            )}
          </div>

          <h1 className="jdp__title">{job.title}</h1>

          <div className="jdp__meta-row">
            <MetaChip icon={MapPin} label="Location" value={job.location} />

            <div className="meta-divider" />

            <MetaChip icon={Clock} label="Duration" value={job.duration} />

            <div className="meta-divider" />

            <MetaChip
              icon={Users}
              label="Openings"
              value={`${job.openingsCount} positions`}
            />
          </div>
        </div>

        {/* APPLY STRIP */}
        <div className="jdp__apply-strip">
          {/* STIPEND */}
          <div className="stipend-pill">
            <span className="stipend-pill__label">Monthly Stipend</span>

            <div>
              <span className="stipend-pill__amount">
                ₹{job.stipend?.toLocaleString("en-IN") || "0"}
              </span>

              <span className="stipend-pill__suffix">/mo</span>
            </div>
          </div>

          {/* AI MATCH */}
          {user?.role === "student" && (
            <div
              className="
                flex
                flex-col
                gap-1
              "
            >
              <span className="stipend-pill__label">AI Match</span>

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <div
                  className="
                    h-2
                    w-24
                    rounded-full
                    bg-[#E8E4DF]
                    overflow-hidden
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-[#185FA5]
                    "
                    style={{
                      width: `${matchScore}%`,
                      background: matchColor,
                    }}
                  />
                </div>

                <span
                  className="
                    text-sm
                    font-semibold
                  "
                  style={{
                    color: matchColor,
                  }}
                >
                  {matchScore}% • {matchLabel}
                </span>
              </div>
            </div>
          )}

          {/* APPLY BUTTON */}
          {user?.role === "student" && (
            <button
              className={`apply-btn ${
                isApplying
                  ? "apply-btn--loading"
                  : alreadyApplied
                    ? "apply-btn--done"
                    : isExpired
                      ? "apply-btn--expired"
                      : "apply-btn--active"
              }`}
              onClick={handleApply}
              disabled={isApplying || alreadyApplied || isExpired}
            >
              {isApplying ? (
                <>
                  <div className="spinner" />
                  Applying...
                </>
              ) : alreadyApplied ? (
                <>
                  <CheckCircle2 size={16} />
                  Already Applied
                </>
              ) : isExpired ? (
                <>
                  <AlertCircle size={16} />
                  Deadline Passed
                </>
              ) : (
                <>
                  Apply Now
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          )}
        </div>

        {/* INFO GRID */}
        <div className="jdp__info-grid">
          <InfoCell
            label="Start Date"
            value={formatDate(job.startDate) || "Flexible"}
          />

          <InfoCell
            label="Apply Before"
            value={formatDate(job.deadline) || "Open"}
          />

          <InfoCell label="Location" value={job.location} />

          <InfoCell
            label="Openings"
            value={`${job.openingsCount || 1} positions`}
          />
        </div>

        {/* BODY */}
        <div className="jdp__body">
          {/* DESCRIPTION */}
          <div>
            <SectionHeading icon={Briefcase} title="About This Internship" />

            <p className="description-text">{job.description}</p>
          </div>

          <Divider />

          {/* SKILLS */}
          <div>
            <SectionHeading icon={Sparkles} title="Required Skills" />

            <JobTagList skills={job.requiredSkills} />
          </div>

          {/* PERKS */}
          {job.perks?.length > 0 && (
            <>
              <Divider />

              <div>
                <SectionHeading icon={CheckCircle2} title="Perks & Benefits" />

                <div className="perks-row">
                  {job.perks.map((perk) => (
                    <span key={perk} className="perk-tag">
                      {perk}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          <Divider />

          {/* ELIGIBILITY */}
          <div>
            <SectionHeading icon={GraduationCap} title="Eligibility" />

            <div className="elig-grid">
              {/* BATCHES */}
              <div>
                <p className="elig-label">Eligible Batches</p>

                <div className="tag-row">
                  {job.eligibleBatches?.length > 0 ? (
                    job.eligibleBatches.map((batch) => (
                      <span key={batch} className="tag">
                        {batch}
                      </span>
                    ))
                  ) : (
                    <span className="tag">All Batches</span>
                  )}
                </div>
              </div>

              {/* DEGREES */}
              <div>
                <p className="elig-label">Eligible Degrees</p>

                <div className="tag-row">
                  {job.eligibleDegrees?.length > 0 ? (
                    job.eligibleDegrees.map((degree) => (
                      <span key={degree} className="tag">
                        {degree}
                      </span>
                    ))
                  ) : (
                    <span className="tag">All Degrees</span>
                  )}
                </div>
              </div>

              {/* CGPA */}
              <div>
                <p className="elig-label">Minimum CGPA</p>

                {job.minimumCGPA ? (
                  <div>
                    <span className="cgpa-val">{job.minimumCGPA}</span>

                    <span className="cgpa-suffix"> / 10.0</span>
                  </div>
                ) : (
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-medium
                      text-emerald-700
                    "
                  >
                    <Target size={13} />
                    No restriction
                  </div>
                )}
              </div>
            </div>
          </div>

          <Divider />

          {/* APPLICATION INSIGHTS */}
          <div>
            <SectionHeading icon={Sparkles} title="Application Insights" />

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-5
              "
            >
              <div className="info-cell">
                <p className="info-cell__label">Hiring Difficulty</p>

                <p className="info-cell__value">Medium</p>
              </div>

              <div className="info-cell">
                <p className="info-cell__label">Selection Priority</p>

                <p className="info-cell__value">Skills + Resume</p>
              </div>

              <div className="info-cell">
                <p className="info-cell__label">AI Screening</p>

                <p className="info-cell__value">Enabled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetailPanel;
