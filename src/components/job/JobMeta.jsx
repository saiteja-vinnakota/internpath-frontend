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

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-5
        text-muted
      "
    >

      {/* LOCATION */}
      {location && (

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <MapPin size={18} />

          <span>
            {location}
          </span>

        </div>

      )}

      {/* MODE */}
      {mode && (

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <Laptop size={18} />

          <span
            className="
              capitalize
            "
          >
            {mode}
          </span>

        </div>

      )}

      {/* STIPEND */}
      {stipend !== undefined && (

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <IndianRupee
            size={18}
          />

          <span>
            ₹{stipend}
          </span>

        </div>

      )}

      {/* DURATION */}
      {duration && (

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <Clock3 size={18} />

          <span>
            {duration}
          </span>

        </div>

      )}

      {/* OPENINGS */}
      {openingsCount && (

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <Users size={18} />

          <span>

            {openingsCount} Openings

          </span>

        </div>

      )}

      {/* START DATE */}
      {startDate && (

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <CalendarDays
            size={18}
          />

          <span>

            Starts{" "}

            {new Date(
              startDate
            ).toLocaleDateString()}

          </span>

        </div>

      )}

      {/* DEADLINE */}
      {deadline && (

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <Clock3 size={18} />

          <span>

            Apply before{" "}

            {new Date(
              deadline
            ).toLocaleDateString()}

          </span>

        </div>

      )}

    </div>
  );
}

export default JobMeta;