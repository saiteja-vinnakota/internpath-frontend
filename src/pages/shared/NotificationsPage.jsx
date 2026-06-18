import {
  useEffect,
} from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import PageHeader
from "../../components/layout/PageHeader";

import NotificationList
from "../../components/notifications/NotificationList";

import Skeleton
from "../../components/ui/Skeleton";

import EmptyState
from "../../components/ui/EmptyState";

import {
  useNotificationContext,
} from "../../context/NotificationContext";

function NotificationsPage() {

  const {

    notifications,

    loading,

    error,

    fetchNotifications,

    handleMarkRead,

  } =
    useNotificationContext();

  useEffect(() => {

    fetchNotifications();

  }, []);

  return (

    <DashboardLayout>

      <PageHeader
        title="
          Notifications
        "
        description="
          Stay updated with
          applications and hiring activity.
        "
      />

      {loading && (

        <div
          className="
            mt-8
            space-y-4
          "
        >

          {[...Array(6)].map(
            (_, index) => (

              <Skeleton
                key={index}
                className="
                  h-24
                  rounded-[28px]
                "
              />

            )
          )}

        </div>

      )}

      {error && (

        <div className="mt-8">

          <EmptyState
            title="
              Failed to load notifications
            "
            description={error}
          />

        </div>

      )}

      {!loading && !error && (

        <div className="mt-8">

          <NotificationList
            notifications={
              notifications
            }
            onRead={
              handleMarkRead
            }
          />

        </div>

      )}

    </DashboardLayout>
  );
}

export default NotificationsPage;