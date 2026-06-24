import {
  AlertCircle,
  Award,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileText,
  GitBranch,
  GraduationCap,
  Link2,
  MapPin,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import Avatar from "../ui/Avatar";

function StudentProfileOverview({ user }) {
  const skills = normalizeList(user?.skills);

  const careerInterests = normalizeList(user?.careerInterests);

  const achievements = normalizeList(user?.achievements);

  const profileItems = [
    {
      label: "Profile Picture",
      complete: Boolean(user?.profilePicture),
    },
    {
      label: "Bio",
      complete: Boolean(user?.bio),
    },
    {
      label: "College",
      complete: Boolean(user?.college),
    },
    {
      label: "Location",
      complete: Boolean(user?.location),
    },
    {
      label: "GitHub",
      complete: Boolean(user?.github),
    },
    {
      label: "LinkedIn",
      complete: Boolean(user?.linkedin),
    },
    {
      label: "Resume",
      complete: Boolean(user?.resumeUrl),
    },
    {
      label: "Skills",
      complete: skills.length > 0,
    },
    {
      label: "Career interests",
      complete: careerInterests.length > 0,
    },
    {
      label: "Achievements",
      complete: achievements.length > 0,
    },
  ];

  const completedFields = profileItems.filter((item) => item.complete).length;

  const profileStrength = Math.round(
    (completedFields / profileItems.length) * 100,
  );

  const missingItems = profileItems.filter((item) => !item.complete);

  const title = getProfileTitle(skills);

  const resumeWordCount = user?.resumeText
    ? user.resumeText.trim().split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <div className="space-y-8">
      {/* HERO */}
      <section
        className="
          bg-white
          border
          border-border
          rounded-[32px]
          p-6
          sm:p-8
          xl:p-10
          shadow-sm
        "
      >
        <div
          className="
            flex
            flex-col
            xl:flex-row
            xl:items-start
            xl:justify-between
            gap-8
          "
        >
          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-6
            "
          >
            <Avatar
              src={user?.profilePicture}
              alt={user?.name || "Student"}
              size="xl"
            />

            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-accent
                "
              >
                Student Profile
              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  sm:text-5xl
                  font-serif
                  text-primary
                "
              >
                {user?.name || "Student"}
              </h2>

              <p
                className="
                  mt-3
                  text-lg
                  font-medium
                  text-primary
                "
              >
                {title}
              </p>

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  items-center
                  gap-3
                  text-sm
                  text-muted
                "
              >
                {user?.college && (
                  <InlineMeta
                    icon={<GraduationCap size={17} />}
                    label={user.college}
                  />
                )}

                {user?.location && (
                  <InlineMeta
                    icon={<MapPin size={17} />}
                    label={user.location}
                  />
                )}

                {user?.createdAt && (
                  <InlineMeta
                    icon={<CalendarDays size={17} />}
                    label={`Joined ${formatDate(user.createdAt)}`}
                  />
                )}
              </div>

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-3
                "
              >
                <HeroChip
                  icon={<TrendingUp size={16} />}
                  label={`${profileStrength}% complete`}
                />

                <HeroChip
                  icon={<Sparkles size={16} />}
                  label={`${skills.length} skills`}
                />

                <HeroChip
                  icon={<BriefcaseBusiness size={16} />}
                  label={`${careerInterests.length} interests`}
                />

                <HeroChip
                  icon={<FileText size={16} />}
                  label={user?.resumeUrl ? "Resume uploaded" : "Resume needed"}
                  success={Boolean(user?.resumeUrl)}
                />
              </div>
            </div>
          </div>

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >
            <ProfileLink
              href={user?.github}
              icon={<GitBranch size={18} />}
              label="GitHub"
            />

            <ProfileLink
              href={user?.linkedin}
              icon={<Link2 size={18} />}
              label="LinkedIn"
            />

            <ProfileLink
              href={user?.resumeUrl}
              icon={<FileText size={18} />}
              label="Resume"
            />
          </div>
        </div>
      </section>

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[1fr_380px]
          gap-8
        "
      >
        <div className="space-y-8">
          <ProfileStrengthCard
            completedFields={completedFields}
            totalFields={profileItems.length}
            profileStrength={profileStrength}
          />

          <MissingInformationCard missingItems={missingItems} />

          <ProfileSection title="About Me">
            <p
              className="
                text-muted
                leading-8
              "
            >
              {user?.bio ||
                "Add a short bio to help recruiters understand your interests, strengths, and career goals."}
            </p>
          </ProfileSection>

          <ProfileSection title="Skills">
            <ChipList
              items={skills}
              emptyText="Add skills from your resume or profile form."
            />
          </ProfileSection>

          <ProfileSection title="Achievements">
            {achievements.length > 0 ? (
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <AchievementItem key={achievement} label={achievement} />
                ))}
              </div>
            ) : (
              <EmptyText>
                Add achievements like projects, awards, certifications, or
                coding milestones.
              </EmptyText>
            )}
          </ProfileSection>
        </div>

        <div className="space-y-8">
          <ResumeInsightsCard
            user={user}
            skillCount={skills.length}
            resumeWordCount={resumeWordCount}
          />

          <ProfileSection title="Career Interests">
            <ChipList
              items={careerInterests}
              emptyText="Add roles, domains, or industries you want to explore."
            />
          </ProfileSection>

          <ProfileSection title="Education">
            {user?.college ? (
              <div className="flex gap-4">
                <IconBox>
                  <GraduationCap size={22} />
                </IconBox>

                <div>
                  <h3
                    className="
                      font-semibold
                      text-primary
                    "
                  >
                    {user.college}
                  </h3>

                  {user?.location && (
                    <p
                      className="
                        mt-1
                        text-sm
                        text-muted
                      "
                    >
                      {user.location}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <EmptyText>Add your college to complete this section.</EmptyText>
            )}
          </ProfileSection>
        </div>
      </div>
    </div>
  );
}

