import {
  MapPin,
  BriefcaseBusiness,
  Clock3,
  IndianRupee,
  Bookmark,
  Sparkles,
  Loader2,
} from "lucide-react";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import Badge from "../ui/Badge";

import useAIMatch from "../../hooks/useAIMatch";

import { useAuth } from "../../context/AuthContext";

function JobCard({
  job,

  isSaved = false,

  onSave,

  onRemove,
}) {
  const { user } = useAuth();

  const {
    score,

    loading,

    fetchScore,
  } = useAIMatch();

  // HANDLE AI SCORE
  const handleScore = async (e) => {
    e.preventDefault();

    if (!user?.resumeUrl) {
      toast.error("Upload resume to get AI score");

      return;
    }

    fetchScore(job._id);
  };

  // HANDLE SAVE
  const handleSave = (e) => {
    e.preventDefault();

    if (isSaved) {
      onRemove?.(job._id);
    } else {
      onSave?.(job._id);
    }
  };

  return (
    <Link
      to={`/jobs/${job._id}`}
      className="
        block
        group
      "
    >
      <div
        className="
          bg-white
          border
          border-border
          rounded-[32px]
          p-7
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-medium
        "
      >
        {/* TOP */}
        <div
          className="
            flex
            items-start
            justify-between
            gap-5
          "
        >
          {/* LEFT */}
          <div className="flex-1">
            {/* COMPANY */}
            <p
              className="
                text-sm
                text-muted
              "
            >
              {job.company || "Company"}
            </p>

            {/* TITLE */}
            <h2
              className="
                mt-2
                text-2xl
                font-semibold
                leading-tight
                text-primary
                transition-colors
                group-hover:text-accent
              "
            >
              {job.title}
            </h2>

            {/* AI SCORE */}
            <div className="mt-4">
              {score ? (
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    bg-blue-50
                    text-accent
                    text-sm
                    font-semibold
                  "
                >
                  <Sparkles size={16} />

                  <span>{score}% Score</span>
                </div>
              ) : (
                <button
                  onClick={handleScore}
                  disabled={loading}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    bg-stone
                    text-primary
                    text-sm
                    font-medium
                    transition-all
                    hover:bg-blue-50
                    hover:text-accent
                  "
                >
                  {loading ? (
                    <Loader2
                      size={16}
                      className="
                        animate-spin
                      "
                    />
                  ) : (
                    <Sparkles size={16} />
                  )}

                  <span>{loading ? "Loading..." : "Get Score"}</span>
                </button>
              )}
            </div>
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            className="
              w-11
              h-11
              rounded-2xl
              border
              border-border
              flex
              items-center
              justify-center
              transition-all
              hover:bg-stone
            "
          >
            <Bookmark
              size={18}
              className={
                isSaved
                  ? `
                    fill-primary
                    text-primary
                  `
                  : `
                    text-muted
                    hover:text-primary
                  `
              }
            />
          </button>
        </div>

        {/* DESCRIPTION */}
        <p
          className="
            mt-6
            text-muted
            leading-7
            line-clamp-3
          "
        >
          {job.description || "No description available."}
        </p>

        {/* SKILLS */}
        <div
          className="
            mt-6
            flex
            flex-wrap
            gap-3
          "
        >
          {job.requiredSkills?.slice(0, 4).map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>

        {/* META */}
        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            gap-5
            text-sm
            text-muted
          "
        >
          {/* LOCATION */}
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <MapPin size={16} />

            <span>{job.location || "Remote"}</span>
          </div>

          {/* TYPE */}
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <BriefcaseBusiness size={16} />

            <span
              className="
                capitalize
              "
            >
              {job.type}
            </span>
          </div>

          {/* DEADLINE */}
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Clock3 size={16} />

            <span>
              {job.deadline
                ? `Apply before ${new Date(job.deadline).toLocaleDateString()}`
                : "Applications open"}
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="
            mt-8
            pt-6
            border-t
            border-border
            flex
            items-center
            justify-between
            gap-4
          "
        >
          {/* STIPEND */}
          <div>
            <p
              className="
                text-sm
                text-muted
              "
            >
              Stipend
            </p>

            <div
              className="
                mt-1
                flex
                items-center
                gap-1
                text-xl
                font-semibold
                text-primary
              "
            >
              <IndianRupee size={18} />

              <span>{job.stipend || "Unpaid"}</span>
            </div>
          </div>

          {/* CTA */}
          <div
            className="
              px-5
              py-3
              rounded-2xl
              bg-primary
              text-white
              text-sm
              font-medium
              transition-all
              duration-200
              group-hover:bg-black
            "
          >
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
}

export default JobCard;
