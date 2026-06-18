import NotificationItem
from "./NotificationItem";

import EmptyState
from "../ui/EmptyState";

function NotificationList({

  notifications,

  onRead,

}) {

  if (
    notifications.length === 0
  ) {

    return (

      <div className="py-8">

        <EmptyState
          title="
            No notifications
          "
          description="
            You're all caught up.
          "
        />

      </div>

    );
  }

  return (

    <div className="space-y-4">

      {notifications.map(
        (notification) => (

          <NotificationItem
            key={
              notification._id
            }
            notification={
              notification
            }
            onRead={onRead}
          />

        )
      )}

    </div>

  );
}

export default NotificationList;