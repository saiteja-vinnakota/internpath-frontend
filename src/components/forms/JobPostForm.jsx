import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";

const categories = [
  "frontend",
  "backend",
  "fullstack",
  "aiml",
  "datascience",
  "mobile",
  "devops",
];

const modes = ["remote", "hybrid", "onsite"];

function JobPostForm({
  initialData = null,

  onSubmit,

  loading,
}) {
  const [formData, setFormData] = useState({
    title: "",

    company: "",

    description: "",

    requiredSkills: "",

    location: "",

    mode: "remote",

    category: "",

    stipend: "",

    duration: "",

    openingsCount: "",

    startDate: "",

    deadline: "",

    perks: "",

    eligibleBatches: "",

    eligibleDegrees: "",

    minimumCGPA: "",
  });

  // PREFILL
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",

        company: initialData.company || "",

        description: initialData.description || "",

        requiredSkills: initialData.requiredSkills?.join(", ") || "",

        location: initialData.location || "",

        mode: initialData.mode || "remote",

        category: initialData.category || "",

        stipend: initialData.stipend || "",

        duration: initialData.duration || "",

        openingsCount: initialData.openingsCount || "",

        startDate: initialData.startDate?.split("T")[0] || "",

        deadline: initialData.deadline?.split("T")[0] || "",

        perks: initialData.perks?.join(", ") || "",

        eligibleBatches: initialData.eligibleBatches?.join(", ") || "",

        eligibleDegrees: initialData.eligibleDegrees?.join(", ") || "",

        minimumCGPA: initialData.minimumCGPA || "",
      });
    }
  }, [initialData]);

  // CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,

      stipend: Number(formData.stipend),

      openingsCount: Number(formData.openingsCount),

      minimumCGPA: Number(formData.minimumCGPA),

      requiredSkills: formData.requiredSkills

        .split(",")

        .map((skill) => skill.trim())

        .filter(Boolean),

      perks: formData.perks

        .split(",")

        .map((perk) => perk.trim())

        .filter(Boolean),

      eligibleBatches: formData.eligibleBatches

        .split(",")

        .map((batch) => batch.trim())

        .filter(Boolean),

      eligibleDegrees: formData.eligibleDegrees

        .split(",")

        .map((degree) => degree.trim())

        .filter(Boolean),

      status: "active",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        border
        border-border

        rounded-[36px]

        p-5
        sm:p-8
        xl:p-10

        shadow-sm
      "
    >
      {/* HEADER */}
      <div>
        <h2
          className="
            text-3xl
            sm:text-4xl
            font-semibold
            text-primary
          "
        >
          {initialData ? "Update Internship" : "Post New Internship"}
        </h2>

        <p
          className="
            mt-3
            text-muted
            leading-7
          "
        >
          Fill in internship details to attract qualified students and
          streamline your hiring process.
        </p>
      </div>

      {/* BASIC INFO */}
      <div className="mt-12">
        <SectionTitle title="Basic Information" />

        <div
          className="
            mt-6
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >
          <Field label="Internship Title" required>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Frontend Developer Intern"
              required
            />
          </Field>

          <Field label="Company Name" required>
            <Input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Google"
              required
            />
          </Field>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-12">
        <SectionTitle title="Internship Description" />

        <div className="mt-6">
          <Field
            label="Description"
            required
            helper="
                 Describe responsibilities,
                 requirements, expectations,
                and internship goals.
              "
          >
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write detailed internship information..."
              required
            />
          </Field>
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-12">
        <SectionTitle title="Internship Details" />

        <div
          className="
            mt-6
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >
          <Field
            label="Required Skills"
            required
            helper=" Separate skills using commas "
          >
            <Input
              name="requiredSkills"
              value={formData.requiredSkills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              required
            />
          </Field>

          <Field label="Location" required>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="
                Bengaluru
              "
              required
            />
          </Field>

          <Field label="Work Mode">
            <Select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              options={modes.map((mode) => ({
                value: mode,
                label: mode.charAt(0).toUpperCase() + mode.slice(1),
              }))}
            />
          </Field>

          <Field label="Category" required>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              options={[
                {
                  value: "",
                  label: "Select Category",
                },

                ...categories.map((category) => ({
                  value: category,
                  label:
                    category === "aiml"
                      ? "AI/ML"
                      : category === "datascience"
                        ? "Data Science"
                        : category.charAt(0).toUpperCase() + category.slice(1),
                })),
              ]}
            />
          </Field>

          <Field label="Monthly Stipend">
            <Input
              type="number"
              name="stipend"
              value={formData.stipend}
              onChange={handleChange}
              placeholder="15000"
            />
          </Field>

          <Field label="Duration" required>
            <Input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="3 Months"
              required
            />
          </Field>

          <Field label="Openings" required>
            <Input
              type="number"
              name="openingsCount"
              value={formData.openingsCount}
              onChange={handleChange}
              placeholder="5"
              required
            />
          </Field>

          <Field label="Minimum CGPA">
            <Input
              type="number"
              step="0.1"
              name="minimumCGPA"
              value={formData.minimumCGPA}
              onChange={handleChange}
              placeholder="7.5"
            />
          </Field>
        </div>
      </div>

      {/* DATES */}
      <div className="mt-12">
        <SectionTitle title="Important Dates" />

        <div
          className="
            mt-6
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >
          <Field label="Start Date">
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </Field>

          <Field label="Application Deadline" required>
            <Input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </Field>
        </div>
      </div>

      {/* EXTRA */}
      <div className="mt-12">
        <SectionTitle title="Additional Information" />

        <div
          className="
            mt-6
            space-y-6
          "
        >
          <Field
            label="Perks"
            helper="
              Example: Certificate,
              PPO, Flexible Hours
            "
          >
            <Input
              name="perks"
              value={formData.perks}
              onChange={handleChange}
              placeholder="
                Certificate, PPO, Flexible Hours
              "
            />
          </Field>

          <Field
            label="Eligible Batches"
            helper="
              Example: 2026, 2027
            "
          >
            <Input
              name="eligibleBatches"
              value={formData.eligibleBatches}
              onChange={handleChange}
              placeholder="
                2026, 2027
              "
            />
          </Field>

          <Field
            label="Eligible Degrees"
            required
            helper="
               Example: B.Tech, MCA, M.Tech
              "
          >
            <Input
              name="eligibleDegrees"
              value={formData.eligibleDegrees}
              onChange={handleChange}
              placeholder="B.Tech, MCA, M.Tech"
              required
            />
          </Field>
        </div>
      </div>

      {/* BUTTON */}
      <Button
        type="submit"
        disabled={loading}
        className="
          mt-12

          h-14

          px-10

          rounded-2xl

          text-[15px]
          font-semibold
        "
      >
        {loading
          ? "Saving Internship..."
          : initialData
            ? "Update Internship"
            : "Post Internship"}
      </Button>
    </form>
  );
}

// SECTION TITLE
function SectionTitle({ title }) {
  return (
    <div>
      <h3
        className="
          text-xl
          font-semibold
          text-primary
        "
      >
        {title}
      </h3>
    </div>
  );
}

// FIELD
function Field({
  label,

  required,

  helper,

  children,
}) {
  return (
    <div>
      <label
        className="
          flex
          items-center
          gap-1

          text-[15px]
          font-medium

          text-primary
        "
      >
        {label}

        {required && (
          <span
            className="
              text-red-500
            "
          >
            *
          </span>
        )}
      </label>

      {helper && (
        <p
          className="
            mt-2

            text-[13px]
            leading-6

            text-muted
          "
        >
          {helper}
        </p>
      )}

      <div className="mt-3">{children}</div>
    </div>
  );
}

export default JobPostForm;
