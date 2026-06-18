import Badge from "../ui/Badge";

import {
  APPLICATION_STATUS,
} from "../../constants/applicationStatus";

function ApplicationStatusBadge({
  status,
}) {

  // LABEL
  const formattedLabel =
    status.charAt(0)
      .toUpperCase() +
    status.slice(1);

  // APPLIED
  if (
    status ===
    APPLICATION_STATUS.APPLIED
  ) {

    return (
      <Badge
        className="
          border-0
          px-4
          py-1.5
          rounded-full
          text-xs
          font-semibold
          bg-blue-50
          text-blue-700
        "
      >

        {formattedLabel}

      </Badge>
    );
  }

  // SHORTLISTED
  if (
    status ===
    APPLICATION_STATUS.SHORTLISTED
  ) {

    return (
      <Badge
        className="
          border-0
          px-4
          py-1.5
          rounded-full
          text-xs
          font-semibold
          bg-purple-50
          text-purple-700
        "
      >

        {formattedLabel}

      </Badge>
    );
  }

  // INTERVIEW
  if (
    status ===
    APPLICATION_STATUS.INTERVIEW
  ) {

    return (
      <Badge
        className="
          border-0
          px-4
          py-1.5
          rounded-full
          text-xs
          font-semibold
          bg-amber-50
          text-amber-700
        "
      >

        {formattedLabel}

      </Badge>
    );
  }

  // SELECTED
  if (
    status ===
    APPLICATION_STATUS.SELECTED
  ) {

    return (
      <Badge
        className="
          border-0
          px-4
          py-1.5
          rounded-full
          text-xs
          font-semibold
          bg-green-50
          text-green-700
        "
      >

        {formattedLabel}

      </Badge>
    );
  }

  // REJECTED
  if (
    status ===
    APPLICATION_STATUS.REJECTED
  ) {

    return (
      <Badge
        className="
          border-0
          px-4
          py-1.5
          rounded-full
          text-xs
          font-semibold
          bg-red-50
          text-red-700
        "
      >

        {formattedLabel}

      </Badge>
    );
  }

  // DEFAULT
  return (
    <Badge
      className="
        border-0
        px-4
        py-1.5
        rounded-full
        text-xs
        font-semibold
        bg-stone
        text-primary
      "
    >

      {formattedLabel}

    </Badge>
  );
}

export default ApplicationStatusBadge;