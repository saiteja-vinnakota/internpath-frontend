import {
  Link,
} from "react-router-dom";

import NotificationList
from "./NotificationList";

function NotificationDropdown({

  notifications,

  onRead,

}) {

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.isRead
    ).length;

  return (

    <div
      className="
        absolute

        right-0
        top-14

        w-[420px]
        max-w-[95vw]

        bg-white/95
        backdrop-blur-xl

        border
        border-border

        rounded-[32px]

        shadow-2xl

        overflow-hidden

        z-50
      "
    >

      {/* HEADER */}

      <div
        className="
          px-6
          py-5

          border-b
          border-border
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h3
              className="
                text-lg
                font-semibold
                text-primary
              "
            >

              Notifications

            </h3>

            <p
              className="
                text-xs
                text-muted
                mt-1
              "
            >

              {unreadCount}
              {" "}
              unread notifications

            </p>

          </div>

          <Link
            to="/notifications"
            className="
              text-sm

              text-accent

              font-medium

              hover:underline
            "
          >

            View All

          </Link>

        </div>

      </div>

      {/* BODY */}

      <div
        className="
          p-4

          max-h-[480px]

          overflow-y-auto
        "
      >

        <NotificationList
          notifications={
            notifications.slice(
              0,
              5
            )
          }
          onRead={onRead}
        />

      </div>

    </div>

  );
}

export default NotificationDropdown;