import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Award, CalendarDays, ExternalLink, FileText,
  GitBranch, GraduationCap, Link2, MapPin,
  Sparkles, ArrowLeft, CheckCircle2,
} from "lucide-react";
import Avatar from "../../components/ui/Avatar";
import Skeleton from "../../components/ui/Skeleton";
import { getPublicProfile } from "../../api/userApi";

// ── HELPERS ──────────────────────────────────────────────
const normalizeList = (v) => Array.isArray(v) ? v.filter(Boolean) : [];

const formatDate = (d) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" })
    .format(new Date(d));

function getTitle(skills) {
  const s = skills.map((x) => x.toLowerCase());
  const has = (kw) => s.some((x) => kw.some((k) => x.includes(k)));
  if (has(["react","javascript","html","css"]) && has(["node","express","mongodb","java"])) return "Full Stack Developer";
  if (has(["node","express","mongodb","java","spring"])) return "Backend Developer";
  if (has(["react","javascript","html","css"])) return "Frontend Developer";
  if (has(["python","machine learning","tensorflow"])) return "AI/ML Student";
  return "Student Developer";
}

// ── ATOMS ────────────────────────────────────────────────
function MetaItem({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted">
      <Icon size={14} className="flex-shrink-0" />{label}
    </span>
  );
}

function ExtLink({ href, icon: Icon, label, primary }) {
  if (!href) return null;
  if (primary) return (
    <a href={href} target="_blank" rel="noreferrer"
      className="inline-flex items-center gap-2 h-9 px-4 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
      <Icon size={14} />{label}
    </a>
  );
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className="inline-flex items-center gap-2 h-9 px-4 rounded-xl border border-border bg-stone text-sm font-medium text-primary hover:bg-blue-50 hover:text-accent hover:border-blue-200 transition-all">
      <Icon size={14} />{label}
    </a>
  );
}

function StatChip({ icon: Icon, label, color }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      <Icon size={12} />{label}
    </span>
  );
}

function SkillPill({ label }) {
  return (
    <span className="px-3 py-1.5 rounded-full bg-stone border border-border text-xs font-medium text-primary">
      {label}
    </span>
  );
}

// only renders if children is truthy
function Section({ title, children }) {
  if (!children) return null;
  return (
    <div className="bg-white border border-border rounded-[24px] p-6">
      <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">{title}</h3>
      {children}
    </div>
  );
}

// ── SKELETON ─────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-border rounded-[28px] p-6 flex gap-5">
        <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2.5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-3 w-28" />
          <div className="flex gap-2 pt-1">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
      </div>
      {[120, 96, 140].map((h, i) => (
        <Skeleton key={i} className={`h-${h === 120 ? '28' : h === 96 ? '24' : '36'} w-full rounded-[24px]`} />
      ))}
    </div>
  );
}

// ── PAGE ─────────────────────────────────────────────────
function PublicProfilePage() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await getPublicProfile(studentId);
        setStudent(res.data);
      } catch {
        setError("Profile not found or unavailable.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [studentId]);

  // ── LOADING ──
  if (loading) return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-5 py-10">
        <Skeleton className="h-4 w-24 mb-8 rounded-lg" />
        <LoadingSkeleton />
      </div>
    </div>
  );

  // ── ERROR ──
  if (error || !student) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-5">
        <p className="text-xl font-bold text-primary">Profile Not Found</p>
        <p className="mt-2 text-sm text-muted">{error || "This profile doesn't exist."}</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm text-accent hover:underline">
          <ArrowLeft size={14} /> Go Home
        </Link>
      </div>
    </div>
  );

  const skills          = normalizeList(student.skills);
  const careerInterests = normalizeList(student.careerInterests);
  const achievements    = normalizeList(student.achievements);
  const title           = getTitle(skills);

  // ── CONTENT ──
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-10">

        {/* BACK */}
        <Link to={-1}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors mb-6">
          <ArrowLeft size={14} /> Back
        </Link>

        <div className="space-y-4">

          {/* ── HERO ── */}
          <div className="bg-white border border-border rounded-[28px] p-6">

            {/* TOP ROW: avatar + name + links */}
            <div className="flex flex-col sm:flex-row gap-5">
              <Avatar
                src={student.profilePicture}
                alt={student.name || "Student"}
                size="lg"
              />

              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Student Profile</p>
                <h1 className="mt-1 text-xl font-bold text-primary tracking-tight">{student.name}</h1>
                <p className="mt-0.5 text-sm text-muted">{title}</p>

                {/* META — only shows items that exist, wraps naturally */}
                {(student.college || student.location || student.createdAt) && (
                  <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
                    {student.college   && <MetaItem icon={GraduationCap} label={student.college} />}
                    {student.location  && <MetaItem icon={MapPin}        label={student.location} />}
                    {student.createdAt && <MetaItem icon={CalendarDays}  label={`Joined ${formatDate(student.createdAt)}`} />}
                  </div>
                )}

                {/* CHIPS — only shows what's available */}
                {(skills.length > 0 || careerInterests.length > 0 || student.resumeUrl) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.length > 0 && (
                      <StatChip icon={Sparkles}     label={`${skills.length} Skills`}              color="bg-blue-50 text-blue-700"   />
                    )}
                    {careerInterests.length > 0 && (
                      <StatChip icon={CheckCircle2} label={`${careerInterests.length} Interests`}  color="bg-purple-50 text-purple-700" />
                    )}
                    {student.resumeUrl && (
                      <StatChip icon={FileText}     label="Resume Available"                        color="bg-green-50 text-green-700"  />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* LINKS ROW — only shown if any exist, full-width below avatar on mobile */}
            {(student.github || student.linkedin || student.resumeUrl) && (
              <div className="mt-5 pt-5 border-t border-border flex flex-wrap gap-2">
                <ExtLink href={student.github}    icon={GitBranch} label="GitHub"          />
                <ExtLink href={student.linkedin}  icon={Link2}     label="LinkedIn"        />
                <ExtLink href={student.resumeUrl} icon={FileText}  label="Download Resume" primary />
              </div>
            )}
          </div>

          {/* ── ABOUT ── */}
          <Section title="About">
            {student.bio
              ? <p className="text-sm text-muted leading-7">{student.bio}</p>
              : null}
          </Section>

          {/* ── SKILLS ── */}
          <Section title="Skills">
            {skills.length > 0
              ? <div className="flex flex-wrap gap-2">{skills.map((s) => <SkillPill key={s} label={s} />)}</div>
              : null}
          </Section>

          {/* ── ACHIEVEMENTS ── */}
          <Section title="Achievements & Projects">
            {achievements.length > 0
              ? (
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
              )
              : null}
          </Section>

          {/* ── CAREER INTERESTS ── */}
          <Section title="Career Interests">
            {careerInterests.length > 0
              ? <div className="flex flex-wrap gap-2">{careerInterests.map((i) => <SkillPill key={i} label={i} />)}</div>
              : null}
          </Section>

          {/* ── EDUCATION ── */}
          <Section title="Education">
            {student.college
              ? (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">{student.college}</p>
                    {student.location && <p className="text-xs text-muted mt-0.5">{student.location}</p>}
                  </div>
                </div>
              )
              : null}
          </Section>

          {/* ── RESUME CARD ── */}
          {student.resumeUrl && (
            <div className="bg-white border border-border rounded-[24px] p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <FileText size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">Resume</p>
                  <p className="text-xs text-muted">Version {student.resumeVersion || 1}</p>
                </div>
              </div>
              <a href={student.resumeUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline">
                Open <ExternalLink size={11} />
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default PublicProfilePage;