import Badge from "../ui/Badge";

import {
  APPLICATION_STATUS,
} from "../../constants/applicationStatus";

import{
  getStatusColor
} from "../../utils/formatStatus";

function ApplicationStatusBadge({
  status,
}) {

  // LABEL
  const formattedLabel =
    status.charAt(0)
      .toUpperCase() +
    status.slice(1);

    const statusColor = getStatusColor(status);

    
  return (
    <Badge
      className={`
        border-0
        px-4
        py-1.5
        rounded-full
        text-xs
        font-semibold
        ${statusColor.bg} 
        ${statusColor.text}
        
      `}
    >

      {formattedLabel}

    </Badge>
  );
}

export default ApplicationStatusBadge;