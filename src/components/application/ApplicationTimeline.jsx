import {
  CheckCircle2,
  Clock3,
  Search,
  MessageSquareText,
  XCircle,
} from "lucide-react";

import { APPLICATION_STATUS } from "../../constants/applicationStatus";

const STEPS = [
  {
    key: APPLICATION_STATUS.APPLIED,
    label: "Applied",
    description: "Your application has been submitted.",
    icon: Clock3,
    // matches ApplicationStatusBadge: bg-blue-50 text-blue-700
    active: { bg: "#EFF6FF", icon: "#1d4ed8", line: "#2563EB" },
  },
  {
    key: APPLICATION_STATUS.SHORTLISTED,
    label: "Shortlisted",
    description: "Your profile passed initial screening.",
    icon: Search,
    // matches: bg-purple-50 text-purple-700
    active: { bg: "#F5F3FF", icon: "#6d28d9", line: "#7c3aed" },
  },
  {
    key: APPLICATION_STATUS.INTERVIEW,
    label: "Interview",
    description: "Recruiter moved you to interview stage.",
    icon: MessageSquareText,
    // matches: bg-amber-50 text-amber-700
    active: { bg: "#FFFBEB", icon: "#b45309", line: "#d97706" },
  },
  {
    key: APPLICATION_STATUS.SELECTED,
    label: "Selected",
    description: "Congratulations! You were selected.",
    icon: CheckCircle2,
    // matches: bg-green-50 text-green-700
    active: { bg: "#F0FDF4", icon: "#15803d", line: "#16a34a" },
  },
];

function ApplicationTimeline({ status }) {
  // REJECTED
  if (status === APPLICATION_STATUS.REJECTED) {
    return (
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
          <XCircle size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">Application Rejected</p>
          <p className="mt-0.5 text-xs text-muted leading-relaxed">
            Not selected for the next stage. Keep applying to other opportunities.
          </p>
        </div>
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="space-y-0">
      {STEPS.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent   = index === currentIndex;
        const Icon        = step.icon;
        const isLast      = index === STEPS.length - 1;

        return (
          <div key={step.key} className="flex items-start gap-3">

            {/* ICON + LINE column */}
            <div className="flex flex-col items-center">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                style={
                  isCompleted
                    ? { background: step.active.bg }
                    : { background: "#F0EDE7" }
                }
              >
                <Icon
                  size={16}
                  style={{ color: isCompleted ? step.active.icon : "#9c9489" }}
                />
              </div>

              {/* connector line */}
              {!isLast && (
                <div
                  className="w-0.5 flex-1 min-h-[24px] my-1 rounded-full transition-colors"
                  style={{
                    background: index < currentIndex ? step.active.line : "#E8E4DD",
                  }}
                />
              )}
            </div>

            {/* TEXT */}
            <div className={`pb-4 ${isLast ? "" : ""}`}>
              <p
                className={`text-sm font-semibold ${isCompleted ? "text-primary" : "text-muted"}`}
              >
                {step.label}
                {isCurrent && (
                  <span
                    className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ background: step.active.bg, color: step.active.icon }}
                  >
                    Current
                  </span>
                )}
              </p>
              <p className="mt-0.5 text-xs text-muted leading-relaxed">
                {step.description}
              </p>
            </div>

          </div>
        );
      })}
    </div>
  );
}

export default ApplicationTimeline;