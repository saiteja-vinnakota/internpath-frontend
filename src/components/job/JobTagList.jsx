import Badge from "../ui/Badge";

function JobTagList({
  skills = [],
  limit,
}) {

  const displayedSkills =
    limit

      ? skills.slice(
          0,
          limit
        )

      : skills;

  return (
    <div
      className="
        flex
        flex-wrap
        gap-3
      "
    >

      {displayedSkills.map(
        (skill) => (

          <Badge
            key={skill}
          >
            {skill}
          </Badge>

        )
      )}

    </div>
  );
}

export default JobTagList;