import {
  MapPin,
  Laptop,
  CalendarDays,
  Users,
  IndianRupee,
  Clock3,
} from "lucide-react";

function JobMeta({
  location,
  mode,
  stipend,
  duration,
  openingsCount,
  startDate,
  deadline,
}) {

  const formatStipend = (amount) => {
    if (!amount || amount === 0) return "Unpaid";
    return amount.toLocaleString("en-IN");
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="flex flex-wrap items-center gap-5 text-muted">

      {/* LOCATION */}
      {location && (
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
      )}

      {/* MODE */}
      {mode && (
        <div className="flex items-center gap-2">
          <Laptop size={16} />
          <span className="capitalize">{mode}</span>
        </div>
      )}

      {/* STIPEND  */}
      {stipend !== undefined && (
        <div className="flex items-center gap-1">
          <IndianRupee size={15} />
          <span>{formatStipend(stipend)}</span>
        </div>
      )}

      {/* DURATION */}
      {duration && (
        <div className="flex items-center gap-2">
          <Clock3 size={16} />
          <span>{duration}</span>
        </div>
      )}

      {/* OPENINGS */}
      {openingsCount && (
        <div className="flex items-center gap-2">
          <Users size={16} />
          <span>{openingsCount} Opening{openingsCount !== 1 ? "s" : ""}</span>
        </div>
      )}

      {/* START DATE */}
      {startDate && (
        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          <span>Starts {formatDate(startDate)}</span>
        </div>
      )}

      {/* DEADLINE */}
      {deadline && (
        <div className="flex items-center gap-2">
          <Clock3 size={16} />
          <span>Apply before {formatDate(deadline)}</span>
        </div>
      )}

    </div>
  );
}

export default JobMeta;