import {
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  Clock3,
  Building2,
  Sparkles,
  Loader2,
} from "lucide-react";

import {
  useEffect,
} from "react";

import toast from "react-hot-toast";

import Badge from "../ui/Badge";

import Button from "../ui/Button";

import {
  useAuth,
} from "../../context/AuthContext";

import useApplications from "../../hooks/useApplications";

function JobDetailPanel({
  job,
}) {

  const { user } =
    useAuth();

  const {

    applications,

    applyingJobId,

    fetchApplications,

    handleApply:
      applyToCurrentJob,

    hasApplied,

  } = useApplications();

  useEffect(() => {

    fetchApplications();

  }, []);

  const alreadyApplied =
    hasApplied(job._id);

  // APPLY HANDLER
  const handleApply =
    async () => {

      // RESUME CHECK
      if (
        !user?.resumeUrl
      ) {

        toast.error(
          "Upload resume before applying"
        );

        return;
      }

      await applyToCurrentJob(
        job._id
      );
    };

  return (
    <div
      className="
        bg-white
        border
        border-border
        rounded-[36px]
        p-8
      "
    >

      {/* HEADER */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-start
          lg:justify-between
          gap-8
        "
      >

        {/* LEFT */}
        <div>

          {/* COMPANY */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-stone
              text-sm
              text-muted
            "
          >

            <Building2 size={16} />

            <span>
              {job.company}
            </span>

          </div>

          {/* TITLE */}
          <h1
            className="
              mt-5
              text-4xl
              leading-tight
              font-serif
              text-primary
            "
          >
            {job.title}
          </h1>

          {/* META */}
          <div
            className="
              mt-6
              flex
              flex-wrap
              items-center
              gap-5
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

              <MapPin size={18} />

              <span>
                {job.location}
              </span>

            </div>

            {/* TYPE */}
            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <BriefcaseBusiness
                size={18}
              />

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

              <Clock3 size={18} />

              <span>

                {job.deadline

                  ? `Apply before ${new Date(
                      job.deadline
                    ).toLocaleDateString()}`

                  : "Applications open"}

              </span>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div
          className="
            flex
            flex-col
            items-start
            lg:items-end
            gap-5
          "
        >

          {/* STIPEND */}
          <div
            className="
              text-right
            "
          >

            <p
              className="
                text-sm
                text-muted
              "
            >
              Monthly Stipend
            </p>

            <div
              className="
                mt-2
                flex
                items-center
                gap-1
                text-3xl
                font-bold
                text-primary
              "
            >

              <IndianRupee
                size={24}
              />

              <span>
                {job.stipend ||
                  "Unpaid"}
              </span>

            </div>

          </div>

          {/* APPLY */}
          <Button
            onClick={handleApply}
            disabled={
              applyingJobId ===
                job._id ||

              alreadyApplied
            }
            className="
              h-14
              px-8
              rounded-2xl
            "
          >

            {applyingJobId ===
            job._id ? (

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <Loader2
                  size={18}
                  className="
                    animate-spin
                  "
                />

                <span>
                  Applying...
                </span>

              </div>

            ) : alreadyApplied ? (

              "Already Applied"

            ) : (

              "Apply Now"

            )}

          </Button>

        </div>

      </div>

      {/* DESCRIPTION */}
      <div className="mt-12">

        <h2
          className="
            text-2xl
            font-semibold
            text-primary
          "
        >
          About This Role
        </h2>

        <p
          className="
            mt-5
            text-muted
            leading-8
            whitespace-pre-line
          "
        >
          {job.description}
        </p>

      </div>

      {/* SKILLS */}
      <div className="mt-12">

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <Sparkles
            size={22}
            className="
              text-accent
            "
          />

          <h2
            className="
              text-2xl
              font-semibold
              text-primary
            "
          >
            Required Skills
          </h2>

        </div>

        <div
          className="
            mt-6
            flex
            flex-wrap
            gap-4
          "
        >

          {job.requiredSkills
            ?.map((skill) => (

              <Badge
                key={skill}
              >
                {skill}
              </Badge>

            ))}

        </div>

      </div>

    </div>
  );
}

export default JobDetailPanel;