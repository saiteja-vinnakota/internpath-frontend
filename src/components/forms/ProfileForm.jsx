import {
  useState,
} from "react";

import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";

function ProfileForm({

  user,

  onSubmit,

  loading,

}) {

  const isRecruiter =
    user?.role ===
    "recruiter";

  const [

    formData,

    setFormData,

  ] = useState(() =>
    buildInitialFormData(user)
  );

  // CHANGE
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  // SUBMIT
  const handleSubmit =
    (e) => {

      e.preventDefault();

      const payload = {

        name:
          formData.name,

        bio:
          formData.bio,

        location:
          formData.location,

        linkedin:
          formData.linkedin,

        profilePicture:
          formData.profilePicture,
      };

      // STUDENT
      if (!isRecruiter) {

        payload.college =
          formData.college;

        payload.github =
          formData.github;

        payload.skills =
          splitList(formData.skills);

        payload.careerInterests =
          splitList(formData.careerInterests);

        payload.achievements =
          splitList(formData.achievements);
      }

      // RECRUITER
      if (isRecruiter) {

        payload.company =
          formData.company;

        payload.designation =
          formData.designation;

        payload.companyWebsite =
          formData.companyWebsite;
      }

      onSubmit(payload);
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

          {isRecruiter

            ? "Recruiter Profile"

            : "Student Profile"}

        </h2>

        <p
          className="
            mt-3
            text-muted
            leading-7
          "
        >

          {isRecruiter

            ? `
              Manage your recruiter
              and company information.
            `

            : `Manage your profile,
              portfolio, and career details.
              `}
        </p>

      </div>

      {/* RECRUITER SECTION */}
      {isRecruiter && (

        <div className="mt-12">

          <SectionTitle
            title="
              Company Information
            "
          />

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
              label="Company Name"
              required
            >

              <Input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Google"
                required
              />

            </Field>

            <Field
              label="Designation"
              required
            >

              <Input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="HR Manager"
                required
              />

            </Field>

            <Field
              label="Company Website"
            >

              <Input
                type="text"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                placeholder="https://company.com"
              />

            </Field>

            <Field
              label="Location"
            >

              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Bengaluru"
              />

            </Field>

          </div>

        </div>

      )}

      {/* BASIC DETAILS */}
      <div className="mt-12">

        <SectionTitle
          title="
            Basic Details
          "
        />

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
            label="Full Name"
            required
          >

            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Sai Teja"
              required
            />

          </Field>

          <Field
            label="Profile Picture URL"
          >

            <Input
              type="url"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />

          </Field>

        </div>

      </div>

      {/* STUDENT SECTION */}
      {!isRecruiter && (

        <div className="mt-12">

          <SectionTitle
            title="
              Academic Information
            "
          />

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
              label="College"
              required
            >

              <Input
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="JNTUK"
                required
              />

            </Field>

            <Field
              label="Location"
            >

              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Kakinada"
              />

            </Field>

            <Field
              label="GitHub URL"
            >

              <Input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
              />

            </Field>

            <Field
              label="LinkedIn URL"
            >

              <Input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
              />

            </Field>

          </div>

          {/* SKILLS */}
          <div className="mt-6">

            <Field
              label="Skills"
              helper="
                Separate skills using commas
              "
            >

              <Input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
              />

            </Field>

          </div>

          {/* CAREER INTERESTS */}
          <div className="mt-6">

            <Field
              label="Career Interests"
              helper="
                Separate interests using commas
              "
            >

              <Input
                name="careerInterests"
                value={formData.careerInterests}
                onChange={handleChange}
                placeholder="Backend Development, Cloud, Fintech"
              />

            </Field>

          </div>

          {/* ACHIEVEMENTS */}
          <div className="mt-6">

            <Field
              label="Achievements"
              helper="
                Add one achievement per line
              "
            >

              <Textarea
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                rows={5}
                placeholder={
                  "Won college hackathon\nBuilt a MERN internship portal\nSolved 250+ DSA problems"
                }
              />

            </Field>

          </div>

        </div>

      )}

      {/* COMMON */}
      <div className="mt-12">

        <SectionTitle
          title="
            About
          "
        />

        <div className="mt-6">

          <Field
            label={
              isRecruiter

                ? "Company Description"

                : "Bio"
            }
          >

            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={6}
              placeholder={
                isRecruiter
                  ? "Describe your company, hiring process, and culture..."
                  : "Write about yourself, achievements, and interests..."
              }
            />

          </Field>

        </div>

      </div>

      {/* COMMON LINKS */}
      {isRecruiter && (

        <div className="mt-12">

          <SectionTitle
            title="
              Professional Links
            "
          />

          <div className="mt-6">

            <Field
              label="LinkedIn URL"
            >

              <Input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/company/xyz"
              />

            </Field>

          </div>

        </div>

      )}

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

          ? "Saving Profile..."

          : "Save Profile"}

      </Button>

    </form>
  );
}

// SECTION TITLE
function SectionTitle({
  title,
}) {

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

      <div className="mt-3">

        {children}

      </div>

    </div>
  );
}

function splitList(value) {

  return value
    .split(/[\n,]/)
    .map((item) =>
      item.trim()
    )
    .filter(Boolean);
}

function buildInitialFormData(user) {

  return {

    // COMMON
    name:
      user?.name || "",

    bio:
      user?.bio || "",

    location:
      user?.location || "",

    linkedin:
      user?.linkedin || "",

    profilePicture:
      user?.profilePicture || "",

    // STUDENT
    college:
      user?.college || "",

    github:
      user?.github || "",

    skills:
      user?.skills?.join(", ")
        || "",

    careerInterests:
      user?.careerInterests?.join(", ")
        || "",

    achievements:
      user?.achievements?.join("\n")
        || "",

    // RECRUITER
    company:
      user?.company || "",

    designation:
      user?.designation || "",

    companyWebsite:
      user?.companyWebsite || "",
  };
}

export default ProfileForm;
