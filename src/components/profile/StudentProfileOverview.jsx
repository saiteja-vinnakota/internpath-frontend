import {
  AlertCircle, Award, CalendarDays, CheckCircle2,
  ExternalLink, FileText, GitBranch, GraduationCap,
  Link2, MapPin, Sparkles, TrendingUp,
} from "lucide-react";
import Avatar from "../ui/Avatar";

// ── HELPERS ──────────────────────────────────────────────
function normalizeList(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function formatDate(d) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(d));
}

function getProfileTitle(skills) {
  const s = skills.map((x) => x.toLowerCase());
  const has = (kw) => s.some((x) => kw.some((k) => x.includes(k)));
  if (has(["react","javascript","tailwind","html","css"]) && has(["node","express","mongodb","mysql","java"])) return "Full Stack Developer";
  if (has(["node","express","mongodb","mysql","java","spring"])) return "Backend Developer";
  if (has(["react","javascript","tailwind","html","css"])) return "Frontend Developer";
  if (has(["python","machine learning","tensorflow","pandas"])) return "AI/ML Student";
  return "Student Developer";
}

// ── STRENGTH COLOR ────────────────────────────────────────
function strengthColor(pct) {
  if (pct >= 80) return { bar: "#16a34a", bg: "bg-green-50", text: "text-green-700" };
  if (pct >= 50) return { bar: "#d97706", bg: "bg-amber-50", text: "text-amber-700" };
  return { bar: "#dc2626", bg: "bg-red-50", text: "text-red-700" };
}

// ── SMALL COMPONENTS ─────────────────────────────────────
function MetaItem({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted">
      <Icon size={14} className="flex-shrink-0" />
      {label}
    </span>
  );
}

function ProfileLink({ href, icon: Icon, label }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className="inline-flex items-center gap-2 h-9 px-4 rounded-xl border border-border bg-stone text-sm font-medium text-primary transition-all hover:bg-blue-50 hover:text-accent hover:border-blue-200">
      <Icon size={14} />
      {label}
    </a>
  );
}

