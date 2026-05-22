import {
  Bell,
} from "lucide-react";

function NotificationCard({
  notification,
}) {

  return (
    <div
      className={`
        bg-white
        border
        rounded-[28px]
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-medium

        ${
          notification.read
            ? "border-border"
            : "border-blue-100"
        }
      `}
    >

      <div
        className="
          flex
          items-start
          gap-4
        "
      >

        {/* ICON */}
        <div
          className={`
            w-12
            h-12
            rounded-2xl
            flex
            items-center
            justify-center
            flex-shrink-0

            ${
              notification.read
                ? "bg-stone"
                : "bg-blue-50"
            }
          `}
        >

          <Bell
            size={22}
            className={`
              ${
                notification.read
                  ? "text-primary"
                  : "text-accent"
              }
            `}
          />

        </div>

        {/* CONTENT */}
        <div className="flex-1">

          {/* TITLE */}
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >

            <h3
              className="
                text-lg
                font-semibold
                text-primary
              "
            >
              {notification.title}
            </h3>

            {!notification.read && (
              <div
                className="
                  w-3
                  h-3
                  rounded-full
                  bg-accent
                  flex-shrink-0
                "
              />
            )}

          </div>

          {/* MESSAGE */}
          <p
            className="
              mt-3
              text-muted
              leading-7
            "
          >
            {notification.message}
          </p>

          {/* TIME */}
          <p
            className="
              mt-5
              text-sm
              text-muted
            "
          >
            {notification.time}
          </p>

        </div>

      </div>

    </div>
  );
}

export default NotificationCard;