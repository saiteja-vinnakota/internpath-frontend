import {
  useEffect,
  useState,
} from "react";

import Button
from "../ui/Button";

function ProfileForm({

  user,

  onSubmit,

  loading,

}) {

  const [

    formData,

    setFormData,

  ] = useState({

    bio: "",

    college: "",

    location: "",

    github: "",

    linkedin: "",

    skills: "",
  });

  // PREFILL
  useEffect(() => {

    if (user) {

      setFormData({

        bio:
          user.bio || "",

        college:
          user.college || "",

        location:
          user.location || "",

        github:
          user.github || "",

        linkedin:
          user.linkedin || "",

        skills:
          user.skills?.join(", ")
            || "",
      });
    }

  }, [user]);

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

      onSubmit({

        ...formData,

        skills:
          formData.skills

            .split(",")

            .map((skill) =>
              skill.trim()
            )

            .filter(Boolean),
      });
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        border
        border-border
        rounded-[32px]
        p-8
      "
    >

      <h2
        className="
          text-2xl
          font-semibold
          text-primary
        "
      >
        Profile Information
      </h2>

      <div
        className="
          mt-8
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >

        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleChange}
          placeholder="College"
          className="
            h-14
            px-5
            rounded-2xl
            border
            border-border
            outline-none
          "
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="
            h-14
            px-5
            rounded-2xl
            border
            border-border
            outline-none
          "
        />

      </div>

      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Write your bio..."
        rows={5}
        className="
          mt-6
          w-full
          p-5
          rounded-2xl
          border
          border-border
          outline-none
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

        <input
          type="text"
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="GitHub URL"
          className="
            h-14
            px-5
            rounded-2xl
            border
            border-border
            outline-none
          "
        />

        <input
          type="text"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="
            h-14
            px-5
            rounded-2xl
            border
            border-border
            outline-none
          "
        />

      </div>

      <input
        type="text"
        name="skills"
        value={formData.skills}
        onChange={handleChange}
        placeholder="
          Skills (React, Node.js, MongoDB)
        "
        className="
          mt-6
          w-full
          h-14
          px-5
          rounded-2xl
          border
          border-border
          outline-none
        "
      />

      <Button
        type="submit"
        disabled={loading}
        className="
          mt-8
          h-14
          px-8
          rounded-2xl
        "
      >

        {loading
          ? "Saving..."
          : "Save Profile"}

      </Button>

    </form>
  );
}

export default ProfileForm;