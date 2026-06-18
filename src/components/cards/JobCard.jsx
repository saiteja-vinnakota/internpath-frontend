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

  // AI SCORE
  const handleScore = async (e) => {
    e.preventDefault();

    e.stopPropagation();

    if (!user?.resumeUrl) {
      return;
    }

    fetchScore(job._id);
  };

  // SAVE
  const handleSave = (e) => {
    e.preventDefault();

    e.stopPropagation();

    if (isSaved) {
      onRemove?.(job._id);
    } else {
      onSave?.(job._id);
    }
  };

  // DELETE
  const handleDelete = (e) => {
    e.preventDefault();

    e.stopPropagation();

    onDelete?.(job._id);
  };

  // CLOSE
  const handleClose = (e) => {
    e.preventDefault();

    e.stopPropagation();

    onClose?.(job._id);
  };

  // REOPEN
  const handleReopen = (e) => {
    e.preventDefault();

    e.stopPropagation();

    onReopen?.(job._id);
  };

  // VIEW APPLICANTS
  const handleApplicants = (e) => {
    e.preventDefault();

    e.stopPropagation();

    navigate(`/recruiter/applicants/${job._id}`);
  };

  return (
    <Link to={`/jobs/${job._id}`} className="block">
      <div
        className="
          bg-white
          border
          border-border
          rounded-[32px]
          p-7
          transition-all
          duration-200
          hover:shadow-md
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
            {/* COMPANY + BADGES */}
            <div
              className="
                flex
                items-center
                gap-3
                flex-wrap
              "
            >
              <p
                className="
                  text-sm
                  text-muted
                "
              >
                {job.company || "Company"}
              </p>

              {job.category && (
                <div
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-blue-50
                    text-accent
                    text-xs
                    font-medium
                  "
                >
                  {job.category === "fullstack"
                    ? "Full Stack"
                    : job.category === "aiml"
                      ? "AI/ML"
                      : job.category === "datascience"
                        ? "Data Science"
                        : job.category}
                </div>
              )}

              {job.status === "closed" && (
                <div
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-red-50
                    text-red-600
                    text-xs
                    font-medium
                  "
                >
                  Closed
                </div>
              )}
            </div>

            {/* TITLE */}
            <h2
              className="
                mt-2
                text-2xl
                font-semibold
                leading-tight
                text-primary
              "
            >
              {job.title}
            </h2>

            {/* AI SCORE */}
            {!recruiterMode && (
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
                    disabled={loading || !user?.resumeUrl}
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
                      transition-colors
                      hover:bg-border
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    "
                  >
                    {loading ? <Spinner size="sm" /> : <Sparkles size={16} />}

                    <span>
                      {!user?.resumeUrl
                        ? "Resume Required"
                        : loading
                          ? "Loading..."
                          : "Get Score"}
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RIGHT ACTION */}
          {!recruiterMode ? (
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
                transition-colors
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
                    `
                }
              />
            </button>
          ) : (
            <div
              className="
                px-4
                py-2
                rounded-full
                bg-stone
                text-sm
                text-primary
                font-medium
              "
            >
              {job.applicationsCount || 0} Applicants
            </div>
          )}
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
        <div className="mt-6">
          <JobTagList skills={job.requiredSkills} limit={4} />
        </div>

        {/* PERKS */}
        {job.perks?.length > 0 && (
          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-2
            "
          >
            {job.perks.slice(0, 3).map((perk) => (
              <div
                key={perk}
                className="
                    px-3
                    py-1.5
                    rounded-full
                    bg-stone
                    text-xs
                    text-primary
                  "
              >
                {perk}
              </div>
            ))}
          </div>
        )}

        {/* META */}
        <div className="mt-8">
          <JobMeta
            location={job.location}
            mode={job.mode}
            stipend={job.stipend}
            duration={job.duration}
            openingsCount={job.openingsCount}
            startDate={job.startDate}
            deadline={job.deadline}
          />
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
            flex-wrap
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

              <span>{job.stipend ? `₹${job.stipend}` : "Unpaid"}</span>
            </div>
          </div>

          {/* ACTIONS */}
          {!recruiterMode ? (
            <div
              className="
                px-5
                py-3
                rounded-2xl
                bg-primary
                text-white
                text-sm
                font-medium
              "
            >
              View Details
            </div>
          ) : (
            <div
              className="
                flex
                items-center
                gap-3
                flex-wrap
              "
            >
              {/* APPLICANTS */}
              <Button
                onClick={handleApplicants}
                variant="secondary"
                className="
                  rounded-2xl
                "
              >
                <Users size={16} />
                Applicants
              </Button>

              {/* EDIT */}
              <Button
                onClick={(e) => {
                  e.preventDefault();

                  e.stopPropagation();

                  navigate(`/recruiter/jobs/${job._id}/edit`);
                }}
                variant="secondary"
                className="
                  rounded-2xl
                "
              >
                <Pencil size={16} />
                Edit
              </Button>

              {/* CLOSE */}
              {job.status === "active" && (
                <Button
                  onClick={handleClose}
                  variant="secondary"
                  className="
                    rounded-2xl
                  "
                >
                  <Lock size={16} />
                  Close
                </Button>
              )}

              {job.status === "closed" && (
                <Button
                  onClick={handleReopen}
                  variant="secondary"
                  className="
                    rounded-2xl
                  "
                >
                  <Sparkles size={16} />
                  Reopen
                </Button>
              )}

              {/* DELETE */}
              <Button
                onClick={handleDelete}
                className="
                  rounded-2xl
                "
              >
                <Trash2 size={16} />
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default JobCard;