function ProfileStrengthCard({
  completedFields,
  totalFields,
  profileStrength,
}) {
  return (
    <section
      className="
        bg-white
        border
        border-border
        rounded-[28px]
        p-6
        sm:p-8
        shadow-sm
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-5
        "
      >
        <div>
          <p
            className="
              text-sm
              font-medium
              text-muted
            "
          >
            Profile Strength
          </p>

          <h2
            className="
              mt-2
              text-4xl
              font-semibold
              text-primary
            "
          >
            {profileStrength}%
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-muted
            "
          >
            {completedFields} / {totalFields} complete
          </p>
        </div>

        <IconBox accent>
          <TrendingUp size={22} />
        </IconBox>
      </div>

      <div
        className="
          mt-6
          h-3
          overflow-hidden
          rounded-full
          bg-stone
        "
      >
        <div
          className="
            h-full
            rounded-full
            bg-accent
            transition-all
            duration-500
          "
          style={{
            width: `${profileStrength}%`,
          }}
        />
      </div>
    </section>
  );
}

function MissingInformationCard({ missingItems }) {
  if (missingItems.length === 0) {
    return (
      <section
        className="
          bg-green/10
          border
          border-green/20
          rounded-[28px]
          p-6
          sm:p-8
        "
      >
        <div className="flex gap-4">
          <CheckCircle2 size={24} className="mt-1 text-green" />

          <div>
            <h2
              className="
                text-xl
                font-semibold
                text-primary
              "
            >
              Profile Complete
            </h2>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-muted
              "
            >
              Your profile has the key details recruiters expect to see.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="
        bg-white
        border
        border-border
        rounded-[28px]
        p-6
        sm:p-8
        shadow-sm
      "
    >
      <div className="flex gap-4">
        <AlertCircle size={24} className="mt-1 text-accent" />

        <div>
          <h2
            className="
              text-xl
              font-semibold
              text-primary
            "
          >
            Missing Information
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-muted
            "
          >
            Add these details to make your profile stronger.
          </p>

          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-3
            "
          >
            {missingItems.map((item) => (
              <span
                key={item.label}
                className="
                  rounded-full
                  bg-blue-50
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-accent
                "
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumeInsightsCard({ user, skillCount, resumeWordCount }) {
  return (
    <section
      className="
        bg-white
        border
        border-border
        rounded-[28px]
        p-6
        sm:p-8
        shadow-sm
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <h2
            className="
              text-2xl
              font-serif
              text-primary
            "
          >
            Resume Insights
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-muted
            "
          >
            {user?.resumeUrl
              ? "Parsed resume details"
              : "Upload a resume to unlock insights"}
          </p>
        </div>

        <IconBox success={Boolean(user?.resumeUrl)}>
          <FileText size={22} />
        </IconBox>
      </div>

      <div className="mt-6 space-y-4">
        <InsightRow
          label="Status"
          value={user?.resumeUrl ? "Uploaded" : "Missing"}
          success={Boolean(user?.resumeUrl)}
        />

        <InsightRow
          label="Version"
          value={`Version ${user?.resumeVersion || 1}`}
        />

        <InsightRow label="Skills Detected" value={`${skillCount}`} />

        <InsightRow
          label="Resume Text"
          value={
            resumeWordCount ? `${resumeWordCount} words` : "Not parsed yet"
          }
        />

        {user?.updatedAt && (
          <InsightRow label="Last Updated" value={formatDate(user.updatedAt)} />
        )}
      </div>

      {user?.resumeUrl && (
        <a
          href={user.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-accent
            hover:underline
          "
        >
          View Resume
          <ExternalLink size={16} />
        </a>
      )}
    </section>
  );
}

function ProfileSection({ title, children }) {
  return (
    <section
      className="
        bg-white
        border
        border-border
        rounded-[28px]
        p-6
        sm:p-8
        shadow-sm
      "
    >
      <h2
        className="
          text-2xl
          font-serif
          text-primary
        "
      >
        {title}
      </h2>

      <div className="mt-5">{children}</div>
    </section>
  );
}

function ChipList({ items, emptyText }) {
  if (items.length === 0) {
    return <EmptyText>{emptyText}</EmptyText>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item}
          className="
            rounded-full
            border
            border-border
            bg-stone
            px-4
            py-2
            text-sm
            font-medium
            text-primary
          "
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function AchievementItem({ label }) {
  return (
    <div className="flex gap-4">
      <IconBox>
        <Award size={20} />
      </IconBox>

      <p
        className="
          pt-2
          text-sm
          leading-7
          text-primary
        "
      >
        {label}
      </p>
    </div>
  );
}

function InsightRow({ label, value, success = false }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        rounded-2xl
        bg-stone
        px-4
        py-3
      "
    >
      <span
        className="
          text-sm
          text-muted
        "
      >
        {label}
      </span>

      <span
        className={`
          text-sm
          font-semibold
          ${success ? "text-green" : "text-primary"}
        `}
      >
        {value}
      </span>
    </div>
  );
}

function InlineMeta({ icon, label }) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-2
      "
    >
      {icon}
      {label}
    </span>
  );
}

function HeroChip({ icon, label, success = false }) {
  return (
    <span
      className={`
        inline-flex
        h-10
        items-center
        gap-2
        rounded-full
        px-4
        text-sm
        font-semibold
        ${success ? "bg-green/10 text-green" : "bg-stone text-primary"}
      `}
    >
      {icon}
      {label}
    </span>
  );
}

function ProfileLink({ href, icon, label }) {
  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="
        inline-flex
        h-11
        items-center
        gap-2
        rounded-2xl
        border
        border-border
        bg-stone
        px-4
        text-sm
        font-semibold
        text-primary
        transition-all
        hover:bg-blue-50
        hover:text-accent
      "
    >
      {icon}
      {label}
    </a>
  );
}

function IconBox({ children, accent = false, success = false }) {
  return (
    <div
      className={`
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center
        rounded-2xl
        ${
          success
            ? "bg-green/10 text-green"
            : accent
              ? "bg-blue-50 text-accent"
              : "bg-stone text-primary"
        }
      `}
    >
      {children}
    </div>
  );
}

function EmptyText({ children }) {
  return (
    <p
      className="
        text-muted
        leading-7
      "
    >
      {children}
    </p>
  );
}

function normalizeList(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function getProfileTitle(skills) {
  const normalizedSkills = skills.map((skill) => skill.toLowerCase());

  const hasFrontend = hasAnySkill(normalizedSkills, [
    "react",
    "javascript",
    "tailwind",
    "redux",
    "html",
    "css",
  ]);

  const hasBackend = hasAnySkill(normalizedSkills, [
    "node",
    "express",
    "java",
    "spring",
    "mongodb",
    "mysql",
    "sql",
    "api",
  ]);

  const hasAi = hasAnySkill(normalizedSkills, [
    "python",
    "machine learning",
    "tensorflow",
    "pandas",
  ]);

  if (hasFrontend && hasBackend) {
    return "Full Stack Developer";
  }

  if (hasBackend) {
    return "Backend Developer";
  }

  if (hasFrontend) {
    return "Frontend Developer";
  }

  if (hasAi) {
    return "AI/ML Student";
  }

  return "Student Developer";
}

function hasAnySkill(skills, keywords) {
  return skills.some((skill) =>
    keywords.some((keyword) => skill.includes(keyword)),
  );
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
}

export default StudentProfileOverview;
