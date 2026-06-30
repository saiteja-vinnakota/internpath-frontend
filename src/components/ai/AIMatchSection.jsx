import {
  Sparkles, CheckCircle2, CircleDashed, TrendingUp, RefreshCw,
} from "lucide-react";

// ── HELPERS ──────────────────────────────────────────────
function getMatchStyle(score) {
  if (score >= 85) return { label: "Excellent Match", bar: "#16a34a", bg: "bg-green-50",  text: "text-green-700"  };
  if (score >= 70) return { label: "Strong Match",     bar: "#2563EB", bg: "bg-blue-50",   text: "text-blue-700"   };
  if (score >= 50) return { label: "Moderate Match",   bar: "#d97706", bg: "bg-amber-50",  text: "text-amber-700"  };
  return                  { label: "Low Match",        bar: "#dc2626", bg: "bg-red-50",    text: "text-red-700"    };
}

function SkillGroup({ icon: Icon, title, count, skills, accent }) {
  const A = {
    green: { bg: "bg-green-50", text: "text-green-700", chipBg: "bg-green-50", chipText: "text-green-700" },
    amber: { bg: "bg-amber-50", text: "text-amber-700", chipBg: "bg-amber-50", chipText: "text-amber-700" },
  }[accent];

  return (
    <div className="p-5 rounded-[20px] bg-stone border border-border">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${A.bg}`}>
          <Icon size={16} className={A.text} />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">{title}</p>
          <p className="text-xs text-muted">{count} skill{count !== 1 ? "s" : ""}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {skills.length > 0
          ? skills.map((s) => (
              <span key={s} className={`px-2.5 py-1 rounded-full text-xs font-medium ${A.chipBg} ${A.chipText}`}>{s}</span>
            ))
          : <p className="text-xs text-muted">None detected.</p>}
      </div>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────
function AIMatchSection({ matchData, loading, onFetchScore, onRefresh, hasResume }) {

  // ── NOT FETCHED YET ──
  if (!matchData && !loading) {
    return (
      <div className="bg-white border border-border rounded-[28px] p-6 sm:p-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">
          <Sparkles size={20} className="text-accent" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-primary">Check Your AI Match Score</h3>
        <p className="mt-1.5 text-sm text-muted max-w-sm mx-auto">
          {hasResume
            ? "See how well your profile matches this internship's requirements."
            : "Upload your resume in your profile to check your match score."}
        </p>
        {hasResume && (
          <button
            onClick={onFetchScore}
            className="mt-5 inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <Sparkles size={14} /> Check Match Score
          </button>
        )}
      </div>
    );
  }

  // ── LOADING ──
  if (loading) {
    return (
      <div className="bg-white border border-border rounded-[28px] p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center animate-pulse">
            <Sparkles size={16} className="text-accent" />
          </div>
          <p className="text-sm font-medium text-muted">Analyzing your profile against this role...</p>
        </div>
        <div className="mt-5 h-2 rounded-full bg-stone overflow-hidden">
          <div className="h-full w-1/3 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  // ── RESULT ──
  const score          = matchData.score || 0;
  const matchedSkills  = matchData.matchedSkills || [];
  const missingSkills  = matchData.missingSkills || [];
  const suggestion     = matchData.suggestion || "";
  const style          = getMatchStyle(score);

  return (
    <div className="bg-white border border-border rounded-[28px] p-6 sm:p-8">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-accent text-xs font-semibold">
            <Sparkles size={12} /> AI Match Analysis
          </div>
          <p className="mt-3 text-4xl font-bold text-primary tracking-tight">{score}%</p>
          <p className="mt-1 text-sm text-muted">Your profile alignment with this internship role.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
            {style.label}
          </span>
          <button
            onClick={onRefresh}
            title="Re-check match score"
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-border hover:bg-stone transition-colors"
          >
            <RefreshCw size={13} className="text-muted" />
          </button>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="mt-6 h-2 rounded-full bg-stone overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, background: style.bar }} />
      </div>

      {/* SKILLS — only render if backend actually provided data */}
      {(matchedSkills.length > 0 || missingSkills.length > 0) && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SkillGroup icon={CheckCircle2}  title="Matching Skills" count={matchedSkills.length} skills={matchedSkills} accent="green" />
          <SkillGroup icon={CircleDashed}  title="Missing Skills"  count={missingSkills.length} skills={missingSkills} accent="amber" />
        </div>
      )}

      {/* SUGGESTION — only if backend provided one */}
      {suggestion && (
        <div className="mt-5 p-5 rounded-[18px] bg-blue-50 border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
              <TrendingUp size={15} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Improvement Suggestion</p>
              <p className="mt-1 text-xs text-muted leading-5">{suggestion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIMatchSection;