import {
  Bell,
  CheckCircle,
  Briefcase,
  AlertCircle,
} from "lucide-react";

import {
  formatRelativeDate,
} from "../../utils/formatDate";

function NotificationItem({

  notification,

  onRead,

}) {

  const getIcon = () => {

    switch (
      notification.type
    ) {

      case "APPLICATION":
        return (
          <Briefcase
            size={18}
          />
        );

      case "SHORTLIST":
        return (
          <CheckCircle
            size={18}
          />
        );

      case "REJECT":
        return (
          <AlertCircle
            size={18}
          />
        );

      default:
        return (
          <Bell
            size={18}
          />
        );
    }
  };

  return (

    <button
      onClick={() =>
        onRead(
          notification._id
        )
      }
      className={`
        w-full
        text-left

        p-4

        rounded-3xl

        border

        transition-all
        duration-200

        hover:shadow-md
        hover:-translate-y-[1px]

        ${
          notification.isRead

            ? `
              bg-white
              border-border
            `

            : `
              bg-blue-50
              border-blue-200
            `
        }
      `}
    >

      <div
        className="
          flex
          gap-4
          items-start
        "
      >

        {/* ICON */}
        <div
          className={`
            shrink-0

            w-10
            h-10

            rounded-2xl

            flex
            items-center
            justify-center

            ${
              notification.isRead

                ? `
                  bg-stone
                  text-muted
                `

                : `
                  bg-blue-100
                  text-blue-700
                `
            }
          `}
        >

          {getIcon()}

        </div>

        {/* CONTENT */}
        <div className="flex-1">

          <div
            className="
              flex
              items-start
              justify-between
              gap-3
            "
          >

            <p
              className="
                text-sm
                text-primary
                leading-relaxed
              "
            >

              {notification.message}

            </p>

            {!notification.isRead && (

              <div
                className="
                  w-2.5
                  h-2.5

                  rounded-full

                  bg-blue-500

                  shrink-0
                "
              />

            )}

          </div>

          <p
            className="
              mt-2
              text-xs
              text-muted
            "
          >

            {formatRelativeDate(
              notification.createdAt
            )}

          </p>

        </div>

      </div>

    </button>
  );
}

export default NotificationItem;