function SectionCard({ title, children, action }) {
  return (
    <div className="bg-white border border-border rounded-[24px] p-6">
      <div className="flex items-center justify-between gap-3 mb-5">
        <h3 className="text-base font-semibold text-primary">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function InsightRow({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 border-b border-border last:border-0">
      <span className="text-xs text-muted">{label}</span>
      <span className={`text-xs font-semibold ${highlight ? "text-green-700" : "text-primary"}`}>{value}</span>
    </div>
  );
}

function SkillPill({ label }) {
  return (
    <span className="px-3 py-1.5 rounded-full bg-stone border border-border text-xs font-medium text-primary">
      {label}
    </span>
  );
}

function EmptyHint({ children }) {
  return <p className="text-sm text-muted">{children}</p>;
}

// ── MAIN ─────────────────────────────────────────────────
function StudentProfileOverview({ user }) {
  const skills         = normalizeList(user?.skills);
  const careerInterests = normalizeList(user?.careerInterests);
  const achievements   = normalizeList(user?.achievements);

  const profileItems = [
    { label: "Profile Picture",  complete: Boolean(user?.profilePicture) },
    { label: "Bio",              complete: Boolean(user?.bio)             },
    { label: "College",          complete: Boolean(user?.college)         },
    { label: "Location",         complete: Boolean(user?.location)        },
    { label: "GitHub",           complete: Boolean(user?.github)          },
    { label: "LinkedIn",         complete: Boolean(user?.linkedin)        },
    { label: "Resume",           complete: Boolean(user?.resumeUrl)       },
    { label: "Skills",           complete: skills.length > 0             },
    { label: "Career Interests", complete: careerInterests.length > 0    },
    { label: "Achievements",     complete: achievements.length > 0       },
  ];

  const completedFields  = profileItems.filter((i) => i.complete).length;
  const profileStrength  = Math.round((completedFields / profileItems.length) * 100);
  const missingItems     = profileItems.filter((i) => !i.complete);
  const title            = getProfileTitle(skills);
  const sc               = strengthColor(profileStrength);
  const resumeWordCount  = user?.resumeText
    ? user.resumeText.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="space-y-5">

      {/* ── HERO CARD ── */}
      <div className="bg-white border border-border rounded-[28px] p-6">
        <div className="flex flex-col sm:flex-row gap-5">

          <Avatar src={user?.profilePicture} alt={user?.name || "Student"} size="xl" />

          <div className="flex-1 min-w-0">
            {/* TOP ROW */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">Student Profile</p>
                <h2 className="mt-1 text-2xl font-bold text-primary tracking-tight">{user?.name || "Student"}</h2>
                <p className="mt-0.5 text-sm font-medium text-muted">{title}</p>
              </div>

              {/* LINKS */}
              <div className="flex flex-wrap gap-2">
                <ProfileLink href={user?.github}    icon={GitBranch} label="GitHub"   />
                <ProfileLink href={user?.linkedin}  icon={Link2}     label="LinkedIn" />
                <ProfileLink href={user?.resumeUrl} icon={FileText}  label="Resume"   />
              </div>
            </div>

            {/* META */}
            <div className="mt-3 flex flex-wrap gap-4">
              {user?.college  && <MetaItem icon={GraduationCap} label={user.college}                     />}
              {user?.location && <MetaItem icon={MapPin}        label={user.location}                    />}
              {user?.createdAt && <MetaItem icon={CalendarDays} label={`Joined ${formatDate(user.createdAt)}`} />}
            </div>

            {/* CHIPS */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                <TrendingUp size={12} /> {profileStrength}% Profile
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                <Sparkles size={12} /> {skills.length} Skills
              </span>
              {user?.resumeUrl && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
                  <FileText size={12} /> Resume Uploaded
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY GRID ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 items-start">

        {/* LEFT */}
        <div className="space-y-5">

          {/* PROFILE STRENGTH */}
          <div className="bg-white border border-border rounded-[24px] p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">Profile Strength</p>
                <p className="mt-1 text-3xl font-bold text-primary">{profileStrength}%</p>
                <p className="text-xs text-muted mt-0.5">{completedFields} / {profileItems.length} complete</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sc.bg}`}>
                <TrendingUp size={18} className={sc.text} />
              </div>
            </div>
            <div className="h-2 rounded-full bg-stone overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${profileStrength}%`, background: sc.bar }} />
            </div>
          </div>

          {/* MISSING INFO */}
          {missingItems.length > 0 ? (
            <div className="bg-white border border-border rounded-[24px] p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={15} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">Missing Information</p>
                  <p className="mt-0.5 text-xs text-muted">Add these to make your profile stronger.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {missingItems.map((item) => (
                      <span key={item.label}
                        className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-[24px] p-5 flex items-center gap-3">
              <CheckCircle2 size={18} className="text-green-700 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-800">Profile Complete</p>
                <p className="text-xs text-green-700 mt-0.5">Your profile has all the details recruiters expect.</p>
              </div>
            </div>
          )}

          {/* ABOUT */}
          <SectionCard title="About Me">
            {user?.bio
              ? <p className="text-sm text-muted leading-7">{user.bio}</p>
              : <EmptyHint>Add a short bio to help recruiters understand your interests and goals.</EmptyHint>}
          </SectionCard>

          {/* SKILLS */}
          <SectionCard title="Skills">
            {skills.length > 0
              ? <div className="flex flex-wrap gap-2">{skills.map((s) => <SkillPill key={s} label={s} />)}</div>
              : <EmptyHint>Add your skills from the profile form.</EmptyHint>}
          </SectionCard>

          {/* ACHIEVEMENTS */}
          {achievements.length > 0 && (
            <SectionCard title="Achievements">
              <div className="space-y-3">
                {achievements.map((a) => (
                  <div key={a} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Award size={13} className="text-amber-600" />
                    </div>
                    <p className="text-sm text-primary leading-6">{a}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-5">

          {/* RESUME INSIGHTS */}
          <SectionCard
            title="Resume Insights"
            action={
              user?.resumeUrl && (
                <a href={user.resumeUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline">
                  View <ExternalLink size={11} />
                </a>
              )
            }
          >
            <InsightRow label="Status"         value={user?.resumeUrl ? "Uploaded" : "Missing"} highlight={Boolean(user?.resumeUrl)} />
            <InsightRow label="Version"        value={`Version ${user?.resumeVersion || 1}`} />
            <InsightRow label="Skills Detected" value={`${skills.length}`} />
            <InsightRow label="Word Count"     value={resumeWordCount ? `${resumeWordCount} words` : "—"} />
            {user?.updatedAt && <InsightRow label="Last Updated" value={formatDate(user.updatedAt)} />}
          </SectionCard>

          {/* CAREER INTERESTS */}
          <SectionCard title="Career Interests">
            {careerInterests.length > 0
              ? <div className="flex flex-wrap gap-2">{careerInterests.map((i) => <SkillPill key={i} label={i} />)}</div>
              : <EmptyHint>Add roles or domains you want to explore.</EmptyHint>}
          </SectionCard>

          {/* EDUCATION */}
          <SectionCard title="Education">
            {user?.college ? (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">{user.college}</p>
                  {user?.location && <p className="text-xs text-muted mt-0.5">{user.location}</p>}
                </div>
              </div>
            ) : <EmptyHint>Add your college to complete this section.</EmptyHint>}
          </SectionCard>

        </div>
      </div>
    </div>
  );
}

export default StudentProfileOverview;